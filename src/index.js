import React from "react";
import ReactDOM from "react-dom";
import Home from "./containers/Home";

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
