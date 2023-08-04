import { useState, createContext, useContext } from 'react';

const CustomerContext = createContext()

function CustomerProvider(props) {
    const [customer, setCustomer] = React.useState([])
    const value = React.useMemo(() => {
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
    const getCustomer = React.useCallback(() => setCount(c => c + 1), [setCustomer])
    const createCustomer = React.useCallback(() => setCount(c => c + 1), [setCustomer])
    const saveCustomer = React.useCallback(() => setCount(c => c + 1), [setCustomer])
    const deleteCustomer = React.useCallback(() => setCount(c => c + 1), [setCustomer])

    return {
        customer,
        getCustomer,
        createCustomer,
        saveCustomer,
        deleteCustomer,
    }
}
export {CustomerProvider, useCustomer}