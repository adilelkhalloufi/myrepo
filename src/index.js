import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Routers from "./Routes";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routers />
    </Provider>
  </React.StrictMode>
);
