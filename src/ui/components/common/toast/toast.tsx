import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { clearLoginError } from "../../../../core/store/authSlice/authSlice";
import { clearError } from "../../../../core/store/errorSlice/errorSlice";
import { useAppSelector, useAppDispatch } from "../../../../core/store/hooks";
import { clearPopUpError } from "../../../../core/store/postPopUpSlice/postPopUpSlice";

const Toast: React.FC = () => {
  const error = useAppSelector((state) => state.error.error);
  const popUpError = useAppSelector((state) => state.popUp.error);
  const loginError = useAppSelector((state) => state.popUp.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (popUpError) {
      toast.error(popUpError);
      dispatch(clearPopUpError());
    }
    if (loginError) {
      toast.error(loginError);
      dispatch(clearLoginError());
    }
  }, [dispatch, error, popUpError, loginError]);

  return <ToastContainer />;
};

export default Toast;
