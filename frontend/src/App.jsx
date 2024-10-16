import { ToastContainer } from "react-toastify";
import Wrapper from "./Components/Wrapper";

function App() {
  return (
    <>
      <Wrapper />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        style={{ backgroundColor: "#333", color: "#fff", borderRadius: "8px" }}
        bodyStyle={{ fontSize: "16px", color: "#fff" }}
      />
    </>
  );
}

export default App;
