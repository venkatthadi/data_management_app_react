import { Header } from "../components/Header";
import { AccountContainer } from "../components/accounts/AccountContainer";

export function AccountsPage() {

    return(
        <> 
            <Header />
            <div className="container">
                <AccountContainer />
            </div>
        </>
    );
}