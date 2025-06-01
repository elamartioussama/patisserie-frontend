import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AdminOrderEdit() {
    const localUser = JSON.parse(localStorage.getItem('user'));
  const { orderId } = useParams();  // ici le paramètre doit être :orderId dans la route
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Charger la commande + ses items
    axios.get(`http://localhost:8000/api/orders/${orderId}`)
      .then(res => {
        setOrder(res.data);
        setItems(res.data.items);
      })
      .catch(() => alert('Commande introuvable'));

    // Charger tous les produits pour l’ajout
    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data));
  }, [orderId]);

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;
    const newItems = [...items];
    newItems[index].quantity = quantity;
    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const addProduct = (productId) => {
    if (items.find(item => item.product.id === productId)) {
      return alert('Produit déjà ajouté');
    }
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd) {
      setItems([...items, { product: productToAdd, quantity: 1 }]);
    }
  };

  const saveChanges = async () => {
    const updatedItems = items.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity
    }));

    try {
      await axios.put(`http://localhost:8000/api/orders/${orderId}/items`, { items: updatedItems });
      alert('Commande mise à jour avec succès');
      navigate('/dashbord'); // redirige vers la liste des commandes (adapter selon ta route)
    } catch (err) {
      alert('Erreur lors de la mise à jour');
    }
  };

  if (!order) return <div>Chargement...</div>;

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
    <div>
      <h2 className='text-center m-3'>Modifier commande N* {order.id}</h2>
      <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className='text-center'>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody className='text-center'>
          {items.map((item, i) => (
            <tr key={item.product.id}>
              <td>{item.product.name}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => updateQuantity(i, parseInt(e.target.value))}
                />
              </td>
              <td>
                <button className='btn btn-dark btn-sm me-2' onClick={() => removeItem(i)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div>
        <select className="form-select" defaultValue="" onChange={e => addProduct(parseInt(e.target.value))}>
          <option value="" disabled>Ajouter un produit</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <button className='btn btn-dark btn-sm m-2' onClick={saveChanges}>Enregistrer</button>
      <button className='btn btn-dark btn-sm m-2' onClick={() => navigate('/dashbord')}>Annuler</button>
    </div>
    </>
  );
}

export default AdminOrderEdit;

