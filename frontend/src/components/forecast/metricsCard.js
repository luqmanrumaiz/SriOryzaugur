import React from 'react';

const MetricsCard = ({ metric }) => (
  <div className="flex items-center mb-2">
          <div
              className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5 13l4 4L19 7"/>
              </svg>
          </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-gray-900">{metric.title}</p>
      <p className="text-sm font-medium text-gray-500">{metric.metric}</p>
    </div>
  </div>
);

export default MetricsCard;
