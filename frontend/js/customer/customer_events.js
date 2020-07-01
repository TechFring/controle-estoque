let customer = {
    title: 'Clientes',
    modal: 'customer.html',
    idSearch: 'searchCustomer',
    placeholder: 'Pesquisar nome',
    dataTarget: 'createCustomer'
}

$('header #customer').on('click', () => {
    setTitle(customer.title);
    loadModal(customer.modal);
    setLastPage('customer');
    setSearchFormData(customer.idSearch, customer.placeholder);
    setDataTarget(customer.dataTarget);
    getCustomerStatistics();
    getCustomerRegisters();
});

$('section#modal').on('submit', '#createCustomer form', e => {
    e.preventDefault();

    let data = $(e.target).serialize();
    createCustomer(data);
});

$('section#modal').on('submit', '#editCustomer form', e => {
    e.preventDefault();

    let data = $(e.target).serialize();
    updateCustomer(data);
});

$('section#registers').on('click', '.btn-update-customer', e => {
    let td = getRow(e.target).find('td');
    let data = [];

    $.each(td, (index, value) => {
        if ($(value).text().trim() != '') {
            // coluna que se encontra a data de nascimento
            if (index == 2) {
                // formata a data para o padrão yyyy-mm-dd
                let date = $(value).text().split('/');
                data.push(`${date[2]}-${date[1]}-${date[0]}`);
            } else {
                data.push($(value).text());
            }
        }
    });

    setCustomerEditFormData(data);
});

$('section#registers').on('click', '.btn-delete-customer', e => {
    let tr = getRow(e.target);
    let name = tr.find('td:first').next().text();

    alertify.confirm(
        'Alerta de confirmação',
        `Deseja apagar o registro de ${name}?`,
        () => {
            let cpf = tr.find('td:first').text();
            deleteCustomer(cpf);
        }, 
        undefined
    );
});

$('section#registers').on('keyup', '#searchCustomer', e => {
    let data = $(e.target).parent().find('input').val();
    searchCustomer(data);
    $(e.target).trigger('submit');
});