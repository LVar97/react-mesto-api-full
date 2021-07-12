function InfoTooltip(props){
	// console.log(props.src)

	return(

		<div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
		<div className="popup__container">
			<img src={props.src} alt={props.alt} className="popup__icons"/>
			<h3 className="popup__tooltips">{props.text}</h3>
			<button className="popup__close" aria-label="Close" type="button" onClick={props.onClose}/>
		</div>
	</div>
			
	)
}
export default InfoTooltip