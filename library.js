//Book Array (all stored books)
const myLibrary = [];

//Book constructor
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

// Function to add Books
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
}

//Dummy Content
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'Not read yet');
addBookToLibrary('Gedage', 'bagnado', '295', 'Not read yet');

const content = document.querySelector('#content');

function renderBook(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = book.id;
    
    const cardContent = document.createElement("div");
    cardContent.classList.add("cardContent")
    cardContent.dataset.id = book.id;

    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = book.title;
    title.dataset.id = book.id;

    const author = document.createElement("p");
    author.classList.add("textContent");
    author.textContent = `Author: ${book.author}`;
    author.dataset.id = book.id;

    const pages = document.createElement("p");
    pages.classList.add("textContent");
    pages.textContent = `Pages: ${book.pages}`;
    pages.dataset.id = book.id;

    const read = document.createElement("p");
    read.classList.add("textContent");
    read.classList.add("readText");
    read.textContent = `Read: ${book.read}`;
    read.dataset.id = book.id;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    buttonContainer.dataset.id = book.id;

    const readButton = document.createElement("button");
    readButton.setAttribute("type", "button");
    readButton.classList.add("readButton");
    readButton.textContent = 'Read';
    readButton.dataset.id = book.id;

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.id = book.id;
    
    cardContent.appendChild(title);
    cardContent.appendChild(author);
    cardContent.appendChild(pages);
    cardContent.appendChild(read);
    cardContent.appendChild(buttonContainer);

    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(deleteButton);
    
    content.appendChild(card);
    card.appendChild(cardContent);
}

//Library Loop
myLibrary.forEach(renderBook);

//Delete Button
const deleteButton = document.querySelector(".deleteButton");
content.addEventListener("click", (e) => {
    if(!e.target.classList.contains("deleteButton")) return;
    const card = e.target.closest(".card");
    const id = card.dataset.id;
    
    //DOM entfernen
    card.remove();

    //Remove in Array
    const index = myLibrary.findIndex(book => book.id === id);
    if(index !== -1) {
        myLibrary.splice(index, 1);
    }
})

//Read Button
const readButton = document.querySelector(".readButton");
content.addEventListener("click", (e) => {
    if(!e.target.classList.contains("readButton")) return;

    const card = e.target.closest(".card")
    const readText = card.querySelector(".readText");
    

    if(readText.textContent === "Read: Already read"){
        readText.textContent = "Read: Not read yet";
    } else {
        readText.textContent = "Read: Already read"
    }
    
})


// Add Button
const addButton = document.querySelector("#addButton");
const addDialog = document.querySelector("[data-add-dialog]");

addButton.addEventListener("click", () => {
    addDialog.showModal();
})

// Submit Button
const submitButton = document.querySelector("[data-submit-button]");
submitButton.addEventListener("click", () => {
    addDialog.close();
})

const form = document.querySelector("[data-dialog-form]");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const title = data.get("title");
    const author = data.get("author");
    const pages = data.get("pages")
    const readValue = data.get("read") === "on" ? "Already read" : "Not read yet";

    const book = addBookToLibrary(title, author, pages, readValue);
    renderBook(book);
    form.reset();
})
