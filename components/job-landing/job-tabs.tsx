'use client'

import React, { useState, useCallback } from 'react';
import { jobFunctions, locations, salaryRanges, industries, allJobs } from './data'

export default function JobTabs() {
  type Category = 'function' | 'industry' | 'location' | 'salary';

  const [activeTab, setActiveTab] = useState<Category>('function');

  const getCount = useCallback((category: Category, value: string) => {
    return allJobs.filter(job => job[category] === value).length;
  }, []);

  const tabs: Record<Category, { title: string; items: string[] }> = {
    function: { title: 'Functions', items: jobFunctions },
    industry: { title: 'Industries', items: industries },
    location: { title: 'Locations', items: locations },
    salary: { title: 'Salaries', items: salaryRanges }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="border-b border-gray-200 mb-3">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {Object.entries(tabs).map(([key, { title }]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as Category)}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === key ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {title}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6">
        {tabs[activeTab].items.map(item => (
          <a href="#" key={item} className="text-gray-600 hover:text-indigo-600 group flex flex-nowrap items-center space-x-2">
            <span className='wrap-break-word'>{item}</span>
            <span className="text-xs bg-gray-200 group-hover:bg-indigo-100 group-hover:text-indigo-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">
              {getCount(activeTab, item)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
