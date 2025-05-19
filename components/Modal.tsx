import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: "error" | "success" | "info";
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, type = "info" }) => {
  if (!open) return null;
  let color = "";
  if (type === "error") color = "border-red-500";
  if (type === "success") color = "border-green-500";
  if (type === "info") color = "border-blue-500";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`bg-white rounded-xl shadow-lg p-6 min-w-[300px] border-2 ${color} relative`}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
