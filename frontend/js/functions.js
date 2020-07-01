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