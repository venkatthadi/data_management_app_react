import { useState } from 'react';
import propTypes from 'prop-types';

export function AccountDetails({ account, setAccounts }) {

    const [ formFields, setFormFields ] = useState({
        name: account.name,
    });

    // const isdisabled = !formFields.name;

    const [ isEditing, setIsEditing ] = useState(false);

    return (
        <div>
            <div>
                <button 
                    onClick={() => {
                        setIsEditing((currentState) => !currentState) // inverts the current state
                    }}
                >
                    Edit
                </button>
                {isEditing && <button
                    onClick={() => {
                        setAccounts((currentAccountsState) => // use setAccounts() function to change data in App.js state
                            currentAccountsState.map((currentAccount) => 
                                currentAccount.id === account.id // if id matches then update the state object, else pass the old object
                                ? { ...currentAccount, name: name } 
                                : currentAccount
                            ))
                        setIsEditing(false);
                    }}
                >
                    Save
                </button>}
                
                <button
                    onClick={() => {
                        setAccounts((currentAccountsState) => currentAccountsState.filter(
                            (currentAccount) => currentAccount.id !== account.id
                        ))
                    }}
                >
                    Delete
                </button>
            </div>

            <label htmlFor="name">Name: </label>
            {isEditing ? <input 
                id="name" 
                name="name" 
                value={formFields.name} 
                onChange={ (e) => { 
                    setFormFields((currentState) => ({ 
                        ...currentState, // use spread operator so that you retreive the data from original obj
                        name: e.target.value, // update the required fields
                    })) 
                } } 
                /> : 
                <span>
                    {formFields.name}
                </span>
            }
        </div>
    )
}

AccountDetails.propTypes = { // type validation
    account: propTypes.shape({
        id: propTypes.number.isRequired,
        name: propTypes.string.isRequired,
    }).isRequired,
    setAccounts: propTypes.func.isRequired,
}