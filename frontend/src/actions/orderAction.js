import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })

    const { data } = await axios.post('/api/orders', order);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
    })
  }
}