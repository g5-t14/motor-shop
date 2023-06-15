import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutesMain } from "./routes";
import "./index.css";
import { Header } from "./components/Header";
import { CarProvider } from "./providers/CarProvider";
function App() {
  return (
    <>
       <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <CarProvider>
        <RoutesMain />
      </CarProvider>
    </>
  );
}

export default App;
