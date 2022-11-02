//import './App.css'
import { React } from 'react'
import useFetch from "./useFetch.js"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ResponsiveAppBar from "./components/Nav";
import Register from "./components/Register";
import api from './services/api';
import Logout from './components/Logout.jsx';

const authToken = localStorage.getItem("token");
//api.defaults.headers.Authorization = `Bearer ${authToken}`;

function App() {
  return (
      <BrowserRouter>
      <ResponsiveAppBar></ResponsiveAppBar>
        <Routes>
        {!authToken ? (
          <>
            <Route exact path={"/"} element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
          </>
          
        ) : (
          <>
          <Route exact path={"/"} element={<Dashboard/>} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/logout" element={<Logout/>}/>
          </>
        )}
        </Routes>
      </BrowserRouter>      
  );
}

export default App;


// function App() {
//   return (<>
//     <BrowserRouter>
//       <Routes>
//         <Route exact path="/" element={<Login/>}/>  
//         <Route path="/dashboard" element={<Dashboard/>}/>
//         <Route path="/register" element={<Register/>}/>        
//       </Routes>
//     </BrowserRouter>
//     </>);
// }
 
// export default App;

// const server = 'http://localhost:8080'

// function App() {

//   const id = "15"
//   const parametro = "472"
//   const idAmbiente = "1"
//   const data = "10-08-2022"

//   const [infoAmbientes, fetchInfoAmbientes] = useFetch(`${server}/infoAmbientes/${encodeURIComponent(idAmbiente)}`)
//   const [leiturasDias, fetchLeiturasDias] = useFetch(`${server}/leiturasDias/${encodeURIComponent(parametro)}/${encodeURIComponent(idAmbiente)}/${encodeURIComponent(data)}`)
//   const [ultimaLeitura, fetchUltimasLeituras] = useFetch(`${server}/ultimaLeitura/${encodeURIComponent(idAmbiente)}`)
//   const [ultimoAmbientes, fetchultimoAmbientes] = useFetch(`${server}/ultimoAmbientes/${encodeURIComponent(id)}`)


//   const loginBody = JSON.stringify({
//     //senha: teste
//     //usr: "heitor1", 
//     //pass: "698dc19d489c4e4db73e28a713eab07b"
    
//     //senha: 12345678
//     usr: "inf",
//     pass: "25d55ad283aa400af464c76d713c07ad"
//   })
//   const [login, fetchLogin] = useFetch(`${server}/loginAirPure`, {
//     method : "POST",
//     body : loginBody
//   })

//   return (
//    <>   
//     <button onClick={() => fetchLogin()}> Teste Login </button>  
//     <button onClick={() => fetchInfoAmbientes()}>Teste Info Ambiente</button>
//     <button onClick={() => fetchLeiturasDias()}>Teste Leituras Dia</button>
//     <button onClick={() => fetchUltimasLeituras()}>Teste Ultima Leitura</button>
//     <button onClick={() => fetchultimoAmbientes()}>Teste Ultimas Leituras Ambientes</button>

    
//     {/* {(login.isFetching || login.didFetch) && (
//       <pre style={{textAlign:"left"}}>{JSON.stringify({login}, null, 2)}</pre>
//     )} */}
//     {/* <pre style={{textAlign:"left"}}>{JSON.stringify({infoAmbientes}, null, 2)}</pre> */}
//     {/*infoAmbientes.willFetch && <p>Fazendo nada em relação a info ambientes...</p> */}

//     {infoAmbientes.isFetching && <p>Baixando info ambientes...</p>}
//     {infoAmbientes.didSucceed && (
//       infoAmbientes.data.map(infoAmbiente => (
//         <InfoAmbiente {...infoAmbiente} />
//       ))
//     )}

//     {leiturasDias.isFetching && <p>Baixando leituras dia...</p>}
//     {leiturasDias.didSucceed && (
//       leiturasDias.data.map(leitura => (
//         <LeiturasDia {...leitura} />
//       ))
//     )}

//     {ultimaLeitura.isFetching && <p>Baixando info ambientes...</p>}
//     {ultimaLeitura.didSucceed && (
//       ultimaLeitura.data.map(leitura => (
//         <UltimaLeitura {...leitura} />
//       ))
//     )}

//     {ultimoAmbientes.isFetching && <p>Baixando info ambientes...</p>}
//     {ultimoAmbientes.didSucceed && (
//       ultimoAmbientes.data.map(leitura => (
//         <UltimoAmbientes {...leitura} />
//       ))
//     )}


//   </>
//   )
// }


// function InfoAmbiente({ id, sala, predio, local, dimensao, capmaxima, id_parametros }) {
//   return (
//     <>
//     <h2>Sala: {sala}</h2>
//     <h3>Prédio: {predio}</h3>
//     <h3>Local: {local}</h3>
//     </>
//   )
// }

// function LeiturasDia({ id, sala, predio, local, dimensao, capmaxima, id_parametros }) {
//   return (
//     <>
//     <h2>Sala: {sala}</h2>
//     <h3>Prédio: {predio}</h3>
//     <h3>Local: {local}</h3>
//     </>
//   )
// }

// function UltimaLeitura({ co2, lux, db, eco2, tvoc, temperatura, umidade, datamedicao, sala }) {
//   return (
//     <>
//     <h2>co2: {co2}</h2>
//     <h3>lux: {lux}</h3>
//     <h3>db: {db}</h3>
//     <h3>eco2: {eco2}</h3>
//     <h3>tvoc: {tvoc}</h3>
//     <h3>temperatura: {temperatura}</h3>
//     <h3>umidade: {umidade}</h3>
//     <h3>datamedicao: {datamedicao}</h3>
//     <h3>sala: {sala}</h3>
//     </>
//   )
// }

// function UltimoAmbientes({ sala, identificacao, id, predio, local, dimensao, capmaxima, id_hvac, co2, umidade, temperatura, tvoc, db, lux, dtformatada }) {
//   return (
//     <>
//     <h2>co2: {co2}</h2>
//     <h3>lux: {lux}</h3>
//     <h3>db: {db}</h3>
//     <h3>eco2: {eco2}</h3>
//     <h3>tvoc: {tvoc}</h3>
//     <h3>temperatura: {temperatura}</h3>
//     <h3>umidade: {umidade}</h3>
//     <h3>datamedicao: {datamedicao}</h3>
//     <h3>sala: {sala}</h3>
//     </>
//   )
// }


// export default App