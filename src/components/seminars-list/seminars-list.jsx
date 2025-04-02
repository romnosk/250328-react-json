// Основной компонент управления списком семинаров (отображение, редактирование, удаление)

import {useReducer, useEffect, useState} from 'react';
import axios from 'axios';
import {seminarsReducer, initialState} from '../../reducers/seminars-reducer.js';
import {FETCH_ACTIONS} from '../../actions/index.js';
import {SERVER_ADDRESS} from '../../constants/server-address.js';
import useModal from '../use-modal/use-modal';
import DeleteItemWindow from '../delete-item-window/delete-item-window.jsx';

const SeminarsList = () => {
  const [state, dispatch] = useReducer(seminarsReducer, initialState);
  const {items, loading, error} = state;
  const [deletedItemData, setDeletedItemData] = useState(null);
  const {isModalOpen, openModal, closeModal, modalContent} = useModal();

  useEffect (() => {
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

  function editListItem (item) {
    console.log(item);
  }

  function removeItemAction (id) {
    const deleteItemByID = async (id) => {
      try {
        dispatch({ type: FETCH_ACTIONS.REMOVE_ITEM, id });
        const itemUrl = SERVER_ADDRESS + '/' + id;
        const response = await axios.delete(itemUrl, { method: 'DELETE' });
        closeModal();
      } catch (err) {
        console.error (err);
        dispatch({type: FETCH_ACTIONS.ERROR, error: err.message});
			}
    }
    deleteItemByID(id);
  }

  function removeListItem(itemData) {
    setDeletedItemData(itemData);
    openModal(
      <DeleteItemWindow
        onClose={closeModal}
        data={itemData}
        handleConfirm={()=>removeItemAction(itemData)}
      />
    )
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
            {isModalOpen && modalContent}
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
                        <button type="button" onClick={() => editListItem(item)}>
                          Править
                        </button>
                      </td>
                      <td>
                        <button type="button" onClick={() => removeListItem(item.id)}>
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
