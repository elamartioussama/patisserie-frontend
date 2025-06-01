import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GestionMessages = () => {
   const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/admin/messages`, {
        params: { search, date }
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des messages :", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [search, date]);

  return (
    <div className="container mt-4">
      <div className=' row'>
        <div className='col-md-8'>
<input
        type="text"
        className="form-control mb-3 "
        placeholder="Rechercher par nom, email ou téléphone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
        </div>
        <div className='col-md-4'>
   <input
            type="date"
            className="form-control "
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      
       
       
       
        </div>
        <div className="table-responsive">
      <table className="table table-striped table-hover align-middle" style={{ backgroundColor: '#f3e884ec' }}>
        <thead >
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Sujet</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.tel || "-"}</td>
                <td>{msg.sujet}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Aucun message trouvé</td>
            </tr>
          )}
        </tbody>
      </table></div>
    </div>
  );
};

export default GestionMessages;
