// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';




const GestionUsers = () => {
 const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [role, setRole] = useState('');
  const [allRoles, setAllRoles] = useState([]);
  const [showResults, setShowResults] = useState(true);
  
  const resultRef = useRef(null); // 🔹 Crée une référence


  useEffect(() => {
    axios.get('http://localhost:8000/api/users') // Ajuste l'URL si besoin
      .then(res => setUsers(res.data))
      .catch(err => console.error('Erreur chargement users :', err));
  }, []);
  useEffect(() => {
  // Charger les catégories
  axios.get('http://localhost:8000/api/roles') // cette route doit exister côté Laravel
    .then(res => setAllRoles(res.data))
    .catch(err => console.error('Erreur chargement catégories :', err));
}, []);
 const handleSearch1 = () => {
    console.log("Recherche avec nom:", searchName, "et catégorie:", role);

    // Exemple fetch
    fetch(`http://localhost:8000/api/users-search?name=${searchName}&role=${role}`)
      .then(res => res.json())
      .then(data => {
        console.log("Résultats reçus :", data);
        setUsers(data);
      })
      .catch(console.error);
  };
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:8000/api/userss/${id}`);

    // Supprimer le produit de la liste localement
    setUsers((prevProducts) => prevProducts.filter((p) => p.id !== id));

    alert("Users supprimé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert("Une erreur s'est produite lors de la suppression du user.");
  }
};






  return (
    <>
    
      

      

    <div className="container py-2 mb-2" ref={resultRef}>
      {/* <h2 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>Nos Produits</h2> */}

        {/* 🔍 Barre de recherche et filtre */}
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un user..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Toutes les roles</option>
            {allRoles.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-dark w-100" onClick={handleSearch1}>Rechercher</button>
        </div>
        <div className="col-md-3">
            <a className="btn btn-dark w-100" href="/adduser">Ajouter un user</a>
        </div>
      </div>

    
      {showResults && (
  <div className="table-responsive">
    <table className="table table-striped table-hover align-middle" style={{ backgroundColor: '#f3e884ec' }}>
      <thead>
        <tr style={{ color: '#000', fontWeight: '600' }}>
          
          <th>Nom</th>
          <th>Email</th>
          <th>Role</th>
          <th>Tel</th>
          <th>Adresse</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody style={{borderCollapse: 'collapse'}}>
        {users.map((produit) => (
          <tr key={produit.id} style={{ color: '#000' }}>
            
            <td>{produit.name}</td>
            <td >{produit.email}</td>
            <td>{produit.role}</td>
            <td>{produit.tel}</td>
            <td>{produit.address}</td>
            <td className="text-center " style={{ minWidth: '300px' }}>
            
              
              <a href={`/edit-user/${produit.id}`} className="btn btn-dark btn-sm me-2 " style={{ minWidth: '70px' }}>
                Modifier
              </a>
              <button
                className="btn btn-dark btn-sm"
                style={{ minWidth: '70px' }}
                onClick={() => handleDelete(produit.id)}
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
    </>
  );
};

export default GestionUsers;