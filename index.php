<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Single Page Aplication</title>
</head>
<body>
    <a href="/" data-link>Beranda</a>
    <a href="/tentang" data-link>Tentang</a>
    <div id="app">
        <!-- aplikasi akan muncul disini -->
    </div>
    <h2>Daftar Barang</h2>
        <button id="tombol-tambah">Tambah Barang</button>
        <ul id="daftar-barang">
            <!-- list dari API akan digenerate disini -->
        </ul>
        <div id="detail"></div>
    <script src="app.js">
    </script>
</body>
</html>