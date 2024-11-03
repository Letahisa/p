import requests

# Daftar URL file GitHub yang ingin diambil isinya
file_urls = [
    'https://github.com/ErcinDedeoglu/proxies/raw/refs/heads/main/proxies/http.txt',
    'https://github.com/ErcinDedeoglu/proxies/raw/refs/heads/main/proxies/https.txt',
    'https://github.com/ErcinDedeoglu/proxies/raw/refs/heads/main/proxies/socks4.txt',
    'https://github.com/ErcinDedeoglu/proxies/raw/refs/heads/main/proxies/socks5.txt'
]

# Fungsi untuk mengambil konten file
def fetch_file_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.text
    except Exception as e:
        print(f"Error fetching file: {url}, Error: {e}")
        return ''

# Fungsi utama untuk menggabungkan konten semua file ke dalam satu file
def combine_files():
    combined_content = ''

    for url in file_urls:
        content = fetch_file_content(url)
        combined_content += content + '\n\n'  # Tambahkan newline antar file

    # Simpan konten gabungan ke dalam satu file
    with open('active_proxies.txt', 'w') as f:
        f.write(combined_content)
    print('File berhasil digabungkan ke active_proxies.txt')

# Jalankan fungsi penggabungan
if __name__ == "__main__":
    combine_files()
