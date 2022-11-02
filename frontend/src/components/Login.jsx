import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, Button } from '@mui/material';
import '../components/css/Login.css'


const Login = () => {
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
            headers: {
                accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (response.status >= 200 && response.status <= 300) {
            const body = await response.json()
            console.log(body)
            localStorage.setItem("token", body.accessToken)
            //navigate('/Dashboard');
            window.location.href = "/Dashboard"
        } else {
            console.log("ERRO");
        }
    }
    function onSubmit(ev) {
        ev.preventDefault();
    }


    return (
        <section className="section is-centered">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column">
                            <div className="box">
                                <p className="has-text-centered">{msg}</p>
                                <img src='../public/img/NeoNatAir.png'></img>
                                <form onSubmit={onSubmit}>
                                    <div className="field mt-5">

                                        <label className="label">Email</label>
                                        <div className="controls">
                                            <input required type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field mt-5">
                                        <label className="label">Password</label>
                                        <div className="controls">
                                            <input required type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="field mt-5">
                                            <Button color="success" size="large" variant="contained" onClick={() => Auth()} className="button is-fullwidth">
                                                Entrar
                                            </Button>
                                        </div>

                                        <div className="field mt-5">
                                            <Button onClick={() => navigate('/Register')} className="button is-fullwidth" size='large' variant="contained">
                                                Register
                                            </Button>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Login