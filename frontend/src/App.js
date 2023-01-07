import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import SignInSide from './pages/SignInSide';
import SignUpSide from './pages/SignUpSide';
import Wellcome from './components/Wellcome';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import CreateLeitos from './components/CreateLeitos';
import MonitoredEnvironment from './components/MonitoredEnvironment';
import UpdateLeito from './components/UpdateLeito';
import Report from './components/Report';
import MonitoredEnvironmentLeito from './components/MonitoredEnvironmentLeito';


function App() {
  return (
    <div className="App">
      <Navbar/>
       <Routes>
          <Route path="/" element={<SignInSide/>}/>
          <Route path="/signup" element={<SignUpSide/>}/> 
          <Route path="/wellcome" element={[<Layout/>,<Wellcome/>]}/> 
          <Route path="/leitoform" element={[<Layout/>,<CreateLeitos/>]}/>
          <Route path="/monitored-airpures" element={[<Layout/>,<MonitoredEnvironment/>]}/>
          <Route path="/monitored-leitos" element={[<Layout/>,<MonitoredEnvironmentLeito/>]}/>
          <Route path="/leito/:id" element={[<Layout/>,<UpdateLeito/>]}/>
          <Route path="/report" element={[<Layout/>,<Report/>]}/>
       </Routes>
    </div>
  );
}

export default App;
