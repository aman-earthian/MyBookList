//Book- class
class Book {
    constructor(title , author , isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class
class UI{
    static displayBooks(){
    
        const books = Store.getBooks();

        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.tilte}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message , className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createElementTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        //vanish
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store class
class store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static addBooks(){
        const books = Store.getBooks();
        book.push(book);
        localStorage.setItem('books' , JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book , index) => {
            if(book.isbn === isbn){
                books.splice(index , 1);
            }
        });
    }
}


//Display Books
document.addEventListener('DOMContentLoader' , UI.displayBooks);

//Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    
    //Prevent actual submit
    e.preventDefault();
    
    //Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all fields', 'danger');
    }

    //Instantiate book
    const book = new Book(title , author , isbn);

    //Add book to list
    UI.addBookToList(book);
    //Add book to store
    Store.addBook(book);

    //Show success
    UI.showAlert('Book Added' , 'success');

    //clear fields
    UI.clearFields();
});

//Remove a book
document.querySelector('#book-list').addEventListener('click' , (e) => {
    UI.deleteBook(e.target);

    //remove from store
    Store.removeBook(e.target.parentElement.previousEelmentSibling.textContent);

    //Show success
    UI.showAlert('Book Removed' , 'success');
});