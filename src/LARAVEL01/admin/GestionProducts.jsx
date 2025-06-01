// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';




const GestionProducts = () => {
 const [produits, setProducts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [category, setCategory] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [showResults, setShowResults] = useState(true);
  
  const resultRef = useRef(null); // 🔹 Crée une référence


  useEffect(() => {
    axios.get('http://localhost:8000/api/products') // Ajuste l'URL si besoin
      .then(res => setProducts(res.data))
      .catch(err => console.error('Erreur chargement produits :', err));
  }, []);
  useEffect(() => {
  // Charger les catégories
  axios.get('http://localhost:8000/api/categories') // cette route doit exister côté Laravel
    .then(res => setAllCategories(res.data))
    .catch(err => console.error('Erreur chargement catégories :', err));
}, []);
 const handleSearch1 = () => {
    console.log("Recherche avec nom:", searchName, "et catégorie:", category);

    // Exemple fetch
    fetch(`http://localhost:8000/api/products-search?name=${searchName}&category=${category}`)
      .then(res => res.json())
      .then(data => {
        console.log("Résultats reçus :", data);
        setProducts(data);
      })
      .catch(console.error);
  };
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:8000/api/products/${id}`);

    // Supprimer le produit de la liste localement
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));

    alert("Produit supprimé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert("Une erreur s'est produite lors de la suppression du produit.");
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
            placeholder="Rechercher un produit..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {allCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-dark w-100" onClick={handleSearch1}>Rechercher</button>
        </div>
        <div className="col-md-3">
            <a className="btn btn-dark w-100" href="/addproduct">Ajouter un produit</a>
        </div>
      </div>

    
      {showResults && (
  <div className="table-responsive">
    <table className="table table-striped table-hover align-middle" style={{ backgroundColor: '#f3e884ec' }}>
      <thead>
        <tr style={{ color: '#000', fontWeight: '600' }}>
          <th>Image</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Stock</th>
          <th>Catégorie</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody style={{borderCollapse: 'collapse'}}>
        {produits.map((produit) => (
          <tr key={produit.id} style={{ color: '#000' }}>
            <td style={{ width: '100px' }}>
              {produit.image ? (
                <img
                  src={`http://localhost:8000/${produit.image}`}
                  alt={produit.name}
                  style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}
                />
              ) : (
                <span style={{ fontStyle: 'italic', color: '#666' }}>Pas d'image</span>
              )}
            </td>
            <td>{produit.name}</td>
            <td >{produit.description}</td>
            <td>{produit.price}</td>
            <td>{produit.stock}</td>
            <td>{produit.category}</td>
            <td className="text-center " style={{ minWidth: '300px' }}>
              <a href={`/details-products/${produit.id}`} className="btn btn-dark btn-sm me-2 " style={{ minWidth: '70px' }}>
                Details
              </a>
              
              <a href={`/edit-product/${produit.id}`} className="btn btn-dark btn-sm me-2 " style={{ minWidth: '70px' }}>
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

export default GestionProducts;
