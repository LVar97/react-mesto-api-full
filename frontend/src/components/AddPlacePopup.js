import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

	const nameRef = React.useRef();
	const linkRef = React.useRef();

	React.useEffect(() => {
		nameRef.current.value = '';
		linkRef.current.value = '';
	}, [props.isOpen]);

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
	
		// Передаём значения управляемых компонентов во внешний обработчик
		props.onAddPlace({
			name: nameRef.current.value,
			link: linkRef.current.value
		});
	}

	return(
		<PopupWithForm name="add" title="Новое место" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
			<input id="place-input" type="text" ref={nameRef}  placeholder="Название" name="name" className="popup__field-place popup-input" required minLength={2} maxLength={30} />
			<span className="place-input-error popup__input-error" />
			<input id="link-input" type="url" ref={linkRef} placeholder="Ссылка на картинку" name="link" className="popup__field-link popup-input" required />
			<span className="link-input-error popup__input-error" />
		</PopupWithForm>
	)
}
export default AddPlacePopup