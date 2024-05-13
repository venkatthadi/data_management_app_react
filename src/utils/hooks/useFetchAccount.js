import { useEffect } from "react";

const userApiUrl = "https://jsonplaceholder.typicode.com/users";

export function useFetchAccounts(accountId) {
    useEffect(() => {
        fetch(`${userApiUrl}/${accountId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [accountId]);
}