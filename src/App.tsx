import { RoutesMain } from "./routes";
import "./index.css";
import { RegisterProvider } from "./Context/RegisterContext";
import { Header } from "./components/Header";
import { CarProvider } from "./providers/CarProvider";
import { AuthProvider } from "./Context/AuthContexts";
import { UserProvider } from "./Context/UserContexts";

function App() {
  return (
    <>
      <UserProvider>
        <AuthProvider>
          {/* <Header /> */}
          <CarProvider>
            <RegisterProvider>
              <RoutesMain />
            </RegisterProvider>
          </CarProvider>
        </AuthProvider>
      </UserProvider>
    </>
  );
}

export default App;
