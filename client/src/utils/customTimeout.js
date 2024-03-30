import {toast} from "sonner";
const setNavigateTimeout = async (navigate, path, delay) => {
  setTimeout(() => {
    navigate(path);
  }, delay);
};
const setToastTimeout = async (type, msg, delay) => {
  setTimeout(() => {
    if (type == "success") {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  }, delay);
};

export {setNavigateTimeout, setToastTimeout};
