import { Card } from "../../components/Card";
import { useState } from "react";
import { Footer } from "../../components/Footer";
import { mockData } from "../../mock";
import ModalCreateAd from "../../components/ModalCreateAd";

export const AdvertiserProfile = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 8;
  const totalPages = Math.ceil(mockData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = mockData.slice(indexOfFirstCard, indexOfLastCard);

  const toggleModal = () => setIsOpenModal(!isOpenModal);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="bg-brand1 h-[357px]">
        <div className="bg-grey10 h-auto w-11/12 mx-auto max-w-[1240px] transform translate-y-[100px] pl-[28px] pt-[40px] rounded pr-[30px] pb-[42px] mb-[200px]">
          <div className="bg-purple-500 w-[104px] h-[104px] rounded-full">
            <p className="text-white text-4xl flex items-center justify-center h-full">
              SL
            </p>
          </div>
          <div className="flex mb-[24px] mt-[24px]">
            <h3 className="text-xl font-bold mr-3">Samuel Leão</h3>
            <div className="text-sm h-8 font-600 w-28 bg-brand4 text-brand1 flex justify-center items-center rounded">
              Anunciante
            </div>
          </div>
          <p className="mt-2 text-grey2 font-400 leading-7 text-justify">
            Lorem ipsum paranaue paranaue paraná, paranauê paranauê paraná,
            teste testando, testa, testando teste grande, testa, testando, um
            mais um nem sempre é igual a 2.
          </p>
          <button
            className="mt-[39px] px-4 py-2 rounded-md border-2 border-brand1 text-brand1 bg-transparent"
            onClick={toggleModal}
          >
            Criar anúncio
          </button>
        </div>
      </div>
      <div className="bg-grey8 h-auto flex flex-col items-center">
        <div className="max-w-[1400px] bg-grey8 flex flex-col pl-[28px] maxsm:w-full">
          <h2 className="text-[24px] font-bold pt-[250px] md:pt-[200px] self-start">
            Anúncios
          </h2>
          <ul className="flex flex-row flex-wrap gap-3 overflow-scroll md:overflow-auto items-center maxsm:mt-[63px] md:mt-[80px] pb-[90px] maxsm:flex-nowrap maxsm:overflow-auto ">
            {currentCards.map((ad) => (
              <Card
                key={ad.id}
                brand={ad.brand}
                description={ad.description}
                fipe_table={ad.fipe_table}
                fuel={ad.fuel}
                id={ad.id}
                is_active={"none"}
                mileage={ad.mileage}
                name={ad.name}
                seller={ad.seller}
                value={ad.value}
                year={ad.year}
              />
            ))}
          </ul>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center space-x-4 align-end md:h-[200px] md:flex md:justify-center md:items-center lg:min-w-[768px] bg-grey8 w-full">
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
        {isOpenModal && <ModalCreateAd toggleModal={toggleModal} />}
        <div style={{ width: "100%" }}>
          <Footer />
        </div>
      </div>
    </>
  );
};
