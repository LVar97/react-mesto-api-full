import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header'; 

function Main(props) {

	const currentUser = React.useContext(CurrentUserContext);

	return(
		<>
			<Header
			name="Выйти"
      link="sign-in"
      userData={props.userData}/>
			<main className="content">
				<section className="profile">
					<div className="profile__ava-overlay" onClick={props.onEditAvatar}/>
					<img src={currentUser.avatar} alt="аватар" className="profile__avatar" />
					<div className="profile__info">
						<h1 className="profile__title">{currentUser.name}</h1>
						<p className="profile__subtitle">{currentUser.about}</p>
						<button className="profile__btn-edit" aria-label="edit profile" type="button" onClick={props.onEditProfile}/>
					</div>
					<button className="profile__btn-add" aria-label="add cards" type="button" onClick={props.onAddPlace}/>
				</section>
				<section className="elements">
					<ul className="elements__list">
						{props.cards.map((card) => (
							<Card card={card}
						onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={card._id}/>
						))}
					</ul>	
				</section>
			</main>
		</>
	);
	
}

export default Main;