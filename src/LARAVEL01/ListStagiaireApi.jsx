import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { Container, Nav, Navbar } from 'react-bootstrap';
import { fetchProductsPending, fetchProductsSuccess, fetchProductsError ,deleteStagiaireSuccess} from './Action';
import { Link } from 'react-router-dom';

export default function ListStagiaireApi () {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProductsPending());

    axios
      .get('http://localhost:8000/api/users')
      .then((res) => dispatch(fetchProductsSuccess(res.data)))
      .catch((err) => dispatch(fetchProductsError(err.message)));
  }, [dispatch]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then(() => dispatch(deleteStagiaireSuccess(id)))
      .catch((err) => console.error('Error deleting stagiaire:', err));
  };
  

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error}</div>;
  }
  // const handleLogout = async () => {
  //   const token = localStorage.getItem('token'); // ou sessionStorage si tu utilises ça

  //   try {
  //     const res = await fetch("http://localhost:8000/api/logout", {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //         "Content-Type": "application/json"
  //       }
        
  //     });
      
  //     if (res.ok) {
  //       localStorage.removeItem('token'); // ou sessionStorage.removeItem()
  //       localStorage.removeItem('user');  // si tu stockes les infos utilisateur
  //       window.location.href = "/login"; // ou navigate("/login") si tu utilises react-router
        
  //     } else {
  //       const error = await res.json();
  //       console.error("Erreur lors de la déconnexion :", error.message);
  //     }
  //   } catch (err) {
  //     console.error("Erreur réseau :", err);
  //   }
  // };
  return (
    <>
      <main className="container">
        <h1>Liste de users</h1>
        <Link to="/add" className="btn btn-success">
        Ajouter un stagiaire
      </Link>
      
      
      {/* <button className="btn btn-" onClick={handleLogout}>Déconnexion</button> */}
    
        <div className="row">
          {items.map((p) => (
            <div className="col-md-3 py-2" key={p.id}>
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-title">{p.name}</p>
                  <p className="card-title">{p.email}</p>
                  <p className="card-text">{p.tel}</p>
                  <p className="card-text">{p.address}</p>
                  <p className="card-text">{p.role}</p>
                  <Link to={`/edit/${p.id}`} className="btn btn-warning">
                    Modifier
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}