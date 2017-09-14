import axios from 'axios';
import { API_URL } from '../../constants';

export const handleSubmit = () =>
  (dispatch) => {
    axios.get(`${API_URL}/fillDataBase/`)
      .then((resp) => {
        dispatch({
          type: 'NOTIFICATION',
          message: resp.data,
          success: true,
        });
      })
      .catch((e) => {
        console.log(e.message);
        dispatch({
          type: 'NOTIFICATION',
          message: e.message,
          success: false,
        });
      });
  };

export default handleSubmit;
