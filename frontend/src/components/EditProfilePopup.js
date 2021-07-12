import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');

	// Подписка на контекст
	const currentUser = React.useContext(CurrentUserContext);
	
	// После загрузки текущего пользователя из API
	// его данные будут использованы в управляемых компонентах.
	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
		// console.log(currentUser)
	}, [currentUser, props.isOpen]);

	function handleChangeName(e) {
    setName(e.target.value);
  }

	function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
	
		// Передаём значения управляемых компонентов во внешний обработчик
		props.onUpdateUser({
			name,
			about: description,
		});
	}
	
	return (
		<PopupWithForm name="edit" title="Редактировать профиль" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
			<input id="name-input" onChange={handleChangeName} type="text" placeholder="Имя" name="name" value={name || ''} className="popup__field-name popup-input " required minLength={2} maxLength={40} />
			<span className="name-input-error popup__input-error" />
			<input id="job-input" onChange={handleChangeDescription} value={description || ''} type="text" placeholder="О себе" name="about" className="popup__field-work popup-input" required minLength={2} maxLength={200} />
			<span className="job-input-error popup__input-error" />
		</PopupWithForm>
	)
}
export default EditProfilePopup