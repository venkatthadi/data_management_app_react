import { Header } from "../components/Header";
import { NetworkContainer } from "../components/networks/NetworkContainer";

export function NetworksPage() {

    return(
        <> 
            <Header />
            <div className="container">
                <NetworkContainer />
            </div>
        </>
    );
}