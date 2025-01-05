import React from 'react';

const ErrorMessage = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="text-red-500">
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMessage;
