function addCash(int) {
  cash += parseInt(int);
}

function addVal(int) {
  val += parseInt(int);
}

function addOwn(int) {
  own += parseInt(int);
}

let ce = document.createElement('input');
ce.id = "addC";
ce.type = "number";

let cb = document.createElement('button');
cb.textContent = "Add Cash";
cb.onclick = function() {
  addCash(document.getElementById('addC').value);
};

let ve = document.createElement('input');
ve.id = "addV";
ve.type = "number";

let vb = document.createElement('button');
vb.textContent = "Add Value";
vb.onclick = function() {
  addVal(document.getElementById('addV').value);
};

let oe = document.createElement('input');
oe.id = "addO";
oe.type = "number";

let ob = document.createElement('button');
ob.textContent = "Add Own";
ob.onclick = function() {
  addOwn(document.getElementById('addO').value);
};

document.body.appendChild(ce);
document.body.appendChild(cb);
document.body.appendChild(document.createElement('p'));
document.body.appendChild(ve);
document.body.appendChild(vb);
document.body.appendChild(document.createElement('p'));
document.body.appendChild(oe);
document.body.appendChild(ob);

document.getElementById('head').textContent = "DAVCOIN - EDITOR"