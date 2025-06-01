import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      setError("Utilisateur non connecté");
      setLoading(false);
      return;
    }

    const user = JSON.parse(userString);

    if (!user?.id) {
      setError("ID utilisateur introuvable");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8000/api/orders/client/${user.id}`)
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Erreur lors de la récupération des commandes");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <><header>
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
              <a className="nav-link" href="/contact1" style={{ color: 'black' }}>
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
    <div className='container'>
        
      <h2 className='text-center m-5'>L'historique de mes commandes</h2>
      {orders.length === 0 && <p>Aucune commande trouvée.</p>}
      <ul className='row'>
        {orders.map(order => (
  <div key={order.id}className='col-md-4  card '>
    <h3>Commande N* {order.id}  </h3>
    <p>Statut: {order.status}</p>
    <p>Date: {new Date(order.created_at).toLocaleString()}</p>
    
    <h4>Produits :</h4>
    <ul>
      {order.items.map(item => (
        <li key={item.id}>
          {item.product?.name} :  {item.quantity} x  {item.product?.price} DH
        </li>
      ))}
    </ul>
    <br />
    <p>Total : {order.total_price}</p>
  </div>
))}

      </ul>
    </div>
    </>
  );
};

export default ClientOrders;
