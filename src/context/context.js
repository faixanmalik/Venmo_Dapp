import { useState, useEffect, createContext } from "react";
import { ethers } from 'ethers'

export const TransactionContext = createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('')

    useEffect(() => {
        checkIfWalletIsConnect()
    }, [])
    

    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert('Please install MetaMask.')
    
          const accounts = await ethereum.request({method: 'eth_requestAccounts',})
    
          if (accounts.length) {
            setCurrentAccount(accounts[0])
          } else {
            console.log('No accounts found')
          }
        } catch (error) {
          console.log(error)
        }
      }

    const connectWallet = async()=>{
        try {
            
            if(!ethereum){
                return alert('Please Install MetaMask first!')
            }
            else{
                const accounts = await ethereum.request({method: 'eth_requestAccounts'})
                if(accounts.length){
                    setCurrentAccount(accounts[0]);
                    window.location.reload();
                }
                else{
                    console.log('no accounts found!')
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    return  (
        <TransactionContext.Provider value={{connectWallet, currentAccount }}>
            {children }
        </TransactionContext.Provider>
    )
}