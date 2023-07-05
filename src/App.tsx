import { RoutesMain } from "./routes";
import "./index.css";
import { RegisterProvider } from "./Context/RegisterContext";
import { CarProvider } from "./providers/CarProvider";
import { AuthProvider } from "./Context/AuthContexts";
import { UserProvider } from "./Context/UserContexts";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <CarProvider>
            <RegisterProvider>
              <RoutesMain />
              <ScrollToTop />
            </RegisterProvider>
          </CarProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
