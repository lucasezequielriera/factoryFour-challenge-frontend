import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const APIS = [
    { apiName: 'accounts' },
    { apiName: 'assets' },
    { apiName: 'customers' },
    { apiName: 'datapoints' },
    { apiName: 'devices' },
    { apiName: 'documents' },
    { apiName: 'forms' },
    { apiName: 'invites' },
    { apiName: 'media' },
    { apiName: 'messages' },
    { apiName: 'namespaces' },
    { apiName: 'orders' },
    { apiName: 'patients' },
    { apiName: 'relationships' },
    { apiName: 'rules' },
    { apiName: 'templates' },
    { apiName: 'users' },
    { apiName: 'workflows'  }
]

export const DataProvider = ({ children }) => {

    const [apiNames, setApiNames] = useState(APIS);
    const [apiData, setApiData] = useState([])

    return(
        <DataContext.Provider value={{
            apiNames, setApiNames, apiData, setApiData
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider