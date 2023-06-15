import "react-toastify/dist/ReactToastify.css";
import { RoutesMain } from "./routes";
import "./index.css";
import { Header } from "./components/Header";
import { CarProvider } from "./providers/CarProvider";
function App() {
  return (
    <>
      <Header />
      <CarProvider>
        <RoutesMain />
      </CarProvider>
    </>
  );
}

export default App;
