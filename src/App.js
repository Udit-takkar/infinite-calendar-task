import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Calendar from "./components/Calendar";

function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Calendar} />
      </Router>
    </>
  );
}

export default App;
