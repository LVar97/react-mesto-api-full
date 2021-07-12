import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
	const avatarRef = React.useRef();

	React.useEffect(() => {
		avatarRef.current.value = '';
	}, [props.isOpen]);

	function handleSubmit(e) {
		e.preventDefault();

		props.onUpdateAvatar({
			/* Значение инпута, полученное с помощью рефа */
			avatar: avatarRef.current.value
		});
		
	}
	
	return(
		<PopupWithForm name="avatar" title="Обновить аватар" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
			<input id="avatar-input" ref={avatarRef} type="url" placeholder="Аватар" name="avatar" className="popup__field-avatar popup-input" required />
			<span className="avatar-input-error popup__input-error" />
		</PopupWithForm>
	)
}
export default EditAvatarPopup