import { ReactNode, createContext, useState, useEffect, Dispatch } from "react";
import { api, apiLocal } from "../services/api";
import { CarProps } from "../pages/home";
import { useAuth } from "../hooks/useAuth";

interface CarProviderProps {
  children: ReactNode;
}
interface Filters {
  brand: string;
  model: string;
  color: string;
  year: string;
  fuel: string;
  mileage: string;
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
interface CarContextValues {
  cars: string[];
  setAd: React.Dispatch<React.SetStateAction<UserAdsResponse | null>>;
  ad: UserAdsResponse | null;
  allCars: CarProps[];
  setFilters: Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
  setAllCars: React.Dispatch<React.SetStateAction<CarProps[]>>;
  searchBrand: CarProps[];
  setSelectedBrand: Dispatch<React.SetStateAction<string>>;
  selectedBrand: string;
  brandSearch: (brand: string) => void;
  arrayFilter: CarProps[];
  setArrayFilter: React.Dispatch<React.SetStateAction<CarProps[]>>;
  setSearchBrand: React.Dispatch<React.SetStateAction<CarProps[]>>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<object>>;
  selectedFilters: object;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setPriceSortBy: React.Dispatch<React.SetStateAction<string>>;
  priceSortBy: string;
  toggleEditModalAds: () => void;
  adsEdit: (data: CarProps, id: number) => void;
}
export const CarContext = createContext({} as CarContextValues);

export const CarProvider = ({ children }: CarProviderProps) => {
  const [cars, setCars] = useState<string[]>([]);
  const { setUserData } = useAuth();
  const [ad, setAd] = useState<UserAdsResponse | null>(null);
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [searchBrand, setSearchBrand] = useState<CarProps[]>([]);
  const [arrayFilter, setArrayFilter] = useState<CarProps[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [priceSortBy, setPriceSortBy] = useState("");
  const [modalEditAds, setModalEditAds] = useState(false);

  const toggleEditModalAds = () => {
    setModalEditAds(!modalEditAds);
  };

  const [filters, setFilters] = useState<Filters>({
    brand: "",
    model: "",
    color: "",
    year: "",
    fuel: "",
    mileage: "",
  });
  const [selectedFilters, setSelectedFilters] = useState({});

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
    (async () => {
      try {
        const response = await apiLocal.get(`/ads`);
        const command = response.data;

        setAllCars(command);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  const brandSearch = async (brand: string) => {

    try {
      const response = await apiLocal.get(`/ads?brand=${selectedBrand}`);
      setSearchBrand(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const adsEdit = async (data: CarProps, id: number) => {
    try {
      const response = await apiLocal.patch(`/ads/${id}`, data);
      setUserData(response.data);
      toggleEditModalAds();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        setAd,
        ad,
        allCars,
        setFilters,
        filters,
        setAllCars,
        setSelectedBrand,
        searchBrand,
        selectedBrand,
        brandSearch,
        arrayFilter,
        setArrayFilter,
        setSearchBrand,
        setSelectedFilters,
        selectedFilters,
        setSortBy,
        sortBy,
        priceSortBy,
        setPriceSortBy,
        adsEdit,
        toggleEditModalAds,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
