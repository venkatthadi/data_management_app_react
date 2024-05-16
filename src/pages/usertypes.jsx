import { Header } from "../components/Header";
import { UserTypeContainer } from "../components/usertypes/UsertypeContainer";

export function UsertypesPage() {
    return(
        <> 
            <Header />
            <div className="container">
                <UserTypeContainer />
            </div>
        </>
    );
}