
/* header */

fetch('./inner_header/header.html')
.then(res => res.text())
.then(data => {
    document.getElementById('main-header-container').innerHTML = data;
})

const link1 = document.createElement('link');
link1.rel = 'stylesheet';
link1.href = './inner_header/css/index.css';
document.head.appendChild(link1);

const link2 = document.createElement('link');
link2.rel = 'stylesheet';
link2.href = './inner_header/css/layout.css';
document.head.appendChild(link2);