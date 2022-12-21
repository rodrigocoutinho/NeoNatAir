import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import SignInSide from './pages/SignInSide';
import SignUpSide from './pages/SignUpSide';
import Wellcome from './components/Wellcome';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import CreateLeitos from './components/CreateLeitos';
import MonitoredEnvironmente from './components/MonitoredEnvironment';
import Report from './components/Report';


function App() {
  return (
    <div className="App">
      <Navbar/>
       <Routes>
          <Route path="/" element={<SignInSide/>}/>
          <Route path="/signup" element={<SignUpSide/>}/> 
          <Route path="/wellcome" element={[<Layout/>,<Wellcome/>]}/> 
          <Route path="/leitoform" element={[<Layout/>,<CreateLeitos/>]}/>
          <Route path="/monitored-leitos" element={[<Layout/>,<MonitoredEnvironmente/>]}/>
          <Route path="/report" element={[<Layout/>,<Report/>]}/>
       </Routes>
    </div>
  );
}

export default App;
