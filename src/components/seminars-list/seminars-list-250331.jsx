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

  function removeListElement (id) {
    console.log(id);
  }

	return (
		<div>
			{
				loading ? (
					<p>Loading...</p>
				) : error ? (
						<p>{error}</p>
					) : (
            <>
            <h1>Список семинаров</h1>
            <p># Тема Описание Дата Время</p>
						<ul>
							{
								items.map((item) => (
									<li key={item.id}>
										<span>{item.id} </span>
                    <span>{item.title} </span>
                    <span>{item.date} </span>
                    <button type="button" onClick={() => removeListElement(item.id)}>
                      Удалить
                    </button>
									</li>
								))
							}
						</ul>
            </>
					)
      }
		</div>
	);
}

export default SeminarsList;
