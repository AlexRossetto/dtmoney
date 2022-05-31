import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface Transaction {
  id: string;
  title: string;
  createdAt: string;
  category: string;
  type: string;
  amount: number;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export const TransactionsProvider = ({children}: TransactionProviderProps) => {
  const [ transactions, setTransactions ] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(res => setTransactions(res.data.transactions));
  }, [])

  const createTransaction = async (transactionInput: TransactionInput) => {

    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })

    setTransactions((previousState) => [...previousState, response.data.transaction])
  }

  return(
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionContext)

  return context;
}