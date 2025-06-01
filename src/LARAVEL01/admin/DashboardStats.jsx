import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard-stats')
      .then(res => {
        setStats(res.data);
      })
      .catch(err => {
        console.error('Erreur chargement stats :', err);
      });
  }, []);

  if (!stats) return <div>Chargement...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div className="bg-yellow-100 p-4 rounded shadow">Utilisateurs : {stats.users}</div>
      <div className="bg-pink-100 p-4 rounded shadow">Produits : {stats.products}</div>
      <div className="bg-green-100 p-4 rounded shadow">Commandes : {stats.orders}</div>
      <div className="bg-orange-100 p-4 rounded shadow">Commandes n attente : {stats.orders_pending}</div>
      <div className="bg-blue-100 p-4 rounded shadow">Commandes prêtes : {stats.orders_ready}</div>
      <div className="bg-purple-100 p-4 rounded shadow">Revenu aujourd'hui : {stats.revenue_today} DH</div>
      <div className="bg-purple-200 p-4 rounded shadow">Revenu cette semaine : {stats.revenue_week} DH</div>
      <div className="bg-purple-300 p-4 rounded shadow">Revenu ce mois : {stats.revenue_month} DH</div>
    </div>
  );
};

export default DashboardStats;

