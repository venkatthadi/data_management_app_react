import { Header } from "../components/Header";
import { AccountContainer } from "../components/accounts/AccountContainer";
import { useAuth } from "../utils/contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function AccountsPage() {

    const { isAuth } = useAuth();
    const nav = useNavigate();

    if(isAuth){
        return(
            <> 
                <Header />
                <div className="container">
                    <AccountContainer />
                </div>
            </>
        );
    } else {
        useEffect(() => {
            nav('/login');
        }, [])
    }
}