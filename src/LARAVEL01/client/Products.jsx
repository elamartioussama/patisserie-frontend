import React, { useEffect,useRef, useState } from 'react';
import axios from 'axios';
import './Produits.css';


const Produits = () => {
  const localUser = JSON.parse(localStorage.getItem('user'));

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
  const handleSearch = (forcedCategory = category, forcedName = searchName) => {
  axios
    .get('http://localhost:8000/api/products-search', {
      params: {
        name: forcedName,
        category: forcedCategory,
      },
    })
    .then((res) => {
       console.log('Résultats reçus :', res.data); 
      setProducts(res.data);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      // setShowResults(true);
    })
    .catch((err) => console.error('Erreur de recherche :', err));
    console.log('Recherche avec nom:', searchName, 'et catégorie:', category);


};
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
   
 const handleAddToCart = (product) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  if (!localUser) {
    alert('Connectez-vous pour ajouter un produit au panier');
    return;
  }

  axios.post('http://localhost:8000/api/cart/add', {
    user_id: localUser.id,
    product_id: product.id,
    quantity: 1,
  })
  .then(res => {
    
  })
  .catch(err => {
    alert('Erreur ajout panier');
    alert(localUser.id);
  });
};



  return (
    <>
    <header>
      <div>
      <nav className="navbar navbar-expand-md navbar-light " style={{ backgroundColor: '#f3e884ec' }}>
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
              <a className="nav-link" href="/productss" style={{ color: 'black' }}>
                Nos Produits
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact1" style={{ color: 'black' }}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Login à droite */}
        
        <ul className="navbar-nav ms-auto">
          
              <li className="nav-item">
                <a className="nav-link" href="/cart" style={{ color: 'black' }}>
                  <img src="/img/icons8-panier-26.png" alt="Panier" style={{ width: '25px', height: '25px' }} /> Panier
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/account" style={{ color: 'black' }}>
                  <img src="/img/icons8-utilisateur-48.png" alt="Mon Compte" style={{ width: '30px', height: '30px' }} /> {localUser.name}
                </a>
              </li>
            
        </ul>
      </div>
    </nav>



      {/* <a href="/https://html.vecurosoft.com/grillino/demo/index-2.html">ooo</a>  */}
      
    </div>
        
      </header>
      {/* lien */}
      <div className="container text-center category-menu my-1 overflow-auto" style={{ whiteSpace: 'nowrap' }}>
  <button
    className={`btn btn-outline-dark me-2 mb-1 ${category === '' ? 'active' : ''}`}
    onClick={() => {
      setCategory('');
      handleSearch(); // afficher tous les produits
    }}
  >
    Toutes les catégories
  </button>
  {allCategories.map((cat, idx) => (
    <button
      key={idx}
      className={`btn btn-outline-dark me-2 mb-2  ${category === cat ? 'active' : ''}`}
      onClick={() => {
  setCategory(cat);       // pour l’état
  setSearchName('');      // optionnel
  handleSearch(cat, '');  // forcer la recherche avec cat immédiatement
}}
    >
      {cat}
    </button>
  ))}
</div>
<div className="container my-5 mb-5">
  <div className="category-grid">
    {allCategories.map((cat, idx) => (
      <div
        key={idx}
        className="category-item"
       onClick={() => {
  setCategory(cat);       // pour l’état
  setSearchName('');      // optionnel
  handleSearch(cat, '');  // forcer la recherche avec cat immédiatement
}}
        style={{ cursor: 'pointer' }}
      >
        <img src={`/img/categories/${cat}.jpg`} alt={cat} />
        <div className="category-overlay">
          <p>{cat}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      

      

    <div className="container py-1 mb-2" ref={resultRef}>
      {/* <h2 className="text-center mb-5" style={{ color: '#333', fontWeight: 'bold' }}>Nos Produits</h2> */}

        {/* 🔍 Barre de recherche et filtre */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un produit..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
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
        <div className="col-md-4">
          <button className="btn btn-dark w-100" onClick={handleSearch1}>Rechercher</button>
        </div>
      </div>

    
     {showResults && (
  <div className="row" >
    {produits.map((produit) => (
      <div className="col-md-4 mb-4" key={produit.id}>
        <div
          className="card h-100 shadow"
          style={{
            borderRadius: '1rem',
            backgroundColor: '#fef6dc', // même fond partout
            overflow: 'hidden',
            padding: '1rem',
          }}
        >
          {produit.image && (
            <div style={{ marginBottom: '1rem' }}>
              <img
                src={`http://localhost:8000/${produit.image}`}
                alt={produit.name}
                className="img-fluid"
                style={{
                  borderRadius: '0.75rem',
                  height: '370px',
                  width: '100%',
                  objectFit: 'cover',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>
          )}
          <div style={{ fontSize: '0.9rem' }}>
            <h5 className="mb-2" style={{ fontWeight: 'bold', color: '#333' }}>
              {produit.name}
            </h5>
            {/* <p className="text-muted mb-1">{produit.description}</p> */}
            <p className="mb-1"><strong>Prix:</strong> {produit.price} DH</p>
            {/* <p className="mb-1"><strong>Stock:</strong> {produit.stock}</p>
            <p className="mb-3"><strong>Catégorie:</strong> {produit.category}</p> */}
          </div>
          <div className="d-flex justify-content-between">
            <a
              href={`/details-productss/${produit.id}`}
              className="btn"
              style={{
                backgroundColor: '#f3e884ec',
                color: '#000',
                borderRadius: '1rem',
                fontWeight: 'bold',
                width: '48%',
              }}
            >
              Détails
            </a>
            <button   onClick={() => handleAddToCart(produit)}
              className="btn"
              style={{
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '1rem',
                fontWeight: 'bold',
                width: '48%',
              }}

            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}


    </div>
    </>
  );
};

export default Produits;

