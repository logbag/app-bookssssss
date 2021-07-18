document.addEventListener('DOMContentLoaded', () => {
    function clickAsideBtns() {
        let asideBlockContent = document.querySelector('.aside-block__content');
        let asideBtns = asideBlockContent.querySelectorAll('.btn');
        let btnAdd = document.querySelector('.btn__add');

        asideBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                let buff = event.target.className.split(' ');
                event.preventDefault();
                if (buff.includes(btnClass.VIEW)) {
                    let bookId = GetlocalBooks().filter(book => book.idBook == btn.id);
                    renderView(bookId[0]);
                    updateStatusUrl(bookId[0].idBook, 'view')
                }
                else if (buff.includes(btnClass.EDIT)) {
                    let bookId = GetlocalBooks().filter(book => book.idBook == btn.id);
                    renderEdit(bookId[0])
                    saveBook(btn.id)
                    updateStatusUrl(bookId[0].idBook, 'edit')
                }
            })
        });




        btnAdd.addEventListener('click', () => {
            renderAdd();
            const newID = GetlocalBooks().length + 1;
            saveBook(newID, true);
            updateStatusUrl(newID, 'add');
        })

    };
    clickAsideBtns();
})