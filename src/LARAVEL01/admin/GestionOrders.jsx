import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GestionOrders() {
    const navigate = useNavigate(); 
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // état sélectionné pour filtrer
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchOrders();
    setExpandedOrderId(null); // Ferme le détail à chaque nouvelle recherche
  }, [search, date, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders', {
        params: { search, date, status: statusFilter },
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes :', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette commande ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/orders/${id}`, {
          withCredentials: true,
        });
        fetchOrders();
        if (expandedOrderId === id) setExpandedOrderId(null);
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
      }
    }
  };

  const handleToggleDetails = (id) => {
    if (expandedOrderId === id) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(id);
      const order = orders.find((o) => o.id === id);
      if (order) setNewStatus(order.status);
    }
  };

const handleStatusChange = async (orderId, status) => {
  try {
    await axios.put(
      `http://localhost:8000/api/orders/${orderId}/status`,
      { status },
      { withCredentials: true }
    );
    alert('Statut mis à jour');
    fetchOrders();
  } catch (err) {
    console.error('Erreur mise à jour statut :', err);
  }
};
const handleDownloadTicket = (orderId) => {
  window.location.href = `http://localhost:8000/api/orders/${orderId}/pdf`;
};
  return (
    <div className="admin-orders">
      <div className="mb-3  row">
        <div className='col-md-6'>
<input
          className="form-control"
          type="text"
          placeholder="Recherche nom, email, tel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ minWidth: '200px' }}
        />
        </div>
        <div className='col-md-3'>
 <input
          className="form-control"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ maxWidth: '180px' }}
        />
        </div>
        <div className='col-md-3'>
<select
          className="form-select "
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: '180px' }}
        >
          <option value="">Tous les statuts</option>
          <option value="en_attente">En attente</option>
          <option value="en_cours">Acceptée</option>
          <option value="prête">Prête</option>
          <option value="livrée">Livrée</option>
        </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle" style={{ backgroundColor: '#f3e884ec' }}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.user?.name}</td>
                  <td>{order.user?.tel}</td>
                  <td>{order.total_price} DH</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className='d-flex'>
                    <button
                      className="btn btn-dark btn-sm me-2"
                      onClick={() => handleToggleDetails(order.id)}
                    >
                      {expandedOrderId === order.id ? 'Cacher' : '👁 Details'}
                    </button>
                    <button
                      className="btn btn-dark btn-sm me-2"
                      onClick={() => handleDelete(order.id)}
                    >
                      Supprimer
                    </button>
                    <button className="btn btn-dark btn-sm me-2" onClick={() => navigate(`/orders/edit/${order.id}`)}>
                  Modifier commande
                </button>
                    <div className="d-flex flex-wrap gap-2">
  {order.status === 'en_attente' && (
    <button
      className="btn btn-dark btn-sm"
      onClick={() => handleStatusChange(order.id, 'en_cours')}
    >
      Confirmee
    </button>
  )}

  {order.status === 'en_cours' && (
    <button
      className="btn btn-dark btn-sm"
      onClick={() => handleStatusChange(order.id, 'prête')}
    >
      prête
    </button>
  )}

  {order.status === 'prête' && (
    <button
      className="btn btn-dark btn-sm"
      onClick={() => handleStatusChange(order.id, 'livrée')}
    >
      livrée
    </button>
  )}

  
</div>
<button className="btn btn-dark btn-sm ms-2"
    onClick={() => handleDownloadTicket(order.id)}
    
  >
    pdf
  </button>
                  </td>
                </tr>

                {expandedOrderId === order.id && (
                  <tr style={{ backgroundColor: '#f9f9f9' }}>
                    <td colSpan="6" style={{ padding: '1rem' }}>
                      <h4>Détails du commande de  {order.user?.name}</h4>
                      <p></p>
                      <p><strong>Date :</strong> {new Date(order.created_at).toLocaleString()}</p>

                      <h5>Produits :</h5>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.product.name} : {item.quantity} × {item.product.price} DH
                          </li>
                        ))}
                      </ul>

                      <p><strong>Total :</strong> {order.total_price} DH</p>

                      <h5>Changer le statut :</h5>
<div className="d-flex flex-wrap gap-2">
  {order.status === 'en_attente' && (
    <button
      className="btn btn-dark btn-sm"
      onClick={() => handleStatusChange(order.id, 'en_cours')}
    >
      Confirmee
    </button>
  )}

  {order.status === 'en_cours' && (
    <button
      className="btn btn-dark btn-sm"
      onClick={() => handleStatusChange(order.id, 'prête')}
    >
      prête
    </button>
  )}

  {order.status === 'prête' && (
    <button
      className="btn btn-dark btn-sm"
      onClick={() => handleStatusChange(order.id, 'livrée')}
    >
      livrée
    </button>
  )}

  
</div>
 {/* <button
    onClick={() => handleDownloadTicket(order.id)}
    
  >
    pdf
  </button> */}

                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GestionOrders;


