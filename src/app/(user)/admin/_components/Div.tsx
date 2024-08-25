import React from "react";

function Div({ children }) {
  return (
    <div className="border-gray-200 bg-bg-light-1 p-4 dark:border-gray-600 dark:bg-bg-dark-1 rounded text-gray-500 dark:text-gray-400">
      {children}
    </div>
  );
}

export default Div;
