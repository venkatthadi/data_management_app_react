import { Header } from "./components/Header";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function App() {

    // const [accounts, setAccounts] = useState(accountsData);
    // const navigate = useNavigate();

    // console.log(accounts);

    return(
        <>
            <div>
                {/* { accountsData.map((currentAccount) => 
                    (<AccountDetails key={currentAccount.id} account={currentAccount} setAccounts={setAccountsData} />)
                ) } */}
                <Header />
                <Outlet />
            </div>
        </>
    );
}
