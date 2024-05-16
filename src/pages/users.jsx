import { Header } from "../components/Header";
import { UserContainer } from "../components/users/UserContainer";

export function UsersPage() {

    return(
        <> 
            <Header />
            <div className="container">
                <UserContainer />
            </div>
        </>
    );
}