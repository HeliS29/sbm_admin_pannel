import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Download } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

function CallLogs() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://api.interactivv.pro/chat/twilio/call_logs')
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.calls);
        setFilteredLogs(data.calls);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch call logs:', err);
        setLoading(false);
      });
  }, []);

  // Filter Logic
  useEffect(() => {
    const filtered = logs.filter((log) => {
      const matchesSearch = [log.call_sid, log.from, log.to]
        .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));

      const logDate = new Date(log.start_time);
      const matchesStartDate = startDate ? logDate >= new Date(startDate) : true;
      const matchesEndDate = endDate ? logDate <= new Date(endDate) : true;

      return matchesSearch && matchesStartDate && matchesEndDate;
    });

    setFilteredLogs(filtered);
    setCurrentPage(1); // Reset pagination
  }, [searchTerm, startDate, endDate, logs]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', 'recording.mp3');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Call Logs</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by SID, From, or To"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="overflow-auto rounded-lg border border-gray-200 mb-4 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Call SID', 'From', 'To', 'Start Time', 'End Time', 'Duration', 'Status', 'Recordings'].map(header => (
                        <th key={header} className="px-4 py-2 text-left font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {paginatedLogs.map((log) => (
                      <tr key={log.call_sid}>
                        <td className="px-4 py-2 text-blue-600">
                          <a
                            href={`https://www.twilio.com/console/voice/logs/${log.call_sid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {log.call_sid}
                          </a>
                        </td>
                        <td className="px-4 py-2">{log.from}</td>
                        <td className="px-4 py-2">{log.to}</td>
                        <td className="px-4 py-2">{log.start_time}</td>
                        <td className="px-4 py-2">{log.end_time}</td>
                        <td className="px-4 py-2">{log.duration_sec} sec</td>
                        <td className="px-4 py-2">{log.status}</td>
                        <td className="px-4 py-2 space-y-1">
                          {log.recordings.length > 0 ? (
                            log.recordings.map((url, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  Recording {idx + 1}
                                </a>
                                <button
  onClick={() => handleDownload(url)}
  className="text-sm bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center justify-center"
  title="Download"
>
  <Download size={16} />
</button>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-400 italic">No recordings</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>
                  Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredLogs.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredLogs.length)} of {filteredLogs.length}
                </p>
                <div className="space-x-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CallLogs;
