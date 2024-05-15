import { useEffect, useState } from "react";
import { userApiUrl } from "../../contexts/accountsContext";

export function useFetchAccounts() {

    const [ accountsData, setAccountsData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState();

    useEffect(() => {

        const controller = new AbortController();

        setLoading(true);
        fetch(`${userApiUrl}`, { signal: controller.signal, })
        .then((response) => response.json())
        .then((data) => {
            setAccountsData(data);
            // console.log(data);
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

    return { accounts: accountsData, loading, errors };
}