// AddStagiaire.js
import React, { useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addStagiaireSuccess } from './Action';  // Importez l'action correspondante

const AddStagiaire = () => {
  const dispatch = useDispatch();
  const [stagiaire, setStagiaire] = useState({
    name: '',
    email: '',
    password: '',
    tel: '',
    address: '',
    role: '',
  });
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


    console.log(stagiaire);
    
    axios
    .post('http://localhost:8000/api/users', stagiaire)
      .then((res) => {
        dispatch(addStagiaireSuccess(res.data));
        // Rediriger vers la page de la liste des stagiaires après ajout
        window.location.href = '/';  // redirection vers la page d'accueil
      })
      .catch((err) => console.error('Error adding stagiaire:', err));
  };

//   SQLSTATE[42S22]: Column not found: 1054 Champ 'filiere' inconnu dans field list (Connection: mysql, SQL: insert into `stagiaires` (`nom`, `prenom`, `age`, `email`, `filiere`, `updated_at`, `created_at`) values (rttt, tttt, 20, ttt@gmail.com, 3, 2025-02-10 17:24:45, 2025-02-10 17:24:45))

  return (
    <div className="container">
      <h1>Ajouter un user</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={stagiaire.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={stagiaire.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={stagiaire.password}
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
        </div><div className="form-group">
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
          <label>role</label>
          <select
            className="form-control"
            name="role"
            value={stagiaire.role}
            onChange={handleChange}
            required
          >
            <option value="livreur">livreur</option>
            <option value="assembleur">assembleur</option>
              
            
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddStagiaire;
