import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header(props){
	const history = useHistory();

	function signOut(){
    localStorage.removeItem('token');
    history.push('/sign-in');
  }
	
	return(
		<header className="header">
        <div className="header__logo" />
				<p className="header__user">{props.userData.email}
				<Link to={props.link}
				onClick={signOut}
				className="header__button">
					{props.name}
				</Link>
				</p>
    </header>
	);
}

export default Header;