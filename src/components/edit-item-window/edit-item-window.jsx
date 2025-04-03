// Модальное окно редактирования элемента списка семинаров. Форма разработана с использованием неконтролируемых полей ввода и внешнего обработчика действия при подтверждении изменений - handleConfirm, который реализован в компоненте SeminarsList

import {useRef} from 'react';

function EditItemWindow ({onClose, data, handleConfirm}) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const photoRef = useRef();

  const onSubmit = () => {
    data.title =  titleRef.current.value;
    data.description =  descriptionRef.current.value;
    data.date =  dateRef.current.value;
    data.time =  timeRef.current.value;
    data.photo =  photoRef.current.value;
    handleConfirm();
  }

  return (
    <div>
      <h2>Редактирование описания семинара</h2>
      <p>Вы хотите заменить описание семинара №{data.id} ?</p>
      <label>
        <span>Тема </span>
        <input type="text" name="titleInput" ref={titleRef} defaultValue={data.title}/>
      </label>
      <br />
      <label>
        <span>Описание </span>
        <input type="text" name="descriptionInput" ref={descriptionRef} defaultValue={data.description}/>
      </label>
      <br />
      <label>
        <span>Дата </span>
        <input type="text" name="dateInput" ref={dateRef} defaultValue={data.date}/>
      </label>
      <br />
      <label>
        <span>Время </span>
        <input type="text" name="timeInput" ref={timeRef} defaultValue={data.time}/>
      </label>
      <br />
      <label>
        <span>Ссылка на фото </span>
        <input type="text" name="photoInput" ref={photoRef} defaultValue={data.photo}/>
      </label>
      <br />
      <button onClick={onSubmit}>Да</button>
      <button onClick={onClose}>Нет</button>
    </div>
  );
}

export default EditItemWindow;

