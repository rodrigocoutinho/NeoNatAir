/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Chart from "react-apexcharts";
import { Grid, Container, Typography } from '@mui/material';
import AppWidgetSummary from './dashboard/app/AppWidgetSummary';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/system';
import useFetch from '../useFetch';
import { toast, Slide, ToastContainer } from 'react-toastify';
import { element } from 'prop-types';
import Alert from 'react-popup-alert';
import 'react-popup-alert/dist/index.css'

const server = 'http://localhost:8080'


const Dashboard = () => {
    const [ultimaLeitura,setUltimaLeitura] = useState(null);
    const [temperaturas, setTemperaturas] = useState([]);

    const [alert, setAlert] = React.useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
    })

    function onCloseAlert() {
        setAlert({
          type: '',
          text: '',
          show: false
        })
    }

    function onShowAlert(type, text) {
        setAlert({
          type: type,
          text: text,
          show: true
        })
    }

    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchTemperatura(){
        const response = await fetch(`${server}/chart`, 
            {
                method: "GET",
                headers: {            
                    accept: "application/json",
                    "content-type": "application/json"            
                }
            })
            
            const res = await response.json()
            const temp= res.map(data =>{
                return data.temperatura 
            })
            console.log(temp)
            setTemperaturas([{
                name: "Temperatura",
                data : temp
            }])
        } 
        const fetchfetchTemperatura = fetchTemperatura();
        setInterval(()=>{
            fetchTemperatura();
        },30000)
        return () => {
            console.log("fetchfetchTemperatura")
            clearInterval(fetchfetchTemperatura)
        }
    },[])
    
    useEffect(()=>{
        
        if(localStorage.getItem("token") === null) {
            navigate("/")
        }           
        
        fetchUltimasLeituras()
        
        const fetchUltimasLeiturasInterval = setInterval(()=>{
            fetchUltimasLeituras()
        },20000)
        return () => {
            console.log("fetchUltimasLeiturasInterval")
            clearInterval(fetchUltimasLeiturasInterval)
        }
    },[])

    useEffect(()=>{          
        const fetchAlertInterval = setInterval(()=>{
            fetchAlert()
        },10000)
        return () => {
            console.log("fetchAlertInterval")
            clearInterval(fetchAlertInterval)
        }
    },[])

    async function fetchAlert(){
        try
        {
            const response = await fetch(`${server}/alert`, {
                method: "GET",
                headers: {            
                    accept: "application/json",
                    "content-type": "application/json"            
                }
            })
           
            const body = await response.json();
            
            var message = []
            if(body.some(element => element.co2 > 400) )
                message.push(`CO2 acima do limite`)
            if(body.some(element => element.luminosidade > 20) )
                message.push(`Luminosidade acima do limite`)
            if(body.some(element => element.ruido > 20) )
                message.push(`Ruído acima do limite`)
            if(body.some(element => element.temperatura > 20) )
                message.push(`Temperatura acima do limite`)
            if(body.some(element => element.tvoc > 1) )
                message.push(`TVOC acima do limite`)
            if(body.some(element => element.umidade > 20) )
                message.push(`        Umidade acima do limite`)
            onShowAlert('error', message.join(' '))
            setTimeout(()=>{
                onCloseAlert()
            },3000)

            //alterar para .every na versão final
            // if(body.some(element => element.co2 > 200) ){
                
            //     onShowAlert('error', 'NÍVEL CO2 ACIMA DO LIMITE')
            //     setTimeout(()=>{
            //         onCloseAlert()
            //     },3000)
            // }

            // if(body.some(element => element.temperatura > 20) ){
                
            //     onShowAlert('error','TEMPERATURA ACIMA DO LIMITE')
            //     setTimeout(()=>{
            //         onCloseAlert()
            //     },4000)
            // }

            // if(body.some(element => element.luminosidade > 0) ){
                
            //     onShowAlert('error','LUMINOSIDADE ACIMA DO LIMITE')
            //     setTimeout(()=>{
            //         onCloseAlert()
            //     },2000)
            // }
            
            console.log("Alert:",body)
        }
        catch(e)
        {
            console.log(e)
        }
    }

    const idAmbiente = "1"

   
    
    async function fetchUltimasLeituras(){
        try
        {
            const response = await fetch(`${server}/ultimaLeitura`, {
                method: "GET",
                headers: {            
                    accept: "application/json",
                    "content-type": "application/json"            
                }
            })
            if (response.status >= 300 && response.status <=600){                
                setUltimaLeitura(null)
            }

            const [body] = await response.json();
            
            console.log(body)
            setUltimaLeitura(body)




        }
        catch(e)
        {
            console.log(e)
            setUltimaLeitura(null)
        }

    }

    const loginBody = JSON.stringify({
        //senha: teste
        usr: "heitor1", 
        pass: "698dc19d489c4e4db73e28a713eab07b"
    
        //senha: 12345678
        //usr: "inf",
        //pass: "25d55ad283aa400af464c76d713c07ad"
    })
    const [login, fetchLogin] = useFetch(`${server}/loginAirPure`, {
        method : "POST",
        body : loginBody
    })


    const[options, setOptions] = useState({
        chart: {
            id: "basic-bar"
        },
 
    })
    const[temperatura, setTemperatura] = useState([{        
        name: "Temperatura",
        data: [100,40,45,50,49]        
    }])  


   
    
    return (

    <div  > 
            <Alert
                header={'ATENÇÃO'}
                // btnText={'X'}
                text={alert.text}
                type={alert.type}
                show={alert.show}
                // onClosePress={onCloseAlert}
                pressCloseOnOutsideClick={true}
                showBorderBottom={true}
                alertStyles={{}}
                headerStyles={{marginBotton: '50px', color:'red'}}
                textStyles={{marginTop: '60px', fontSize: 30, fontWeight:"bold" }}
                buttonStyles={{visibility:'hidden'}}
      />
        {/* <button onClick={() => fetchLogin()}> Teste Login </button>       
        <button onClick={() => fetchInfoAmbientes()}>Teste Info Ambiente</button>   */}
        <div  className="app" >
            <div className="row"  style={{  justifyContent: 'center', marginTop: 50 }}>        

        
                <Grid  container spacing={{ xs: 12, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} sm={4} md={4} >
                        <AppWidgetSummary title="CO2" total={ultimaLeitura === null? "..." : ultimaLeitura.co2} theme="temp_1" icon={'mdi:molecule-co2'} />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Ruído Sonoro" total={ultimaLeitura === null? "..." : ultimaLeitura.db} theme="temp_1" icon={'charm:sound-down'} />
                    </Grid>                    
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Luminosidade" total={ultimaLeitura === null? "..." : ultimaLeitura.lux} theme="temp_1" icon={'carbon:light'} />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Temperatura" total={ultimaLeitura === null? "..." : ultimaLeitura.temperatura} theme="temp_1" icon={'fa6-solid:temperature-half'} />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Compostos Orgânicos Voláteis Totais" total={ultimaLeitura === null? "..." : ultimaLeitura.tvoc} theme="temp_1" icon={'mdi:chemical-weapon'} />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Umidade" total={ultimaLeitura === null? "..." : ultimaLeitura.umidade} theme="temp_1" icon={'carbon:humidity-alt'} />
                    </Grid>
                </Grid>

      

                <div className="is-centered">
                    <Chart
                        options={options}
                        series={temperaturas}
                        type="line"
                        width="500"
                    />
                </div>
                
            {/* <button onClick={() => toast.error("Error Notification !", {
        position: toast.POSITION.TOP_LEFT
      })}>Atualizar</button> */}

            </div>
        </div>
    </div>);
    
}


// const Dashboard = () => {
//     const [name, setName] = useState('');
//     const [token, setToken] = useState('');
//     const [expire, setExpire] = useState('');
//     const [users, setUsers] = useState([]);
//     const history = useNavigate();
 
//     useEffect(() => {
//         refreshToken();
//         getUsers();
//     }, []);
 
//     const refreshToken = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/token');
//             setToken(response.data.accessToken);
//             const decoded = jwt_decode(response.data.accessToken);
//             setName(decoded.name);
//             setExpire(decoded.exp);
//         } catch (error) {
//             if (error.response) {
//                 history.push("/");
//             }
//         }
//     }
 
//     const axiosJWT = axios.create();
 
//     axiosJWT.interceptors.request.use(async (config) => {
//         const currentDate = new Date();
//         if (expire * 1000 < currentDate.getTime()) {
//             const response = await axios.get('http://localhost:8080/token');
//             config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//             setToken(response.data.accessToken);
//             const decoded = jwt_decode(response.data.accessToken);
//             setName(decoded.name);
//             setExpire(decoded.exp);
//         }
//         return config;
//     }, (error) => {
//         return Promise.reject(error);
//     });
 
//     const getUsers = async () => {
//         const response = await axiosJWT.get('http://localhost:8080/users', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         setUsers(response.data);
//     }
 
//     return (
//         <div className="container mt-5">
//             <h1>Welcome Back: {name}</h1>
//             <table className="table is-striped is-fullwidth">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr key={user.id}>
//                             <td>{index + 1}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                         </tr>
//                     ))}
 
//                 </tbody>
//             </table>
//         </div>
//     )
// }
 
export default Dashboard