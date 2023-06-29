import { Link } from "react-router-dom";

interface CarSeller {
  id: number;
  name: string;
  user_color: string;
}

interface CardProps {
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
  user_seller: CarSeller;
}

export const Card = ({
  id,
  year,
  mileage,
  fipe_table,
  price,
  description,
  cover_img,
  is_active,
  user_seller,
}: CardProps) => {
  const showTag = (status: boolean) => {
    if (status == true) {
      return (
        <div className="font-medium text-14 leading-6 absolute top-[11px] left-4 pr-2 pl-2 bg-brand1 text-white">
          Ativo
        </div>
      );
    } else if (status == false) {
      return (
        <div className="font-medium text-14 leading-6 absolute top-[11px] left-4 pr-2 pl-2 bg-grey4 text-white">
          Inativo
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <Link
      to={"/product/" + id}
      className="min-w-[312px] min-h-[350px] w-[312px] h-[350px] flex flex-col gap-4 mb-[85px]"
    >
      <div className="relative w-full border-2 border-transparent hover:border-2 hover:border-brand1">
        {showTag(is_active)}

        {price >= fipe_table - fipe_table * 0.05 && (
          <div className="font-medium text-14 leading-6 absolute top-[1px] right-0 bg-random7  rounded-[2px] w-4 h-[27px] text-white text-center">
            $
          </div>
        )}

        <img
          className="w-full max-h-[152px]"
          src={cover_img}
          alt="Cars Photo"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="truncate font-semibold text-[16px] leading-5 text-grey1"></h3>
        <p className="text-grey2 font-normal text-[14px] leading-6 truncate whitespace-normal line-clamp-2">
          {description}
        </p>
        {user_seller && (
          <div className="flex items-center gap-2 ">
            <div
              className="rounded-full w-8 h-8 flex items-center justify-center"
              style={{ backgroundColor: user_seller.user_color }}
            >
              <span className="text-white font-medium text-[14px]">
                {user_seller.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-grey2 font-medium text-[14px] leading-6">
              {user_seller.name}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex gap-3">
            <span className="pt-1 pb-1 pl-2 pr-2 bg-brand4 text-brand1 rounded font-medium text-[14px] leading-6">
              {mileage} KM
            </span>
            <span className="pt-1 pb-1 pl-2 pr-2 bg-brand4 text-brand1 rounded font-medium text-[14px] leading-6">
              {year}
            </span>
          </div>
          <span className="font-lexend text-[16px] leading-5 font-medium">
            {price &&
              price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
        </div>
      </div>
    </Link>
  );
};
