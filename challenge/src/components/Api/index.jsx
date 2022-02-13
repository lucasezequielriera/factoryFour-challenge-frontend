import React, { useState, useEffect } from 'react'
import { Tag, Divider } from 'antd'
import { SyncOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Axios from 'axios'

const Api = ({ name, reload, setReload }) => {

    // Constant to show all the api data
    const [allData, setAllData] = useState([])
    // Constant to show the error number
    const [error, setError] = useState()

    useEffect(() => {
        // Fetch to get the information api
        const fetchData = async () => {
            try {
                await Axios.get(`https://api.factoryfour.com/${name}/health/status`)
                    .then(response => {
                        setAllData(response)
                    })
                    .catch(error => {
                        if(error.response) {
                        // Cuando el código de estado de la respuesta está fuera del rango 2xxx 
                        setError(`Error ${error.response.status}`)
                        } else if (error.request) {
                            // Cuando no se ha recibido ninguan respuesta despues de haber enviado la request 
                            console.warn(error.request);
                        } else {
                            // Error
                            console.warn(error.message);
                        }
                    }
                );
            } catch (error) {
                console.warn("Esto es un error:", error);
            }
            setReload(false)
        }

        fetchData()

    }, [reload]);

    // Content component api
    return (
        <div style={{ display: 'flex', width: 600, backgroundColor: 'white', border: '1px solid transparent', boxShadow: '0px 0px 10px grey', borderRadius: 5, padding: 10, justifyContent: 'space-between', alignItems: 'center', margin: '5px 5px' }}>
            <header style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                    <p style={{ marginBottom: 0, fontSize: 17, fontWeight: 500, alignSelf: 'center', width: 100 }}>{name}</p>
                    <Divider type="vertical" style={{ height: 45 }} />
                </div>
                <div>
                    <p style={{ marginBottom: 0, fontSize: 10, fontWeight: 700 }}>host: <span style={{ fontWeight: 400 }}>{allData?.data?.hostname ? allData?.data?.hostname : "-"}</span></p>
                    <p style={{ marginBottom: 0, fontSize: 10, fontWeight: 700 }}>message: <span style={{ fontWeight: 400 }}>{allData?.data?.message ? allData?.data?.message : "-"}</span></p>
                    <p style={{ marginBottom: 0, fontSize: 10, fontWeight: 700 }}>time: <span style={{ fontWeight: 400 }}>{allData?.data?.time ? allData?.data?.time : "-"}</span></p>
                </div>
            </header>
            <Tag icon={ allData.status === 200 && !reload ? <SyncOutlined spin /> : error && !reload ? <CloseCircleOutlined /> : <ClockCircleOutlined /> }
            color={ allData.status === 200 && !reload ? "success" : error && !reload ? "error" : "default" } style={{ padding: '3px 25px', fontSize: 15 }}>
                { allData.status === 200 && !reload ? "Operational" : `${error && !reload ? error : 'Loading'}` }
                
            </Tag>
        </div>
    )
}

export default Api;