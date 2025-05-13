const initialState = {
    items: [],
    productDetail: null,
    status: 'idle', 
    error: null,
  };
  
  export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCT_DETAILS_PENDING':
        return {
          ...state,
          status: 'pending',
        };
  
      case 'FETCH_PRODUCTS_SUCCESS':
        return {
          ...state,
          status: 'success',
          items: action.payload,
        };
  
      case 'FETCH_PRODUCT_DETAILS_SUCCESS':
        return {
          ...state,
          status: 'success',
          productDetail: action.payload,
        };
  
      case 'FETCH_PRODUCT_DETAILS_ERROR':
        return {
          ...state,
          status: 'error',
          error: action.error,
        };
        case 'ADD_STAGIAIRE_SUCCESS':
      return { ...state, items: [...state.items, action.payload] };
      
        case 'UPDATE_STAGIAIRE_SUCCESS':
          return {
            ...state,
            items: state.items.map((stagiaire) =>
              stagiaire.id === action.payload.id ? action.payload : stagiaire
            ),
          };
        case 'DELETE_STAGIAIRE_SUCCESS':
          return {
            ...state,
            items: state.items.filter((stagiaire) => stagiaire.id !== action.payload),
          };
      

      default:
        return state;
    }
  };