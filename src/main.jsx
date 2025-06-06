import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";

const queryClient = new QueryClient();
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster as ShadToaster } from "sonner";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <HotToaster />
      <ShadToaster />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
  // </StrictMode>
);
