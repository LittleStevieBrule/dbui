
function unit(i){
    if(i == 1){
        return 'lbs'
    }else {
        return 'kg'
    }
}

function date(val){
    var dateValue = new Date(val);
    return dateValue
}

function refreshTable(){
    var req2 = new XMLHttpRequest();
    req2.open('GET', '/select', true);
    req2.addEventListener('load', function () {
        if (req2.status >= 200 && req2.status < 400) {
            var response = JSON.parse(req2.responseText);

            //clear table off old values
            var tbody = document.getElementById("tbody");
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            tbody = document.getElementById("tbody");

            for (var i = 0; i < response.length; i++) {
                var tr = document.createElement("tr");

                ['name', 'reps', 'weight', 'lbs', 'date']
                    .forEach(function (element) {
                        var td = document.createElement("td");
                        td.textContent = function (value, el) {
                            if (el == 'date'){
                                return date(value)
                            }else if (el == 'lbs') {
                                return unit(value);
                            }else {
                                return value
                            }
                        }(response[i][element], element);
                        tr.appendChild(td)
                    });
                var editButton = document.createElement("input");
                editButton.setAttribute("type", "button");
                editButton.value = "Edit";
                editButton.id = response[i].id;
                editButton.addEventListener('click', function () {
                    window.location = "/edit?id=" + editButton.id;
                });
                tr.appendChild(editButton);

                var deleteButton = document.createElement("input");
                deleteButton.setAttribute("type", "button");
                deleteButton.value = "Delete";
                deleteButton.id = response[i].id;
                // deleteButton.setAttribute("onclick", "deleteRow(this)");
                deleteButton.addEventListener('click', function (){
                    var req3 = new XMLHttpRequest();
                    req3.open('GET', '/delete?id=' + deleteButton.id, true);
                    req3.addEventListener('load', function(){
                        if(req3.status >= 200 && req3.status < 400){
                            //console.log('deleting id #' + payload.id + 'success!');
                            refreshTable();
                        } else {
                            console.log("Error in network request: " + req3.statusText);
                        }
                    });
                    req3.send(null);
                    event.preventDefault();
                } ,false);
                tr.appendChild(deleteButton);
                tbody.appendChild(tr);
                //console.log('Finished adding row' + i);
            }
        } else {
            console.log("Error in network request: " + req2.statusText);
        }
    });
    req2.send(null);
    event.preventDefault();
}

//deleting workout



document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('submit').addEventListener('click', function(event){
        var fields = ['name', 'reps', 'weight', 'lbs', 'date'];
        var req = new XMLHttpRequest();
        var str = '/insert?';
        fields.forEach(function (elem) {
            str = str +
                '&' +
                elem +
                '=' +
                document.getElementById(elem).value;
        });
        req.open('GET', str, true);
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status < 400){
                refreshTable();
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(null);
        event.preventDefault();
    });
} );






