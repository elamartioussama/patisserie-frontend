
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [orderId, setOrderId]   = useState(null);

  const localUser = JSON.parse(localStorage.getItem('user'));
  const userId    = localUser?.id;
  const navigate  = useNavigate();

  // 1️⃣ Chargement du panier
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        console.error("user_id manquant");
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.post('http://localhost:8000/api/check-cart', {
          user_id: userId,
        });
        setOrderId(data.order_id);       // ← Bien récupérer l’ID
        setCartItems(data.products);
      } catch (err) {
        console.error('Erreur fetchCart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  // 2️⃣ Met à jour quantités
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      const { data } = await axios.post('http://localhost:8000/api/update-cart', {
        user_id: userId,
        product_id: productId,
        quantity: newQty,
      });
      setCartItems(data.products);
    } catch (err) {
      alert(err.response?.data?.error || "Erreur mise à jour");
    }
  };

  // 3️⃣ Supprime un article
  const removeItem = async (productId) => {
    try {
      const { data } = await axios.post('http://localhost:8000/api/remove-from-cart', {
        user_id: userId,
        product_id: productId,
      });
      setCartItems(data.products);
    } catch (err) {
      console.error('Erreur removeItem:', err);
    }
  };

  // 4️⃣ Annuler la commande entière
  const handleCancelOrder = async () => {
    if (!orderId) return alert("Pas de commande à annuler");
    if (!window.confirm("Confirmez l'annulation ?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
      alert("Commande annulée");
      setCartItems([]);
      setOrderId(null);
      navigate("/productss");
    } catch (err) {
      console.error("Erreur annulation:", err);
      alert("Impossible d'annuler");
    }
  };

  // 5️⃣ Calcul du total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (loading) {
    return <div className="text-center py-10">Chargement du panier…</div>;
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
              <a className="nav-link" href="/contact1" style={{ color: 'black' }}>
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
    <div className="min-h-screen bg-[#fff8e1] py-10 px-4 md:px-20 ">

      <div className="flex justify-between mb-4 mt-3">
        <button
          onClick={() => navigate("/productss")}
          className="bg-blue-500 text-dark px-4 py-2 rounded hover:bg-blue-600 me-5"
        >
          Ajouter produits
        </button>
        
          <button className="bg-blue-500 text-dark px-4 py-2 rounded hover:bg-blue-600 me-5" onClick={() => navigate('/historique')}>
             Voir l’historique de mes commandes
        </button>
      
        
      </div>

      {cartItems.length === 0
        ? <p className="text-center text-gray-600">Votre panier est vide.</p>
        : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="bg-[#f3e884ec] text-black">
                <tr>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Produit</th>
                  <th className="py-2 px-4">Prix</th>
                  <th className="py-2 px-4">Quantité</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-t">
                    <td className="py-3 px-4">
                      <img
                        src={`http://localhost:8000/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded" width="80px"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4">{Number(item.price).toFixed(2)} DH</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 bg-red-400 text-dark rounded hover:bg-red-600"
                        >−</button>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={e => updateQuantity(item.id, parseInt(e.target.value, 10))}
                          className="w-14 text-center border rounded-md"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-green-500 text-dark rounded hover:bg-green-700"
                        >+</button>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {(Number(item.price) * item.quantity).toFixed(2)} DH
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="bg-red-500 text-dark px-3 py-1 rounded hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-6">
              <div className="bg-[#f3e884ec] px-6 py-4 rounded-xl text-xl font-bold">
                <strong className='me-2'>Total : {totalPrice.toFixed(2)} DH</strong>
                <button
                  onClick={handleCancelOrder}
                  className="bg-red-400 text-dark px-4 py-2 rounded hover:bg-red-600"
                >
                  Annuler la commande
              </button>
              </div>
               
            </div>
          </div>
        )}
    </div>
    </>
  );
};

export default Cart;







