export default class Api{
	constructor(options){
		this._url = options.baseUrl;
		this._token = options.token;
	}

	_handleResponse(res) {
		if (!res.ok) {
			return Promise.reject(`Error: ${res.status}`);
		}
		return res.json();
	}

	renderCards (){
		console.log(this._token)
		return fetch(`${this._url}cards` , {
		headers: {
			authorization: this._token
		}
	})
	.then(this._handleResponse)
	.then((result) => {
		return result
	})
	}


	getUserInfo (){

		return fetch(`${this._url}users/me`, {
		headers: {
			authorization: this._token
		}
		})
		.then(this._handleResponse)
		.then((result) => {
			return result
		})

	}

	saveDataUserInfo(data) {
		return fetch(`${this._url}users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(data)
			
		})
		.then(this._handleResponse)
	}

	addNewCard(data){
		
		return fetch(`${this._url}cards`, {
			method: 'POST',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(
				data
			)	
		})
		.then(this._handleResponse)
		.then(data => {return data})
	}


	deleteCard(id){
		return fetch(`${this._url}cards/`+id, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
		})
		.then(this._handleResponse)
	}

	addLike(id){
		return fetch(`${this._url}cards/likes/`+id, {
			method: 'PUT',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
		})
		.then(this._handleResponse)
	}
	
	deleteLike(id){
		return fetch(`${this._url}cards/likes/`+id, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
		})
		.then(this._handleResponse)
	}

	changeAvatar(data){
		return fetch(`${this._url}users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(
				{avatar: data.avatar }
			)
		})
		.then(this._handleResponse)
		.then(userAvatar => {
			return userAvatar;
	 	})
	}

	changeLikeCardStatus(card , like) {
		
		if (like === true){
			return api.addLike(card)
		}else{
			return api.deleteLike(card)
		}

	}
}


export const api = new Api({
	baseUrl:'https://api.mestovarvara.students.nomoredomains.rocks/',
	token: 'Bearer ' + localStorage.getItem('jwt')
});