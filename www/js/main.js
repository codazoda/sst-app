var leads = new Array();

// On ready
document.addEventListener('DOMContentLoaded', function(){
    if (localStorage.getItem('leads') != null) {
        leads = JSON.parse(localStorage.getItem('leads'));
    }
    refreshLeads();
});

function showLayout(layoutName, layoutData) {
    // Set a default bit of layout data
    if (typeof layoutData === 'undefined') { 
        layoutData = new Array();
    }
    var layoutList = document.getElementsByClassName('layout');
    var layoutToShow = document.getElementById(layoutName);
    // Loop through the layouts hiding them
    for (var i=0; i<layoutList.length; i++) {
        layoutList[i].style.display = 'none';
    };
    // Show the specified layout
    layoutToShow.style.display = 'block';
}

/*
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
        case 'best':
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
*/

function saveLead() {
    var fields = [
        document.querySelectorAll("input[name=first]")[0],
        document.querySelectorAll("input[name=last]")[0],
        document.querySelectorAll("input[name=city]")[0], 
        document.querySelectorAll("input[name=state]")[0],
        document.querySelectorAll("input[name=zip]")[0],
        document.querySelectorAll("input[name=phone]")[0],
        document.querySelectorAll("input[name=email]")[0],
        document.querySelectorAll("input[name=best]")[0],
    ];
    // Loop through the fields saving them
    leads.push([
        fields[0].value, 
        fields[1].value, 
        fields[2].value, 
        fields[3].value, 
        fields[4].value, 
        fields[5].value, 
        fields[6].value, 
        fields[7].value
    ]);
    localStorage.setItem('leads', JSON.stringify(leads));  
    // Clear the values
    for(i=0; i<=7; i++) {
        fields[i].value = "";
    }
    refreshLeads();
    showLayout('list');
}

function addLeadRow(first, last, location, phone) {
    var table = document.getElementById("leads");
    var row = table.insertRow(-1);
    row.className = 'item';
    row.onclick = function() { showLayout('view') };
    var cell = row.insertCell(0);
    cell.className = 'column';
    cell.innerHTML = first;
    cell = row.insertCell(1);
    cell.className = 'column';
    cell.innerHTML = last;
    cell = row.insertCell(2);
    cell.className = 'column';
    cell.innerHTML = location;
    cell = row.insertCell(3);
    cell.className = 'column';
    cell.innerHTML = phone;
}

function refreshLeads() {
    clearAllRows();
    if (leads.length == 0) {
        var table = document.getElementById("leads");
        var row = table.insertRow(-1);
        row.className = 'item';
        var cell = row.insertCell(0);
        cell.className = 'column';
        cell.style.textAlign = "center";
        cell.innerHTML = 'You have not added any leads yet.';
    } else {
        for (i=0; i<leads.length; i++) {
            var cityState = '';
            if (leads[i][3] == '') {
                cityState = leads[i][2];
            } else {
                cityState = leads[i][2] + ', ' + leads[i][3];
            }
            addLeadRow(leads[i][0], leads[i][1], cityState, leads[i][5]);
        }
    }
}

function clearAllRows() {
    var table = document.getElementById("leads");
    table.innerHTML = '';
}