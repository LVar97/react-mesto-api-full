import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from './Header'; 
import Main from './Main';
import Footer from './Footer'; 
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import check from '../image/check.svg'
import cross from '../image/cross.svg'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {},
      isImagePopupOpen: false,
      isInfoTooltipOpen: false,
      currentUser: {},
      cards: [],
      loggedIn: false,
      userData: {email: ''}
    }
    this.tokenCheck = this.tokenCheck.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  componentDidMount(){
    this.tokenCheck();
    
    api.getUserInfo()
    .then((res) => {
      this.setState({
        currentUser: res
			})
    })
    .catch((err) => console.log(err));

    api.renderCards()
		.then((res) => {	
      console.log(res)
			this.setState({
        cards: res
      })
    })
		.catch((err) => console.log(err));

  }

  handleLogin = () => {
    this.setState({
      loggedIn: true
    })
  }

  tokenCheck = () => {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      // проверим токен
      auth.getContent(jwt)
      .then((res) => {
        if (res){
          const userData = {
            email: res.email
          }
          const currentUser = {
            name: res.name,
            about: res.about,
            avatar: res.avatar
          }
            // авторизуем пользователя
          this.setState({
            loggedIn: true,
            userData,
            currentUser
          }, () => {
            // обернём App.js в withRouter
            // так, что теперь есть доступ к этому методу
            this.props.history.push("/main");
          });
        }
      })
      .catch((err) => console.log(err));
    }
  }

  handleCardClick = (item) => {
    this.setState({
      selectedCard: item,
      isImagePopupOpen: true
    })
  }

  handleEditAvatarClick = () =>{
    this.setState({
      isEditAvatarPopupOpen: true,
    });
	}

	handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true,
    });
	}

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true,
    });
	}

  handleInfoTooltipsClick = () =>{
    this.setState({
      isInfoTooltipOpen: true,
    });
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {},
      isImagePopupOpen: false,
      isInfoTooltipOpen: false,
    })
  }

  handleUpdateUser = (data) => {
    api.saveDataUserInfo(data)
    .then((res) => 
      this.setState({
        isEditProfilePopupOpen: false,
        currentUser: res
      })
    )
    .catch((err) => console.log(err));
  }

  handleUpdateAvatar = (link) => {
    api.changeAvatar(link)
    .then((res) => 
      this.setState({
        isEditAvatarPopupOpen: false,
        currentUser: res
      })
    )
    .catch((err) => console.log(err));
  }

  handleCardLike = (card) => {
    
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(el => el === this.state.currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => { 
      this.setState((state) => ({
        cards: state.cards.map((el) => el._id  === card._id ? newCard : el)
      }))
		})
		.catch((err) => console.log(err));
		
	}

  handleCardDelete = (card) => {
		api.deleteCard(card._id)
    .then(() => {
      this.setState((state) => ({
        cards: state.cards.filter(function(el){
          return el._id !== card._id
        })
      }))
    })
    .catch((err) => console.log(err));
	}

  handleAddPlaceSubmit = (data) =>{
    api.addNewCard(data)
    .then((newCard) => 
      this.setState((state) => ({
        isAddPlacePopupOpen: false,
        cards: ([newCard, ...state.cards])
      }))
    )
    .catch((err) => console.log(err));
  }

  handleRegisterSubmit = (data) =>{
    auth.register(data.email, data.password)
    .then((res) => {
      if(res !== undefined){
        this.setState({
          message: '',
          alt:'ура',
          src: check,
          text: "Вы успешно зарегистрировались!"
        }, () => {
          this.handleInfoTooltipsClick()
          this.props.history.push('/sign-in')
       }
       )
      }
    })
    .catch((err) => {
      this.setState({
        message: 'Что-то пошло не так!',
        src: cross,
        alt: "не получилось(",
        text: "Что-то пошло не так! Попробуйте ещё раз."
      })
      this.handleInfoTooltipsClick();
    console.log(err)});
  }

  handleLoginSubmit = (data) => {
    if (!data.email || !data.password){
      return;
    }
    auth.authorize(data.email, data.password)
    .then((data) => {
      if (data.token){
        this.setState({
          username: '',
          password: ''
        }, () => {
          this.handleLogin();
          this.props.history.push('/main');
        })
        this.tokenCheck()
      }  
    })
    .catch(err => {
      this.setState({
        src: cross,
        alt: "не получилось(",
        text: "Что-то пошло не так! Попробуйте ещё раз."
      })
      this.handleInfoTooltipsClick();
      console.log(err);// запускается, если пользователь не найден
    });
  }

  render(){
  return (

    <div className="page">
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Switch >
        <ProtectedRoute
        component={Main}
        path="/main" 
        loggedIn={this.state.loggedIn}
        onEditAvatar={this.handleEditAvatarClick}
        onEditProfile={this.handleEditProfileClick}
        onAddPlace={this.handleAddPlaceClick}
        onCardClick={this.handleCardClick}
        cards={this.state.cards}
        onCardLike={this.handleCardLike}
        onCardDelete={this.handleCardDelete}
        userData={this.state.userData}>
        </ProtectedRoute>
        <Route path="/sign-up">
        <Header name="Войти" userData={''} link="sign-in"/>
          <Register
          onRegister={this.handleRegisterSubmit}
          />
        </Route>
        <Route path="/sign-in">
          <Header name="Регистрация" link="sign-up" userData={''} />
          <Login handleLogin={this.handleLogin}
          onLogin={this.handleLoginSubmit} />
        </Route>
        <Route exact path="/">
          {this.state.loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-up" />}
        </Route> 
        </Switch>
       
        <Footer />
        <InfoTooltip
        src={this.state.src} 
        alt={this.state.alt}
        text = {this.state.text}
        name="tooltips"
        isOpen = {this.state.isInfoTooltipOpen}
        onClose={this.closeAllPopups}
          />
        <EditProfilePopup 
        onUpdateUser={this.handleUpdateUser} 
        isOpen={this.state.isEditProfilePopupOpen} 
        onClose={this.closeAllPopups} />
        <AddPlacePopup 
        onAddPlace={this.handleAddPlaceSubmit} 
        isOpen={this.state.isAddPlacePopupOpen} 
        onClose={this.closeAllPopups}/>
        <EditAvatarPopup 
        onUpdateAvatar={this.handleUpdateAvatar} 
        isOpen={this.state.isEditAvatarPopupOpen} 
        onClose={this.closeAllPopups} />
        <PopupWithForm name="deletet" title="Вы уверены?">
          <div className="popup__wrapper">[props.children]</div>
        </PopupWithForm>
        <ImagePopup 
        name="imgcard" 
        card={this.state.selectedCard} 
        onClose={this.closeAllPopups} 
        isOpen={this.state.isImagePopupOpen}/>
      </CurrentUserContext.Provider>
    </div>
    
  );
  }
}

export default withRouter(App);