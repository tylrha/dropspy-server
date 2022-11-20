import { createRoot } from "react-dom/client"

import { AppRouter } from "./routes/react-routes";
import { LayoutProvider } from './features/Layout'
import { AuthProvider } from './features/Authentication'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./assets/global.scss";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const App = () => {
  return (
    <LayoutProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </AuthProvider>
    </LayoutProvider>
  )
}

const rootElement = document.getElementById("root") as HTMLElement
const root = createRoot(rootElement)

root.render(<App />)
