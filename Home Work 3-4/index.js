function onCreate(ev) {
    ev.preventDefault();
   
    function Account(number, typeOfContribution, pin, balance){
        this.number = number;
        this.typeOfContribution = typeOfContribution;
        this.pin = pin;
        this.balance = balance;

        Account.prototype.setNumber = function (value) {
            this.number = value;
        }
          
        Account.prototype.getNumber = function () {
            return this.number;
        }

        Account.prototype.setTypeOfContribution = function (value) {
            this.typeOfContribution = value;
        }
          
        Account.prototype.setTypeOfContribution = function () {
            return this.typeOfContribution;
        }

        Account.prototype.setPin = function (value) {
            this.pin = value;
        }
          
        Account.prototype.setPin = function () {
            return this.pin;
        }

        Account.prototype.setBalance = function (value) {
            this.balance = value;
        }
          
        Account.prototype.setBalance = function () {
            return this.balance;
        }

    }

    function currentAccount(number, typeOfContribution, pin, card) {
        Account.call(this, number, typeOfContribution, pin, balance);
        this.card = card;
        this.setСard = function (value) {
            card = value;
        }
        this.getСard = function () {
          return card;
        }
    }

    function savingsAccount(number, typeOfContribution, pin, percent) {
        Account.call(this, number, typeOfContribution, pin, balance);
        this.percent = percent;
        this.setPercent = function (value) {
            percent = value;
        }
        this.getPercent = function () {
          return percent;
        }
    }

    var data = JSON.stringify({
        "number": String(document.getElementById("cnumber").value),
        "typeOfContribution": String(document.getElementById("ctypeOfContribution").value),
        "pin": String(document.getElementById("cpin").value),
        "balance": String(document.getElementById("cbalance").value)
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert(this.responseText);
            document.getElementById("createForm").dispatchEvent(new Event('submit'));
        } 
    });

    xhr.open("POST", "http://localhost:2403/accounts");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onRead() {
    console.log('allah');
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {

      if (this.readyState === 4) {

          result=JSON.parse(this.response);
          var resultTBody=document.createElement('tbody');

          result.map(function(nthCPU){
              resultTBody.appendChild(parseCPUToTableRow(nthCPU));
          });

          var table=document.getElementById('rTBody').parentElement;
          table.replaceChild(resultTBody,document.getElementById('rTBody'));
          resultTBody.id='rTBody';
      }

  });

    xhr.open("GET", "http://localhost:2403/accounts");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function onPrepareUpdate(ev){

    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //console.log(this.response);
            result=JSON.parse(this.response);
            var ids=document.createElement('select');
            ids.className='form-control';
            result.map(function(nthCPU){
                var id=document.createElement('option');
                id.innerHTML=nthCPU['id'];
                ids.appendChild(id);
            });
            var form=document.getElementById('uid').parentElement;
            form.replaceChild(ids,document.getElementById('uid'));
            ids.id='uid';
        }
    });
    xhrids.open("GET", "http://localhost:2403/accounts");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onUpdate(ev) {
    ev.preventDefault();

    var data = JSON.stringify({
        "number": String(document.getElementById("unumber").value),
        "typeOfContribution": String(document.getElementById("utypeOfContribution").value),
        "pin": String(document.getElementById("upin").value),
        "balance": String(document.getElementById("ubalance").value)
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("PUT", "http://localhost:2403/accounts/"+document.getElementById("uid").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onDelete(ev) {
    ev.preventDefault();
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
 
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
 
    xhr.open("DELETE", "http://localhost:2403/accounts/"+document.getElementById("did").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function onPrepareDelete(ev){
    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;
  
    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            //console.log(this.response);
            result=JSON.parse(this.response);
            var ids=document.createElement('select');
            ids.className='form-control';
            result.map(function(nthCPU){
                var id=document.createElement('option');
                id.innerHTML=nthCPU['id'];
                ids.appendChild(id);
            });
            var form=document.getElementById('did').parentElement;
            form.replaceChild(ids,document.getElementById('did'));
            ids.id='did';
        }
    });
    xhrids.open("GET", "http://localhost:2403/accounts");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function parseCPUToTableRow(CPUs){
    var row=document.createElement('tr');

    id=document.createElement('th');
    id.innerText=CPUs['id'];
    row.appendChild(id);

    manufacturer=document.createElement('td');
    manufacturer.innerText=CPUs['number'];
    row.appendChild(manufacturer);

    coreNumber=document.createElement('td');
    coreNumber.innerText=CPUs['typeOfContribution'];
    row.appendChild(coreNumber);
   
    threadNumber=document.createElement('td');
    threadNumber.innerText=CPUs['pin'];
    row.appendChild(threadNumber);
    
    frequency=document.createElement('td');
    frequency.innerText=CPUs['balance'];
    row.appendChild(frequency);

    return row;
}


(function () {
  
    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );
    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );
    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );
    document.getElementById('pubutton').addEventListener(
        'click', onPrepareUpdate
    );
    document.getElementById('dbutton').addEventListener(
        'click', onDelete
    );
    document.getElementById('pdbutton').addEventListener(
        'click', onPrepareDelete
    );
    console.log('Handlers is set')
})()
