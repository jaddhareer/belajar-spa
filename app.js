const container = document.querySelector('#daftar-barang');
let listBarang = [];

async function ambilData() {
    try {
        const response = await fetch('api.php');
        if (!response.ok) {
            throw new Error(`Server merespons dengan pesan: ${response.status}`);
        }
        listBarang = await response.json();
        renderList(listBarang);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
}

ambilData();

function renderList(items){
    items.forEach(item => {
        const list = document.createElement('li');
        list.textContent = item.nama;
        list.dataset.id = item.id;
        container.appendChild(list);
    })
}

container.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI') {
        const id = e.target.dataset.id;
        const detail = document.getElementById('detail');
        const item = listBarang.find(b => b.id == id);
        detail.textContent = `${item.nama} (Stok: ${item.stok})`
    }
});

const tombol = document.getElementById('tombol-tambah');

tombol.addEventListener('click', (e)=> {
    e.preventDefault();
    const addlist = document.createElement('li');
    addlist.textContent = 'Barang Baru';
    container.appendChild(addlist);
});