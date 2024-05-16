import { createContext } from "react";

export const TokenContext = createContext({
    isAuth: false,
    setIsAuth: () => {},
    token: "",
    setToken: () => {},
});