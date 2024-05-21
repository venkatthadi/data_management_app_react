import { Header } from "../components/Header";
import { NetworkContainer } from "../components/networks/NetworkContainer";
import { useAuth } from "../utils/contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function NetworksPage() {

    const { isAuth } = useAuth();
    const nav = useNavigate();

    if(isAuth){
        return(
            <> 
                <Header />
                <div className="container">
                    <NetworkContainer />
                </div>
            </>
        );
    } else {
        useEffect(() => {
            nav('/login');
        }, [])
    }
}