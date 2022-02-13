import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Axios from 'axios'

const Api = ({ name }) => {

    const [load, setLoad] = useState(false);
    const [data, setData] = useState([])
    const [check, setCheck] = useState()
    const [allData, setAllData] = useState([])
    const [error, setError] = useState()

    // ---------------------
    useEffect(() => {

        const fetchData = async () => {
            try {
                await Axios.get(`https://api.factoryfour.com/${name}/health/status`)
                    .then(response => {
                        setAllData(response)
                        setData(response.data)
                    })
                    .catch(error => {
                        if(error.response) {
                        // Cuando el código de estado de la respuesta está fuera del rango 2xxx 
                        console.log(error.response.status)
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

                setCheck(data.hostname)
                setLoad(true)
            } catch (error) {
                console.warn("Esto es un error:", error);
            }
        };
        fetchData();

    }, [load, setCheck]);
    // ---------------------

    return (
        <div style={{ display: 'flex', width: 600, backgroundColor: 'white', border: '1px solid transparent', boxShadow: '0px 0px 10px grey', borderRadius: 5, padding: 20, justifyContent: 'space-between', alignItems: 'center', margin: '5px 5px' }}>
            <p style={{ marginBottom: 0, fontSize: 17, fontWeight: 500 }}>{name}</p>
            <Tag icon={ (check && allData.status) ? <CheckCircleOutlined /> : (error ? <CloseCircleOutlined /> : <ClockCircleOutlined />) } color={ (check && allData.status) ? "success" : (error ? "error" : "default") } style={{ padding: '3px 25px', fontSize: 15 }}>
                {(check && allData.status) ? "Operational" : `${error ? error : 'Loading'}`}
                
            </Tag>
        </div>
    )
}

export default Api;