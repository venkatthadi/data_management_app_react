import { useState, useEffect } from "react";

import AddAccount from "./components/AddAccount";
import { useDocumentClick } from "./utils/hooks/useDocumentClick";
// import { Header } from "./components/Header";
// import { UserProfile } from "./components/UserProfile";

export default function App() {

    const [sync, setSync] = useState(false);

    useEffect(() => {
        document.title="DMS react app";
    }, [sync]); // put empty dependency list to avoid useEffect take place every time the state updates
    // add required variables in dependency list to re-run useEffect for everytime the variables are updated
    // now the useEffect takes place whenever the sync variable is updated...

    useEffect(() => {
        
        // fetch("https://jsonplaceholder.typicode.com/posts", { // testing API calls
        //     method: "GET", // set method (GET by default)
        // }).then((response) => { // create a promise to handle response
        //     return response.json();
        // }).then((data) => {
        //     console.log(data);
        // }).catch((e) => {
        //     console.log(err);
        // }); 

        const controller = new AbortController();

        async function fetchAccounts() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts", 
                    { signal: controller.signal }
                );
                // const json = await response.json();
                // console.log(json);
            } catch(err) {
                console.log(err);
            }
        }

        fetchAccounts();

        return () => {
            controller.abort();
        };
    });

    // useDocumentClick();

    const auth = true;

    // window.addEventListener("resize", (e) => {
    //     console.log(window.innerHeight, window.innerWidth);
    // })

    const [accountName, setAccountName] = useState("");
    const [accounts, setAccounts] = useState([]);
    // const [counter, setCounter] = useState(0);

    return auth ? (
        <div>
            <button
                onClick={() => {
                    setSync((sync) => !sync);
                }}
            >
                Sync
            </button>
            {/* <Header/> */}
            {/* <h1>Root component</h1> */}
            {/* <UserProfile/> */}

            <form
                onSubmit={(e) => {
                        
                        e.preventDefault();
                        // const newAccount = {
                        //     id: counter,
                        //     name: accountName,
                        // };
                        // setCounter((currentCounter) => currentCounter + 1);
                        // setAccounts((currentAccounts) => [...currentAccounts, newAccount]);

                        if(accountName) {
                            fetch("https://jsonplaceholder.typicode.com/posts", {
                                method: "POST", // POST req
                                body: JSON.stringify({ // we need to use stringify method to pass object
                                    userId: 1,
                                    title: accountName,
                                    body: accountName,
                                }),
                                headers: { // define headers
                                    'Content-type': 'application/json; charset=UTF-8',
                                }
                            })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log("Success");
                                console.log(data);
                            }).catch((err) => console.log(err));
                        }
                    }
                }
            >
                <div>
                    <label htmlFor="name">Name: </label>  {/* to add new accounts */}
                    <input 
                        id="name" 
                        name="name"
                        value={accountName}
                        onChange={(e) => {
                            setAccountName(e.target.value);
                        }}
                    />
                </div>
                <button>
                    Add account
                </button>
            </form>

            {/* <AddAccount /> */}
            {accounts.map((account) => (
                <AddAccount 
                    key={account.id} 
                    account={account} 
                    setAccounts={setAccounts} // pass the setter function
                /> 
            ))}
            
        </div>
    ) : (
        <div>
            Not authorized...
        </div>
    );
}
