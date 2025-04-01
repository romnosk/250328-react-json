import {useReducer, useEffect} from 'react';
import {seminarsReducer, initialState} from '../../reducers/seminars-reducer.js';
import {FETCH_ACTIONS} from '../../actions/index.js';
import {SERVER_ADDRESS} from '../../constants/server-address.js';
import axios from 'axios';

const SeminarsList = () => {
  const [state, dispatch] = useReducer(seminarsReducer, initialState);
  const {items, loading, error} = state;

  useEffect (() =>{
    dispatch({type: FETCH_ACTIONS.PROGRESS});

    const getItems = async () => {
      try {
        const responce = await axios.get(SERVER_ADDRESS);
        if (responce.status === 200) {
          dispatch({type: FETCH_ACTIONS.SUCCESS, data: responce.data});
        }
      } catch (err) {
        console.error (err);
        dispatch({type: FETCH_ACTIONS.ERROR, error: err.message});
			}
		}

		getItems();
	},[]);

  function editListElement (id) {
    console.log(id);
  }

  function removeListElement (id) {
    const deleteItemByID = async (id) => {
      try {
        dispatch({ type: FETCH_ACTIONS.REMOVE_ITEM, id });
        const itemUrl = SERVER_ADDRESS + '/' + id;
        const response = await axios.delete(itemUrl, { method: 'DELETE' });
      } catch (err) {
        console.error (err);
        dispatch({type: FETCH_ACTIONS.ERROR, error: err.message});
			}
    }
    deleteItemByID(id);
  }

	return (
		<div>
			{
				loading ? (
					<p>Загрузка списка семинаров...</p>
				) : error ? (
						<p>Ошибка загрузки списка семинаров: {error}</p>
					) : (
            <>
            <h1>Список семинаров Kosmoteros</h1>
            <table>
              <thead>
                <tr>
                  <th>№</th><th>Тема</th><th>Описание</th><th>Дата</th><th>Время</th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>
                        <button type="button" onClick={() => editListElement(item.id)}>
                          Править
                        </button>
                      </td>
                      <td>
                        <button type="button" onClick={() => removeListElement(item.id)}>
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            </>
					)
      }
		</div>
	);
}

export default SeminarsList;
