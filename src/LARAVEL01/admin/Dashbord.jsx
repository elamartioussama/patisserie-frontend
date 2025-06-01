import React, { useState } from 'react';
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaEnvelope, FaCalendarCheck } from 'react-icons/fa';
import GestionProducts from './GestionProducts';
import GestionUsers from './GestionUsers';
import GestionMessages from './GestionMessages';
import GestionOrders from './GestionOrders';
import DashboardStats from './DashboardStats';

function Dashbord() {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardStats/>;
      case 'produits':
        return <GestionProducts />;
      case 'utilisateurs':
        return <GestionUsers />;
      case 'messages':
        return <GestionMessages/>;
      case 'reservations':
        return <GestionOrders/>;
      default:
        return null;
    }
  };

  return (
    <>
      {/* HEADER */}
      <header>
        <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: '#f3e884ec' }}>
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <a className="navbar-brand" href="/" style={{ color: 'black', fontSize: '150%' }}>
              Les IIII Cerises
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><a className="nav-link" href="/" style={{ color: 'black' }}>Accueil</a></li>
                <li className="nav-item"><a className="nav-link" href="/dashbord" style={{ color: 'black' }}>Mon espace</a></li>
                <li className="nav-item"><a className="nav-link" href="/products" style={{ color: 'black' }}>Nos Produits</a></li>
                <li className="nav-item"><a className="nav-link" href="/contact" style={{ color: 'black' }}>Contact</a></li>
              </ul>
            </div>
            <ul className="navbar-nav ms-auto">
              {/* <li className="nav-item">
                <a className="nav-link" href="/cart" style={{ color: 'black' }}>
                  <img src="/img/icons8-panier-26.png" alt="Panier" style={{ width: '25px' }} /> Panier
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/account" style={{ color: 'black' }}>
                  <img src="/img/icons8-utilisateur-48.png" alt="Compte" style={{ width: '30px' }} /> {localUser.name}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* DASHBOARD */}
      <div className="container-fluid" style={{ backgroundColor: 'white' }}>
        <div className="row min-vh-100" style={{ minWidth: '100%' }}>
          {/* SIDEBAR (col-3) */}
          <div className="col-md-2 bg-white p-4 shadow-sm">
            <nav className="nav flex-column">
              <button onClick={() => setActiveSection('dashboard')} className={`btn text-start mb-2 ${activeSection === 'dashboard' ? 'btn-dark text-white' : 'btn-outline-dark'}`}>
                <FaTachometerAlt className="me-2" /> Dashboard
              </button>
              <button onClick={() => setActiveSection('produits')} className={`btn text-start mb-2 ${activeSection === 'produits' ? 'btn-dark text-white' : 'btn-outline-dark'}`}>
                <FaBoxOpen className="me-2" /> Produits
              </button>
              <button onClick={() => setActiveSection('utilisateurs')} className={`btn text-start mb-2 ${activeSection === 'utilisateurs' ? 'btn-dark text-white' : 'btn-outline-dark'}`}>
                <FaUsers className="me-2" /> Utilisateurs
              </button>
              <button onClick={() => setActiveSection('messages')} className={`btn text-start mb-2 ${activeSection === 'messages' ? 'btn-dark text-white' : 'btn-outline-dark'}`}>
                <FaEnvelope className="me-2" /> Messages
              </button>
              <button onClick={() => setActiveSection('reservations')} className={`btn text-start mb-2 ${activeSection === 'reservations' ? 'btn-dark text-white' : 'btn-outline-dark'}`}>
                <FaCalendarCheck className="me-2" /> Commandes
              </button>
            </nav>
          </div>

          {/* CONTENU PRINCIPAL (col-9) */}
          <div className="col-md-10 p-5">
            {renderSection()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashbord;
