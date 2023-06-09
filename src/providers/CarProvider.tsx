import { ReactNode, createContext, useState } from "react";

interface CarProviderProps {
  children: ReactNode;
}
interface Car {
  name: string;
}

interface CarContextValues {}

export const CarContext = createContext({} as CarContextValues);

export const CarProvider = ({ children }: CarProviderProps) => {
  const [cars, setCars] = useState<Car[]>([]);

  return <CarContext.Provider value={{}}>{children}</CarContext.Provider>;
};
