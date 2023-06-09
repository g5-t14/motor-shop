import {
  BlackButtonBig,
  BlackButtonMedium,
} from "../../components/Button/black";
import { Card } from "../../components/Card";
import { Footer } from "../../components/Footer";

export const Home = () => {
  return (
    <div>
      <h3>Home</h3>
      <Card />
      <BlackButtonBig>Text Button</BlackButtonBig>
      <BlackButtonMedium>Text Button</BlackButtonMedium>
      <Footer />
    </div>
  );
};
