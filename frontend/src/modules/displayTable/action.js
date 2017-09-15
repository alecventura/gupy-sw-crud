import axios from 'axios';
import { API_URL } from '../../constants';

export const dataLoadFunction = (namespace, url) =>
  (dispatch) => {
    dispatch({
      type: `${namespace}/TOGGLE_LOADING_DATA`,
      loading: true,
    });
    axios.get(`${API_URL}${url}`, { headers: { } })
      .then((res) => {
        dispatch({
          type: `${namespace}/DATA_LOADED`,
          data: res.data,
        });
        dispatch({
          type: `${namespace}/TOGGLE_LOADING_DATA`,
          loading: false,
        });
      })
      .catch((e) => {
        dispatch({
          type: `${namespace}/NOTIFICATION`,
          message: e.message,
          success: false,
        });
        dispatch({
          type: `${namespace}/DATA_LOADED`,
          data: [],
        });
        dispatch({
          type: `${namespace}/TOGGLE_LOADING_DATA`,
          loading: false,
        });
      });
  };

export default dataLoadFunction;
