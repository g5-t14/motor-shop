import { ReactNode, createContext, useState } from "react";
import { apiLocal } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { AddressData, ProfileData } from "../validations/user";

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
  toggleSucessRegisterModal: () => void;
  toggleErrorRegisterModal: () => void;
  errorResetModal: boolean;
  resetModal: boolean;
  errorForgotModal: boolean;
  profileModal: boolean;
  addressModal: boolean;
  deleteModal: boolean;
  forgotModal: boolean;
  registerSucessModal: boolean;
  registerErrorModal: boolean;
  profileEdit: (data: ProfileData) => void;
  addressEdit: (data: AddressData) => void;
  deleteProfile: () => void;
}

export const UserContext = createContext<ProfileProviderValues>(
  {} as ProfileProviderValues
);

export const UserProvider = ({ children }: ContactProviderProps) => {
  const { userData, setUserData, logout } = useAuth();
  const [profileModal, setProfileModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [errorForgotModal, setErrorForgotModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [errorResetModal, setErrorResetModal] = useState(false);
  const [registerSucessModal, setRegisterSucessModal] = useState(false);
  const [registerErrorModal, setRegisterErrorModal] = useState(false);

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

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleSucessRegisterModal = () => {
    setRegisterSucessModal(!registerSucessModal);
  };

  const toggleErrorRegisterModal = () => {
    setRegisterErrorModal(!registerErrorModal);
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
        toggleSucessRegisterModal,
        toggleErrorRegisterModal,
        registerSucessModal,
        registerErrorModal,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
