import React, { useState } from "react";
import axios from "axios";

import { useParams, useNavigate } from 'react-router-dom';

const AddUser = () => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    tel: "",
    role: "",
    address: "",
    password: "",
    password_confirmation: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/users", form, {
        withCredentials: true,
      });
      console.log("Utilisateur ajouté :", res.data);
      setError(null);
      alert("Utilisateur ajouté avec succès !");
      navigate('/dashbord');
    } catch (err) {
      console.error("Erreur :", err);
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
      }
    }
  };

  return (
    <>
    <header>
      <div>
      <nav className="navbar navbar-expand-md navbar-light " style={{ backgroundColor: '#f3e884ec' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo à gauche */}
        <a className="navbar-brand" href="/" style={{ color: 'black', fontSize: '150%' }}>
          Les IIII Cerises
        </a>

        {/* Toggler pour petit écran */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Barre de navigation pour les liens */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/" style={{ color: 'black' }}>
                Acceuil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashbord" style={{ color: 'black' }}>
                Mon espace
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products" style={{ color: 'black' }}>
                Nos Produits
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact" style={{ color: 'black' }}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Login à droite */}
        
        <ul className="navbar-nav ms-auto">
          
              {/* <li className="nav-item">
                <a className="nav-link" href="/cart" style={{ color: 'black' }}>
                  <img src="/img/icons8-panier-26.png" alt="Panier" style={{ width: '25px', height: '25px' }} /> Panier
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/account" style={{ color: 'black' }}>
                  <img src="/img/icons8-utilisateur-48.png" alt="Mon Compte" style={{ width: '30px', height: '30px' }} /> {localUser.name}
                </a>
              </li>
            
        </ul>
      </div>
    </nav>



      {/* <a href="/https://html.vecurosoft.com/grillino/demo/index-2.html">ooo</a>  */}
      
    </div>
        
      </header>

    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h2 className="text-center mb-4">Ajouter un utilisateur</h2>
        <form onSubmit={handleSubmit} className="row">
          <div className="mb-3 col-md-6">
            <label>Nom</label>
            <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
            {error?.name && <div className="text-danger">{error.name[0]}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label>Email</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
            {error?.email && <div className="text-danger">{error.email[0]}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label>Mot de passe</label>
            <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} />
            {error?.password && <div className="text-danger">{error.password[0]}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label>Confirmation du mot de passe</label>
            <input type="password" className="form-control" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} />
          </div>

        <div className="mb-3 col-md-12">
            <label>Rôle</label>
            <select className="form-control" name="role" value={form.role} onChange={handleChange}>
              <option value="">-- Sélectionnez un rôle --</option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="assembleur">Assembleur</option>
              <option value="livreur">Livreur</option>
            </select>
            {error?.role && <div className="text-danger">{error.role[0]}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label>Téléphone</label>
            <input type="text" className="form-control" name="tel" value={form.tel} onChange={handleChange} />
            {error?.tel && <div className="text-danger">{error.tel[0]}</div>}
          </div>

          

          <div className="mb-3 col-md-6">
            <label>Adresse</label>
            <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} />
          </div>

          <a href="/dashbord" className='btn btn-dark w-25'>retour</a>
        <span className='w-25'></span>
          <button type="submit" className="btn btn-dark w-50">Ajouter</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddUser;

