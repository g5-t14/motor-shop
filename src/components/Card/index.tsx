import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface CarSeller {
  id: number;
  name: string;
  user_color: string;
}

interface CardProps {
  id: number;
  name: string;
  brand: string;
  year: string;
  mileage: number;
  fipe_table: number;
  description: string;
  is_active: string;
  fuel: number;
  value: number;
  user_seller: CarSeller;
}
/*
{
  id: "eec9d452-9fc3-4679-b331-3806215edd9a",
  name: "bolt ev premier 203cv (elétrico)",
  brand: "chevrolet",
  year: "2022",
  mileage: "1500",
  fipe_table: 285000,
  description: "Lorem ipso lom",
  is_active: true,
  fuel: 3,
  value: 282045,
},
*/

export const Card = ({
  brand,
  description,
  fipe_table,
  fuel,
  id,
  is_active,
  mileage,
  name,
  value,
  year,
  user_seller,
}: CardProps) => {
  const fuels = ["Flex", "Elétrico", "Híbrido"];

  const formatAdTitle = (brand: string, name: string): string => {
    const formatedBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
    const formatedName =
      name.charAt(0).toUpperCase() + name.split(" ")[0].slice(1);
    return `${formatedBrand} - ${formatedName}`;
  };

  const showTag = (status: string) => {
    if (status == "true") {
      return (
        <div className="font-medium text-14 leading-6 absolute top-[11px] left-4 pr-2 pl-2 bg-brand1 text-white">
          Ativo
        </div>
      );
    } else if (status == "false") {
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
      to={"product/" + id}
      className="min-w-[312px] min-h-[350px] w-[312px] h-[350px] flex flex-col gap-4 mb-[85px]"
    >
      <div className="relative w-full border-2 border-transparent hover:border-2 hover:border-brand1">
        {showTag(is_active)}

        {value >= fipe_table - fipe_table * 0.05 && (
          <div className="font-medium text-14 leading-6 absolute top-[1px] right-0 bg-random7  rounded-[2px] w-4 h-[27px] text-white text-center">
            $
          </div>
        )}

        <img
          className="w-full"
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt="Cars Photo"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="truncate font-semibold text-[16px] leading-5 text-grey1">
          {formatAdTitle(brand, name)}
        </h3>
        <p className="text-grey2 font-normal text-[14px] leading-6 truncate whitespace-normal line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 ">
          <div className="rounded-full bg-purple-600 w-8 h-8 flex items-center justify-center">
            <span className="text-white font-medium text-[14px]">
              {user_seller.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-grey2 font-medium text-[14px] leading-6">
            {user_seller.name}
          </span>
        </div>
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
            {value.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};
