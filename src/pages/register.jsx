import { Header } from "../components/Header";
import { RegisterContainer } from "../components/register/RegisterContainer";

export function RegisterPage() {

    return(
        <> 
            <Header />
            <div className="container">
                <br/>
                <RegisterContainer />
            </div>
        </>
    );
}