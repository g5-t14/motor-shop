import {
  BlackButtonBig,
  BlackButtonMedium,
} from "../../components/Button/black";
import { Card } from "../../components/Card";
import { Footer } from "../../components/Footer";
import AsideHome from "./components/Aside";

export const Home = () => {
  return (
    <>
      <div className="container mx-auto pl-4 pr-4 h-full flex flex-col justify-between items-center">
        <h3>Home</h3>
        <div className="flex mx-auto justify-center">
          <aside className="w-[454px] flex-shrink-0 hidden lg:block">
            <AsideHome />
          </aside>
          <main className="flex-1 max-w-1100 mx-auto">
            <div className="flex flex-wrap">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </main>
        </div>
        <div className="mt-4">
          <BlackButtonBig>Text Button</BlackButtonBig>
        </div>
        <div className="mt-2">
          <BlackButtonMedium>Text Button</BlackButtonMedium>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};
