$(document).ready(() => {
    getLastPage();
});

$('#navbar ul li div a').on('click', () => {
    $('.navbar-collapse').collapse('hide');
});
