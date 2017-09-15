import axios from 'axios';
import { API_URL } from '../../constants';

export const dataLoadFunction = url =>
  (dispatch) => {
    dispatch({
      type: 'TOGGLE_LOADING_DATA',
      loading: true,
    });
    axios.get(`${API_URL}${url}`, { headers: { } })
      .then((res) => {
        dispatch({
          type: 'DATA_LOADED',
          data: res.data,
        });
        dispatch({
          type: 'TOGGLE_LOADING_DATA',
          loading: false,
        });
      })
      .catch((e) => {
        console.log('ERROR', e);
        dispatch({
          type: 'NOTIFICATION',
          message: e.message,
          success: false,
        });
        dispatch({
          type: 'DATA_LOADED',
          data: [],
        });
        dispatch({
          type: 'TOGGLE_LOADING_DATA',
          loading: false,
        });
      });
  };

export default dataLoadFunction;
