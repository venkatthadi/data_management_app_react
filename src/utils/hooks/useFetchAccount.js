import { useEffect, useState } from "react";

const userApiUrl = "https://jsonplaceholder.typicode.com/users";

export function useFetchAccounts(accountId) {

    const [accountData, setAccountData] = useState({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();

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
        .finally(() => setLoading(false));

        return () => {
            controller.abort();
            setLoading(false);
        };
    }, [accountId]);

    return { account: accountData, loading, errors };
}