document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener("hashchange", hashChanges);
    const actions = {
        VIEW: 'view',
        EDIT: 'edit',
        ADD: 'add'
    }

    function updateStatusUrl(id, action) {
        history.pushState(null, 'title', `?id=${id}#${action}`)
    }
    

    function hashChanges() {
        let hash = location.hash.slice(location.hash.indexOf('#') + 1)
        let id = location.search.slice(location.search.indexOf('=') + 1)
        let book = thisBook(id)

        if (hash === '' && id === '') {
            return
        } else {
            history.pushState({ search: id, hash }, null, `?id=${id}#${hash}`)
            if (hash === actions.EDIT) {
                renderEdit(book)
            } else if (hash === actions.VIEW) {
                renderView(book)
            } else if (hash == actions.ADD) {
                renderAdd(thisBook)
            } else if (hash = '' || hash !== actions.VIEW || hash !== actions.EDIT || hash !== actions.ADD || id === '') {
                errorPage();
            }
        }
    };
    
    hashChanges();
});

//################################

function openFile(event) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        let dataUrl = reader.result
        debugger
        let output = document.querySelector('#imgUrl')
        output.src = dataUrl
    }
    reader.readAsDataURL(input.files[0])
}
