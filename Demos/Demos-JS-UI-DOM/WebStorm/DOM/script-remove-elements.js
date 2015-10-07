var list,
    parent;

list = document.getElementById('list');
parent = list.parentNode;

//list.innerHTML = '';
parent.removeChild(list);