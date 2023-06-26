import { Link, useParams } from "react-router-dom";
import { PurpleButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { useEffect, useState } from "react";
import { apiLocal } from "../../services/api";
import { Header } from "../../components/Header";

interface CarPictures {
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

export interface Comments {
  user_id: number;
  id: number;
  description: string;
  createAt: Date;
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
  commets: Comments;
}

export const Product = () => {
  const { id } = useParams();
  const [carPictures, setCarPictures] = useState<string[]>([]);
  const [car, setCar] = useState<CarProps>();

  useEffect(() => {
    (async () => {
      const response = await apiLocal.get<CarProps>(`ads/${id}`);
      const carPictures = response.data.pictures;
      const picturesFiltered = Object.values(carPictures).filter(
        (element) => element != null
      );
      setCarPictures(picturesFiltered);
      setCar(response.data);
    })();
  }, []);

  const formatAdTitle = (brand: string, name: string): string => {
    const formatedBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
    const formatedName =
      name.charAt(0).toUpperCase() + name.split(" ")[0].slice(1);
    return `${formatedBrand} - ${formatedName}`;
  };

  return (
    <>
      <Header />
      <div className="bg-duo md:bg-duo-big">
        <main className="py-[45px] px-3 flex flex-wrap max-w-[1240px] mx-auto justify-center midson:justify-between">
          {car ? (
            <>
              <div className="md:max-w-[750px] w-full">
                <div
                  className="md:max-w-[750px] md:h-[355px] max-h-[355px] w-full h-[355px] rounded flex items-center bg-grey10 mb-[17px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${car?.cover_img})` }}
                ></div>

                <section className="rounded flex flex-col gap-8 px-7 py-9 bg-grey10 mb-[15px] w-full">
                  <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">
                    {car
                      ? formatAdTitle(car.brand, car.model)
                      : "Title not found!"}
                  </h2>
                  <div className="flex gap-3">
                    <span className="pt-1 pb-1 pl-2 pr-2 bg-brand4 text-brand1 rounded font-medium text-[14px] leading-6">
                      {car.mileage}KM
                    </span>
                    <span className="pt-1 pb-1 pl-2 pr-2 bg-brand4 text-brand1 rounded font-medium text-[14px] leading-6">
                      {car.year}
                    </span>
                  </div>
                  <span className="font-lexend text-[16px] leading-5 font-medium">
                    {car.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  <PurpleButton children="Comprar" size="medium" />
                </section>

                <section className="rounded flex flex-col gap-8 px-7 py-9 bg-grey10 mb-[15px] w-full">
                  <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">
                    Descrição
                  </h2>
                  <p className="text-grey2 font-normal text-[16px] leading-[28px] min-w-[100%] w-full">
                    {car.description}
                  </p>
                </section>
              </div>

              <div className="md:max-w-[750px] midson:max-w-[440px]">
                <section className="rounded flex flex-col gap-8 px-7 py-9 bg-grey10 mb-[52px]">
                  <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">
                    Fotos
                  </h2>
                  <ul className="flex flex-wrap justify-evenly gap-3">
                    {carPictures.map((element, index) => {
                      return (
                        <li
                          key={index}
                          className="w-[90px] max-w-[100%] h-[90px] rounded"
                        >
                          <img
                            className="w-full h-full rounded"
                            src={element}
                            alt=""
                          />
                        </li>
                      );
                    })}
                  </ul>
                </section>
                <section className="flex flex-col gap-7 px-7 py-10 items-center rounded bg-grey10 mb-[18px]">
                  <div
                    className="rounded-full w-[77px] h-[77px] flex items-center justify-center"
                    style={{ backgroundColor: `${car.user_seller.user_color}` }}
                  >
                    <span className="text-white font-medium text-[27px] leading-[40px]">
                      {car.user_seller.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">
                    {car.user_seller.name}
                  </h2>
                  <p className="text-grey2 font-normal text-[16px] leading-[28px] truncate whitespace-normal line-clamp-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Rerum doloribus a, ullam velit dolorum consequatur vel,
                    dolores, distinctio provident excepturi voluptas. Atque
                    dolores ipsam tempore corporis consequatur quia assumenda
                    voluptatum.
                  </p>
                  <Link
                    className="bg-grey0 border-grey0 hover:bg-grey1 hover:border-grey1 btn-big flex items-center"
                    to={`/advertiser/${car.user_seller.id}`}
                  >
                    Ver todos os anúncios
                  </Link>
                </section>
              </div>
              <div className="md:max-w-[750px]">
                <section className="flex flex-col gap-6 px-7 py-9 rounded bg-grey10 mb-[42px]">
                  <h1 className="font-semibold text-[20px] leading-[25px] font-lexend">
                    Comentários
                  </h1>
                  <ul className="flex flex-col gap-11">
                    <li className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-purple-600 w-8 h-8 flex items-center justify-center">
                          {
                            // seller.charAt(0).toUpperCase()
                          }
                          <span className="text-white font-medium text-[14px]">
                            G
                          </span>
                        </div>
                        <span className="text-grey2 font-medium text-[14px] leading-6">
                          {
                            //seller
                          }
                          Giovanni Perotto
                        </span>
                        <div className="bg-grey4 w-1 h-1 rounded-full"></div>
                        <span className="text-grey3 text-[12px] leading-6 font-normal">
                          há 3 dias
                        </span>
                      </div>
                      <p className="font-normal text-[14px] leading-6 text-grey2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Veritatis ab tempore maxime earum esse, atque
                        libero nostrum suscipit voluptatem possimus temporibus
                        tenetur numquam consequatur cupiditate doloremque
                        perspiciatis nesciunt ratione voluptate!
                      </p>
                    </li>
                  </ul>
                </section>

                <section className="px-[26px] py-10 bg-grey10 rounded">
                  <form className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-purple-600 w-8 h-8 flex items-center justify-center">
                        <span className="text-white font-medium text-[14px]">
                          G
                        </span>
                      </div>
                      <span className="text-grey2 font-medium text-[14px] leading-6">
                        Giovanni Perotto
                      </span>
                    </div>
                    <textarea
                      className="border-[1.5px] rounded border-grey7 px-4 py-3 min-h-[128px]"
                      placeholder="Digite seu comentário"
                    />
                    <PurpleButton children="Comentar" size="medium" />
                    <ul className="flex flex-wrap gap-2">
                      <li className="px-3 rounded-3xl text-grey3 bg-grey7 font-medium text-[12px] leading-6">
                        Gostei muito!
                      </li>
                      <li className="px-3 rounded-3xl text-grey3 bg-grey7 font-medium text-[12px] leading-6">
                        Incrível!
                      </li>
                      <li className="px-3 rounded-3xl text-grey3 bg-grey7 font-medium text-[12px] leading-6">
                        Recomendarei para meus amigos!
                      </li>
                    </ul>
                  </form>
                </section>
              </div>
            </>
          ) : (
            <h2 className="h-[80vh]">Não encontrado</h2>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};
