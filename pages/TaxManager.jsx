// import React, { useEffect, useState } from 'react';
// import Sidebar from '../components/Sidebar';

// const TagManager = () => {
//   const [tags, setTags] = useState([]);
//   const [newTag, setNewTag] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const fetchTags = async () => {
//     try {
//       const res = await fetch('http://localhost:8000/vapi/tags');
//       const data = await res.json();
//       setTags(data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch tags');
//     }
//   };

//   const addTag = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const res = await fetch('http://localhost:8000/vapi/tags', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name: newTag })
//       });

//       if (!res.ok) throw new Error(await res.text());

//       const tag = await res.json();
//       setTags((prev) => [...prev, tag]);
//       setNewTag('');
//       setSuccess('Tag added successfully');
//     } catch (err) {
//       setError('Error adding tag');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTags();
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-slate-50">
//       <Sidebar />
//     <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-md">
//       <h2 className="text-xl font-bold mb-4">Tag Manager</h2>

//       <form onSubmit={addTag} className="flex gap-2 mb-4">
//         <input
//           type="text"
//           value={newTag}
//           onChange={(e) => setNewTag(e.target.value)}
//           placeholder="Enter new tag name"
//           className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           {loading ? 'Adding...' : 'Add Tag'}
//         </button>
//       </form>

//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {success && <p className="text-green-600 mb-2">{success}</p>}

//       <ul className="space-y-2">
//         {tags.map((tag) => (
//           <li key={tag.id} className="p-2 border rounded-md text-gray-800">
//             {tag.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//     </div>
//   );
// };

// export default TagManager;

import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Tag, Search, X, Check, Hash } from 'lucide-react';
import tagApi from '../api/tagApi';
import Sidebar from '../components/Sidebar';


const TagManager = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await tagApi.getTags();
      setTags(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch tags');
      console.error('Error fetching tags:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingTag) {
        await tagApi.updateTag(editingTag.id, formData);
        setSuccess('Tag updated successfully');
      } else {
        await tagApi.createTag(formData);
        setSuccess('Tag created successfully');
      }
      
      fetchTags();
      resetForm();
    } catch (err) {
      setError(editingTag ? 'Failed to update tag' : 'Failed to create tag');
      console.error('Error saving tag:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name
    });
    setShowForm(true);
  };

  const handleDelete = async (tagId) => {
    if (!window.confirm('Are you sure you want to delete this tag? This action cannot be undone.')) return;
    
    setError('');
    setSuccess('');
    try {
      await tagApi.deleteTag(tagId);
      setSuccess('Tag deleted successfully');
      fetchTags();
    } catch (err) {
      setError('Failed to delete tag');
      console.error('Error deleting tag:', err);
    }
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setEditingTag(null);
    setShowForm(false);
  };

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 ml-72 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                Tag Manager
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                Organize and categorize your AI assistants with custom tags
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-slate-800">{tags.length}</span>
                  <span className="text-slate-600">Total Tags</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                Create Tag
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-600" />
            <p className="text-emerald-800 font-medium">{success}</p>
          </div>
        )}

        {/* Tags Grid */}
        {loading && !showForm ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-slate-500 mt-4 text-lg">Loading tags...</p>
          </div>
        ) : (
          <>
            {filteredTags.length === 0 && !showForm ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Tag className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  {searchTerm ? 'No tags found' : 'No tags yet'}
                </h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? 'Try adjusting your search terms to find the tags you\'re looking for.' 
                    : 'Create your first tag to start organizing your AI assistants.'
                  }
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl mx-auto"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Tag
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="group bg-white border-2 border-slate-100 hover:border-purple-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-purple-500 rounded-full shadow-sm"></div>
                        <h3 className="font-bold text-slate-800 text-lg">{tag.name}</h3>
                      </div>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleEdit(tag)}
                          className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                          title="Edit Tag"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tag.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete Tag"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border bg-purple-100 text-purple-800 border-purple-200">
                        <Hash className="w-3 h-3" />
                        {tag.name}
                      </span>
                      
                      <div className="text-xs text-slate-500">
                        ID: {tag.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Tag Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Tag className="w-6 h-6 text-purple-600" />
                    {editingTag ? 'Edit Tag' : 'Create New Tag'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                    Tag Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter tag name"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    required
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {editingTag ? 'Updating...' : 'Creating...'}
                      </div>
                    ) : (
                      editingTag ? 'Update Tag' : 'Create Tag'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagManager;