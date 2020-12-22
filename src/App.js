import logo from "./logo.svg";
import "./App.css";
import BillForm from "./components/BillForm";
import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { cyan, deepOrange } from "@material-ui/core/colors/";

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: cyan,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <span className="bg-img"></span>
        <Header title="Tuk Tuk" />
        <BillForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
