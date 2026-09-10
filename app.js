const container = document.querySelector('#daftar-barang');

async function ambilData() {
    try {
        const response = await fetch('api.php');
        if (!response.ok) {
            throw new Error(`Server merespons dengan pesan: ${response.status}`);
        }
        const data = await response.json();
        data.forEach(item => {
            const list = document.createElement('li');
            list.textContent = `${item.nama} (Stok: ${item.stock})`;
            container.appendChild(list);
        });
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
}

ambilData();

container.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI') {
        const detail = document.getElementById('detail');
        detail.textContent = e.target.textContent;
    }
});

const tombol = document.getElementById('tombol-tambah');

tombol.addEventListener('click', (e)=> {
    e.preventDefault();
    const addlist = document.createElement('li');
    addlist.textContent = 'Barang Baru';
    container.appendChild(addlist);
});