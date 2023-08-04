import { useMemo, useState, useCallback, createContext, useContext } from 'react';

const CustomerContext = createContext()

function CustomerProvider(props) {
    const [customer, setCustomer] = useState([])
    const value = useMemo(() => {
      return {
        customer,
        setCustomer,
      }
    }, [customer])
    return <CustomerContext.Provider value={value} {...props} />
  }

function useCustomer() {
    const context = useContext(CustomerContext)
    if (!context) {
      throw new Error('useCustomer must be used within a CustomerContext')
    }
    const {customer, setCustomer} = context
    /*const getCustomer = useCallback(() => setCustomer(c => c + 1), [setCustomer])
    const createCustomer = useCallback(() => setCount(c => c + 1), [setCustomer])
    const saveCustomer = useCallback(() => setCount(c => c + 1), [setCustomer])
    const deleteCustomer = useCallback(() => setCount(c => c + 1), [setCustomer])*/

    return {
        customer,
        setCustomer,
        /*createCustomer,
        saveCustomer,
        deleteCustomer,*/
    }
}
export {CustomerProvider, useCustomer}