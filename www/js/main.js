function showLayout(layoutName) {
    console.log('Showing ' + layoutName);
    var layoutList = document.getElementsByClassName('layout');
    var layoutToShow = document.getElementById(layoutName);
    // Loop through the layouts hiding them
    for (var i=0; i<layoutList.length; i++) {
        layoutList[i].style.display = 'none';
    };
    // Show the specified layout
    layoutToShow.style.display = 'block';
}