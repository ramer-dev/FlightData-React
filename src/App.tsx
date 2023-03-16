import React from "react";
import "./App.css";
import {hot} from 'react-hot-loader'
import MapboxMap from "./components/core/MapboxMap";

const App = () => {
  return (
    <div className="App">
      <header className="App-header" />
      <MapboxMap/>
    </div>
  );
};

export default hot(module)(App);
