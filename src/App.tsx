import React from 'react';
import './App.css';
import {OvenStateContextProvider} from "./context/OvenStateContext";
import {OvenView} from "./oven/OvenView";

function App() {
  return (
    <div className="App">
      <h1>Anova Oven</h1>
      <OvenStateContextProvider>
        <OvenView />
      </OvenStateContextProvider>
    </div>
  )
}

export default App
