import { Link, useParams } from "react-router-dom";
import { GreyButton, PurpleButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { useEffect, useState } from "react";
import { apiLocal } from "../../services/api";
import { Header } from "../../components/Header";
import { CommentCard } from "../../components/Comment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterCommentData,
  registerCommentSchema,
} from "../../validations/comment";
import { useAuth } from "../../hooks/useAuth";
import { CarImgModal } from "../../components/CarImgModal/carImgModal";

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
  phone: string;
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

export interface CommentUser {
  id: number;
  name: string;
  user_color: string;
}

export interface Comments {
  id: number;
  description: string;
  created_at: string;
  user: CommentUser;
  edited: boolean;
  comments: Comments[];
  setComments: (value: Comments[]) => void;
}

export const Product = () => {
  const [actualImg, setActualImg] = useState("");
  const [imgModal, setImgModal] = useState(false);

  const closeModal = () => {
    setImgModal(!imgModal);
  };

  const getInitials = (name: string) => {
    if (name) {
      const names = name.split(" ");
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      } else if (names.length > 1) {
        const firstInitial = names[0].charAt(0).toUpperCase();
        const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
      }
    }
    return "";
  };

  const { register, handleSubmit } = useForm<RegisterCommentData>({
    resolver: zodResolver(registerCommentSchema),
    //mode: "all",
  });

  const { isUserLoggedIn, userData } = useAuth();
  const { id } = useParams();
  const [carPictures, setCarPictures] = useState<string[]>([]);
  const [car, setCar] = useState<CarProps>();
  const [comments, setComments] = useState<Comments[]>([]);
  const [commentData, setCommentData] = useState<string>();

  useEffect(() => {
    (async () => {
      const response = await apiLocal.get<CarProps>(`ads/${id}`);
      const carPictures = response.data.pictures;
      const picturesFiltered = Object.values(carPictures).filter(
        (element) => element != null
      );
      setCarPictures(picturesFiltered);
      setCar(response.data);
      const responseComments = await apiLocal.get(`comments/${id}`);
      setComments(responseComments.data.comments);
    })();
  }, []);

  const formatAdTitle = (brand: string, name: string): string => {
    const formatedBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
    const formatedName =
      name.charAt(0).toUpperCase() + name.split(" ")[0].slice(1);
    return `${formatedBrand} - ${formatedName}`;
  };

  const addInComment = (eventTarget: HTMLButtonElement) => {
    if (commentData) {
      setCommentData(commentData + " " + eventTarget.innerText);
    } else {
      setCommentData(eventTarget.innerText);
    }
    const textarea = document.getElementById(
      "comment_area"
    ) as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.focus();
    }
    document.getElementById("comment_area")!.focus();
  };

  const registerComment = async (commentDataToSend: RegisterCommentData) => {
    if (commentDataToSend.description.length === 0) {
      return;
    }

    try {
      const response = await apiLocal.post(
        `/comments/${id}`,
        commentDataToSend
      );
      setComments([...comments, response.data]);
      setCommentData("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyClick = (car: CarProps) => {
    const phoneNumber = car.user_seller.phone;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Eu+gostei+do+seu+produto+${car.model}+da+marca+${car.brand}.+Podemos+conversar%3F`;
    window.open(whatsappUrl, "_blank");
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
                  <PurpleButton
                    children="Comprar"
                    size="medium"
                    onClick={() => handleBuyClick(car)}
                  />
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

              <div className="md:max-w-[750px] midson:max-w-[440px] w-full">
                <section className="rounded flex flex-col gap-8 px-7 py-9 bg-grey10 mb-[52px]">
                  <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">
                    Fotos
                  </h2>
                  <ul className="flex flex-wrap justify-evenly gap-3">
                    {carPictures.map((element, index) => {
                      return (
                        <li
                          key={index}
                          className="h-[60px] rounded hover:opacity-70 cursor-pointer"
                          onClick={() => {
                            setActualImg(element);
                            setImgModal(true);
                          }}
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
                      {getInitials(car.user_seller.name)}
                    </span>
                  </div>
                  <h2 className="text-[20px] leading-[25px] font-semibold font-lexend text-grey1">
                    {car.user_seller.name}
                  </h2>
                  <p className="text-grey2 font-normal text-[16px] leading-[28px] truncate whitespace-normal line-clamp-3 w-full text-center">
                    {car.user_seller.description}
                  </p>
                  <Link
                    className="bg-grey0 border-grey0 hover:bg-grey1 hover:border-grey1 btn-big flex items-center"
                    to={`/advertiser/${car.user_seller.id}`}
                  >
                    Ver todos os anúncios
                  </Link>
                </section>
              </div>

              <div className="md:max-w-[750px] w-full">
                <section className="flex flex-col gap-6 px-7 py-9 rounded bg-grey10 mb-[42px]">
                  <h1 className="font-semibold text-[20px] leading-[25px] font-lexend">
                    Comentários
                  </h1>
                  <ul className="flex flex-col gap-11">
                    {comments.map((comment) => (
                      <CommentCard
                        id={comment.id}
                        user_color={comment.user.user_color}
                        description={comment.description}
                        posted_at={comment.created_at}
                        username={comment.user.name}
                        owner_id={comment.user.id}
                        edited={comment.edited}
                        key={comment.id}
                        comments={comments}
                        setComments={setComments}
                      />
                    ))}
                  </ul>
                </section>
                <section className="px-[26px] py-10 bg-grey10 rounded">
                  <form
                    onSubmit={handleSubmit(registerComment)}
                    className="flex flex-col gap-6"
                  >
                    {isUserLoggedIn && (
                      <div className="flex items-center gap-2">
                        <div
                          className="rounded-full w-8 h-8 flex items-center justify-center"
                          style={{ backgroundColor: userData.user_color }}
                        >
                          <span className="text-white font-medium text-[14px]">
                            {getInitials(userData.name)}
                          </span>
                        </div>
                        <span className="text-grey2 font-medium text-[14px] leading-6">
                          {userData.name}
                        </span>
                      </div>
                    )}
                    <textarea
                      className="border-[1.5px] rounded border-grey7 px-4 py-3 min-h-[128px] resize-none"
                      placeholder="Digite seu comentário"
                      value={commentData}
                      id="comment_area"
                      {...register("description")}
                      onChange={(e) => setCommentData(e.target.value)}
                    />
                    {isUserLoggedIn ? (
                      <PurpleButton
                        type="submit"
                        children="Comentar"
                        size="medium"
                      />
                    ) : (
                      <GreyButton children="Comentar" size="medium" disabled />
                    )}
                    <ul className="flex flex-wrap gap-2">
                      <li className="px-3 rounded-3xl text-grey3 bg-grey7 font-medium text-[12px] leading-6">
                        <button
                          type="button"
                          onClick={(e) => {
                            const button = e.target as HTMLButtonElement;
                            addInComment(button);
                          }}
                        >
                          Gostei muito!
                        </button>
                      </li>
                      <li className="px-3 rounded-3xl text-grey3 bg-grey7 font-medium text-[12px] leading-6">
                        <button
                          type="button"
                          onClick={(e) => {
                            const button = e.target as HTMLButtonElement;
                            addInComment(button);
                          }}
                        >
                          Incrível!
                        </button>
                      </li>
                      <li className="px-3 rounded-3xl text-grey3 bg-grey7 font-medium text-[12px] leading-6">
                        <button
                          type="button"
                          onClick={(e) => {
                            const button = e.target as HTMLButtonElement;
                            addInComment(button);
                          }}
                        >
                          Recomendarei para meus amigos!
                        </button>
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

        {imgModal ? (
          <CarImgModal img={actualImg} closeModal={closeModal} />
        ) : null}
      </div>
    </>
  );
};
