// src/components/Dropdown.jsx
import React from 'react';

const Dropdown = ({ label, options, value, onChange, placeholder, disabled = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;