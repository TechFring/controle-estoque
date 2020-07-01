function loadModal(page) {
    $('section#modal').load(page);
}

function setTitle(title) {
    $('#title').text(title);
}

function hideModal(id) {
    $(`section#modal #${id}`).modal('hide');
}

function clearSearchForm() {
    $(`section#registers form input`).val('');
}

function clearModalForm(modal) {
    $(`section#modal #${modal} form input`).val('');
}

function getRow(target) {
    return $(target).closest('tr');
}

function setSearchFormData(id, placeholder) {
    $('section#registers input').attr('id', id);
    $('section#registers input').attr('placeholder', placeholder);
}

function setDataTarget(datatarget) {
    $('section#registers a').attr('data-target', `#${datatarget}`);
}

function setLastPage(page) {
    localStorage.setItem('lastPage', page);
}

function getLastPage() {
    switch (localStorage.getItem('lastPage')) {
        case 'customer':
            $('header #customer').trigger('click');
            break;
        case 'product':
            $('header #product').trigger('click');
            break;
        case 'sale':
            $('header #sale').trigger('click');
            break;
        default:
            $('header #customer').trigger('click');
    }
}