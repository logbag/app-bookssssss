document.addEventListener('DOMContentLoaded', () => {
    const btnClass = {
        VIEW: 'aside-block__view',
        EDIT: 'aside-block__edit'
    };

    let parentView = document.createElement("div");
    parentView.classList.add('parent-box');

    let body = document.querySelector('body');
    let main = document.createElement('main');
    body.append(main);



    function createHeader() {
        let header = document.createElement('header');
        header.classList.add('header');
        header.innerHTML = `  
        <label class="genre_lb">
                Genre

            </label>
            <label class="radio_lb">
                Author
                <input type="radio" name="search_radio" value="author">
            </label>
            <label class="radio_lb">
                Book
                <input type="radio" name="search_radio" value="book">
            </label>
            <label>
                <input type="text" placeholder="Search" id="search">
                <button class="surch_btn">S</button>
            </label>`;

        body.prepend(header);
        document.querySelector('.genre_lb').append(getGenre())

    }
    createHeader();
    function createAside() {
        let aside = document.createElement('aside');
        aside.innerHTML = `
            <div class="aside-block">
                <div class="aside-block__content">                   
                </div>
            </div>
            <button class="btn btn__add">add</button>`;
        main.append(aside);
        createAsideItem();

    }
    createAside();
    function createAsideItem(arrBooks = GetlocalBooks()) {
        let asideBlockContent = document.querySelector('.aside-block__content');
        asideBlockContent.innerHTML = '';
        arrBooks.forEach(item => {
            let blockBook = document.createElement('div');
            blockBook.classList.add('aside-block__book');
            blockBook.innerHTML = `
            <div class="aside-block__img">
                <img src="${item.imgUrl}" alt="">
            </div>
            <div class="aside-block__title">${item.nameBook}</div>
            <a class="btn aside-block__view" id='${item.idBook}' href="#view" >View</a>
            <a class="btn aside-block__edit" id='${item.idBook}' href="?id=${item.idBook}#edit">Edit</a>   
            `;
            asideBlockContent.append(blockBook);
        })
    };
    function renderView(thisBook) {
        parentView.innerHTML = `
        <div class="view-info">
            <div class="edit-box">
                <img class="view-info__img" src="${thisBook.imgUrl}" alt="">
            </div>

            <div class="view-info__titles">
                <h3 class="view-info__title">${thisBook.nameAuthor}</h3>
                <h3 class="view-info__title">${thisBook.nameBook}</h3>
                <h3 class="view-info__title">GENRE:${thisBook.genre}</h3>
            </div>
        </div>
        <div class="view-description">
            <h3 class=" view-info__title view-description">DESCRIPTION</h3>
            <p class="view-description__text">${thisBook.desc}</p>
        </div>`;
        main.append(parentView);
    };

    function renderEdit(thisBook) {
        parentView.innerHTML = `
        <div class="edit-info">
            <div class="edit-box">
                <img id="imgUrl" class="edit-info__img" src="${thisBook.imgUrl}" alt="">
                <label class="edit__download" for="download">
                    download
                    <input id="download" class="edit-info__btn" type="file" accept="image/*" onchange="openFile(event)">
                <label>
            </div>
            <div class="edit-info__titles">
                <input type="text" value="${thisBook.nameAuthor}" id="nameAuthor" class="edit-info__input">
                <input type="text" value="${thisBook.nameBook}" id="nameBook" class="edit-info__input">
                <h3 class="edit-info__title">GENRE:</h3>
                <div class="edit-info__btn">
                    <button class="edit-info__save">save</button>
                    <button class="edit-info__cancel">cancel</button>
                </div>
            </div>

        </div>
        <div class="edit-description">
            <input type="text" value="${thisBook.title}" id="title" class="edit-info__title view-description">
            <textarea id="desc" class="edit-description__text">${thisBook.desc}</textarea>
        </div>`;
        main.append(parentView);
        document.querySelector('.edit-info__title').append(getGenre());

    };
    function renderAdd() {
        parentView.innerHTML = `
        <div class="edit-info">
            <div class="edit-box">
                <img id="imgUrl" class="edit-info__img" src="" alt="">
                <label class="edit__download" for="download">
                    download
                    <input id="download" class="edit-info__btn" type="file" accept="image/*" onchange="openFile(event)">
                <label>
            </div>
            <div class="edit-info__titles">
                <input type="text" value="" id="nameAuthor" class="edit-info__input">
                <input type="text" value="" id="nameBook" class="edit-info__input">
                <h3 class="edit-info__title">GENRE:</h3>
                <div class="edit-info__btn">
                    <button class="edit-info__save">save</button>
                    <button class="edit-info__cancel">cancel</button>
                </div>
            </div>

        </div>
        <div class="edit-description">
            <input type="text" value="" id="title" class="edit-info__title view-description">
            <textarea id="desc" class="edit-description__text"></textarea>
        </div>`;
        main.append(parentView);
        document.querySelector('.edit-info__title').append(getGenre());
    };
    function errorPage() {
        parentView.innerHTML = `
    <div class="error">
        <h1>404</h1>
        <h2>error load page</h2>
    <div>
    `;
        main.append(parentView);
    };
    function getGenre() {
        let genres = GetlocalBooks().map((valueGenre) => {
            if (!GetlocalBooks().includes(valueGenre.genre)) {
                return valueGenre.genre
            }
        });
        let newgenre = [];
        newgenre.push(genres[0]);
        let select = document.createElement('select')
        genres.forEach(item => {
            if (!newgenre.includes(item)) {
                let optionGenre = document.createElement('option');
                optionGenre.value = item;
                optionGenre.innerHTML = item;
                select.append(optionGenre);
            }
        })


        return select;
    };

})