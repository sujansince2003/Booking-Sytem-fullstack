// defining the context type

import { createContext, useContext } from "react";

export type toastMsgType = {
  toastmsg: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextType = {
  showToast: (toastMsg: toastMsgType) => void;
  isLoggedIn: boolean;
};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
