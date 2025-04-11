const myLibrary = []
const library_disply = document.querySelector('#library-display');
const submitBook = document.querySelector('#submit-book')
const addForm = document.querySelector('#new-book-form')


function Book(title,author, pages, read ){
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID(),
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    // this.info = function(){
    //     return this.author
    // }

}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
  };

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    displayBooks()
  }

function displayBooks(){
    myLibrary.forEach(book => 
     {
        addCard(book)
     }
    )

}

function addCard(book){
  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  const readButton = document.createElement("button");
  readButton.classList.add("remove-button")
  const read = document.createElement("p");
  read.textContent = book.read;
  read.classList.add("read");
  removeButton.classList.add("removeButton");
  readButton.classList.add("readButton");
  title.textContent = book.title;
  author.innerHTML = "Written by: <br>"+book.author;
  pages.textContent = book.pages+" pages";
  removeButton.textContent = "Remove";
  readButton.textContent = `
   ${book.read ? 'Read' : 'Not Read'} 
  `
  bookCard.dataset.id = book.id;
  removeButton.dataset.id = book.id;
  readButton.dataset.id = book.id;
  bookCard.append(title, author, pages, removeButton, readButton, read);
  library_disply.appendChild(bookCard);
  removeButton.addEventListener("click", () => {
      deleteBook(book.id);
  });
  readButton.addEventListener("click", () => {
    toggleReadStatus(book.id);
  })
}

function toggleReadStatus(id) {
    myLibrary.forEach((Book) => {
      if(Book.id == id){
          if(Book.read == "Read"){
              Book.read = "Not Read";
          }
          else{
              Book.read =  "Read";
          }
      }    
    })
    library_disply.innerHTML = "";
    displayBooks();
  }
  
  function deleteBook(id) {
    myLibrary.forEach((Book) => {
      if(Book.id == id){
          myLibrary.splice(myLibrary.indexOf(Book),1);
      }
  })
  library_disply.innerHTML = "";
 
    displayBooks()
  }

  

  submitBook.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(addForm)
    addBookToLibrary(addForm.title.value, addForm.author.value, addForm.pages.value, addForm.been_read.checked);
    library_disply.innerHTML = "";
    displayBooks();

})


  
