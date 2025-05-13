import React from 'react';
import axios from 'axios';

const DeliveryHome = () => {
    const handleLogout = async () => {
        try {
            // Envoyer la requête logout
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Nettoyer le localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Rediriger vers la page de login
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de la déconnexion', error);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold">Bienvenue Livreur !</h1>
            <button
                onClick={handleLogout}
                className="px-4 py-2 text-black bg-red-500 rounded hover:bg-red-600"
            >
                Déconnexion
            </button>
        </div>
    );
};

export default DeliveryHome;