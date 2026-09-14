const BASE_PATH = '/belajar-spa';

// state
let listBarang = [];

async function ambilData() {
    try {
        const response = await fetch('http://localhost/belajar-oophp/api/stock.php');
        if (!response.ok) {
            throw new Error(`Server merespons dengan pesan: ${response.status}`);
        }
        const list = await response.json();
        listBarang.push(...list);
        renderList(listBarang);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};

ambilData();

function renderList(items){
    const container = document.querySelector('#daftar-barang');
    items.forEach(item => {
        const list = document.createElement('li');
        list.textContent = item.nama_barang;
        list.dataset.id = item.kode_barang;
        container.appendChild(list);
    })
}

// fungsi untuk navigasi melalui tombol
function navigatePage(page) {
    history.pushState({}, '', BASE_PATH + page);
    render(page);
};

function getCurrentPath() {
    return location.pathname.replace(BASE_PATH, '') || '/';
};

window.addEventListener('popstate', () => {
    render(getCurrentPath());
});

document.addEventListener('click', (e) => {
    if (e.target.matches('a[data-link]')) {
        e.preventDefault();
        navigatePage(e.target.getAttribute('href'));
    }
});

render(getCurrentPath());

function render(page) {
    if(page === '/'){
        setContent(`
            <h2>ini halaman beranda</h2>
            <h2>Daftar Barang</h2>
            <button id="tombol-tambah">Tambah Barang</button>
            <ul id="daftar-barang">
                <!-- list dari API akan digenerate disini -->
            </ul>
            <div id="detail"></div>
        `);

        renderList(listBarang);

        const container = document.querySelector('#daftar-barang');
        container.addEventListener('click', (e) => {
            if(e.target.tagName === 'LI') {
                const id = e.target.dataset.id;
                const detail = document.getElementById('detail');
                const item = listBarang.find(b => b.kode_barang == id);
                detail.textContent = `${item.nama_barang} (Stok: ${item.jumlah})`
            }
        });

        const tombol = document.getElementById('tombol-tambah');

        tombol.addEventListener('click', (e)=> {
            e.preventDefault();
            const newItem = { kode_barang: Date.now(), nama_barang: 'Barang Baru', jumlah: 0 };
            listBarang.push(newItem);
            renderList([newItem]);
        });

    } else if (page === '/tentang') {
        setContent(`<h2>ini halaman tentang</h2>`);
    } else {
        setContent(`<h2>ini halaman apaan?</h2>`);
    }
};


// utilities

function setContent(html) {
    document.getElementById('app').innerHTML = html;
};