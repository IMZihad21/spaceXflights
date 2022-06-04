import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "Redux/store";
import ThemeLayout from "Components/ThemeLayout";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/spaceXflights">
      <StoreProvider store={store}>
        <ThemeLayout>
          <App />
        </ThemeLayout>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
