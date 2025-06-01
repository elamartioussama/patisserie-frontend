import React from 'react';
import  { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { updateStagiaireSuccess } from './Action';  // Importez l'action correspondante
// import { useParams } from 'react-router-dom';
import "./Acceuil.css";
import { useNavigate } from 'react-router-dom';


  

const Acceuil = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      // Redirige vers la page d'accueil spécifique selon le rôle
      switch (user.role) {
        case 'admin':
          navigate('/admin/home');
          break;
        case 'client':
          navigate('/client/home');
          break;
        case 'assembleur':
          navigate('/assembleur/home');
          break;
        case 'livreur':
          navigate('/livreur/home');
          break;
        default:
          break;
      }
    }
  }, [navigate]);
 
  return (
    <div style={{ backgroundColor: "white" }}>
      <header>
      <div>
      <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: '#f3e884ec' }}>
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
              <a className="nav-link" href="/contact2" style={{ color: 'black' }}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Login à droite */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/login" style={{ color: 'black' }}>
              Login / Register
            </a>
          </li>
        </ul>
      </div>
    </nav>



      {/* <a href="/https://html.vecurosoft.com/grillino/demo/index-2.html">ooo</a>  */}
      
    </div>
        
      </header>

      <main>
        <div className="slider">
          <img src="img/amination/anim h/vn14.jpg" alt="Image 1" />
          <img src="img/home/anim5.jpg" alt="Image 2" />
          <img src="img/amination/anim h/t8.jpg" alt="Image 3" />
          <img src="img/home/anim1.jpg" alt="Image 4" />
          <img src="img/amination/anim h/vn14.jpg" alt="Image 5" />
        </div>

        <div className="main2" id="main2">
          <h1>Notre patisserie</h1>
        </div>

        <div id="main3">
          <p style={{ color: "black" }}>
            Les IIII cerises est une patisserie qui vous donne une grande expérience en viennoiserie, boulangerie, salé et gâteaux
            <span> depuis 1958</span>. Géré par des chefs patissiers passionnés possédent plus de 15 ans d'expérience.
          </p>
          <p>
            Tous nos produits sont composés de produits frais et de qualité, ils sont approuvés par des nutritionnistes spécialisés
            et respectent les mesures sanitaires en matière d'hygiène et salubrité de (O.N.S.S.A)
          </p>
          <p>
            Les quatres cerises offrent des services selon vos goûts et vos besoins pour tout évènements, Mariage, Anniversaire, Fêtes et autres.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <img src="img/home/notreequipe.jpeg" alt="jj" width="700px" height="400px" />
        </div>

        <div className="main2" id="main666">
          <h1>Nos produits</h1>
        </div>

        <div id="main99" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px'}} >
  {[
    {
      link: "/productss",
      img: "img/nouveuté/Pain maison sans machine à pain - chefNini.jfif",
      label: "Boulangerie"
    },
    {
      link: "/productss",
      img: "img/nouveuté/nv5.jpg",
      label: "Viennoiserie"
    },
    {
      link: "/productss",
      img: "img/nouveuté/Recette - Mini-pastillas de poulet aux légumes.jfif",
      label: "Salés"
    },
    {
      link: "/productss",
      img: "img/nouveuté/t7.jpg",
      label: "Gâteaux"
    }
  ].map((item, index) => (
    <div key={index} style={{ width: '235px', position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
      <img
        src={item.img}
        alt={item.label}
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
      />
      <div className="main93" style={{
        position: 'absolute',
        bottom: '20px',
        left: '0',
        width: '100%',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        color: 'white'
      }}>
        <a href={item.link} style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem' }}>
          {item.label}
        </a>
      </div>
    </div>
  ))}
</div>

        <div className='p-5'></div>
        <div className="main2" id="main6">
          <h1>Trouvez nous</h1>
        </div>

        <div id="main4">
          <div id="main41">
            {[
              { href: "https://maps.app.goo.gl/FiQwMYHPFrFdyYdQ8", label: "Les Quatre Cerises - Bourgogne" },
              { href: "https://maps.app.goo.gl/Nqad4Sb121nYfB3TA", label: "Les Quatre Cerises - Bd Al Qods" },
              { href: "https://maps.app.goo.gl/yBsYpDPeGdC9kcTL6", label: "Les Quatre Cerises - Bd Modibo Keita" },
              { href: "https://maps.app.goo.gl/NTdKLJ4Ze3DMXAq88", label: "Les Quatre Cerises - Bd de Smara" },
              { href: "https://maps.app.goo.gl/jc8MsB68uyrTxryt7", label: "Les Quatre Cerises - Marina Shopping" },
              { href: "https://maps.app.goo.gl/qci3PjNSKTqZqrk2A", label: "Les Quatre Cerises - Bô Village" },
              { href: "https://maps.app.goo.gl/RZHt9SwWys7EbiKZ6", label: "Les Quatre Cerises - Morocco Mall" }
            ].map((place, index) => (
              <div key={index}>
                <i className="material-icons">&#xe55f;</i>
                <a href={place.href}>{place.label}</a><br />
              </div>
            ))}
          </div>
          <div id="main42">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d106411.34417039619!2d-7.7309257947441!3d33.54416452126578!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda6339ed12c36cd%3A0x3d389b075c1bf905!2sLes%20Quatre%20Cerises%20-%20Bd%20de%20Smara!5e0!3m2!1sfr!2sma!4v1701720333480!5m2!1sfr!2sma"
              width="500"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte"
            ></iframe>
          </div>
        </div>
      </main>

      <footer id="main10">
        <div style={{ width: "33%" }}>
          <p style={{ fontSize: "200%", fontWeight: 200, textDecoration: "underline" }}>Horaires d'ouverture</p>
          <p style={{ fontSize: "120%" }}>Lundi - Dimanche : 8h00 - 23h00</p>
        </div>
        <div style={{ width: "33%" }}>
          <p style={{ fontSize: "200%", fontWeight: 200, textDecoration: "underline" }}>Contacts</p>
          <img src="img/mail_FILL0_wght400_GRAD0_opsz24.png" alt="" width="15px" height="15px" />
          <a href="mailto:4cerises@gmail.com">E-mail:4cerises@gmail.com</a><br />
          <img src="img/call_FILL0_wght400_GRAD0_opsz24.png" alt="" width="15px" height="15px" />
          <a href="tel:+2125225-08818">Tel:+2125225-08818</a>
        </div>
        <div style={{ width: "33%" }} id="main102">
          <p style={{ fontSize: "200%", fontWeight: 200, textDecoration: "underline" }}>Suivez-nous</p>
          <a href="https://web.facebook.com/lesquatrecerises"><img src="img/fb_icon-icons.com_65434.ico" alt="facebook" width="30px" height="30px" /></a>
          <a href="https://www.instagram.com/LesQuatreCerises/"><img src="img/instagram_f_icon-icons.com_65485.ico" alt="instagram" width="30px" height="30px" /></a>
          <a href="https://www.youtube.com/results?search_query=les+quatre+cerises"><img src="img/YOUTUBE_icon-icons.com_65487.ico" alt="youtube" width="30px" height="30px" /></a>
          <a href="https://www.threads.net/@lesquatrecerises"><img src="img/threads_logo_threads_thick_line_icon_255050.ico" alt="threads" width="30px" height="30px" /></a>
        </div>
      </footer>
    </div>
  );
};

export default Acceuil;