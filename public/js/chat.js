const url = window.location.hostname.includes('localhost') ? 'http://localhost:8080/api/auth/' : 'mi pagina en Heroku';

let user = null;
let socket = null;

// validate the token of localStorage
const validateJWT = async () => {
  const token = localStorage.getItem('token') || '';

  if (token.length <= 10) {
    window.location = 'index.html';
    throw new Error('Token not exist on the server');
  }

  const resp = await fetch(url, {
    headers: { 'x-token': token },
  });

  const { user: userDB, token: tokenDB } = await resp.json();
  console.log(userDB, tokenDB);

  // TODO: renew token
  localStorage.setItem('token', tokenDB);

  user = userDB;
};

const main = async () => {
  // validate JWT
  await validateJWT();
};

main();

// const socket = io();
