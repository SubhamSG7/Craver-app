import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AllRoutes } from "./Routes/route.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AllRoutes>
      <App />
    </AllRoutes>
  </Provider>
);
