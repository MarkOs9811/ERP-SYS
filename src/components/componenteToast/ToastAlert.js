import { toast } from "react-toastify";

const ToastAlert = (type, message) => {
    const options = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    if (type === "success") {
        toast.success(message, options);
    } else if (type === "error") {
        toast.error(message, options);
    } else if (type === "info") {
        toast.info(message, options);
    } else if (type === "warning") {
        toast.warning(message, options);
    }
};

export default ToastAlert;
