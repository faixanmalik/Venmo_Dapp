import { createContext } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {

    const connectWallet = async()=>{
        
    }

    return  (
        <TransactionContext.Provider value={{ connectWallet }}>
            { children }
        </TransactionContext.Provider>
    )
}