function createCustomer(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessCustomer.php',
        data: {
            type: 0,
            customerData: d
        },
        success: data => {
            if (Number.parseInt(data)) {
                hideModal('createCustomer');
                clearModalForm('createCustomer');
                getCustomerStatistics();
                getCustomerRegisters();
                alertify.success('Registro criado com sucesso!');
            } else {
                alertify.error('CPF já cadastrado');
            }
        },
        error: error => console.log(error)
    })
}

function getCustomerRegisters() {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessCustomer.php',
        data: {
            type: 1
        },
        beforeSend: () => {
            $('section#registers').find('.spn').remove();
            $('section#registers').append(
                `<div class="d-flex align-items-center spn">
                    <strong>Loading...</strong>
                    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>`
            );
        },
        success: data => {
            let array = data.split('+');
            
            $('section#registers').find('.spn').remove();
            $('section#registers thead tr').empty();
            $('section#registers tbody').empty();

            $('section#registers thead tr').append(
                `<th>CPF</th>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Sexo</th>
                <th>Telefone</th>
                <th></th>`
            );

            $.each(array, (index, value) => {
                let customer = JSON.parse(value);   
                $('section#registers tbody').append(
                    `<tr class="d-none">
                        <td>${customer.cpf}</td>
                        <td>${customer.nome}</td>
                        <td>${customer.dataNasc}</td>
                        <td>${customer.sexo}</td>
                        <td>${customer.telefone}</td>
                        <td>
                            <div class="input-group">
                                <div class="input-group-prepend ml-lg-auto">
                                    <button class="btn btn-outline-dark btn-sm btn-update-customer" type="button" title="Editar" data-toggle="modal" data-target="#editCustomer">
                                        <i class="fas fa-user-edit"></i>
                                    </button>
                                </div>

                                <div class="input-group-append">
                                    <button class="btn btn-outline-dark btn-sm btn-delete-customer" type="button" title="Apagar">
                                        <i class="fas fa-user-minus"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>`
                )
            });

            let time = 300;
            $.each($('section#registers tbody').find('tr'), (index, value) => {
                $(value).fadeIn(time).removeClass('d-none');
                time += 300;
            });
        },
        error: error => {
            $('section#registers').find('.spn').remove();
            console.log(error);
        }
    });
}

function updateCustomer(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessCustomer.php',
        data: {
            type: 2,
            customerData: d
        },
        success: data => {
            if (Number.parseInt(data)) {
                clearSearchForm();
                hideModal('editCustomer');
                getCustomerStatistics();
                getCustomerRegisters();
                alertify.success('Registro atualizado com sucesso!');
            } else {
                alertify.error('Ocorreu um erro');
            }
        },
        error: error => console.log(error)
    });
}

function deleteCustomer(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessCustomer.php',
        data: {
            type: 3,
            customerCpf: d
        },
        success: data => {
            if (Number.parseInt(data)) {
                clearSearchForm();
                getCustomerStatistics();
                getCustomerRegisters();
                alertify.success('Registro apagado com sucesso!');
            } else {
                alertify.error('Ocorreu um erro! O cliente não pode possuir registro(s) na tabela de vendas');
            }
        },
        error: error => console.log(error)
    })
}

function searchCustomer(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessCustomer.php',
        data: {
            type: 4,
            character: d
        },
        beforeSend: () => {
            $('tbody').empty();
            $('section#registers').find('.spn').remove();
            $('section#registers').append(
                `<div class="d-flex align-items-center spn">
                    <strong>Loading...</strong>
                    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>`
            );
        },
        success: data => {
            let array = data.split('+');

            $('section#registers').find('.spn').remove();

            $.each(array, (index, value) => {
                if (value.trim() != '') {
                    let customer = JSON.parse(value);

                    $('section#registers tbody').append(
                        `<tr class="d-none">
                            <td>${customer.cpf}</td>
                            <td>${customer.nome}</td>
                            <td>${customer.dataNasc}</td>
                            <td>${customer.sexo}</td>
                            <td>${customer.telefone}</td>
                            <td>
                                <div class="input-group">
                                    <div class="input-group-prepend ml-lg-auto">
                                        <button class="btn btn-outline-dark btn-sm btn-update-customer" type="button" title="Editar" data-toggle="modal" data-target="#editCustomer">
                                            <i class="fas fa-user-edit"></i>
                                        </button>
                                    </div>

                                    <div class="input-group-append">
                                        <button class="btn btn-outline-dark btn-sm btn-delete-customer" type="button" title="Apagar">
                                            <i class="fas fa-user-minus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>`
                    );
                }
            });

            let time = 300;
            $.each($('section#registers tbody').find('tr'), (index, value) => {
                $(value).fadeIn(time).removeClass('d-none');
                time += 300;
            });
        },
        error: error => console.log(error)
    });
}

function getCustomerStatistics() {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessCustomer.php',
        data: {
            type: 5
        },
        beforeSend: () => {
            $('div#statistics').parent().find('.spn').remove();
            $('#statistics').parent().append(
                `<div class="d-flex align-items-center spn">
                    <strong>Loading...</strong>
                    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>`
            );
        },
        success: data => {
            let dataJson = JSON.parse(data);

            let cards = [];
            
            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4 d-none">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-user-friends fa-lg"></i></i>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-outline-dark btn-block" type="button">
                                ${dataJson.numberCustomers}
                            </button>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Quantidade de clientes</span>
                        </div>
                    </div>
                </div>`
            );

            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4 d-none">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-male fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-outline-dark btn-block" type="button">
                                ${dataJson.amountMaleCustomers}
                            </button>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Clientes homens</span>
                        </div>
                    </div>
                </div>`
            );
            
            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4 d-none">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-female fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-outline-dark btn-block" type="button">
                                ${dataJson.amountFemaleCustomers}
                            </button>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Clientes mulheres</span>
                        </div>
                    </div>
                </div>`
            );
            
            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4 d-none">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-trophy fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">Nome:&nbsp;${dataJson.bestCustomer.nome}</p>
                            <p class="mb-0">Telefone:&nbsp;${dataJson.bestCustomer.telefone}</p>
                            <p class="mb-0">CPF:&nbsp;${dataJson.bestCustomer.cpfCliente}</p>
                            <p class="mb-0">Total gasto:&nbsp;R$&nbsp;${dataJson.bestCustomer.totalGasto}</p>
                            <p class="mb-0">Compras realizadas:&nbsp;${dataJson.bestCustomer.qtdCompras}</p>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Melhor cliente</span>
                        </div>
                    </div>
                </div>`
            );
            
            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4 d-none">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-calendar-check fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">Nome:&nbsp;${dataJson.bestCustomerMonth.nome}</p>
                            <p class="mb-0">Telefone:&nbsp;${dataJson.bestCustomerMonth.telefone}</p>
                            <p class="mb-0">CPF:&nbsp;${dataJson.bestCustomerMonth.cpfCliente}</p>
                            <p class="mb-0">Total gasto:&nbsp;R$&nbsp;${dataJson.bestCustomerMonth.totalGasto}</p>
                            <p class="mb-0">Compras realizadas:&nbsp;${dataJson.bestCustomerMonth.qtdCompras}</p>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Melhor cliente do mês</span>
                        </div>
                    </div>
                </div>`
            );
            
            $('div#statistics').parent().find('.spn').remove();
            $('div#statistics').empty();

            let time = 300;
            $.each(cards, (index, value) => {
                $('div#statistics').append(value);
                $('div#statistics').find('div.col-md-6:last').fadeIn(time).removeClass('d-none');
                time += 300;
            });
        },
        error: error => {
            $('div#statistics').parent().find('.spn').remove();
            console.log(error);
        }
    });
}