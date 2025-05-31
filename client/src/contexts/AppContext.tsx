// defining the context type

import { createContext, useContext } from "react";

type toastMsgType = {
  toastmsg: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextType = {
  showToast: (toastMsg: toastMsgType) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
