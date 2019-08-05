class User {
	constructor(id, name, email, password, role) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
	}
}

// register User
function register() {
	let id = Math.floor(Math.random() * 1000000);
	let firstName = document.getElementById('firstName').value;
	let lastName = document.getElementById('lastName').value;
	let name = firstName + " " + lastName;
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	let role = document.getElementById('role').value;

	let newUser = new User(id, name, email, password, role);
	let userCart = "cart_" + newUser.id;

	if(localStorage.getItem('Users')) {
		let users = []
		users = JSON.parse(localStorage.getItem('Users') || "[]");
		console.log(users);
		users.push(newUser);
		localStorage.setItem('Users', JSON.stringify(users));
		localStorage.setItem(userCart, JSON.stringify([]));
		window.location = '/auth/login.html'
		window.alert("User successfully created. Now login to continue.!");
	} else {
		localStorage.setItem('Users', JSON.stringify([newUser]));
		localStorage.setItem(userCart, JSON.stringify([]));
		window.location = '/auth/login.html'
		window.alert("User successfully created. Now login to continue.!");
	}
}

// login user
function login() {
	let email = document.getElementById('loginEmail').value;
	let password = document.getElementById('loginPassword').value;
	let users = JSON.parse(localStorage.getItem('Users') || "[]");
	let user;
	let isAuthUser = false;
	var i;
	for(i = 0; i < users.length; i++) {
		user = users[i];
		if(user.email === email && user.password === password) {
			isAuthUser = true;
			sessionStorage.setItem('isAuthenticated', true);
			break;
		}
	}

	if(isAuthUser) {
		sessionStorage.setItem('currUserName', user.name.split(' ')[0]);
		sessionStorage.setItem('currUserId', user.id);
		sessionStorage.setItem('currUserEmail', user.email);
		sessionStorage.setItem('isAuthenticated', true);
		window.location = '/'
	} else {
		window.alert("Invalid email or incorrect password. Try Again!");
	}
}

