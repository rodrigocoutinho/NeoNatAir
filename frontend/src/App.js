import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import SignInSide from './pages/SignInSide';
import SignUpSide from './pages/SignUpSide';
import Wellcome from './components/Wellcome';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import CreateEnvironmente from './components/CreateEnvironment';
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
          <Route path="/parametros-form/:id" element={[<Layout/>,<CreateEnvironmente/>]}/>
          <Route path="/ambientes" element={[<Layout/>,<MonitoredEnvironmente/>]}/>
          <Route path="/report" element={[<Layout/>,<Report/>]}/>
       </Routes>
    </div>
  );
}

export default App;
