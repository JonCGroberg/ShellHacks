// SidebarNavigation.jsx

import React, { useState } from "react";

function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to open the sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg"
      >
        Menu
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-200 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 z-40`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Navigation</h2>
          <nav className="space-y-4">
            <button className="block w-full text-left p-2 bg-gray-800 text-white rounded">
              Dashboard
            </button>
            <button className="block w-full text-left p-2 bg-gray-800 text-white rounded">
              Leader Board
            </button>
            <button className="block w-full text-left p-2 bg-gray-800 text-white rounded">
              Words Learned
            </button>
            <button className="block w-full text-left p-2 bg-gray-800 text-white rounded">
              Stories
            </button>
            <button className="block w-full text-left p-2 bg-gray-800 text-white rounded">
              Chat Messages
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30"
        />
      )}
    </div>
  );
}

export default SidebarNavigation;
