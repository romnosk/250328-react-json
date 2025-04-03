// SeminarsList - основной компонент управления списком семинаров (отображение, редактирование, удаление, взаимодействие с JSON-сервером)

import {useReducer, useEffect, useState} from 'react';
import axios from 'axios';

import {seminarsReducer, initialState} from '../../reducers/seminars-reducer.js';
import {FETCH_ACTIONS} from '../../actions/index.js';
import {SERVER_ADDRESS} from '../../constants/server-address.js';
import useModal from '../use-modal/use-modal';

import EditItemWindow from '../edit-item-window/edit-item-window.jsx';
import DeleteItemWindow from '../delete-item-window/delete-item-window.jsx';

const SeminarsList = () => {
  const [state, dispatch] = useReducer(seminarsReducer, initialState);
  const {items, loading, error} = state;
  const [deletedItemData, setDeletedItemData] = useState(null);
  const [updatedItemData, setUpdatedItemData] = useState(null);
  const {isModalOpen, openModal, closeModal, modalContent} = useModal();

  // Загрузка списка семинаров с JSON-сервера
  useEffect (() => {
    dispatch({type: FETCH_ACTIONS.PROGRESS});

    const getItems = async () => {
      try {
        const responce = await axios.get(SERVER_ADDRESS);
        if (responce.status === 200) {
          dispatch({type: FETCH_ACTIONS.SUCCESS, data: responce.data});
        }
      } catch (err) {
        dispatch({type: FETCH_ACTIONS.ERROR, error: err.message});
			}
		}

		getItems();
	},[]);

  // Обновление элемента списка семинаров на JSON-сервере
  function editItemAction (item) {
    const updateItem = async (item) => {
      try {
        dispatch({ type: FETCH_ACTIONS.UPDATE_ITEM, updatedItem: item });
        const itemUrl = SERVER_ADDRESS + '/' + item.id;
        const response = axios.put(itemUrl, item);
        closeModal();
      } catch (err) {
        dispatch({type: FETCH_ACTIONS.ERROR, error: err.message});
			}
    }
    updateItem(item);
  }

  // Обработчик клика по кнопке редактирования элемента списка семинаров
  function editListItem(itemData) {
    setUpdatedItemData(itemData);
    openModal(
      <EditItemWindow
        onClose={closeModal}
        data={itemData}
        handleConfirm={()=>editItemAction(itemData)}
      />
    )
  }

  // Удаление элемента списка семинаров на JSON-сервере
  function removeItemAction (itemID) {
    const deleteItemByID = async (itemID) => {
      try {
        dispatch({ type: FETCH_ACTIONS.REMOVE_ITEM, id: itemID });
        const itemUrl = SERVER_ADDRESS + '/' + itemID;
        const response = await axios.delete(itemUrl, { method: 'DELETE' });
        closeModal();
      } catch (err) {
        dispatch({type: FETCH_ACTIONS.ERROR, error: err.message});
			}
    }
    deleteItemByID(itemID);
  }

  // Обработчик клика по кнопке удаления элемента списка семинаров
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
            <h1>Список семинаров</h1>
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
