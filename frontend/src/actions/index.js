import axios from 'axios';

import { FETCH_USER, CART_ADD_ITEM, CART_REMOVE_ITEM } from './types';

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/auth/current_user');
  if(response) dispatch({ type: FETCH_USER, payload: response.data });
}

// export const handleToken = (token) => async (dispatch) => {
//   const response = await axios.post('/api/stripe', token);
//   if(response) dispatch({ type: FETCH_USER, payload: response.data });
// }

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      qty
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}