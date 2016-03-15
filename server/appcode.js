document.addEventListener('DOMContentLoaded', function(){
    changeFooter();
});

function changeFooter() {
    var footer = document.getElementById('footer');
    footer.innerHTML = '<a href="https://app.solarsalestracker.com">Solar Sales Tracker</a>';
};