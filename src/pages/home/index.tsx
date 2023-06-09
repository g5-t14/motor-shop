import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { ModalFilterTask } from "../../components/ModalFilter";
import AsideHome from "./components/Aside";
import { HeaderPhoto } from "../../components/HeaderPhoto";
import { Header } from "../../components/Header";
import { useCar } from "../../hooks/useCar";
import { useNavigate } from "react-router-dom";
import { NoAds } from "../../components/NoAds";

export interface CarPictures {
  picture_1: string;
  picture_2: string;
  picture_3: string | null;
  picture_4: string | null;
  picture_5: string | null;
  picture_6: string | null;
}

export interface CarSeller {
  id: number;
  name: string;
  user_color: string;
  description: string;
}

export interface CarProps {
  id: number;
  brand: string;
  model: string;
  year: string;
  fuel: string;
  mileage: string;
  color: string;
  fipe_table: number;
  price: number;
  description: string;
  cover_img: string;
  is_active: boolean;
  pictures: CarPictures;
  user_seller: CarSeller;
}

export const Home = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { allCars } = useCar();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const toggleModal = () => setIsOpenModal(!isOpenModal);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const totalPages = Math.ceil(allCars.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allCars
    .filter((ad) => ad.is_active === true)
    .slice(indexOfFirstCard, indexOfLastCard);
  const navigate = useNavigate();
  const registerHandler = () => {
    navigate("/register");
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    if (isOpenModal && windowWidth > 767) {
      setIsOpenModal(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, isOpenModal]);

  return (
    <>
      <Header />
      <HeaderPhoto />
      <div className="pl-4 pr-4 h-full flex flex-col justify-between items-center">
        <div className="w-full flex py-[55px]">
          <aside className="w-[454px] hidden md:block">
            <AsideHome />
          </aside>
          <main className="w-full md:overflow-hidden">
            <ul className="flex gap-3 w-full overflow-scroll md:overflow-hidden md:flex-wrap md:gap-12">
              {currentCards.filter((ad) => ad.is_active).length === 0 ||
              currentCards.length === 0 ? (
                <NoAds
                  text="seja um dos nossos anunciantes"
                  click={registerHandler}
                />
              ) : (
                currentCards
                  .filter((ad) => ad.is_active)
                  .map((ad) => (
                    <Card
                      key={ad.id}
                      id={ad.id}
                      brand={ad.brand}
                      model={ad.model}
                      year={ad.year}
                      fuel={ad.fuel}
                      mileage={ad.mileage}
                      color={ad.color}
                      fipe_table={ad.fipe_table}
                      price={ad.price}
                      description={ad.description}
                      cover_img={ad.cover_img}
                      is_active={"none"}
                      user_seller={ad.user_seller}
                    />
                  ))
              )}
            </ul>
          </main>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center space-x-4 align-end md:h-[200px] md:flex md:justify-center md:items-center lg:min-w-[768px]">
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

        {windowWidth <= 767 && (
          <button
            className="w-[320px] h-[60px] my-20 rounded-2xl flex-grow-0 lg:hidden bg-brand1 
          border-brand1 text-white hover:bg-brand2 
          font:bold hover:border-brand2"
            onClick={toggleModal}
          >
            Filtros
          </button>
        )}
        {isOpenModal && <ModalFilterTask toggleModal={toggleModal} />}
      </div>

      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};
