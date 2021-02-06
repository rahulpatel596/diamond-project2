import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TableComponent from "./components/TableComponent";
import LotList from "./components/LotList";

function App() {
  function UpdateTheme(e) {
    document.documentElement.classList.toggle("dark-mode");
  }
  return (
    <div className="App">
      <LotList />
    </div>
  );
}

export default App;
