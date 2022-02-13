import React, { useContext, useEffect, useState } from 'react'
import Api from "../../components/Api"
import { DataContext } from '../../config/context/DataContext';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const Dashboard = () => {
    // useContext
    const { apiNames } = useContext(DataContext);
    // Constant to reload data from the apis
    const [reload, setReload] = useState(false)

    // useEffect to declare the interval
    useEffect(() => {
        setInterval(() => {
            setReload(true)
            // Here you can change the interval time
        }, 15000)
    }, [])

    // Title
    const title = () => {
        return (
            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 0, marginTop: 20 }}>
                <div style={{ width: 15, height: 15, backgroundColor: '#44bc44', marginRight: 15, borderRadius: 90, boxShadow: '0px 0px 10px #2fff38' }} />
                <h1 style={{ marginBottom: 0, marginRight: 15 }}>Status Dashboard</h1>
            </div>
        )
    }

    // Content
    return <div>
        {title()}
        <Button type="primary" shape="round" icon={<ReloadOutlined />} style={{ marginBottom: 5, marginLeft: 4, fontWeight: 500 }}
        onClick={() => setReload(true)}>
            Reload
        </Button>
        <div className='apis' style={{ display: 'flex', flexFlow: 'row wrap', width: '1300px', justifyContent: 'space-between' }}>
            {/* Components iteration */}
            { apiNames?.map((api, apiId) => <Api key={apiId} name={api.apiName} reload={reload} setReload={setReload} /> )}
        </div>
    </div>
}

export default Dashboard