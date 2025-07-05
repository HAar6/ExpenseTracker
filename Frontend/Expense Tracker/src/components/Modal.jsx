import React from 'react';
import { IoMdClose } from 'react-icons/io';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            className="text-gray-500 hover:text-red-500 transition"
            onClick={onClose}
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Content (Form or any children) */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
