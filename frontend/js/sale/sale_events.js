let sale = {
    title: 'Vendas',
    modal: 'sale.html',
    idSearch: 'searchSale',
    placeholder: 'Pesquisar CPF',
    dataTarget: 'createSale'
}

$('header #sale').on('click', () => {
    setTitle(sale.title);
    loadModal(sale.modal);
    setSearchFormData(sale.idSearch, sale.placeholder);
    setDataTarget(sale.dataTarget);
    getSaleStatistics();
    getSaleRegisters();
});

$('section#modal').on('submit', '#createSale form', e => {
    e.preventDefault();

    let data = $(e.target).serialize();
    createSale(data);
});

$('section#modal').on('submit', '#editSale form', e => {
    e.preventDefault();
    
    let data = $(e.target).serialize();
    updateSale(data);
});

$('section#registers').on('click', '.btn-update-sale', e => {
    let td = getRow(e.target).find('td');
    let data = [];

    $.each(td, (index, value) => {
        if ($(value).text().trim() != '') {
            data.push($(value).text());
        }
    });

    setSaleEditFormData(data);
});

$('section#registers').on('click', '.btn-delete-sale', e => {
    let tr = getRow(e.target);
    let id = tr.find('td:first').text();

    alertify.confirm(
        'Alerta de confirmação',
        `Deseja apagar a venda de ID ${id}?`,
        () => {
            deleteSale(id);
        },
        undefined
    )
});

$('section#registers').on('keyup', '#searchSale', e => {
    let data = $(e.target).parent().find('input').val();
    searchSale(data);
    $(e.target).trigger('submit');
});