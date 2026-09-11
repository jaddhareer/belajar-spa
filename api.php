<?php

header('Content-Type: application/json');

$barang = [
    ['id' => '1', 'nama' => 'Pensil', 'stok' => 12],
    ['id' => '2', 'nama' => 'Buku', 'stok' => 23],
    ['id' => '3', 'nama' => 'Pulpen', 'stok' => 32],
    ['id' => '4', 'nama' => 'Spidol', 'stok' => 45]
];

echo json_encode($barang);