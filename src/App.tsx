import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { SocketProvider } from "./context/SocketContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
