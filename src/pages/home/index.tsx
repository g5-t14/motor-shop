import { Card } from "../../components/Card";
import { useState } from "react";
import { Footer } from "../../components/Footer";
import { mockData } from "../../mock";
import { ModalFilterTask } from "../../components/ModalFilter";
import AsideHome from "./components/Aside";

export const Home = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  return (
    <>
      <div className="container mx-auto pl-4 pr-4 h-full flex flex-col justify-between items-center">
        <div className="flex mx-auto justify-center pt-[55px]">
          <aside className="w-[454px] flex-shrink-0 hidden lg:block">
            <AsideHome />
          </aside>
          <main className="flex-1 max-w-1100 mx-auto">
            <ul className="flex flex-wrap gap-12">
              {mockData.map((ad) => (
                <Card
                  brand={ad.brand}
                  description={ad.description}
                  fipe_table={ad.fipe_table}
                  fuel={ad.fuel}
                  id={ad.id}
                  is_active={ad.is_active}
                  mileage={ad.mileage}
                  name={ad.name}
                  seller={ad.seller}
                  value={ad.value}
                  year={ad.year}
                />
              ))}
            </ul>
          </main>
        </div>

        <button
          className="w-[320px] h-[60px] my-20 rounded-2xl flex-grow-0 lg:hidden bg-brand1 
        border-brand1 text-white hover:bg-brand2 
        font:bold hover:border-brand2 "
          onClick={toggleModal}
        >
          Filtros
        </button>
        {isOpenModal && <ModalFilterTask toggleModal={toggleModal} />}
      </div>

      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};
