import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoriqueCommandes() {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchHistorique();
  }, []);

  const fetchHistorique = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/client/orders', {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Erreur chargement historique :', err);
    }
  };

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container mt-4">
      <h2>📜 Historique de mes commandes</h2>
      {orders.length === 0 ? (
        <p>Aucune commande passée.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>{order.total_price} DH</td>
                    <td>{order.status}</td>
                    <td>
                      <button className="btn btn-sm btn-dark" onClick={() => toggleDetails(order.id)}>
                        {expandedId === order.id ? 'Cacher' : 'Détails'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === order.id && (
                    <tr>
                      <td colSpan="4">
                        <h5>Détails :</h5>
                        <ul>
                          {order.items.map((item) => (
                            <li key={item.id}>
                              {item.product.name} × {item.quantity} = {item.product.price * item.quantity} DH
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoriqueCommandes;
