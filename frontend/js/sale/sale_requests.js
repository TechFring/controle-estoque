function createSale(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessSale.php',
        data: {
            type: 0,
            saleData: d
        },
        success: data => {
            if (Number.parseInt(data)) {
                hideModal('createSale');
                clearModalForm('createSale');
                getSaleStatistics();
                getSaleRegisters();
                alertify.success('Registro criado com sucesso!');
            } else {
                alertify.error('Ocorreu um erro! Verifique se o CPF do cliente e o ID do produto informados estão cadastrados na base de dados');
            }
        },
        error: error => console.log(error)
    });
}

function getSaleRegisters() {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessSale.php',
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
                `<th>ID</th>
                <th>Data/Hora Venda</th>
                <th>CPF Cliente</th>
                <th>ID Produto</th>
                <th>Preço Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th></th>`
            );

            $.each(array, (index, value) => {
                let sale = JSON.parse(value);
                $('section#registers tbody').append(
                    `<tr class="d-none">
                        <td>${sale.id}</td>
                        <td>${sale.dataHora}</td>
                        <td>${sale.cpfCliente}</td>
                        <td>${sale.idProduto}</td>
                        <td>${sale.precoUnitario}</td>
                        <td>${sale.quantidade}</td>
                        <td>${sale.valorTotal}</td>
                        <td>
                            <div class="input-group">
                                <div class="input-group-prepend ml-lg-auto">
                                    <button class="btn btn-outline-dark btn-sm btn-update-sale" type="button" title="Editar" data-toggle="modal" data-target="#editSale">
                                        <i class="fas fa-user-edit"></i>
                                    </button>
                                </div>

                                <div class="input-group-append">
                                    <button class="btn btn-outline-dark btn-sm btn-delete-sale" type="button" title="Apagar">
                                        <i class="fas fa-user-minus"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>`
                );
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

function updateSale(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessSale.php',
        data: {
            type: 2,
            saleData: d
        },
        success: data => {
            if (Number.parseInt(data)) {
                clearSearchForm();
                hideModal('editSale');
                getSaleStatistics();
                getSaleRegisters();
                alertify.success('Registro atualizado com sucesso!');
            } else {
                alertify.error('Ocorreu um erro! CPF do cliente não encontrado na base de dados');
            }
        },
        error: error => console.log(error)
    });
}

function deleteSale(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessSale.php',
        data: {
            type: 3,
            saleId: d
        },
        success: data => {
            if (Number.parseInt(data)) {
                clearSearchForm();
                getSaleStatistics();
                getSaleRegisters();
                alertify.success('Registro apagado com sucesso!');
            } else {
                alertify.error('Ocorreu um erro');
            }
        },
        error: error => console.log(error)
    });
}

function searchSale(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessSale.php',
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
                    let sale = JSON.parse(value);

                    $('section#registers tbody').append(
                        `<tr class="d-none">
                            <td>${sale.id}</td>
                            <td>${sale.dataHora}</td>
                            <td>${sale.cpfCliente}</td>
                            <td>${sale.idProduto}</td>
                            <td>${sale.precoUnitario}</td>
                            <td>${sale.quantidade}</td>
                            <td>${sale.valorTotal}</td>
                            <td>
                                <div class="input-group">
                                    <div class="input-group-prepend ml-lg-auto">
                                        <button class="btn btn-outline-dark btn-sm btn-update-sale" type="button" title="Editar" data-toggle="modal" data-target="#editSale">
                                            <i class="fas fa-user-edit"></i>
                                        </button>
                                    </div>
    
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-dark btn-sm btn-delete-sale" type="button" title="Apagar">
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
        error: error => {
            $('div#statistics').parent().find('.spn').remove();
            console.log(error);
        }
    }); 
}

function getSaleStatistics() {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessSale.php',
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
                            <i class="fas fa-funnel-dollar fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-outline-dark btn-block" type="button">R$ ${dataJson.totalSales.valorTotal}</button>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Total em vendas</span>
                        </div>
                    </div>
                </div>`
            );

            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4 d-none">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-coins fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-outline-dark btn-block" type="button">${dataJson.totalSales.qtd}</button>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Quantidade de vendas</span>
                        </div>
                    </div>
                </div>`
            );

            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4 d-none">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="far fa-calendar-alt fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-outline-dark btn-block" type="button">R$ ${dataJson.totalSalesMonth}</button>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Vendas do mês</span>
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
                            <p class="mb-0">ID: ${dataJson.biggestSale.id}</p>
                            <p class="mb-0">Data/Hora: ${dataJson.biggestSale.dataHora}</p>
                            <p class="mb-0">Valor: R$ ${dataJson.biggestSale.valorTotal}</p>
                            <p class="mb-0">Cliente: ${dataJson.biggestSale.cliente}</p>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Maior venda</span>
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
                            <p class="mb-0">ID: ${dataJson.biggestSaleMonth.id}</p>
                            <p class="mb-0">Data/Hora: ${dataJson.biggestSaleMonth.dataHora}</p>
                            <p class="mb-0">Valor: R$ ${dataJson.biggestSaleMonth.valorTotal}</p>
                            <p class="mb-0">Cliente: ${dataJson.biggestSaleMonth.cliente}</p>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Maior venda do mês</span>
                        </div>
                    </div>
                </div>`
            );

            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4 d-none">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-clock fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">ID: ${dataJson.lastSale.id}</p>
                            <p class="mb-0">Data/Hora: ${dataJson.lastSale.dataHora}</p>
                            <p class="mb-0">Valor: R$ ${dataJson.lastSale.valorTotal}</p>
                            <p class="mb-0">Cliente: ${dataJson.lastSale.cliente}</p>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Última venda</span>
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