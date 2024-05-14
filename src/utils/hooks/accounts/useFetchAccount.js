import { useEffect, useState } from "react";

const userApiUrl = "https://jsonplaceholder.typicode.com/users";

export function useFetchAccount(accountId) {

    const [ accountData, setAccountData ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState();

    useEffect(() => {

        const controller = new AbortController();

        setLoading(true);
        fetch(`${userApiUrl}/${accountId}`, { signal: controller.signal, })
        .then((response) => response.json())
        .then((data) => {
            setAccountData(data);
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
    }, [accountId]);

    return { account: accountData, loading, errors };
}