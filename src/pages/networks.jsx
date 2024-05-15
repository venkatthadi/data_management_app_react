import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { NetworkContainer } from "../components/networks/NetworkContainer";
import { useFetchNetworks } from "../utils/hooks/networks/useFetchNetworks";

export function NetworksPage() {

    const { networks, loading, errors } = useFetchNetworks();
    const [ networksData, setNetworksData ] = useState([]);
    useEffect(() => {
        if(!loading && !errors && networks) {
            setNetworksData(networks);
        }
    }, [loading, errors, networks]);


    return(
        <> 
            <Header />
            <div className="container">
                <div className="container">
                    {loading ? "loading..." : <NetworkContainer />}
                </div>
            </div>
        </>
    );
}