import { AppContext } from "./AppContext";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMsg) => {
          console.log(toastMsg);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
