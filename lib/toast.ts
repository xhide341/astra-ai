import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 3000,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      duration: 3000,
    });
  },
  loading: (message: string) => {
    return toast.loading(message, {
      duration: Infinity,
    });
  }
}; 