function PopupWithForm(props) {

	return(
		
		<div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
			<div className="popup__container">
			<h3 className="popup__title">{props.title}</h3>
				<form method="POST" name={props.name} className="popup__form" onSubmit={props.onSubmit} >
					{props.children}
					<button className="btn-submit" type="submit" >Сохранить</button>
					<button className="popup__close" aria-label="Close" type="button" onClick={props.onClose}/>
				</form>
			</div>
		</div>
		
	);
		
}

export default PopupWithForm;