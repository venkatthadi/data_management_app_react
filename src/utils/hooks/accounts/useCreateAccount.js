import { useEffect, useState } from "react";
import { userApiUrl } from "../../contexts/accountsContext";

export function useCreateAccount(accountName) {
    
    const [ accountData, setAccountData ] = useState({});
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState();

    useEffect(() => {

        setLoading(true);
        fetch(`${userApiUrl}`, {
            method: "POST", // POST req
            body: JSON.stringify({
                name: accountName,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setAccountData(data);
            setErrors(undefined);
            // console.log("Success");
            console.log(`success: ${data}`);
        })
        .catch((err) => {
            setErrors(err);
        })
        .finally(() => {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });

    }, [accountName]);

    return { account: accountData, loading, errors}
}