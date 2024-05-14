import { useContext } from "react";
import { AccountsContext } from "../utils/contexts/accountsContext";
import { AccountContentButtons } from "./AccountContentButtons";


export function AccountContainer() {
    
    const accountsContextData = useContext(AccountsContext);

    return(
        <div className="container">
        <table className="table table-hover table-striped table-bordered">
            <thead className="thead-dark">
                <tr>
                <th>Account ID</th>
                <th>Name</th>
                <th colSpan="3"></th>
                </tr>
            </thead>
            <tbody>
            { accountsContextData.map((currentAccount) => (
                <tr key={currentAccount.id}>
                    <td>{currentAccount.id}</td>
                    <td>{currentAccount.name}</td>
                </tr>
            )) }
            </tbody>
        </table>
        </div>
    )
}