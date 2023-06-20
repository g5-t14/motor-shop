import { ReactNode, createContext, useState, useEffect } from "react";
import { api } from "../services/api";

interface CarProviderProps {
  children: ReactNode;
}
interface Car {
  name: string;
}

interface CarContextValues {
  cars: string[];
  setAd: React.Dispatch<React.SetStateAction<UserAdsResponse | null>>;
  ad: UserAdsResponse | null;
}
export interface UserAdsResponse {
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
  is_active: true;
  pictures: {
    picture_1: string;
    picture_2: string;
    picture_3: string | null;
    picture_4: string | null;
    picture_5: string | null;
    picture_6: string | null;
  };
  user_seller: {
    id: number;
    name: string;
    user_color: string;
    description: string;
  };
}

export const CarContext = createContext({} as CarContextValues);

export const CarProvider = ({ children }: CarProviderProps) => {
  const [cars, setCars] = useState<string[]>([]);
  const [ad, setAd] = useState<UserAdsResponse | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/cars`);
        const brandCars = response.data;
        const brandNames = Object.keys(brandCars);
        setCars(brandNames);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <CarContext.Provider value={{ cars, setAd, ad }}>
      {children}
    </CarContext.Provider>
  );
};
