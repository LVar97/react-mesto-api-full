import React from 'react';
import { withRouter } from 'react-router-dom';
// import * as auth from '../utils/auth.js';
// import InfoTooltip from './InfoTooltip';
// import cross from '../image/cross.svg'

function Login(props){

  const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e){
    setPassword(e.target.value)
  }
  
  function handleSubmit(e){
    e.preventDefault();
    
    props.onLogin({
			email,
			password}
		);
  } 
  
    return(
      <div className="access">
        <p className="access__welcome">
					Вход
        </p>
        <form onSubmit={handleSubmit} className="access__form">
          <input required id="username" className="access__email" value={email || ''} onChange={handleChangeEmail} name="username" placeholder="Email" type="text"  />
          <input required id="password" className="access__password" value={password || ''} onChange={handleChangePassword} name="password" placeholder="Пароль" type="password" />
          <button type="submit" className="access__link">Войти</button>
        </form>
      </div>
    )
}

export default withRouter(Login);