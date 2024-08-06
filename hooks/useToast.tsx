import { useEffect, useState } from "react";

export default function useToast() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<string>("");
  const [toastType, setToastType] = useState<string>("");

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  const handleToast = (
    T_show: boolean,
    T_info: string,
    T_type: string
  ): void => {
    setShowToast(T_show);
    setToastInfo(T_info);
    setToastType(T_type);
  };

  return {
    showToast,
    toastInfo,
    toastType,
    handleToast,
  };
}
