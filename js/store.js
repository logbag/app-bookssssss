document.addEventListener('DOMContentLoaded', () => {
    function workLocalStorage(books) {
        if (!localStorage.getItem('localBook')) {
            localStorage.setItem('localBook', JSON.stringify(books))
        } else {
            return
        }
    }
    workLocalStorage(books);

    function GetlocalBooks() {
        return JSON.parse(localStorage.getItem('localBook'));
    };
    function thisBook(id) {
        let isBook;
        GetlocalBooks().forEach(book => {
            if (book.idBook === +id) {
                isBook = book;
            }
        })
        return isBook;
    };

    function saveBook(id, newObj = false) {

        let inputAutor = document.querySelector("#nameAuthor");
        let inputBook = document.querySelector("#nameBook");
        let imgUrl = document.querySelector("#imgUrl");
        let title = document.querySelector("#title");
        let desc = document.querySelector("#desc");
        let genre = document.querySelector("#genre");
        let saveBtn = document.querySelector('.edit-info__save');


        saveBtn.addEventListener('click', () => {
            let obj = {
                "nameBook": inputBook.value,
                "nameAuthor": inputAutor.value,
                "idBook": id,
                "title": title.value,
                "imgUrl": imgUrl.src,
                "genre": genre.value,
                "desc": desc.value
            };
            updateLocalStorage(id, obj, newObj)
        })
    };
    function updateLocalStorage(id, newValue, newObj) {
        if (newObj) {
            let newBooks = GetlocalBooks();
            newBooks.push(newValue)
            localStorage.setItem('localBook', JSON.stringify(newBooks))
        } else {
            let newBooks = GetlocalBooks().map(book => {
                if (book.idBook == id) {
                    return newValue
                } else {
                    return book
                }
            });
            localStorage.setItem('localBook', JSON.stringify(newBooks))
        }
    };
})