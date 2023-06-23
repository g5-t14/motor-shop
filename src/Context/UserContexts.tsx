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
  profileModal: boolean;
  addressModal: boolean;
  deleteModal: boolean;
  profileEdit: (data: ProfileData) => void;
  addressEdit: (data: AddressData) => void;
  deleteProfile: () => void;
<<<<<<< HEAD
  teste: (data: ProfileData) => void;
=======
>>>>>>> d78256e62bd955884b070005c2f9cada3baf6537
}

export const UserContext = createContext<ProfileProviderValues>(
  {} as ProfileProviderValues
);

export const UserProvider = ({ children }: ContactProviderProps) => {
  const { userData, setUserData, logout } = useAuth();
  const [profileModal, setProfileModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  const toggleAddressModal = () => {
    setAddressModal(!addressModal);
  };

<<<<<<< HEAD
  function teste(data: ProfileData) {
    console.log(data);
  }
=======
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
>>>>>>> d78256e62bd955884b070005c2f9cada3baf6537

  const profileEdit = async (data: ProfileData) => {
    try {
      console.log("casa");
      const response = await apiLocal.patch(`users/${userData.id}`, data);
      setUserData(response.data);
      toggleProfileModal();
    } catch (error) {
      console.error(error);
    }
  };

<<<<<<< HEAD
  //  useEffect(() => {
  //     (async () => {
  //       try {
  //         const response = await apiLocal.get(`/users/${userData.id}`);
  //         setUserData(response.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     })();
  //   }, []);
=======
>>>>>>> d78256e62bd955884b070005c2f9cada3baf6537
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
        profileModal,
        addressModal,
        deleteModal,
        toggleProfileModal,
        toggleAddressModal,
        toggleDeleteModal,
        profileEdit,
        addressEdit,
        deleteProfile,
<<<<<<< HEAD
        teste,
=======
>>>>>>> d78256e62bd955884b070005c2f9cada3baf6537
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
