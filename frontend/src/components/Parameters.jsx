/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Chart from "react-apexcharts";
import { Grid, Container, Typography ,Button } from '@mui/material';
import AppWidgetSummary from './dashboard/app/AppWidgetSummary';
import useFetch from '../useFetch';
import Alert from 'react-popup-alert';
import 'react-popup-alert/dist/index.css'

const server = 'http://localhost:8080'

const Parameters = () => {
    const [limitCO2,setLimitCO2] = useState(null);
    const [limitRuido,setLimitRuido] = useState(null);
    const [limitLuminosidade,setLimitLuminosidade] = useState(null);
    const [limitTemperatura,setLimitTemperatura] = useState(null);
    const [limitCOVT,setLimitCOVT] = useState(null);
    const [limitUmidade,setLimitUmidade] = useState(null);

    useEffect(()=>{
        async function fetchParameters(){
            const response = await fetch(`${server}/parameter`, 
            {
                method: "GET",
                headers: {            
                    accept: "application/json",
                    "content-type": "application/json"            
                }
            })
            const [body] = await response.json()
            setLimitCO2(body.limitCo2)
            setLimitRuido(body.limitRuidoSonoro)
            setLimitLuminosidade(body.limitLuminosidade)
            setLimitTemperatura(body.limitTemperatura)                
            setLimitCOVT(body.limitCOVT)
            setLimitUmidade(body.limitUmidade)


        }
        fetchParameters()

    },[])

    async function Save(){
      const body = {
        limitCo2: limitCO2,
        limitRuidoSonoro: limitRuido,
        limitLuminosidade: limitLuminosidade,
        limitTemperatura:  limitTemperatura,
        limitCOVT: limitCOVT,
        limitUmidade: limitUmidade
      }
      const response = await fetch(`${server}/parameter`, {
        method: "POST",             
        headers:{
            accept : "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify(body)            
        })        
    }

    return(
        <div style={{width:'100vw',height:"200vh" }}> 
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
        
        <Grid container>

            <Grid   classname="side-bar" 
                xs={1}
                style={{    textAlign:"center",
                            padding:'10px',
                            background:"rgb(208, 242, 255)",
                            height:"200vh",
                        }}  
                >
                <Grid   container
                        direction="column"
                        justifyContent="space-between"
                        style={{height:"100%"}} >
                    <Grid  style={{ background:''}}>
                        <Button style={{ width:'100%',marginBottom:'5px'}} href='/dashboard'>
                            <p style={{color:'black', fontWeight:'bold', fontSize: '12px'}}>Home</p>       
                        </Button >
                        <Button style={{ width:'100%',marginBottom:'5px'}} href='/dashboard'>
                            <p style={{ color:'black', fontWeight:'bold', fontSize: '12px'}}>Reports</p>       
                        </Button >
                        <Button style={{ width:'100%',marginBottom:'5px'}} href='/parameters'>
                            <p style={{color:'black', fontWeight:'bold', fontSize: '12px'}}>Parameters</p>       
                        </Button >
                    </Grid>
                    <Grid  style={{ justifyContent:"flex-end"}}>
                        <Button style={{ width:'100%',marginBottom:'5px'}} onClick={()=> Logout()}>
                            <p style={{color:'black', fontWeight:'bold'}}>Logout</p>       
                        </Button >
                    </Grid>
            </Grid>

            </Grid>                
            
            <Grid   direction="column"
                    classname="main-dashboad" 
                    style={{  alignItems:'center',justifyContent: 'center',textAlign:"center",height:"100vh",display:'flex'}} 
                    xs={11}>
                        <div style={{background:'',alignItems:'center',justifyContent: 'center',display:'flex', flexDirection: 'column',width:'40%',height:'50%',boxShadow:'1px 2px 9px #C0C0C0'}}>
                            <span style={{background:'', width:''}}>
                                <label style={{textAlign:'left'}}>Co2: </label>
                                <input placeholder="CO2" onChange={(e)=>setLimitCO2(e.target.value)} value={limitCO2 !== null? limitCO2:''} style={{ width:'50%',margin:5}}></input>
                            </span>
                            <span >
                                <label style={{textAlign:'left'}}>Ruido Sonoro: </label>
                                <input placeholder="Ruido Sonoro" onChange={(e)=>setLimitRuido(e.target.value)} value={limitRuido !== null? limitRuido:''} style={{ width:'50%',margin:5}}></input>
                            </span>
                            <span>
                                <label style={{textAlign:'left'}}>Luminosidade: </label>
                                <input placeholder="Luminosidade" onChange={(e)=>setLimitLuminosidade(e.target.value)} value={limitLuminosidade !== null? limitLuminosidade:''} style={{ width:'50%',margin:5}}></input>
                            </span>
                            <span>
                                <label style={{textAlign:'left'}}>Temperatura: </label>
                                <input placeholder="Temperatura" onChange={(e)=>setLimitTemperatura(e.target.value)} value={limitTemperatura !== null? limitTemperatura:''} style={{ width:'50%',margin:5}}></input>
                            </span>
                            <span>
                                <label style={{textAlign:'left'}}>COVT: </label>
                                <input placeholder="COVT" onChange={(e)=>setLimitCOVT(e.target.value)} value={limitCOVT !== null? limitCOVT:''}  style={{ width:'50%',margin:5}}></input>
                            </span>
                            <span>
                                <label style={{textAlign:'left'}}>Umidade: </label>
                                <input placeholder="Umidade" onChange={(e)=>setLimitUmidade(e.target.value)} value={limitUmidade !== null? limitCOVT:''}  style={{ width:'50%',margin:5}}></input>
                            </span>
                            <button onClick={()=>Save()} style={{marginTop: 30}}>save</button>
                        </div>
                </Grid>
            </Grid>
        
    </div>
);
    
}

export default Parameters