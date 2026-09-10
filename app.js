const barang = [
    {nama: 'Pulpen', stok: '20'},
    {nama: 'Buku', stok: '50'},
    {nama: 'Pensil', stok: '20'}
];

const container = document.querySelector('#daftar-barang');
const list = document.querySelectorAll('li');

list.forEach(element => {
    element.textContent = "Barang A"
});

container.addEventListener('click', function(e) {
    if(e.target.tagName === 'LI') {
        const detail = document.getElementById('detail');
        detail.textContent = e.target.textContent;
        console.log(e.target)
    }
});

barang.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} (Stok: ${item.stok})`;
    container.appendChild(li);
});

const tombol = document.getElementById('tombol-tambah');

tombol.addEventListener('click', (e)=> {
    e.preventDefault();
    const addlist = document.createElement('li');
    addlist.textContent = 'Barang Baru';
    container.appendChild(addlist);
});