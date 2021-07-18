document.addEventListener('DOMContentLoaded', () => {
    function selectFilter() {
        let searchSelect = document.querySelectorAll('[name="search_radio"]');
        let selected;
        searchSelect.forEach(item => {
            item.addEventListener('change', () => {
                if (item.checked) {
                    selected = item.value;
                    searchFilter(selected);
                }
            })
        })

    };

    selectFilter();
    function searchBook() {
        return document.querySelector('#search').value;
    };

    function searchFilter(selectRadio) {
        let btnSearch = document.querySelector(".surch_btn")

        btnSearch.addEventListener("click", () => {
            let searchInput = searchBook();
            let key;
            if (selectRadio === 'book') {
                key = 'nameBook';
            }
            else if (selectRadio === 'author') {
                key = 'nameAuthor';
            }
            let isBook = [];
            GetlocalBooks().forEach(book => {
                if (book[key] == searchInput) {
                    isBook.push(book);
                }
            })
            createAsideItem(isBook);

        })


    };
})