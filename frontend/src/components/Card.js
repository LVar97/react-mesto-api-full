import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardLike, onCardClick, onCardDelete}) {
	// console.log(card.likes);
	const currentUser = React.useContext(CurrentUserContext);

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn = card.owner === currentUser._id;

	// Создаём переменную, которую после зададим в `className` для кнопки удаления
	const cardDeleteButtonClassName = (
		`element__btn-delete ${isOwn ? 'element__btn-delete' : 'element__btn-delete_hidden'}`
	); 

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = card.likes.some(i => i === currentUser._id);
		
	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName = (
		`element__btn-like ${isLiked ? 'element__btn-like_active' : 'element__btn-like'}`
	); 

	function handleClick() {
		onCardClick(card);
	} 

	function handleLikeClick() {
		onCardLike(card)
	}

	function handleDeleteClick() {
		onCardDelete(card)
	}

	return(
		<li className="element">
			<img src={card.link} alt={card.name} className="element__image" onClick={handleClick}/>
			<button className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="delete" type="button" />
			<div className="element__heading">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__likes">
					<button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="like" type="button" />
					<div className="element__btn-like_number">{card.likes.length}</div>
				</div>
			</div>
		</li>
	)
}
export default Card