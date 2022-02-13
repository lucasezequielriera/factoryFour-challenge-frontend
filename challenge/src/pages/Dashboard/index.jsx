import React, { useContext } from 'react'
import Api from "../../components/Api"
import { DataContext } from '../../config/context/DataContext';

const Dashboard = () => {

    const { apiNames } = useContext(DataContext);

    const title = () => {
        return (
            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40, marginTop: 20 }}>
                <div style={{ width: 15, height: 15, backgroundColor: '#44bc44', marginRight: 15, borderRadius: 90, boxShadow: '0px 0px 10px #2fff38' }} />
                <h1 style={{ marginBottom: 0 }}>Status Dashboard</h1>
            </div>
        )
    }

    return <div>
        {title()}
        <div className='apis' style={{ display: 'flex', flexFlow: 'row wrap', width: '1300px', justifyContent: 'space-between' }}>
            { apiNames?.map((api, apiId) => <Api key={apiId} name={api.apiName} /> ) }
        </div>
    </div>
}

export default Dashboard