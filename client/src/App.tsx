import "./App.css";
import { Button } from "./components/ui/button";
import { useTheme } from "./components/themeProvider/ThemeProvider";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const { setTheme } = useTheme();
  return (
    <>
      

      <Sidebar />
    </>
  );
}

export default App;
