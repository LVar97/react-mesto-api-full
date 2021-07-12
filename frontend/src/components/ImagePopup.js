function ImagePopup(props) {
	
	return(
		<>
			<div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
				<div className="popup__content">
					<button className="popup__close" aria-label="Close" type="button" onClick={props.onClose}/>
					<img src={props.card.link} alt={props.card.name} className="popup__image" />
					<h2 className="popup__subtitle">{props.card.name}</h2>
				</div>
			</div>
		</>
	);

}

export default ImagePopup;