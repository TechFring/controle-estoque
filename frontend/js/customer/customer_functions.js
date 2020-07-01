function setCustomerEditFormData(data) {
    $('section#modal #editCustomer #customerCpf1').val(data[0]);
    $('section#modal #editCustomer #customerName1').val(data[1]);
    $('section#modal #editCustomer #customerDateBirth1').val(data[2]);
    $('section#modal #editCustomer #customerGender1').val(data[3]);
    $('section#modal #editCustomer #customerPhoneNumber1').val(data[4]);
}

