import { Card } from "../../components/Card";
import { Footer } from "../../components/Footer";
import { mockData } from "../../mock";
import AsideHome from "./components/Aside";

export const Home = () => {
  return (
    <>
      <div className="container mx-auto pl-4 pr-4 h-full flex flex-col justify-between items-center">
        <div className="flex mx-auto justify-center pt-[55px]">
          <aside className="w-[454px] flex-shrink-0 hidden lg:block">
            <AsideHome />
          </aside>
          <main className="flex-1 max-w-1100 mx-auto">
            <ul className="flex flex-wrap gap-12">
              {mockData.map(ad => <Card brand={ad.brand} description={ad.description} fipe_table={ad.fipe_table} fuel={ad.fuel} id={ad.id} is_active={ad.is_active} mileage={ad.mileage} name={ad.name} seller={ad.seller} value={ad.value} year={ad.year} />)}
            </ul>
          </main>
        </div>

      </div>
      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};
