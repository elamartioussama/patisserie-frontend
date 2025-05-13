import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddStagiaire from './AddStagiaire';
import ListStagiaireApi from './ListStagiaireApi';
import EditStagiaire from './EditStagiaire';
import Acceuil from './Acceuil';
import AuthPage from './AuthPage';
import AdminHome from './admin/AdminHome';
import ClientHome from './client/ClientHome';
import AssembleurHome from './assembleur/AssembleurHome';
import DeliveryHome from './delivery/DeliveryHome';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil/>} />
        <Route path="/login" element={<AuthPage/>} />
        <Route path="/ListStagiaireApi" element={<PrivateRoute role="admin"><ListStagiaireApi /></PrivateRoute>} />
        <Route path="/edit/:id" element={<EditStagiaire />} />  Route pour modifier un stagiaire
        <Route path="/add" element={<AddStagiaire />} />
        

        <Route path="/admin/home" element={<PrivateRoute role="admin"><AdminHome /></PrivateRoute>}/>
        <Route path="/client/home" element={<PrivateRoute role="client"><ClientHome /></PrivateRoute>}/>
        <Route path="/assembleur/home" element={<PrivateRoute role="assembleur"><AssembleurHome /></PrivateRoute>}/>
        <Route path="/delivery/home" element={<PrivateRoute role="livreur"><DeliveryHome /></PrivateRoute>}/>
                
      </Routes>
    </BrowserRouter>
  );
}

export default App;