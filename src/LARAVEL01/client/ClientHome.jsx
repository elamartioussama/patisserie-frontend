import React from 'react';
import axios from 'axios';

const ClientHome = () => {
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold">Bienvenue client!</h1>

            {/* code modifier debut */}
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
              <a className="nav-link" href="#main2" style={{ color: 'black' }}>
                Notre Pâtisserie
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#main666" style={{ color: 'black' }}>
                Nos Produits
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#main6" style={{ color: 'black' }}>
                Trouvez-nous
              </a>
            </li>
          </ul>
        </div>

        {/* Login à droite */}
        
        <ul className="navbar-nav ms-auto">
          
              <li className="nav-item">
                <a className="nav-link" href="/cart" style={{ color: 'black' }}>
                  <img src="cart-icon.png" alt="Panier" style={{ width: '30px', height: '30px' }} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/account" style={{ color: 'black' }}>
                  <img src="account-icon.png" alt="Mon Compte" style={{ width: '30px', height: '30px' }} />
                </a>
              </li>
            
        </ul>
      </div>
    </nav>



      {/* <a href="/https://html.vecurosoft.com/grillino/demo/index-2.html">ooo</a>  */}
      
    </div>
        
      </header>
            {/* code modifier fin */}


            <button
                onClick={handleLogout}
                className="px-4 py-2 text-black bg-red-500 rounded hover:bg-red-600"
            >
                Déconnexion
            </button>
        </div>
    );
};

export default ClientHome;