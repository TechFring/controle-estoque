function setProductEditFormData(data) {
    $('section#modal #editProduct #productId1').val(data[0]);
    $('section#modal #editProduct #productName1').val(data[1]);
    $('section#modal #editProduct #productStock1').val(data[2]);
    $('section#modal #editProduct #productPrice1').val(data[3]);
}