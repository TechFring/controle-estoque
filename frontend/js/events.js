$(document).ready(() => {
    getLastPage();
});

$('#navbar ul li div a').on('click', () => {
    $('.navbar-collapse').collapse('hide');
});

$('.dropdown-item').on('click', e => {
    $('#navbar').find('.active').removeClass('active');
    $('#navbar').find('.disabled').removeClass('disabled');
    $(e.target).closest('.nav-item').addClass('active');
    $(e.target).closest('.nav-item').find('.nav-link').addClass('disabled');
});