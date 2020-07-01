function setSaleEditFormData(data) {
    $('section#modal #editSale #saleId1').val(data[0]);
    $('section#modal #editSale #dateSale1').val(data[1]);
    $('section#modal #editSale #customerCpf1').val(data[2]);
    $('section#modal #editSale #productId1').val(data[3]);
    $('section#modal #editSale #productPrice1').val(data[4]);
    $('section#modal #editSale #amount1').val(data[5]);
    $('section#modal #editSale #totalPrice1').val(data[6]);
}