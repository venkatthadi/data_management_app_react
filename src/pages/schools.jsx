import { Header } from "../components/Header";
import { SchoolContainer } from "../components/schools/SchoolContainer";

export function SchoolsPage() {

    return(
        <> 
            <Header />
            <div className="container">
                <SchoolContainer />
            </div>
        </>
    );
}