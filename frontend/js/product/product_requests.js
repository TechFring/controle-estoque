function createProduct(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessProduct.php',
        data: {
            type: 0,
            productData: d
        },
        success: data => {
            if (Number.parseInt(data)) {
                hideModal('createProduct');
                clearModalForm('createProduct');
                getProductStatistics();
                getProductRegisters();
                alertify.success('Registro criado com sucesso!');
            } else {
                alertify.error('Ocorreu um erro ao cadastrar o produto');
            }
        },
        error: error => console.log(error)
    });
}

function getProductRegisters() {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessProduct.php',
        data: {
            type: 1
        },
        success: data => {
            let array = data.split('+');

            $('section#registers thead tr').empty();
            $('section#registers tbody').empty();

            $('section#registers thead tr').append(
                `<th>ID</th>
                <th>Nome</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th></th>`
            );

            $.each(array, (index, value) => {
                let product = JSON.parse(value);

                $('section#registers tbody').append(
                    `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.nome}</td>
                        <td>${product.estoque}</td>
                        <td>${product.preco}</td>
                        <td>
                            <div class="input-group">
                                <div class="input-group-prepend ml-lg-auto">
                                    <button class="btn btn-outline-dark btn-sm btn-update-product" type="button" title="Editar" data-toggle="modal" data-target="#editProduct">
                                        <i class="fas fa-user-edit"></i>
                                    </button>
                                </div>

                                <div class="input-group-append">
                                    <button class="btn btn-outline-dark btn-sm btn-delete-product" type="button" title="Apagar">
                                        <i class="fas fa-user-minus"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    `
                )
            });
        }, 
        error: error => console.log(error)
    });
}

function updateProduct(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessProduct.php',
        data: {
            type: 2,
            productData: d
        },
        success: data => {
            if (Number.parseInt(data)) {
                clearSearchForm();
                hideModal('editProduct');
                getProductStatistics();
                getProductRegisters();
                alertify.success('Registro atualizado com sucesso!');
            } else {
                alertify.error('Ocorreu um erro');
            }
        },
        error: error => console.log(error)
    });
}

function deleteProduct(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessProduct.php',
        data: {
            type: 3,
            productId: d
        },
        success: data => {
            if (Number.parseInt(data)) {
                clearSearchForm();
                getProductStatistics();
                getProductRegisters();
                alertify.success('Registro apagado com sucesso!');
            } else {
                alertify.error('Ocorreu um erro! O produto não pode possuir registro(s) na tabela de vendas');
            }
        },
        error: error => console.log(error)
    });
}

function searchProduct(d) {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessProduct.php',
        data: {
            type: 4,
            character: d
        },
        success: data => {
            let array = data.split('+');

            $('tbody').empty();

            $.each(array, (index, value) => {
                if (value.trim() != '') {
                    let product = JSON.parse(value);

                    $('#content tbody').append(
                        `<tr>
                            <td>${product.id}</td>
                            <td>${product.nome}</td>
                            <td>${product.estoque}</td>
                            <td>${product.preco}</td>
                            <td>
                                <div class="input-group">
                                    <div class="input-group-prepend ml-lg-auto">
                                        <button class="btn btn-outline-dark btn-sm btn-update-product" type="button" title="Editar" data-toggle="modal" data-target="#editCustomer">
                                            <i class="fas fa-user-edit"></i>
                                        </button>
                                    </div>

                                    <div class="input-group-append">
                                        <button class="btn btn-outline-dark btn-sm btn-delete-product" type="button" title="Apagar">
                                            <i class="fas fa-user-minus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>`
                    );
                }
            });
        },
        error: error => console.log(error)
    }); 
}

function getProductStatistics() {
    $.ajax({
        type: 'post',
        url: 'http://localhost/controle_estoque/backend/bean/ProcessProduct.php',
        data: {
            type: 5
        },
        success: data => {
            let dataJson = JSON.parse(data);

            let cards = [];

            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-clock fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">ID:&nbsp;${dataJson.lastProduct.id}</p>
                            <p class="mb-0">Produto:&nbsp;${dataJson.lastProduct.nome}</p>
                            <p class="mb-0">Estoque:&nbsp;${dataJson.lastProduct.estoque}</p>
                            <p class="mb-0">Preço unitário:&nbsp;R$&nbsp;${dataJson.lastProduct.preco}</p>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Último produto</span>
                        </div>
                    </div>
                </div>`
            );

            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-sort-amount-up fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">ID:&nbsp;${dataJson.largerStock.id}</p>
                            <p class="mb-0">Produto:&nbsp;${dataJson.largerStock.nome}</p>
                            <p class="mb-0">Estoque:&nbsp;${dataJson.largerStock.estoque}</p>
                            <p class="mb-0">Preço unitário:&nbsp;R$&nbsp;${dataJson.largerStock.preco}</p>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Maior estoque</span>
                        </div>
                    </div>
                </div>`
            );

            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-sort-amount-down fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">ID:&nbsp;${dataJson.smallerStock.id}</p>
                            <p class="mb-0">Produto:&nbsp;${dataJson.smallerStock.nome}</p>
                            <p class="mb-0">Estoque:&nbsp;${dataJson.smallerStock.estoque}</p>
                            <p class="mb-0">Preço unitário:&nbsp;R$&nbsp;${dataJson.smallerStock.preco}</p>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Menor estoque</span>
                        </div>
                    </div>
                </div>`
            );

            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-trophy fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">ID:&nbsp;${dataJson.bestSellingProduct.id}</p>
                            <p class="mb-0">Produto:&nbsp;${dataJson.bestSellingProduct.nome}</p>
                            <p class="mb-0">Quantidade vendida:&nbsp;${dataJson.bestSellingProduct.qtdVendida}</p>
                            <p class="mb-0">Preço unitário:&nbsp;R$&nbsp;${dataJson.bestSellingProduct.preco}</p>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Produto mais vendido</span>
                        </div>
                    </div>
                </div>`
            );

            cards.push(
                `<div class="col-md-6 col-lg-4 mb-4">
                    <div class="card">
                        <div class="card-header text-center">
                            <i class="fas fa-boxes fa-lg"></i>
                        </div>
                        <div class="card-body">
                            <button class="btn btn-outline-dark btn-block" type="button">
                                ${dataJson.quantifyProducts}
                            </button>
                        </div>
                        <div class="card-footer text-center">
                            <span class="text-muted">Quantidade de produtos</span>
                        </div>
                    </div>
                </div>`
            );

            $('div#statistics').empty();

            $.each(cards, (index, value) => {
                $('div#statistics').append(value);
            });
        },
        error: error => console.log(error)
    });
}