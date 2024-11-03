const fs = require('fs');
const fetch = require('node-fetch');

// Daftar URL file GitHub yang ingin diambil isinya
const fileUrls = [
    'https://github.com/ErcinDedeoglu/proxies/raw/refs/heads/main/proxies/http.txt',
    'https://github.com/ErcinDedeoglu/proxies/raw/refs/heads/main/proxies/https.txt',
    'https://github.com/ErcinDedeoglu/proxies/raw/refs/heads/main/proxies/socks4.txt',
    'https://github.com/ErcinDedeoglu/proxies/raw/refs/heads/main/proxies/socks5.txt'
];

// Fungsi untuk mengambil konten file
async function fetchFileContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Gagal mengambil file: ${url}`);
        return await response.text();
    } catch (error) {
        console.error(error);
        return '';
    }
}

// Fungsi utama untuk menggabungkan konten semua file ke dalam satu file
async function combineFiles() {
    let combinedContent = '';

    for (const url of fileUrls) {
        const content = await fetchFileContent(url);
        combinedContent += content + '\n\n'; // Tambahkan newline antar file
    }

    // Simpan konten gabungan ke dalam satu file
    fs.writeFileSync('active_proxies.txt', combinedContent);
    console.log('File berhasil digabungkan ke active_proxies.txt');
}

// Jalankan fungsi penggabungan
combineFiles();
