import React from 'react';

export interface StatusLabelProps {
  text: string;
  variant: 'success' | 'danger' | 'warning' | 'info'; 
}

const StatusLabel: React.FC<StatusLabelProps> = ({ text, variant }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'danger':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return '';
    }
  };

  const getDotColorClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-500';
      case 'danger':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return '';
    }
  };

  return (
    <span className={`inline-flex items-center text-md font-medium px-2.5 py-0.5 rounded-full ${getVariantClass()}`}>
      <span className={`w-2 h-2 me-1 rounded-full ${getDotColorClass()}`} />
      {text}
    </span>
  );
};

export default StatusLabel;
