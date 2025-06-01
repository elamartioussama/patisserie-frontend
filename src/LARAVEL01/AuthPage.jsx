// import React, {useEffect, useState } from 'react';
// import axios from 'axios';

// const AuthPage = () => {
//   const [errorMessage, setErrorMessage] = useState('');

//   const [activeTab, setActiveTab] = useState('login');
//   const [loginData, setLoginData] = useState({ email: '', password: '' });
//   const [registerData, setRegisterData] = useState({ name: '', email: '', password: '',password_confirmation:'' ,role:'client',tel:'',address:''});

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (token && user) {
//         // Si déjà connecté, redirige vers la page home correspondant à son rôle
//         switch (user.role) {
//             case 'admin':
//                 window.location.href = '/admin/home';
//                 break;
//             case 'client':
//                 window.location.href = '/client/home';
//                 break;
//             case 'assembleur':
//                 window.location.href = '/assembleur/home';
//                 break;
//             case 'livreur':
//                 window.location.href = '/delivery/home';
//                 break;
//             default:
//                 window.location.href = '/';
//         }
//     }
// }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/login', loginData);
//       console.log('Login success:', res.data);
//       const { token, user } = res.data;

//             // Stocker le token dans le localStorage
//             localStorage.setItem('token', token);
//             localStorage.setItem('user', JSON.stringify(user));
//       // Stocke token ou redirige ici
//       switch (user.role) {
//         case 'admin':
//             window.location.href = '/admin/home';
//             break;
//         case 'client':
//             window.location.href = '/client/home';
//             break;
//         case 'assembleur':
//             window.location.href = '/assembleur/home';
//             break;
//         case 'livreur':
//             window.location.href = '/delivery/home';
//             break;
//         default:
//             window.location.href = '/';
//             break;
//       }
//       // window.location.href = '/ListStagiaireApi';
//     } catch (err) {
//       if (err.response?.data?.message) {
//         setErrorMessage(err.response.data.message);
//       } else {
//         setErrorMessage("Email ou mot de passe incorrect.");
//     }
//   };
// }


//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/register', registerData);
//       console.log('Register success:', res.data);
//       // Stocke token ou redirige ici
//       const { token, user } = res.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       window.location.href = '/client/home';
//     } catch (err) {
//       console.error('Register error:', err.response.data);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <ul className="nav nav-tabs justify-content-center mb-4">
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
//             onClick={() => setActiveTab('login')}
//           >
//             Connexion
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
//             onClick={() => setActiveTab('register')}
//           >
//             Inscription
//           </button>
//         </li>
//       </ul>

//       <div className="row justify-content-center">
//         <div className="col-md-6">
//         {errorMessage && (
//       <div className="alert alert-danger" role="alert">
//         {errorMessage}
//       </div>
//         )}
//           {activeTab === 'login' ? (
            
//             <form onSubmit={handleLogin}>
//               <div className="mb-3">
//                 <label>Email</label>
//                 <input type="email" className="form-control" value={loginData.email}
//                   onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
//               </div>
//               <div className="mb-3">
//                 <label>Mot de passe</label>
//                 <input type="password" className="form-control" value={loginData.password}
//                   onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
//               </div>
//               <button type="submit" className="btn btn-dark w-100">Se connecter</button>
//             </form>
//           ) : (
//             <form onSubmit={handleRegister}>
//               <div className="mb-3">
//                 <label>Nom</label>
//                 <input type="text" className="form-control" value={registerData.name}
//                   onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} required />
//               </div>
//               <div className="mb-3">
//                 <label>Email</label>
//                 <input type="email" className="form-control" value={registerData.email}
//                   onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} required />
//               </div>
//               <div className="mb-3">
//                 <label>Mot de passe</label>
//                 <input type="password" className="form-control" value={registerData.password}
//                   onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} required />
//               </div>
//               <div className="mb-3">
//                 <label>Mot de passe confirmée</label>
//                 <input type="password" className="form-control" value={registerData.password_confirmation}
//                   onChange={(e) => setRegisterData({ ...registerData, password_confirmation: e.target.value })} required />
//               </div>
//               <div className="mb-3">
//                 <label>Telephone</label>
//                 <input type="tel" className="form-control" value={registerData.tel}
//                   onChange={(e) => setRegisterData({ ...registerData, tel: e.target.value })} required />
//               </div>
//               <div className="mb-3">
//                 <label>Adress</label>
//                 <input type="text" className="form-control" value={registerData.address}
//                   onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })} required />
//               </div>
//               <button type="submit" className="btn btn-dark w-100">S'inscrire</button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AuthPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', password_confirmation: '', role: 'client', tel: '', address: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
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
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
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
    } catch (err) {
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Email ou mot de passe incorrect.");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register', registerData);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/client/home';
    } catch (err) {
      console.error('Register error:', err.response.data);
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
              <a className="nav-link" href="/productss" style={{ color: 'black' }}>
                Nos Produits
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact2" style={{ color: 'black' }}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Login à droite */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/login" style={{ color: 'black' }}>
              Login / Register
            </a>
          </li>
        </ul>
      </div>
    </nav>



      {/* <a href="/https://html.vecurosoft.com/grillino/demo/index-2.html">ooo</a>  */}
      
    </div>
        
      </header> 
    <div style={{
      backgroundColor: '#fffaf2',
      minHeight: '100vh',
      paddingTop: '60px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div className="container">
        <ul className="nav nav-tabs justify-content-center mb-4" style={{ borderBottom: 'none' }}>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
              style={{
                backgroundColor: activeTab === 'login' ? '#f3e884ec' : '#fff',
                border: '1px solid #f3e884ec',
                color: '#000',
                borderRadius: '10px 10px 0 0',
                padding: '10px 20px',
                marginRight: '5px',
                fontWeight: 'bold'
              }}
            >
              Connexion
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
              style={{
                backgroundColor: activeTab === 'register' ? '#f3e884ec' : '#fff',
                border: '1px solid #f3e884ec',
                color: '#000',
                borderRadius: '10px 10px 0 0',
                padding: '10px 20px',
                fontWeight: 'bold'
              }}
            >
              Inscription
            </button>
          </li>
        </ul>

        <div className="row justify-content-center">
          <div className="col-md-6" style={{
            backgroundColor: '#fff',
            border: '2px solid #f3e884ec',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
          }}>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} >
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
                <button type="submit" className="btn w-100" style={{ backgroundColor: '#f3e884ec', color: '#000', fontWeight: 'bold' }}>Se connecter</button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className='row'>
                <div className="mb-3 col-md-6">
                  <label>Nom</label>
                  <input type="text" className="form-control" value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} required />
                </div>
                <div className="mb-3 col-md-6">
                  <label>Email</label>
                  <input type="email" className="form-control" value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} required />
                </div>
                <div className="mb-3 col-md-6">
                  <label>Mot de passe</label>
                  <input type="password" className="form-control" value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} required />
                </div>
                <div className="mb-3 col-md-6">
                  <label>Mot de passe confirmée</label>
                  <input type="password" className="form-control" value={registerData.password_confirmation}
                    onChange={(e) => setRegisterData({ ...registerData, password_confirmation: e.target.value })} required />
                </div>
                <div className="mb-3 col-md-6">
                  <label>Téléphone</label>
                  <input type="tel" className="form-control" value={registerData.tel}
                    onChange={(e) => setRegisterData({ ...registerData, tel: e.target.value })} required />
                </div>
                <div className="mb-3 col-md-6">
                  <label>Adresse</label>
                  <input type="text" className="form-control" value={registerData.address}
                    onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })} required />
                </div>
                <button type="submit" className="btn w-100" style={{ backgroundColor: '#f3e884ec', color: '#000', fontWeight: 'bold' }}>S'inscrire</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default AuthPage;
