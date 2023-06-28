import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  Dispatch,
} from "react";
import { api, apiLocal } from "../services/api";
import { CarProps } from "../pages/home";
import { useAuth } from "../hooks/useAuth";
import { adData, adEdit, adTeste } from "../validations/ad";

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
  setAdArray: React.Dispatch<React.SetStateAction<CarProps[]>>;
  setAd: React.Dispatch<React.SetStateAction<UserAdsResponse | null>>;
  ad: UserAdsResponse | null;
  setFilters: Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
  adArray: CarProps[];
  allCars: CarProps[];
  brandSearch: (brand: string) => void;
  setAllCars: React.Dispatch<React.SetStateAction<CarProps[]>>;
  searchBrand: CarProps[];
  setSelectedBrand: Dispatch<React.SetStateAction<string>>;
  selectedBrand: string;
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
  adsEdit: (data: adData) => void;
  modalEditAds: boolean;
  infoCarId: CarProps | null;
  retrieveEdit: (id: number) => void;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  idCard: number;
  setIdCard: React.Dispatch<React.SetStateAction<number>>;
  toggleDeleteAds: () => void;
  deleteAds: () => void;
  deleteModal: boolean;
}
export const CarContext = createContext({} as CarContextValues);

export const CarProvider = ({ children }: CarProviderProps) => {
  const [cars, setCars] = useState<string[]>([]);
  const { setUserData } = useAuth();
  const [adArray, setAdArray] = useState<CarProps[]>([]);
  const [ad, setAd] = useState<UserAdsResponse | null>(null);
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [searchBrand, setSearchBrand] = useState<CarProps[]>([]);
  const [arrayFilter, setArrayFilter] = useState<CarProps[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [priceSortBy, setPriceSortBy] = useState("");
  const [modalEditAds, setModalEditAds] = useState(false);
  const [selectedOption, setSelectedOption] = useState("true");
  const [infoCarId, setInfoCarId] = useState<CarProps | null>(null);
  const [idCard, setIdCard] = useState(0);
  const [array, setArray] = useState<CarProps[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    brand: "",
    model: "",
    color: "",
    year: "",
    fuel: "",
    mileage: "",
  });
  const idLogged = localStorage.getItem("user-id");

  const toggleEditModalAds = () => {
    setModalEditAds(!modalEditAds);
  };

  const toggleDeleteAds = () => {
    setDeleteModal(!deleteModal);
  };

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
    (async () => {
      try {
        const response = await apiLocal.get(`/ads`);
        const command = response.data;
        setArray(command);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const retrieveEdit = async (id: number) => {
    if (id) {
      const foundObject = array.find((objeto) => objeto.id === id);
      if (foundObject) {
        return setInfoCarId(foundObject);
      }
    }
    return null;
  };

  const adsEdit = async (data: adData) => {
    try {
      if (selectedOption) {
        data.is_active = selectedOption === "true";
      } else {
        data.is_active = selectedOption === "false";
      }
      const response = await apiLocal.patch(`/ads/${infoCarId?.id}`, data);
      setAdArray((prevAdArray) => {
        const updatedAdArray = prevAdArray.map((ad) => {
          if (ad.id === response.data.id) {
            return response.data;
          }
          return ad;
        });
        return updatedAdArray;
      });
      toggleEditModalAds();
    } catch (error) {
      console.error(error);
    }
  };

  const brandSearch = async (brand: string) => {
    try {
      const response = await apiLocal.get(`/ads?brand=${selectedBrand}`);
      setSearchBrand(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteAds = async () => {
    try {
      await apiLocal.delete(`/ads/${infoCarId?.id}`);
      toggleDeleteAds();
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
        setAdArray,
        adArray,
        allCars,
        setAllCars,
        setSelectedBrand,
        searchBrand,
        selectedBrand,
        arrayFilter,
        setArrayFilter,
        setSearchBrand,
        setSelectedFilters,
        selectedFilters,
        filters,
        setFilters,
        setSortBy,
        brandSearch,
        setSelectedOption,
        sortBy,
        priceSortBy,
        setPriceSortBy,
        adsEdit,
        retrieveEdit,
        toggleEditModalAds,
        idCard,
        setIdCard,
        infoCarId,
        modalEditAds,
        selectedOption,
        toggleDeleteAds,
        deleteAds,
        deleteModal,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
