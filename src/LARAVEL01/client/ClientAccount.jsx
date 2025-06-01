
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editData, setEditData] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (localUser) {
      axios.get(`http://localhost:8000/api/users/${localUser.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser(res.data);
        setEditData(res.data);
      });
    }
  }, []);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/api/users/${user.id}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setMessage("Profil mis à jour avec succès.");
      setError('');
    } catch (err) {
      setMessage('');
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/users/${user.id}/password`, {
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
        new_password_confirmation: passwordData.new_password_confirmation,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Mot de passe changé avec succès.");
      setError('');
      setPasswordData({ old_password: '', new_password: '', new_password_confirmation: '' });
      setShowPasswordFields(false);
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || "Erreur lors du changement de mot de passe.");
    }
  };
  const handleLogout = async () => {
        try {
            // Envoyer la requête logout
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Nettoyer le localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Rediriger vers la page de login
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de la déconnexion', error);
        }
    }
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
              <a className="nav-link" href="/productss" style={{ color: 'black' }}>
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
          
              <li className="nav-item">
                <a className="nav-link" href="/cart" style={{ color: 'black' }}>
                  <img src="/img/icons8-panier-26.png" alt="Panier" style={{ width: '25px', height: '25px' }} /> Panier
                </a>
              </li>
            
        </ul>
      </div>
    </nav> 
    </div>
        
      </header>
    <div className="container mt-5">
      <h2 className="text-center mb-4">🧁 Mes informations</h2>
      {(message || error) && (
        <div className={`alert ${message ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message || error}
        </div>
      )}
      <div className="row">
        {/* Carte gauche */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3" style={{ backgroundColor: '#fffbe6', borderRadius: '20px' }}>
             <div className="card-body text-center">
               <h5 className="card-title">{user.name}</h5>
               <p className="card-text"><strong>Email:</strong> {user.email}</p>
               <p className="card-text"><strong>Téléphone:</strong> {user.tel || '-'}</p>
               <p className="card-text"><strong>Adresse:</strong> {user.address || '-'}</p>
             </div>
           </div>
          
           {/* Bouton afficher mot de passe */}
            <button className="btn btn-outline-dark w-100 mt-4 " onClick={() => setShowPasswordFields(!showPasswordFields)}>
              {showPasswordFields ? " Fermer changement mot de passe" : "Changer le Mot de passe "}
            </button>
            <button
                onClick={handleLogout}
                className="btn btn-outline-dark w-100 mt-4 mb-4"
            >
                Déconnexion
            </button>
        </div>

        {/* Formulaire de droite */}
        <div className="col-md-8 mb-4">
          <div className="card p-4 shadow rounded" style={{ border: '2px solid black' }}>
            <form onSubmit={handleUpdate}>
              <div className="row mb-3">
                <div className="col-12">
                  <label>Nom</label>
                  <input className="form-control" name="name" value={editData.name || ''} onChange={handleChange} />
                </div>
                <div className="col">
                  <label>Email</label>
                  <input className="form-control" name="email" value={editData.email || ''} onChange={handleChange} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label>Téléphone</label>
                  <input className="form-control" name="tel" value={editData.tel || ''} onChange={handleChange} />
                </div>
                <div className="col">
                  <label>Adresse</label>
                  <input className="form-control" name="address" value={editData.address || ''} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className="btn w-100 mb-3" style={{ backgroundColor: '#f3e884ec', border: '1px solid black' }}>Enregistrer les modifications</button>
            </form>


            {/* Bloc mot de passe */}
            {showPasswordFields && (
              <form onSubmit={handlePasswordChange} className="mt-4">
                <div className="mb-3">
                  <label>Ancien mot de passe</label>
                  <input type="password" className="form-control" value={passwordData.old_password}
                    onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label>Nouveau mot de passe</label>
                  <input type="password" className="form-control" value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label>Confirmation du nouveau mot de passe</label>
                  <input type="password" className="form-control" value={passwordData.new_password_confirmation}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })} required />
                </div>
                <button type="submit" className="btn w-100" style={{ backgroundColor: '#f3e884ec', border: '1px solid black' }}>Enregistrer mot de passe</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;

