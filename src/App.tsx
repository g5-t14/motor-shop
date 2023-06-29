import { RoutesMain } from "./routes";
import "./index.css";
import { RegisterProvider } from "./Context/RegisterContext";
import { CarProvider } from "./providers/CarProvider";
import { AuthProvider } from "./Context/AuthContexts";
import { UserProvider } from "./Context/UserContexts";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <CarProvider>
            <RegisterProvider>
              <RoutesMain />
            </RegisterProvider>
          </CarProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
