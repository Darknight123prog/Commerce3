import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Base toast options
const baseToastOptions = {
  position: "top-center",
  autoClose: 1500,
  pauseOnHover: true,
  closeOnClick: true,
  theme: "dark",
  toastStyle: {
    backgroundColor: "#16a34a", // Tailwind green-600
    color: "white",
    fontWeight: "600",
    borderRadius: "0.5rem", // rounded-lg
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)", // shadow-lg
    maxWidth: "250px", // small width
    padding: "0.5rem 1rem", // small padding
    margin: "0 auto",
    fontSize: "0.875rem", // text-sm
  },
};

// Success
export const showSuccess = (message) =>
  toast.success(message, { ...baseToastOptions });

// Error
export const showError = (message) =>
  toast.error(message, { 
    ...baseToastOptions,
    toastStyle: { ...baseToastOptions.toastStyle, backgroundColor: "#dc2626" } // red-600
  });

// Info
export const showInfo = (message) =>
  toast.info(message, { 
    ...baseToastOptions,
    toastStyle: { ...baseToastOptions.toastStyle, backgroundColor: "#2563eb" } // blue-600
  });

// Warning
export const showWarning = (message) =>
  toast.warning(message, { 
    ...baseToastOptions,
    toastStyle: { ...baseToastOptions.toastStyle, backgroundColor: "#facc15", color: "black" } // yellow-400
  });
