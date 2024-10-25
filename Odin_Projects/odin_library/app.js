const library = [];

function Book(title, author, number_of_pages, read = false) {
    this.author = author;
    this.title = title;
    this.number_of_pages = number_of_pages;
    this.read = read;
}
Book.prototype.setReadStatus = () => {
    this.read = !this.read
    console.log('is read ', this.read);
}

function showForm(name) {
    let book_btn = document.querySelector("#new-book");
    let form = document.querySelector('#book-form');
    book_btn.style.display = 'none';
    form.style.display = 'block';
}

function addBookToLibrary(book) {
    library.push(book);
}

function deleteBook(index) {
    console.log('index', index)
    library.splice(index, 1);
    console.log('library ', library)
    displayBooks();


}

function displayBooks() {
    console.log('run after delete')
    let books = document.querySelector("#books");
    books.innerHTML = '';
    library.forEach((book, index) => {
        let books = document.querySelector("#books");
        let bookDiv = document.createElement('div');
        let titleDiv = document.createElement('div');
        titleDiv.textContent = book.title;
        let authorDiv = document.createElement('div');
        authorDiv.textContent = book.author;
        let pagesDiv = document.createElement('div');
        pagesDiv.textContent = book.number_of_pages;
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(pagesDiv);
        let id = book.title;
        bookDiv.style.id = id;
        let delete_btn = document.createElement('button');
        delete_btn.textContent = "Delete Book";
        delete_btn.addEventListener('click', function() {
            deleteBook(index);
        });
        bookDiv.appendChild(delete_btn);
        let readBtn = document.createElement('button');
        readBtn.textContent = "Set Read Status";
        readBtn.onclick = () => {
            let book = library[index];
            book.setReadStatus();
        }
        bookDiv.appendChild(readBtn);
        books.appendChild(bookDiv);

    })
}




let book_btn = document.querySelector("#new-book");
book_btn.addEventListener('click', showForm);
let form = document.querySelector('#book-form');
displayBooks();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = form.querySelector('input[name="name"]').value;
    let author = form.querySelector('input[name="author"]').value;
    let pages = form.querySelector('input[name="pages"]').value;
    let book = new Book(title, author, pages);
    addBookToLibrary(book);
    console.log('library ', library);
    form.style.display = "none";
    displayBooks();
    book_btn.style.display = 'block';
});