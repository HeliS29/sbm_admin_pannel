import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, X, Tag, Search, Plus } from 'lucide-react';
import tagApi from '../api/tagApi';

const TagSelector = ({ selectedTags = [], onTagsChange, placeholder = "Select a tag..." }) => {
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  // Get the single selected tag (first one if multiple exist)
  const selectedTag = selectedTags.length > 0 ? selectedTags[0] : null;

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await tagApi.getTags();
      setTags(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load tags');
      console.error('Error fetching tags:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedTag || selectedTag.id !== tag.id)
  );

  const handleTagSelect = (tag) => {
    // Replace the current selection with the new tag
    onTagsChange([tag]);
    setSearchTerm('');
    setIsOpen(false); // Close dropdown after selection
  };

  const handleTagRemove = () => {
    onTagsChange([]);
  };

  const getTagColor = () => {
    // Use a consistent color for the single tag
    return 'bg-purple-100 text-purple-800 border-purple-200';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-3">
        Tag
      </label>
      
      {/* Selected Tag Display */}
      {selectedTag && (
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getTagColor()} transition-all duration-200 hover:shadow-sm`}
          >
            <Tag className="w-3 h-3" />
            {selectedTag.name}
            <button
              onClick={handleTagRemove}
              className="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        </div>
      )}

      {/* Tag Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border-2 rounded-xl bg-white text-left flex items-center justify-between transition-all duration-200 ${
          isOpen 
            ? 'border-purple-500 ring-2 ring-purple-200 shadow-lg' 
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={!selectedTag ? 'text-slate-500' : 'text-slate-800'}>
          {!selectedTag 
            ? placeholder 
            : selectedTag.name
          }
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl">
          {/* Search Input */}
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                autoFocus
              />
            </div>
          </div>

          {/* Tags List */}
          <div className="max-h-60 overflow-y-auto">
            {loading && (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-slate-500 text-sm mt-2">Loading tags...</p>
              </div>
            )}

            {error && (
              <div className="p-4 text-center text-red-600 text-sm">
                {error}
              </div>
            )}

            {!loading && !error && filteredTags.length === 0 && (
              <div className="p-4 text-center">
                <Tag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">
                  {searchTerm ? 'No tags found' : selectedTag ? 'Tag already selected' : 'No available tags'}
                </p>
                {searchTerm && (
                  <p className="text-slate-400 text-xs mt-1">
                    Try adjusting your search terms
                  </p>
                )}
              </div>
            )}

            {!loading && !error && filteredTags.map((tag, index) => (
              <button
                key={tag.id}
                onClick={() => handleTagSelect(tag)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-b-0"
              >
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-slate-800 font-medium">{tag.name}</span>
                <Plus className="w-4 h-4 text-slate-400 ml-auto" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;