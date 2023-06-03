import { useState, useEffect, createContext } from "react";
import { ethers } from 'ethers'

export const TransactionContext = createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('')
    const [addressTo, setAddressTo] = useState('')
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem('transactionCount'),
    )

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

    // pending function
    const createEthereumContract = async ()=>{
        const provider = new ethers.providers
    }

    // pending function
    const checkIfTransactionsExist = async ()=>{
        try {
            if(ethereum){
                const transactionCount = createEthereumContract()


            }
            else{

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