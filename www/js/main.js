var leads = new Array();

// On ready
document.addEventListener('DOMContentLoaded', function(){
    if (localStorage.getItem('leads') != null) {
        leads = JSON.parse(localStorage.getItem('leads'));
    }
    refreshLeads();
});

/**
 * Display a specific layout div.
 * 
 * @param  {[type]} layoutName The name of the layout to display
 * @param  {[type]} id         Optional user id for the layout to use
 * @return null
 */
function showLayout(layoutName, id) {
    var layoutList = document.getElementsByClassName('layout');
    var layoutToShow = document.getElementById(layoutName);
    // Loop through the layouts hiding them
    for (var i=0; i<layoutList.length; i++) {
        layoutList[i].style.display = 'none';
    };
    // Show the specified layout
    layoutToShow.style.display = 'block';
    switch (layoutName) {
        case 'view':
            // Load this user
            document.getElementById('viewFirst').innerHTML = leads[id][0];
            document.getElementById('viewLast').innerHTML = leads[id][1];
            document.getElementById('viewCity').innerHTML = leads[id][2];
            document.getElementById('viewState').innerHTML = leads[id][3];
            document.getElementById('viewZip').innerHTML = leads[id][4];
            document.getElementById('viewPhone').innerHTML = leads[id][5];
            document.getElementById('viewEmail').innerHTML = leads[id][6];
            document.getElementById('viewBest').innerHTML = leads[id][7];
            break;
        case 'web':
            // This works but I don't like it.
            //document.getElementsByClassName('webFrame')[0].src = "http://app.solarsalestracker.com";
            break;
        default:
            // Nothing to do in most layouts
    }
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

function addLeadRow(id) {
    var cityState = '';
    if (leads[id][3] == '') {
        cityState = leads[id][2];
    } else {
        cityState = leads[id][2] + ', ' + leads[id][3];
    }
    var first = leads[id][0];
    var last = leads[id][1];
    var phone = leads[id][5];
    var table = document.getElementById("leads");
    var row = table.insertRow(-1);
    row.className = 'item';
    row.onclick = function() { showLayout('view', id) };
    var cell = row.insertCell(0);
    cell.className = 'column';
    cell.innerHTML = first;
    cell = row.insertCell(1);
    cell.className = 'column';
    cell.innerHTML = last;
    cell = row.insertCell(2);
    cell.className = 'column';
    cell.innerHTML = cityState;
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
            addLeadRow(i);
        }
    }
}

function clearAllRows() {
    var table = document.getElementById("leads");
    table.innerHTML = '';
}