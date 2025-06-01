
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const AddProduct = () => {
const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  
  const localUser = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post("http://localhost:8000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // utile si tu utilises Laravel Sanctum
      });
      console.log("Produit ajouté :", res.data);
      setError(null);
      navigate('/Dashbord');
    } catch (err) {
      console.error("Erreur :", err);
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
      }
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
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h2 className="text-center mb-4">Ajouter un produit</h2>
        <form onSubmit={handleSubmit} className="row">
          <div className="mb-3 col-md-6">
            <label>Nom du produit</label>
            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
            {error?.name && <div className="text-danger">{error.name[0]}</div>}
          </div>
          <div className="mb-3 col-md-6">
            <label>Description</label>
            <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} />
            {error?.description && <div className="text-danger">{error.description[0]}</div>}
          </div>
          <div className="mb-3 col-md-6">
            <label>Prix (€)</label>
            <input type="number" step="0.01" className="form-control" onChange={(e) => setPrice(e.target.value)} />
            {error?.price && <div className="text-danger">{error.price[0]}</div>}
          </div>
          <div className="mb-3 col-md-6">
            <label>Stock</label>
            <input type="number" className="form-control" onChange={(e) => setStock(e.target.value)} />
            {error?.stock && <div className="text-danger">{error.stock[0]}</div>}
          </div>
          <div className="mb-3 col-md-6">
            <label>Catégorie</label>
            <input type="text" className="form-control" onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="mb-3 col-md-6">
            <label>Image</label>
            <input type="file" className="form-control"  onChange={(e) => setImage(e.target.files[0])} />
            {error?.image && <div className="text-danger">{error.image[0]}</div>}
          </div>
          <button type="submit" className="btn btn-dark w-100">Ajouter</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddProduct;
