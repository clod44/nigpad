import { createContext, useContext } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);
let notify = () => { };

const ToastProvider = ({ children }) => {
    const defaultOptions = {
        transition: Slide,
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: true,
        type: "info",
        theme: "colored",
        promise: null,
        pending: {
            render() {
                return "loading"
            },
        },
        success: {
            render({ data }) {
                return `${data}`
            },
        },
        error: {
            render({ data }) {
                return `Failed: ${data}`
            }
        }

    };

    notify = (message, options = {}) => {
        const finalOptions = {
            ...defaultOptions,
            ...options,
        };

        if (finalOptions.promise) {
            // Ensure the promise result is returned so it can be awaited
            return toast.promise(
                finalOptions.promise,
                {
                    pending: finalOptions.pending,
                    success: finalOptions.success,
                    error: finalOptions.error
                },
                finalOptions
            );
        } else {
            toast(message, finalOptions);
            return null;
        }
    };




    return (
        <ToastContext.Provider value={{ notify }}>
            {children}
            <ToastContainer limit={3} />
        </ToastContext.Provider>
    );
};

export { ToastProvider, notify };
