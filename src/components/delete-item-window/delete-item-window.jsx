// Модальное окно подтверждения удаления элемента списка семинаров.

function DeleteItemWindow ({onClose, data, handleConfirm}) {
  return (
    <div>
      <h2>Подтверждение удаления семинара</h2>
      <p>Вы хотите удалить семинар №{data} ?</p>
      <button onClick={handleConfirm}>Да</button>
      <button onClick={onClose}>Нет</button>
    </div>
  );
}

export default DeleteItemWindow;

