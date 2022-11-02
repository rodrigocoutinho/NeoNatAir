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
    const history = useNavigate();
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
        const bodyResponse = await response.json();
        console.log(bodyResponse.body);
    }
    
 
    return (
        <section className="section is-centered">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <img src='../public/img/NeoNatAir.png'></img>
                                <div className="field mt-5">
                                    <label className="label">CPF</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="CPF" value={cpf} onChange={(e) => setCPF(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Telefone</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Register