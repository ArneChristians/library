const myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call this constructor")
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        return `title + "by " + author + ", " + pages + "pages, " + read`;
    };
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book)
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');

addBookToLibrary('Gedage', 'bagnado', '295', 'not read yet');


myLibrary.forEach(book => {    
    const content = document.querySelector('#content');

    const card = document.createElement("div");
    card.classList.add("card");
    
    const cardContent = document.createElement("div");
    cardContent.classList.add("cardContent")

    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.classList.add("pages");
    pages.textContent = `Pages: ${book.pages}`;

    const read = document.createElement("p");
    read.classList.add("read");
    read.textContent = `Read: ${book.read}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");

    const readButton = document.createElement("button");
    readButton.setAttribute("type", "button");
    readButton.classList.add("readButton");
    readButton.textContent = 'Read';

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = 'Delete';

    
    cardContent.appendChild(title);
    cardContent.appendChild(author);
    cardContent.appendChild(pages);
    cardContent.appendChild(read);
    cardContent.appendChild(buttonContainer);

    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(deleteButton);
    
    content.appendChild(card);
    card.appendChild(cardContent);
});



