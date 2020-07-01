$(document).ready(() => {
    $('header #customer').trigger('click');
});

$('#navbar ul li div a').on('click', () => {
    $('.navbar-collapse').collapse('hide');
});
