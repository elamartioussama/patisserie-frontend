import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
const UserEdit = () => {
    const localUser = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
    const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    tel: "",
    role: "",
    address: "",
    password: "",
    password_confirmation: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/${id}`);
        setUser({ ...res.data, password: "", password_confirmation: "" });
      } catch (err) {
        console.error("Erreur lors du chargement de l'utilisateur :", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("tel", user.tel);
    formData.append("role", user.role);
    formData.append("address", user.address);

    // N'ajoute le mot de passe que s’il est rempli et ≥ 6 caractères
    if (user.password && user.password.length >= 6) {
      formData.append("password", user.password);
      formData.append("password_confirmation", user.password_confirmation);
    }

    try {
      await axios.post(`http://localhost:8000/api/users/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Utilisateur modifié avec succès !");
      navigate('/dashbord');
      setError(null);
    } catch (err) {
      console.error("Erreur de modification :", err);
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
    <div className="container mt-4 ">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h2 className="text-center mb-4">Modifier un utilisateur</h2>
        <form onSubmit={handleSubmit} className="row">
          <div className="mb-3 col-md-6">
            <label>Nom</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" />
            {error?.name && <div className="text-danger">{error.name[0]}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label>Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" />
            {error?.email && <div className="text-danger">{error.email[0]}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label>Téléphone</label>
            <input type="text" name="tel" value={user.tel} onChange={handleChange} className="form-control" />
            {error?.tel && <div className="text-danger">{error.tel[0]}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label>Rôle</label>
            <select name="role" value={user.role} onChange={handleChange} className="form-control">
              <option value="">-- Choisir un rôle --</option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="assembleur">Assembleur</option>
              <option value="livreur">Livreur</option>
            </select>
            {error?.role && <div className="text-danger">{error.role[0]}</div>}
          </div>

          <div className="mb-3 col-md-12">
            <label>Adresse</label>
            <input type="text" name="address" value={user.address} onChange={handleChange} className="form-control" />
            {error?.address && <div className="text-danger">{error.address[0]}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label>Nouveau mot de passe (facultatif)</label>
            <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" />
            {error?.password && <div className="text-danger">{error.password[0]}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label>Confirmer le mot de passe</label>
            <input type="password" name="password_confirmation" value={user.password_confirmation} onChange={handleChange} className="form-control" />
          </div>

            <a href="/dashbord" className='btn btn-dark w-25'>retour</a>
        <span className='w-25'></span>
          <button type="submit" className="btn btn-dark w-50">Modifier</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default UserEdit;

