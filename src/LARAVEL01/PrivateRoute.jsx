import { useEffect } from 'react';

const PrivateRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!token || !user) {
            // Pas connecté => redirection vers login
            window.location.href = '/connexion';
        } else if (user.role !== role) {
            // Mauvais rôle => redirection vers sa propre page d'accueil
            switch (user.role) {
                case 'admin':
                    window.location.href = '/admin/home';
                    break;
                case 'client':
                    window.location.href = '/client/home';
                    break;
                case 'assembleur':
                    window.location.href = '/assembleur/home';
                    break;
                case 'livreur':
                    window.location.href = '/delivery/home';
                    break;
                default:
                    window.location.href = '/';
            }
        }
    }, [token, user, role]);

    if (!token || !user || user.role !== role) {
        return null; // Rien à afficher pendant la redirection
    }

    return children;
};

export default PrivateRoute;
