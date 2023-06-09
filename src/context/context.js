import { useState, useEffect, createContext } from "react";
import { ethers } from 'ethers'
import { contractAddress, contractAbi } from "../utils/constants";

// time ago is for 1 min ago 10 min ago
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')



export const TransactionContext = createContext();

const { ethereum } = window;

// pending function
const createEthereumContract = async ()=>{
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer,
    )
    return transactionsContract
}


export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('')
    const [addressTo, setAddressTo] = useState('')
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem('transactionCount'),
    )

    useEffect(() => {
        
        checkIfWalletIsConnect()
        checkIfTransactionsExist()

    }, [transactionCount])
    


    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert('Please install MetaMask.')
    
          const accounts = await ethereum.request({method: 'eth_requestAccounts',})
    
          if (accounts.length) {
            setCurrentAccount(accounts[0])
            getAllTransactions()
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

    const checkIfTransactionsExist = async ()=>{
        try {
            if(ethereum){
                const transactionCount = await createEthereumContract();
                const currentTransactionCount = await transactionCount.getTransactionCount()
                window.localStorage.setItem('transactionCount', currentTransactionCount)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendTransaction = async()=>{
        try {
            if(ethereum){
                const transactionContract = await createEthereumContract()

                const parsedAmount = ethers.utils.parseEther(amount)

                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: currentAccount,
                            to: addressTo,
                            gas: '0x5208',
                            value: parsedAmount._hex
                        },
                    ],
                })

                const transactionHash = await transactionContract.addTransaction(addressTo, parsedAmount, message)

                console.log(`Loading - ${transactionHash.hash}`)
                await transactionHash.wait()
                console.log(`Success - ${transactionHash.hash}`)
                setLoading(false)

                const transactionsCount = await transactionContract.getTransactionCount()
                setTransactionCount(transactionsCount.toNumber())
                window.location.reload()
            }
            else{
                console.log('no ethereum object found!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTransactions = async ()=>{
        try {
            if(ethereum){
                const transactionContract = await createEthereumContract();
                const availableTransactions = await transactionContract.getTransaction();

                const structuredTransactions = availableTransactions.map((item)=>{
                    return {
                        addressTo: item.receiver,
                        addressFrom: item.sender,
                        timestamp: timeAgo.format(
                            new Date(item.timestamp.toNumber() * 1000), 'mini'
                        ),
                        message: item.message,
                        amount: parseInt(item.amount._hex) / 10 ** 18,
                    }
                })
                setTransactions(structuredTransactions)
            }
            else{
                console.log('no ethereum object')
            }
            
        } catch (error) {
            console.log(error)
        }
    }





    return  (
        <TransactionContext.Provider value={{connectWallet, currentAccount, sendTransaction, setAddressTo, addressTo, amount, setAmount, message, setMessage, transactions }}>
            {children }
        </TransactionContext.Provider>
    )
}