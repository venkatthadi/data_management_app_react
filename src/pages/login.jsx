import { Header } from "../components/Header";
import { LoginContainer } from "../components/login/LoginContainer";

export function LoginPage() {

    return(
        <> 
            <Header />
            <div className="container">
                <br/>
                <LoginContainer />
            </div>
        </>
    );
}