import { createContext } from "react";

export const AccountContext = createContext({
    id: 0,
    name: "",
    setAccounts: () => {},
});