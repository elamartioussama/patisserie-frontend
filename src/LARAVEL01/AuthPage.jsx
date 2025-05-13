import React, {useEffect, useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '',password_confirmation:'' ,role:'client',tel:'',address:''});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
        // Si déjà connecté, redirige vers la page home correspondant à son rôle
        switch (user.role) {
            case 'admin':
                window.location.href = '/admin/home';
                break;
            case 'client':
                window.location.href = '/client/home';
                break;
            case 'assembleur':
                window.location.href = '/assembleur/home';
                break;
            case 'livreur':
                window.location.href = '/delivery/home';
                break;
            default:
                window.location.href = '/';
        }
    }
}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login', loginData);
      console.log('Login success:', res.data);
      const { token, user } = res.data;

            // Stocker le token dans le localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
      // Stocke token ou redirige ici
      switch (user.role) {
        case 'admin':
            window.location.href = '/admin/home';
            break;
        case 'client':
            window.location.href = '/client/home';
            break;
        case 'assembleur':
            window.location.href = '/assembleur/home';
            break;
        case 'livreur':
            window.location.href = '/delivery/home';
            break;
        default:
            window.location.href = '/';
            break;
      }
      // window.location.href = '/ListStagiaireApi';
    } catch (err) {
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Email ou mot de passe incorrect.");
    }
  };
}


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register', registerData);
      console.log('Register success:', res.data);
      // Stocke token ou redirige ici
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/client/home';
    } catch (err) {
      console.error('Register error:', err.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs justify-content-center mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Connexion
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Inscription
          </button>
        </li>
      </ul>

      <div className="row justify-content-center">
        <div className="col-md-6">
        {errorMessage && (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
        )}
          {activeTab === 'login' ? (
            
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label>Mot de passe</label>
                <input type="password" className="form-control" value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
              </div>
              <button type="submit" className="btn btn-dark w-100">Se connecter</button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label>Nom</label>
                <input type="text" className="form-control" value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label>Mot de passe</label>
                <input type="password" className="form-control" value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label>Mot de passe confirmée</label>
                <input type="password" className="form-control" value={registerData.password_confirmation}
                  onChange={(e) => setRegisterData({ ...registerData, password_confirmation: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label>Telephone</label>
                <input type="tel" className="form-control" value={registerData.tel}
                  onChange={(e) => setRegisterData({ ...registerData, tel: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label>Adress</label>
                <input type="text" className="form-control" value={registerData.address}
                  onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })} required />
              </div>
              <button type="submit" className="btn btn-dark w-100">S'inscrire</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthPage;