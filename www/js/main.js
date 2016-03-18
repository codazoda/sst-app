// On ready
document.addEventListener('DOMContentLoaded', function(){
    // Load a user using the QuickUser class
    user = new QuickUser();
    // Read the user ID that was assigned
    var id = user.get("id");
    // Read the number of hits
    var hits = user.get("hits");
    // Set your own variable
    //user.set("first", "Joel");
    console.log('User: ' + id);
    console.log('Hits: ' + hits);
});

function showLayout(layoutName) {
    var layoutList = document.getElementsByClassName('layout');
    var layoutToShow = document.getElementById(layoutName);
    // Loop through the layouts hiding them
    for (var i=0; i<layoutList.length; i++) {
        layoutList[i].style.display = 'none';
    };
    // Show the specified layout
    layoutToShow.style.display = 'block';
}

function showHelp(buttonName) {
    var initialValue = '';
    var thisButton = document.querySelectorAll("input[name=" + buttonName + "]")[0];
    switch (buttonName) {
        case 'first':
            initialValue = 'First Name';
            break;
        case 'last':
            initialValue = 'Last Name';
            break;
        case 'city':
            initialValue = 'City';
            break;
        case 'state':
            initialValue = 'State';
            break;
        case 'zip':
            initialValue = 'Postal Code';
            break;
        case 'phone':
            initialValue = 'Phone Number';
            break;
        case 'email':
            initialValue = 'Email Address';
            break;
        case 'contact':
            initialValue = 'Best Time to Contact';
            break;
        default:
            alert('Error: Bad button name - ' + buttonName);
    }
    // Clear the initial value
    if (thisButton.value == initialValue) {
        thisButton.value = '';
        thisButton.style.color = 'black';
    } else if (thisButton.value == '') {
        thisButton.style.color = 'silver';
        thisButton.value = initialValue;
    }
}