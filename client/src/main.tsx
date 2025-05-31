import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryClientProviderWrapper from "./providers/QueryClientProvider.tsx";
import { AppContextProvider } from "./contexts/AppContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProviderWrapper>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProviderWrapper>
  </StrictMode>
);
