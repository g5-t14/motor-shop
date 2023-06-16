import { RoutesMain } from "./routes";
import "./index.css";
import { Header } from "./components/Header";
import { CarProvider } from "./providers/CarProvider";
import { RegisterProvider } from "./Context/RegisterContext";

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
