import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  //close form by clicking outside the modal
  const handleBackropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackropClick}
    >
      <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
