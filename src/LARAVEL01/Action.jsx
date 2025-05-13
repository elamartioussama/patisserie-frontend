export const fetchProductsPending = () => ({ 
    type: 'FETCH_PRODUCTS_PENDING'
});
export const fetchProductsSuccess = (data) => ({ 
    type: 'FETCH_PRODUCTS_SUCCESS', 
    payload: data 
});
export const fetchProductsError = (error) => ({ 
    type: 'FETCH_PRODUCTS_ERROR', 
    error });

export const fetchProductDetailsPending = () => ({ 
    type: 'FETCH_PRODUCT_DETAILS_PENDING' 
});
export const fetchProductDetailsSuccess = (data) => ({ 
    type:'FETCH_PRODUCT_DETAILS_SUCCESS' ,
    payload: data });
export const fetchProductDetailsError = (error) => ({
    type:'FETCH_PRODUCT_DETAILS_ERROR', 
    error });
export const addStagiaireSuccess = (stagiaire) => ({
    type: 'ADD_STAGIAIRE_SUCCESS',
    payload: stagiaire,
    });
    
    export const updateStagiaireSuccess = (stagiaire) => ({
    type: 'UPDATE_STAGIAIRE_SUCCESS',
    payload: stagiaire,
    });
    
    export const deleteStagiaireSuccess = (id) => ({
    type: 'DELETE_STAGIAIRE_SUCCESS',
    payload: id,
    });
