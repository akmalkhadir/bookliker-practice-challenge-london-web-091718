// All the elements needed
const listPanel = document.querySelector('#list-panel')
const list = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')
let localBooks
let localUsers
let myUser

// Render one book
const renderSingleBookTitle = book => {
  const listItem = document.createElement('li')
  listItem.id = book.id
  listItem.innerHTML = `
  ${book.title}
  `
  list.appendChild(listItem)
}

// Render all books
const renderAllBooksTitle = books => books.forEach(book => renderSingleBookTitle(book))

// Render a book info
const renderBookInfo = book => {
  const bookItem = document.createElement('div')
  const bookUsers = book.users.map(user => user.username).join('</p><p>')
  bookItem.innerHTML = `
    <h2>${book.title}</h2>
    <img src="${book.img_url}"></img>
    <p>${book.description}</p>
    <h4>People who liked this book</h4>
    <p>${bookUsers}</p>
    <button>Read Book</button>
  `
  showPanel.appendChild(bookItem)

  bookItem.querySelector('button').addEventListener('click', event => {
    if (!book.users.some(user => user.id === myUser.id)) {
      book.users.push(myUser)
      showPanel.innerHTML = ``
      renderBookInfo(book)
      updateBook(book)
    } else {
      alert(`You love this book so much didn't you?`)
    }
  })
}

getBooks()
  .then(books => {
    localBooks = [...books]
    renderAllBooksTitle(localBooks)
  })

getUsers()
  .then(users => {
    localUsers = [...users]
    myUser = localUsers.find(user => user.id === 1)
  })

list.addEventListener('click', event => {
  let bookId = parseInt(event.target.id)
  let zeBook = localBooks.find(book => book.id === bookId)
  showPanel.innerHTML = ``
  renderBookInfo(zeBook)
})
