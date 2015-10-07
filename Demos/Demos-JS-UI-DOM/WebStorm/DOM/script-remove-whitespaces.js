var i,
    list,
    children;

list = document.getElementById('list');
children = list.childNodes;

console.log(children);

for (i = 0; i < children.length; i += 1) {
    if (children[i].nodeName === '#text') {
        list.removeChild(children[i]);
    }
}

console.log(children);
