import React from "react";
import dataJson from "./data.json";
import { ChartComponent } from "./ChartComponent";

function App() {
  return <ChartComponent data={dataJson}></ChartComponent>;
}

export default App;
