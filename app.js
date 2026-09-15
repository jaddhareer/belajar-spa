const BASE_PATH = '/belajar-spa';

// state
let listBarang = [];
let listTransaksi = [];

async function ambilDataStock() {
    try {
        const response = await fetch('http://localhost/belajar-oophp/api/stock.php');
        if (!response.ok) {
            throw new Error(`Server merespons dengan pesan: ${response.status}`);
        }
        const list = await response.json();
        listBarang = list;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};

ambilDataStock();

async function ambilDataTransaksi() {
    try {
        const response = await fetch('http://localhost/belajar-oophp/api/transaksi.php');
        if (!response.ok) {
            throw new Error(`Server merespons dengan pesan: ${response.status}`);
        }
        const list = await response.json();
        listTransaksi = list;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};

ambilDataTransaksi();

function renderList(items){
    const container = document.querySelector('#daftar-barang');
    if (!container) return;
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

async function render(page) {
    if(page === '/'){
        if (listBarang.length === 0) {
            await ambilDataStock();
        }
        setContent(`
            <h2>ini halaman beranda</h2>
            <h2>Daftar Barang</h2>
            <hr>
            <a href="/belajar-spa/transaksi" data-link><button>Tambah Barang</button></a>
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

    } else if (page === '/transaksi') {
        if (listBarang.length === 0) {
            await ambilDataStock();
        }
        const opsiBarang = listBarang.map(barang =>
            `<option value="${barang.nama_barang}">${barang.nama_barang}</option>`
        ).join('');
        if (listTransaksi.length === 0) {
            await ambilDataTransaksi();
        }

        const dataTransaksi = listTransaksi.map((transaksi, index) => `
            <tr>
                <td style="padding: 0 10px;">${index + 1}</td>
                <td style="padding: 0 10px;">${transaksi.nama_barang}</td>
                <td style="padding: 0 10px;">${transaksi.tipe}</td>
                <td style="padding: 0 10px;">${transaksi.jumlah}</td>
                <td style="padding: 0 10px;">${transaksi.tanggal}</td>
                <td style="padding: 0 10px;">${transaksi.id_transaksi}</td>
            </tr>
        `).join('');

        console.log(listTransaksi);

        setContent(`
            <h2>ini halaman transaksi</h2>
            <h2>Input Transaksi</h2>
            <hr>
            <form action="http://localhost/belajar-oophp/controller/transaksiController.php" method="post">
                <label for="tipe">Type</label> <br>
                <select name="tipe" id="tipe"> 
                    <option value="in">In</option>
                    <option value="out">Out</option>
                </select> <br>
                <label for="nama_barang">barang</label><br>
                <input type="text" name="nama_barang" list="barang" autocomplete="off" required>
                <datalist id="barang">
                    ${opsiBarang}
                </datalist> <br>
                <label for="jumlah">jumlah</label><br>
                <input type="number" name="jumlah" id="jumlah"><br><br>
                <button type="submit">simpan</button>
            </form>
            <h2>data transaksi</h2>
            <table>
                <thead>
                    <tr>
                        <th style="padding: 0 10px;">No</th>
                        <th style="padding: 0 10px;">Barang</th>
                        <th style="padding: 0 10px;">Tipe</th>
                        <th style="padding: 0 10px;">Jumlah</th>
                        <th style="padding: 0 10px;">Waktu</th>
                        <th style="padding: 0 10px;">ID</th>
                    </tr>
                </thead>
                <tbody>${dataTransaksi}</tbody>
            </table>
            `);
    } else {
        setContent(`<h2>ini halaman apaan?</h2>`);
    }
};


// utilities

function setContent(html) {
    document.getElementById('app').innerHTML = html;
};

document.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        const response = await fetch('http://localhost/belajar-oophp/controller/transaksiController.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (!response.ok) {
            alert(result.error);
            return;
        }

        await ambilDataStock();       // paksa fetch ulang, bukan pakai cache lama
        await ambilDataTransaksi();
        navigatePage('/transaksi');
    } catch (error) {
        console.error('Gagal submit transaksi:', error);
    }
});