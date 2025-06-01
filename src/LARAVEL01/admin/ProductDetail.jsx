import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement du produit :", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (!product) return <div className="text-center mt-5 text-danger">Produit non trouvé</div>;

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

      <main className="container my-5">
        <div className="product-card">
          <div className="product-image">
            {product.image && (
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
              />
            )}
          </div>
          <div className="product-details">
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="category">Catégorie : {product.category}</p>
            
            <p className="price">{product.price} DH</p>
            <p className="stock">Quantite disponible : {product.stock}</p>
            <div className="buttons">
              <button onClick={() => navigate(-1)} className="btn btn-return">Retour</button>
              <a className="btn btn-add-cart d-flex justify-content-center  align-items-center" href={`/edit-product/${product.id}`}>Modifier</a>
              
            </div>
          </div>
        </div>
      </main>

      <style>{`
        body {
          background-color: #fffefa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
        }
        .product-card {
          display: flex;
          background: #fffbe6;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          overflow: hidden;
          max-width: 900px;
          margin: 0 auto;
        }
        .product-image {
          flex: 1 1 40%;
          min-width: 300px;
          max-height: 400px;
          overflow: hidden;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
        .product-image:hover img {
          transform: scale(1.05);
        }
        .product-details {
          flex: 1 1 60%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .product-details h2 {
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #3a3a3a;
        }
        .category {
          font-weight: 600;
          color: #5a5a5a;
          margin-bottom: 1rem;
          font-size: 1rem;
        }
        .description {
          flex-grow: 1;
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          color: #333;
        }
        .price {
          font-size: 1.8rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 1rem;
        }
        .stock {
          font-size: 1rem;
          margin-bottom: 1.5rem;
          color: #444;
        }
        .buttons {
          display: flex;
          gap: 1rem;
        }
        .btn {
          cursor: pointer;
          font-weight: 600;
          border-radius: 6px;
          padding: 0.6rem 1.4rem;
          border: none;
          font-size: 1rem;
          transition: background-color 0.3s ease;
          flex: 1;
          max-width: 140px;
          text-align: center;
        }
        .btn-return {
          background-color: black;
          border: 2px solid transparent;
          color: white;
        }
        .btn-return:hover {
          background-color: #f3e884ec;
          color: black;
          
        }
        .btn-add-cart {
          background-color:black ;
          color: white;
          border: 2px solid transparent;
        }
        .btn-add-cart:hover {
          background-color:  #f3e884ec;
          color: black;
        }
        @media (max-width: 768px) {
          .product-card {
            flex-direction: column;
            max-width: 100%;
          }
          .product-image {
            min-height: 250px;
            max-height: 300px;
          }
          .buttons {
            justify-content: space-between;
          }
          .btn {
            max-width: 48%;
          }
        }
      `}</style>
    </>
  );
}

export default ProductDetail;



