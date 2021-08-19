const url = window.location.hostname.includes('localhost') ? 'http://localhost:8080/api/auth/' : 'mi pagina en Heroku';

let user = null;
let socket = null;

// References HTML
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessage = document.querySelector('#ulMessage');
const btnExit = document.querySelector('#btnExit');

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

  // change the name of navigator for the user active
  document.title = user.name;

  await connectSocket();
};

const connectSocket = async () => {
  socket = io({
    // TODO: add extra headers
    extraHeaders: {
      'x-token': localStorage.getItem('token'),
    },
  });

  // create events
  socket.on('connect', () => {
    console.log('socket online');
  });

  socket.on('disconnect', () => {
    console.log('socket offline');
  });

  // listening
  socket.on('receive-message', (payload) => {
    // TODO:
    paintMessages(payload);
  });

  socket.on('active-users', (payload) => {
    // TODO:
    paintUsers(payload);
  });

  socket.on('private-message', () => {
    // TODO:
  });
};

const paintUsers = (users = []) => {
  let usersHtml = '';
  users.forEach(({ name, uid }) => {
    usersHtml += `
    <li>
      <p>
        <h5 class='text-success'>${name}</h5>
        <span class='fs-6 text-muted'>${uid}</span>
      </p>
    </li>
    `;
  });

  ulUsers.innerHTML = usersHtml;
};

const paintMessages = (messages = []) => {
  let messagesHtml = '';
  messages.forEach(({ name, message }) => {
    messagesHtml += `
    <li>
      <p>
        <span class='text-primary'>${name}: </span>
        <span>${message}</span>
      </p>
    </li>
    `;
  });

  ulMessage.innerHTML = messagesHtml;
};

// check KeyCode of Enter is equal 13
txtMessage.addEventListener('keyup', ({ keyCode }) => {
  const message = txtMessage.value;
  const uid = txtUid.value;

  if (keyCode !== 13) {
    return;
  }

  if (message.length === 0) {
    return;
  }

  socket.emit('send-message', { message, uid });

  txtMessage.value = '';
});

const main = async () => {
  // validate JWT
  await validateJWT();
};

main();
