import { toast } from 'react-toastify';

const notificationService = {
  success: (message) => {
    toast.success(message);
  },
  
  error: (message) => {
    toast.error(message);
  },

  loading: (message) => {
    return toast.info(message, { autoClose: false, theme: "light" });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
  
  promise: (promiseToResolve, messages) => {
    return toast.promise(promiseToResolve, messages);
  },

};

export default notificationService;