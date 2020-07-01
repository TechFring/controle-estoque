let product = {
    title: 'Produtos',
    modal: 'product.html',
    idSearch: 'searchProduct',
    placeholder: 'Pesquisar nome',
    dataTarget: 'createProduct'
}

$('header #product').on('click', () => {
    setTitle(product.title);
    loadModal(product.modal);
    setSearchFormData(product.idSearch, product.placeholder);
    setDataTarget(product.dataTarget);
    getProductStatistics();
    getProductRegisters();
});

$('section#modal').on('submit', '#createProduct form', e => {
    e.preventDefault();

    let data = $(e.target).serialize();
    createProduct(data);
});

$('section#modal').on('submit', '#editProduct form', e => {
    e.preventDefault();
    
    let data = $(e.target).serialize();
    updateProduct(data);
});

$('section#registers').on('click', '.btn-update-product', e => {
    let td = getRow(e.target).find('td');
    let data = [];

    $.each(td, (index, value) => {
        if ($(value).text().trim() != '') {
            data.push($(value).text());
        }
    });

    setProductEditFormData(data);
});

$('section#registers').on('click', '.btn-delete-product', e => {
    let tr = getRow(e.target);
    let name = tr.find('td:first').next().text();

    alertify.confirm(
        'Alerta de confirmação',
        `Deseja apagar o produto ${name}?`,
        () => {
            let id = tr.find('td:first').text();
            deleteProduct(id);
        },
        undefined
    )
});

$('section#registers').on('keyup', '#searchProduct', e => {
    let data = $(e.target).parent().find('input').val();
    searchProduct(data);
    $(e.target).trigger('submit');
});