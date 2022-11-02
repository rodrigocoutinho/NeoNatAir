import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"


const Login =() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const server = 'http://localhost:8080'

    
    async function Auth() {
        const body = {
            email: email,
            password: password
        }
        const response = await fetch(`${server}/login`, {
            method: "POST",             
            headers:{
                accept : "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(body)            
        })
        if (response.status >= 200 && response.status <=300){
            const body = await response.json()
            console.log(body)
            localStorage.setItem("token",body.accessToken)
            navigate('/dashboard');       
        } else {
        console.log("ERRO");
        }        
    }

    function Register() {
        navigate('/register');
    }
    
 
    return (     
        <section className="section is-centered" >
            <div style={{  backgroundColor: '#add2eb',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '80px',
                            borderRadius: '15px' }}>
                <div style={{ width: '60%', height: '60%' }}>
                    <img src={logo}></img>
                </div>
                <div  className="hero-body">
                    <div className="container" >
                        <div >
                            <div className="column" >
                                
                                    <p className="has-text-centered">{msg}</p>
                                    <div className="field mt-5" style={{width: '400px'}}>
                                        <label className="label">Email</label>
                                        <div className="controls">
                                            <input maxLength={30} type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field mt-5" style={{width: '400px'}}>
                                        <label className="label">Password</label>
                                        <div className="controls">
                                            <input maxLength={20} type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent:'center'}}>
                                        <div className="field mt-5" style={{ justifyContent: 'space-between', width:'200px',  padding: '5px', display:'flex'}}>
                                            <button onClick={() => Auth()}>Login</button>  
                                            <button onClick={() => Register()}>Register</button>                                
                                        </div>   
                                        </div>
                                                            
                                    </div>
                                    
                               
                                
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{  textAlign: 'center' }}>v.1.0.0.1 </p>
            </div>
            
        </section>
    )
}

export default Login