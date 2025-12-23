import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  closeOnClick: true,
};

export const showSuccess = (message) =>
  toast.success(message, toastOptions);

export const showError = (message) =>
  toast.error(message, toastOptions);

export const showInfo = (message) =>
  toast.info(message, toastOptions);

export const showWarning = (message) =>
  toast.warning(message, toastOptions);
