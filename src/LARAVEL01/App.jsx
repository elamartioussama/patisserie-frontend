import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddStagiaire from './AddStagiaire';
import ListStagiaireApi from './ListStagiaireApi';
import EditStagiaire from './EditStagiaire';
import Acceuil from './Acceuil';
import AuthPage from './AuthPage';
import AdminHome from './admin/AdminHome';
import ClientHome from './client/ClientHome';
import ClientAccount from './client/ClientAccount';
import AdminAccount from './admin/AdminAccount';
import AssembleurHome from './assembleur/AssembleurHome';
import Products from './client/Products';
import ProductsA from './admin/Products';
import DeliveryHome from './delivery/DeliveryHome';
import PrivateRoute from './PrivateRoute';
import ProductDetail from './client/ProductDetail';
import ProductDetailA from './admin/ProductDetail';
import ProductAdd from './admin/ProductAdd';
import UserAdd from './admin/UserAdd';
import Dashbord from './admin/Dashbord';
import ProductEdit from './admin/ProductEdit';
import UserEdit from './admin/UserEdit';
import Cart from './client/Cart';
import Contact from './admin/Contact';
import Contact1 from './client/Contact';
import Contact2 from './Contact';
import His from './client/Histo';
import AdminOrderEdit from './admin/AdminOrderEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil/>} />
        <Route path="/login" element={<AuthPage/>} />
        <Route path="/contact2" element={<Contact2/>} />
        <Route path="/ListStagiaireApi" element={<PrivateRoute role="admin"><ListStagiaireApi /></PrivateRoute>} />
        <Route path="/edit/:id" element={<EditStagiaire />} />  Route pour modifier un stagiaire
        <Route path="/add" element={<AddStagiaire />} />
        

        <Route path="/admin/home" element={<PrivateRoute role="admin"><AdminHome /></PrivateRoute>}/>
        <Route path="/dashbord" element={<PrivateRoute role="admin"><Dashbord /></PrivateRoute>}/>
        <Route path="/accountadmin" element={<PrivateRoute role="admin"><AdminAccount /></PrivateRoute>}/>
        <Route path="/products" element={<PrivateRoute role="admin"><ProductsA /></PrivateRoute>}/>
        <Route path="/details-products/:id" element={<PrivateRoute role="admin"><ProductDetailA /></PrivateRoute>}/>
        <Route path="/edit-product/:id" element={<PrivateRoute role="admin"><ProductEdit /></PrivateRoute>}/>
        <Route path="/edit-user/:id" element={<PrivateRoute role="admin"><UserEdit /></PrivateRoute>}/>
        <Route path="/addproduct" element={<PrivateRoute role="admin"><ProductAdd /></PrivateRoute>}/>
        <Route path="/adduser" element={<PrivateRoute role="admin"><UserAdd /></PrivateRoute>}/>
        <Route path="/contact" element={<PrivateRoute role="admin"><Contact /></PrivateRoute>}/>
        {/* <Route path="/orders/edit/:orderIdact" element={<PrivateRoute role="admin"><AdminOrderEdit /></PrivateRoute>}/> */}
        <Route
          path="/orders/edit/:orderId"
          element={
            <PrivateRoute role="admin">
              <AdminOrderEdit />
            </PrivateRoute>
          }
        />


        <Route path="/client/home" element={<PrivateRoute role="client"><ClientHome /></PrivateRoute>}/>
        <Route path="/account" element={<PrivateRoute role="client"><ClientAccount /></PrivateRoute>}/>
        <Route path="/cart" element={<PrivateRoute role="client"><Cart /></PrivateRoute>}/>
        <Route path="/productss" element={<PrivateRoute role="client"><Products /></PrivateRoute>}/>
        <Route path="/details-productss/:id" element={<PrivateRoute role="client"><ProductDetail /></PrivateRoute>}/>
        <Route path="/contact1" element={<PrivateRoute role="client"><Contact1 /></PrivateRoute>}/>
        <Route path="/historique" element={<PrivateRoute role="client"><His /></PrivateRoute>}/>

        <Route path="/assembleur/home" element={<PrivateRoute role="assembleur"><AssembleurHome /></PrivateRoute>}/>
        <Route path="/delivery/home" element={<PrivateRoute role="livreur"><DeliveryHome /></PrivateRoute>}/>
                
      </Routes>
    </BrowserRouter>
  );
}

export default App;