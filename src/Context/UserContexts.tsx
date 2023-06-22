import { ReactNode, createContext, useEffect, useState } from "react";
import { apiLocal } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { AddressData, ProfileData, UserData } from "../validations/user";

interface ContactProviderProps {
  children: ReactNode;
}

interface ProfileProviderValues {
  editProfileModal: () => void;
  editAddressModal: () => void;
  profileModal: boolean;
  addressModal: boolean;
  profileEdit: (data: ProfileData) => void;
  addressEdit: (data: AddressData) => void;
  deleteProfile: () => void;
  teste: (data: ProfileData) => void
}

export const UserContext = createContext<ProfileProviderValues>(
  {} as ProfileProviderValues
);

export const UserProvider = ({ children }: ContactProviderProps) => {
  const { userData, setUserData, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileModal, setProfileModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);

  const editProfileModal = () => {
    setProfileModal(!profileModal);
  };

  const editAddressModal = () => {
    setAddressModal(!addressModal);
  };

  function teste(data: ProfileData) {
    console.log(data)
  }

  const profileEdit = async (data: ProfileData) => {
    try {
      const response = await apiLocal.patch(`/users/${userData.id}`, data);
      setUserData(response.data);
      editProfileModal();
    } catch (error) {
      console.error(error);
    }
  };

  /* useEffect(() => {
    (async () => {
      try {
        const response = await apiLocal.get(`/users/${userData.id}`);
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []); */
  const addressEdit = async (data: AddressData) => {
    try {
      const response = await apiLocal.patch(`/users/${userData.id}`, data);
      setUserData(response.data);
      editAddressModal();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProfile = async () => {
    try {
      await apiLocal.patch(`/users/${userData.id}`);
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        profileModal,
        addressModal,
        editProfileModal,
        editAddressModal,
        profileEdit,
        addressEdit,
        deleteProfile,
        teste
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
