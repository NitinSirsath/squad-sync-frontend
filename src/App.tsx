import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>

      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
