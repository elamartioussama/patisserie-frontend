import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductEdit = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const localUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [produit, setProduit] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: ''
  });

  const [allCategories, setAllCategories] = useState([]);
  const [erreurs, setErreurs] = useState(null);

  useEffect(() => {
    // Charger le produit
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => setProduit(res.data))
      .catch(err => console.error('Erreur chargement produit', err));

    // Charger les catégories
    axios.get('http://localhost:8000/api/categories')
      .then(res => setAllCategories(res.data))
      .catch(err => console.error('Erreur chargement catégories', err));
  }, [id]);

  const handleChange = (e) => {
    setProduit({ ...produit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErreurs(null);

  const formData = new FormData();
  formData.append('name', produit.name);
  formData.append('description', produit.description || '');
  formData.append('price', produit.price);
  formData.append('stock', produit.stock);
  formData.append('category', produit.category || '');
  
  if (produit.imageFile) {
    formData.append('image', produit.imageFile); // Fichier image réel
  }

  try {
    await axios.post(`http://localhost:8000/api/products/${id}?_method=PUT`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert("Produit modifié avec succès !");
    navigate('/dashbord');
  } catch (err) {
    if (err.response?.data?.errors) {
      setErreurs(err.response.data.errors);
    } else {
      alert("Erreur lors de la mise à jour.");
    }
  }
};
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Affichage en local
    const imageURL = URL.createObjectURL(file);
    setProduit(prev => ({ ...prev, imagePreview: imageURL, imageFile: file }));
  }
};



  return (
    <>
    <header>
        <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: '#f3e884ec' }}>
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <a className="navbar-brand" href="/" style={{ color: 'black', fontSize: '1.5rem', fontWeight: '700' }}>
              Les IIII Cerises
            </a>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><a className="nav-link" href="/" style={{ color: 'black' }}>Acceuil</a></li>
                <li className="nav-item"><a className="nav-link" href="/dashbord" style={{ color: 'black' }}>Mon espace</a></li>
                <li className="nav-item"><a className="nav-link" href="/products" style={{ color: 'black' }}>Nos Produits</a></li>
                <li className="nav-item"><a className="nav-link" href="/contact" style={{ color: 'black' }}>Contact</a></li>
              </ul>
            </div>
            <ul className="navbar-nav ms-auto">
              {/* <li className="nav-item">
                <a className="nav-link" href="/cart" style={{ color: 'black' }}>
                  <img src="/img/icons8-panier-26.png" alt="Panier" style={{ width: 25 }} /> Panier
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/account" style={{ color: 'black' }}>
                  <img src="/img/icons8-utilisateur-48.png" alt="Compte" style={{ width: 30 }} /> {localUser?.name}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

    <div className="container mt-4">
      <h2 className="mb-4">Modifier le produit</h2>

      <form onSubmit={handleSubmit} className='row'>
        <div className="mb-3 col-md-6">
          <label>Nom</label>
          <input type="text" className="form-control" name="name" value={produit.name} onChange={handleChange} />
          {erreurs?.name && <small className="text-danger">{erreurs.name[0]}</small>}
        </div>

        <div className="mb-3 col-md-6">
          <label>Description</label>
          <textarea className="form-control" name="description" value={produit.description || ''} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3 col-md-6">
          <label>Prix (DH)</label>
          <input type="number" className="form-control" name="price" value={produit.price} onChange={handleChange} />
          {erreurs?.price && <small className="text-danger">{erreurs.price[0]}</small>}
        </div>

        <div className="mb-3 col-md-6">
          <label>Stock</label>
          <input type="number" className="form-control" name="stock" value={produit.stock} onChange={handleChange} />
          {erreurs?.stock && <small className="text-danger">{erreurs.stock[0]}</small>}
        </div>

        <div className="mb-3">
          <label>Catégorie</label>
          <select className="form-select" name="category" value={produit.category || ''} onChange={handleChange}>
            <option value="">Sélectionner</option>
            {allCategories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

       <div className="mb-3 row align-items-center">
  <div className="col-md-4">
    {produit.image ? (
      <img
        src={`http://localhost:8000/${produit.image}`}
        alt="Produit"
        className="img-thumbnail"
        style={{ maxHeight: '120px' }}
      />
    ) : (
      <p>Aucune image</p>
    )}
  </div>

  <div className="col-md-8">
    <label>Nouveau image</label>
    <input
      type="file"
      className="form-control"
      accept="image/*"
      onChange={handleFileChange}
    />
  </div>
</div>
        
        <a href="/dashbord" className='btn btn-dark col-md-4'>retour</a>
        <span className=' col-md-1'></span>
        <button type="submit" className="btn btn-dark  col-md-7">Enregistrer</button>
        
      </form>
    </div>
    </>
  );
};

export default ProductEdit;
