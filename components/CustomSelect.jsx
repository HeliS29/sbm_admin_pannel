import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import React from 'react';
const CustomSelect = ({ label, value, onChange, options, error, disabled, placeholder }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <Listbox value={options.find((opt) => opt.id === value)} onChange={(opt) => onChange(opt.id)} disabled={disabled}>
        <div className="relative">
          <Listbox.Button className="w-full relative cursor-default rounded-lg bg-gray-50 py-3 pl-4 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <span className="block truncate">
              {disabled ? 'Loading...' : value ? options.find(o => o.id === value)?.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white 
             py-1 text-base shadow-xl ring-1 ring-gray-300 border border-gray-200 
             focus:outline-none sm:text-sm">
            {options.map((opt) => (
              <Listbox.Option
                key={opt.id}
                value={opt}
                className={({ active }) =>
                  `relative cursor-pointer select-none p-2  ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate whitespace-normal ${selected ? 'font-medium' : 'font-normal'}`}>{opt.label}</span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
export default CustomSelect;