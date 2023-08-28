import React from "react";
import "./App.css";
import {
  ServiceContextProvider,
  defaultServices,
} from "./Context/ServiceContext";

function App() {
  return (
    <ServiceContextProvider {...defaultServices}>
      <div className="app" data-testid="app"></div>
    </ServiceContextProvider>
  );
}

export default App;
