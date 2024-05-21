import { Header } from "../components/Header";
import { SchoolContainer } from "../components/schools/SchoolContainer";
import { useAuth } from "../utils/contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function SchoolsPage() {

    const { isAuth } = useAuth();
    const nav = useNavigate();

    if(isAuth){
        return(
            <> 
                <Header />
                <div className="container">
                    <SchoolContainer />
                </div>
            </>
        );
    } else {
        useEffect(() => {
            nav('/login');
        }, [])
    }
}