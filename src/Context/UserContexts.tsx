import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { apiLocal } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { AddressData, ProfileData } from "../validations/user";
import { CarProps } from "../pages/home";

interface ContactProviderProps {
  children: ReactNode;
}

interface ProfileProviderValues {
  toggleProfileModal: () => void;
  toggleAddressModal: () => void;
  toggleDeleteModal: () => void;
  toggleForgotModal: () => void;
  toggleResetModal: () => void;
  toggleErrorForgotModal: () => void;
  toggleErrorResetModal: () => void;
  errorResetModal: boolean;
  resetModal: boolean;
  errorForgotModal: boolean;
  profileModal: boolean;
  addressModal: boolean;
  deleteModal: boolean;
  forgotModal: boolean;
  profileEdit: (data: ProfileData) => void;
  addressEdit: (data: AddressData) => void;
  deleteProfile: () => void;
  searchBrand: CarProps[];
  setSelectedBrand: Dispatch<SetStateAction<string>>;
  selectedBrand: string;
  brandSearch: (brand: string) => void;
}

export const UserContext = createContext<ProfileProviderValues>(
  {} as ProfileProviderValues
);

export const UserProvider = ({ children }: ContactProviderProps) => {
  const { userData, setUserData, logout } = useAuth();
  const [profileModal, setProfileModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [searchBrand, setSearchBrand] = useState<CarProps[]>([]);
  const [forgotModal, setForgotModal] = useState(false);
  const [errorForgotModal, setErrorForgotModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [errorResetModal, setErrorResetModal] = useState(false);

  const toggleErrorResetModal = () => {
    setErrorResetModal(!errorResetModal);
  };

  const toggleResetModal = () => {
    setResetModal(!resetModal);
  };

  const toggleForgotModal = () => {
    setForgotModal(!forgotModal);
  };

  const toggleErrorForgotModal = () => {
    setErrorForgotModal(!errorForgotModal);
  };

  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  const toggleAddressModal = () => {
    setAddressModal(!addressModal);
  };

  const profileEdit = async (data: ProfileData) => {
    try {
      const response = await apiLocal.patch(`/users/${userData.id}`, data);
      setUserData(response.data);
      toggleProfileModal();
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
  const colorSearch = async (color: string) => {
    try {
      const response = await apiLocal.get(`/ads?brand=${selectedBrand}`);
      setSearchBrand(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addressEdit = async (data: AddressData) => {
    try {
      const response = await apiLocal.patch(`/users/${userData.id}`, data);
      setUserData(response.data);
      toggleAddressModal();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProfile = async () => {
    try {
      await apiLocal.delete(`/users/${userData.id}`);
      toggleDeleteModal();
      toggleProfileModal();
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        errorResetModal,
        toggleErrorResetModal,
        resetModal,
        toggleResetModal,
        errorForgotModal,
        toggleErrorForgotModal,
        toggleForgotModal,
        forgotModal,
        profileModal,
        addressModal,
        deleteModal,
        toggleProfileModal,
        toggleAddressModal,
        toggleDeleteModal,
        profileEdit,
        addressEdit,
        deleteProfile,
        setSelectedBrand,
        searchBrand,
        selectedBrand,
        brandSearch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
function toggleDeleteModal() {
  throw new Error("Function not implemented.");
}
