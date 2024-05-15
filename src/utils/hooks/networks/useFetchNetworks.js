import { useEffect, useState } from "react";
import { userApiUrl } from "../../../main";

export function useFetchNetworks() {

    const [ networksData, setNetworksData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState();

    useEffect(() => {

        const controller = new AbortController();

        setLoading(true);
        fetch(`${userApiUrl}/networks`, { signal: controller.signal, })
        .then((response) => response.json())
        .then((data) => {
            setNetworksData(data);
            setErrors(undefined);
        })
        .catch((err) => {
            setErrors(err);
        })
        .finally(() => {
            setTimeout(() => {
                setLoading(false)
            }, 2000);
        });

        return () => {
            controller.abort();
            setTimeout(() => {
                setLoading(false)
            }, 2000);
        };
    }, []);

    return { networks: networksData, loading, errors };
}