import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {

  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage");
  });

  const saveProfileImage = (img) => {
    setProfileImage(img);
    localStorage.setItem("profileImage", img);
  };

  return (
    <ProfileContext.Provider
      value={{ profileImage, saveProfileImage }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);