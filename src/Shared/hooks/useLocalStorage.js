import { useState } from "react";
export const useLocalStorage = () => {
  const getToken = () => {
    const myToken = localStorage.getItem("AdminData");
    if (myToken) {
      return true;
    }
    return false;
  };
  const [getUserAsync, setUserAsync] = useState(getToken());

  const saveToken = (AdminData) => {
    localStorage.setItem("AdminData", JSON.stringify(AdminData.token));
    if (AdminData) {
      setUserAsync(AdminData);
    }
  };

  return {
    setUserAsync: saveToken,
    stopuser: getUserAsync,
    getUserAsync: getUserAsync,
  };
};
