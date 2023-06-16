import { RoutesMain } from "./routes";
import "./index.css";
import { RegisterProvider } from "./Context/RegisterContext";
import { Header } from "./components/Header";
import { CarProvider } from "./providers/CarProvider";

function App() {
  return (
    <>
      <Header />
      <CarProvider>
        <RegisterProvider>
          <RoutesMain />
        </RegisterProvider>
      </CarProvider>
    </>
  );
}

export default App;
