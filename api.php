<?php

header('Content-Type: application/json');

$barang = [
    ['nama' => 'Pensil', 'stock' => 12],
    ['nama' => 'Buku', 'stock' => 20],
    ['nama' => 'Pulpen', 'stock' => 100],
    ['nama' => 'Penghapus', 'stock' => 20],
];

echo json_encode($barang);