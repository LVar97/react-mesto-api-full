import React from 'react';
import { Link } from 'react-router-dom';

function Register(props){
  // console.log(props)

  const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
  

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e){
    setPassword(e.target.value)
  }

  function handleSubmit(e)  {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onRegister({
			email,
			password}
		);
  }

    return (
      <div className="access">
        <p className="access__welcome">
					Регистрация
        </p>
        <form onSubmit={handleSubmit} className="access__form">
          <input id="email" name="email" className="access__email" type="email" placeholder="Email" value={email || ''} onChange={handleChangeEmail} />
          <input id="password" name="password" className="access__password" placeholder="Пароль" type="password" value={password || ''} onChange={handleChangePassword} />
            <button type="submit"   className="access__link">
							Зарегистрироваться
						</button>
        </form>
        <div className="access__signin">
          <p className="access__query">Уже зарегистрированы?
          <Link to="sign-in" className="access__login-link">Войти</Link> 
					</p>
        </div>
        
      </div>
      
  );

}

export default Register;