import { getCurrentUser } from "@/lib/appwrite";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Models } from "react-native-appwrite";

interface GlobalContextInterface {
    isLoggedIn: boolean;
    user: Models.Document | null;
    isLoading: boolean;
    setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: Dispatch<React.SetStateAction<boolean>>;
    setUser: Dispatch<React.SetStateAction<Models.Document | null>>;
}

const GlobalContext = createContext({} as GlobalContextInterface);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
