import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { mockData } from "../../mock";
import { ModalFilterTask } from "../../components/ModalFilter";
import AsideHome from "./components/Aside";

export const Home = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const totalPages = Math.ceil(mockData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = mockData.slice(indexOfFirstCard, indexOfLastCard);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="pl-4 pr-4 h-full flex flex-col justify-between items-center">
        <div className="w-full flex py-[55px]">
          <aside className="w-[454px] hidden md:block">
            <AsideHome />
          </aside>
          <main className="w-full md:overflow-hidden">
            <ul className="flex gap-3 w-full overflow-scroll md:overflow-hidden md:flex-wrap md:gap-12">
              {currentCards.map((ad) => (
                <Card
                  key={ad.id}
                  brand={ad.brand}
                  description={ad.description}
                  fipe_table={ad.fipe_table}
                  fuel={ad.fuel}
                  id={ad.id}
                  // (ad.is_active).toString()
                  is_active={"none"}
                  mileage={ad.mileage}
                  name={ad.name}
                  seller={ad.seller}
                  value={ad.value}
                  year={ad.year}
                />
              ))}
            </ul>
            {totalPages > 1 && (
              <div className="flex justify-center space-x-4">
                {currentPage > 1 && (
                  <button
                    onClick={previousPage}
                    className="text-[24px] text-brand2 font-medium"
                  >
                    &lt; Anterior
                  </button>
                )}
                <span className="font-bold text-grey3 text-[24px]">
                  {currentPage}
                </span>{" "}
                <span className="font-medium text-grey3 opacity-50 text-[24px]">
                  de {totalPages}
                </span>
                {currentPage < totalPages && (
                  <button
                    onClick={nextPage}
                    className="text-brand2 font-medium text-[24px]"
                  >
                    Seguinte &gt;
                  </button>
                )}
              </div>
            )}
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
