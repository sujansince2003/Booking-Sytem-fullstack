import { useState } from "react";
import { AppContext } from "./AppContext";
import type { toastMsgType } from "./AppContext";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import { validateTokenAPIClient } from "../apiClient/validateToken-api-client";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<toastMsgType | undefined>(undefined);
  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: () => validateTokenAPIClient(),
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMsg) => {
          setToast(toastMsg);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          toastmsg={toast.toastmsg}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
