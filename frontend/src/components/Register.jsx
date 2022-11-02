import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

 
const Register = () => {
    const [cpf, setCPF] = useState('');
    const [telefone, setTelefone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const server = 'http://localhost:8080'


    async function Register() {
        const body = {
            cpf: cpf,
            telefone: telefone,
            name: name,
            email: email,
            password: password,
            confPassword: confPassword
        }
        const response = await fetch(`${server}/register`, {
            method: "POST",             
            headers:{
                accept : "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })    
        navigate('/'); 
        const bodyResponse = await response.json();
        console.log(bodyResponse.body);
    }
    
 
    return (
        <section className="section is-centered">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column">
                            <div style={{ boxShadow: '1px 2px 9px #C0C0C0', margin: '4em', padding: '1em',}}>
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">CPF</label>
                                    <div className="controls">
                                        <input maxLength={11} type="text" className="input" placeholder="CPF" value={cpf} onChange={(e) => setCPF(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Telefone</label>
                                    <div className="controls">
                                        <input maxLength={11} type="text" className="input" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input maxLength={40} type="text" className="input" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input maxLength={30} type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input maxLength={20} type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input maxLength={20} type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth" onClick={()=>Register()}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Register