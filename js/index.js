document.addEventListener("DOMContentLoaded", function() {});

const URL_BOOKS = "http://localhost:3000/books";
const URL_USERS = "http://localhost:3000/users";
const bookListEl = document.getElementById("list");
const bookShowEl = document.getElementById("show-panel");

const iterateBooks = Books => Books.forEach(renderBookList);
const setUser = users => {
  return users;
};
const user = setUser[0];

const renderBookList = book => {
  let bookTitleEl = document.createElement("li");
  bookTitleEl.setAttribute("id", book.id);
  bookTitleEl.innerText = book.title;
  bookTitleEl.addEventListener("click", () => renderShowBook(book));
  bookListEl.append(bookTitleEl);
};

const renderShowBook = book => {
  bookShowEl.innerText = "";
  let bookShowUserEl = document.createElement("div");
  let bookShowTitleEl = document.createElement("h2");
  let bookShowDescEl = document.createElement("p");
  let bookShowImageEl = document.createElement("img");
  let bookShowLikeButtonEl = document.createElement("button");
  let bookShowUserListEl = document.createElement("ul");
  bookShowLikeButtonEl.innerText = "Like this Book";
  bookShowUserEl.className = "user-panel";
  bookShowLikeButtonEl.addEventListener("click", () => {
    if (book.users.find(user => user.id == 1)) {
      removeLike(book);
    } else {
      likeBook(book);
    }
  });
  bookShowTitleEl.innerText = book.title;
  bookShowImageEl.src = book.img_url;
  bookShowDescEl.innerText = book.description;
  bookShowEl.append(
    bookShowTitleEl,
    bookShowImageEl,
    bookShowDescEl,
    bookShowUserEl
  );
  bookShowUserEl.append(bookShowLikeButtonEl, bookShowUserListEl);
  book.users.forEach(user => {
    let bookShowUserLikesEl = document.createElement("li");
    bookShowUserLikesEl.innerText = user.username;
    bookShowUserListEl.append(bookShowUserLikesEl);
  });
};

const likeBook = book => {
  fetch(`${URL_BOOKS}/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      users: [...book.users, userOne]
    })
  })
    .then(response => response.json())
    .then(data => {
      renderShowBook(data);
    });
};

const removeLike = book => {
  let user = book.users.find(user => user.id == 1);
  let index = book.users.indexOf(user);
  book.users.splice(index, 1);
  fetch(`${URL_BOOKS}/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      users: book.users
    })
  })
    .then(response => response.json())
    .then(data => {
      renderShowBook(data);
    });
};

const requestBooks = fetch(URL_BOOKS);
const jsonify = response => response.json();
const renderBookInfo = infoData => {
  iterateBooks(infoData);
};
const getUserInfo = () => {
  return fetch(`${URL_USERS}/1`).then(resp => resp.json());
};
let userOne = null;
getUserInfo().then(user => (userOne = user));

// requestUsers.then(jsonify).then(renderUserInfo);
requestBooks.then(jsonify).then(renderBookInfo);
