import { ReactNode, createContext, useState } from "react";
import { apiLocal } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { AddressData, ProfileData } from "../validations/user";

interface ContactProviderProps {
  children: ReactNode;
}

interface ProfileProviderValues {
  editProfileModal: boolean;
  setEditProfileModal: (value: boolean) => void;
  profileEdit: (data: ProfileData) => void;
  addressEdit: (data: AddressData) => void;
  deleteProfile: () => void;
}

export const UserContext = createContext<ProfileProviderValues>(
  {} as ProfileProviderValues
);

export const UserProvider = ({ children }: ContactProviderProps) => {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const { userData, setUserData, logout } = useAuth();

  const profileEdit = async (data: ProfileData) => {
    try {
      const response = await apiLocal.patch(`/users/${userData.id}`, data);
      setEditProfileModal(false);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addressEdit = async (data: AddressData) => {
    try {
      const response = await apiLocal.patch(`/users/${userData.id}`, data);
      setEditProfileModal(false);
      setUserData(response.data);
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
        editProfileModal,
        setEditProfileModal,
        profileEdit,
        addressEdit,
        deleteProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
