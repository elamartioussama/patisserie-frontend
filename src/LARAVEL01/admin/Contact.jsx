import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
    const localUser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    sujet: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/messages", formData);
      setSuccess("Message envoyé avec succès !");
      setFormData({ name: "", email: "", tel: "", sujet: "", message: "" });
    } catch (err) {
      setError("Erreur lors de l'envoi du message.");
      console.error(err);
    }
  };

  return (
    <>
     <header>
      <div>
      <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: '#f3e884ec' }}>
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
                <a className="nav-link" href="/accountadmin" style={{ color: 'black' }}>
                  <img src="/img/icons8-utilisateur-48.png" alt="Mon Compte" style={{ width: '30px', height: '30px' }} /> {localUser.name}
                </a>
              </li>
            
        </ul>
      </div>
    </nav>



      {/* <a href="/https://html.vecurosoft.com/grillino/demo/index-2.html">ooo</a>  */}
      
    </div>
        
      </header>
    <div className="container mt-5 ">
      <h2 className="text-center mb-4">Contactez-nous</h2>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className=" p-4 shadow-lg row">
        <div className="mb-3 col-md-6">
          <label>Nom</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3  col-md-6">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3  col-md-6">
          <label>Téléphone</label>
          <input type="tel" name="tel" className="form-control" value={formData.tel} onChange={handleChange} />
        </div>
        <div className="mb-3 col-md-6">
          <label>Sujet</label>
          <input type="text" name="sujet" className="form-control" value={formData.sujet} onChange={handleChange} required />
        </div>
        <div className="mb-3 col-md-12">
          <label>Message</label>
          <textarea name="message" className="form-control" rows="5" value={formData.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-dark w-100">Envoyer</button>
      </form>
    </div>
    </>
  );
};

export default Contact;
