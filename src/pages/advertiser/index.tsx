import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import ModalCreateAd from "../../components/ModalCreateAd";
import { apiLocal } from "../../services/api";
import { UserData } from "../../validations/user";
import { useParams } from "react-router-dom";
import { CarProps } from "../home";
import { Header } from "../../components/Header";
import { CardAdvertiser } from "./components/cardAdvertiser";
import { useCar } from "../../hooks/useCar";
import ModalEditAds from "../../components/ModalEditAd";

export const AdvertiserProfile = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { adArray, setAdArray } = useCar();
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setUserInfo] = useState<UserData>({
    name: "",
    description: "",
    id: 0,
    user_color: "",
    number: "",
    email: "",
    password: "",
    cpf: "",
    phone: "",
    birthdate: "",
    is_seller: false,
    cep: "",
    state: "",
    city: "",
    street: "",
    complement: "",
  });

  const cardsPerPage = 16;
  const totalPages = Math.ceil(adArray.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = adArray?.slice(indexOfFirstCard, indexOfLastCard);
  const { id } = useParams();
  const userId = localStorage.getItem("user-id");
  const toggleModal = () => setIsOpenModal(!isOpenModal);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const { modalEditAds, deleteModal } = useCar();

  useEffect(() => {
    (async () => {
      try {
        const response = await apiLocal.get(`/ads/seller/${id}`);
        const ad = response.data;
        setAdArray(ad);
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const response = await apiLocal.get(`/users/${id}`);
        setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setAdArray, id]);
  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else if (names.length > 1) {
      const firstInitial = names[0].charAt(0).toUpperCase();
      const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
      return `${firstInitial}${lastInitial}`;
    }
    return "";
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const bgColor = userInfo?.user_color;

  return (
    <>
      <Header />
      <div className="bg-brand1 h-[357px]">
        <div
          key={userInfo?.id}
          className="bg-grey10 h-auto min-h-[370px] w-11/12 mx-auto max-w-[1240px] transform translate-y-[100px] pl-[28px] pt-[40px] rounded pr-[30px] pb-[42px] mb-[200px]"
        >
          <div
            className="bg-purple-500 w-[104px] h-[104px] rounded-full"
            style={{ backgroundColor: bgColor }}
          >
            <p className="text-white text-4xl flex items-center justify-center h-full">
              {getInitials(userInfo?.name)}
            </p>
          </div>
          <div className="flex mb-[24px] mt-[24px]">
            <h3 className="text-xl font-bold mr-3">{userInfo?.name}</h3>
            <div className="text-sm h-8 font-600 w-28 bg-brand4 text-brand1 flex justify-center items-center rounded">
              Anunciante
            </div>
          </div>
          <p className="mt-2 text-grey2 font-400 leading-7 text-justify">
            {userInfo?.description}
          </p>
          {userId === id && (
            <button
              className="mt-[39px] px-4 py-2 rounded-md border-2 border-brand1 text-brand1 bg-transparent"
              onClick={toggleModal}
            >
              Criar anúncio
            </button>
          )}
        </div>
      </div>
      <div className="bg-grey8 h-auto flex flex-col items-center">
        <div className="max-w-[1400px] bg-grey8 flex flex-col pl-[28px] maxsm:w-full">
          <ul className="flex flex-row flex-wrap gap-3 overflow-scroll md:overflow-auto items-center maxsm:mt-[200px] md:mt-[200px] pb-[90px] maxsm:flex-nowrap maxsm:overflow-auto justify-center">
            {adArray?.length > 0 ? (
              currentCards.map((ad) => {
                const isCurrentUserSeller =
                  Number(userId) === ad.user_seller.id;
                const isActiveAd = ad.is_active;

                if (isCurrentUserSeller || isActiveAd) {
                  return (
                    <CardAdvertiser
                      key={ad.id}
                      brand={ad.brand}
                      description={ad.description}
                      fipe_table={ad.fipe_table}
                      fuel={ad.fuel}
                      id={ad.id}
                      mileage={ad.mileage}
                      model={ad.model}
                      user_seller={ad.user_seller}
                      price={ad.price}
                      year={ad.year}
                      color={ad.color}
                      cover_img={ad.cover_img}
                      // Renderizar is_active somente para o user_seller
                      is_active={isCurrentUserSeller ? ad.is_active : undefined}
                    />
                  );
                }
                return null;
              })
            ) : (
              <p className="text-[40px]">Nenhum anúncio disponível.</p>
            )}
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
        {isOpenModal && (
          <ModalCreateAd toggleModal={toggleModal} setAds={setAdArray} />
        )}

        <div style={{ width: "100%" }}>
          <Footer />
        </div>
      </div>
      {modalEditAds ? <ModalEditAds /> : null}
    </>
  );
};
