import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client"
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container)
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //</React.StrictMode>
)

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// import { render } from 'react-dom';
// const container = document.getElementById('app');
// render(<App tab="home" />, container);

// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);