// EditStagiaire.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateStagiaireSuccess } from './Action';  // Importez l'action correspondante
import { useParams } from 'react-router-dom';

const EditStagiaire = () => {
  const { id } = useParams(); // Récupérer l'ID du stagiaire depuis l'URL
  const dispatch = useDispatch();
  const [stagiaire, setStagiaire] = useState({
    nom: '',
    prenom: '',
    age: '',
    email: '',
    filiere_id: '',
  });

  useEffect(() => {
    // Récupérer les données du stagiaire à partir de l'API
    axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((res) => {
        setStagiaire(res.data);
      })
      .catch((err) => console.error('Error fetching stagiaire:', err));
  }, [id]);

  // const [filieres, setFilieres] = useState([]);

  // Récupérer les filières depuis l'API
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8000/api/filieres') // Assurez-vous que l'URL est correcte
  //     .then((res) => {
  //       setFilieres(res.data);  // Mettre à jour les filières dans l'état local
  //     })
  //     .catch((err) => console.error('Error fetching filieres:', err));
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStagiaire((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/users/${id}`, stagiaire)
      .then((res) => {
        dispatch(updateStagiaireSuccess(res.data));
        // Rediriger vers la page de la liste des stagiaires après modification
        window.location.href = '/ListStagiaireApi';
      })
      .catch((err) => console.error('Error updating stagiaire:', err));
  };

  return (
    <div className="container">
      <h1>Modifier le user</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={stagiaire.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={stagiaire.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={stagiaire.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>tel</label>
          <input
            type="tel"
            className="form-control"
            name="tel"
            value={stagiaire.tel}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Filière</label>
          <input
            type="text"
            className="form-control"
            name="filiere_id"
            value={stagiaire.filiere.nom}
            onChange={handleChange}
            required 
          />
        </div> */}
        {/* <div className="form-group">
          <label>Filière</label>
          <select
            className="form-control"
            name="filiere_id"
            value={stagiaire.filiere_id}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une filière</option>
            {filieres.map((filiere) => (
              <option key={filiere.id} value={filiere.id}>
                {filiere.nom}
              </option>
            ))}
          </select>
        </div> */}
        <button type="submit" className="btn btn-primary">
          Modifier
        </button>
      </form>
    </div>
  );
};

export default EditStagiaire;
