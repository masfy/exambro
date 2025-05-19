// Referensi elemen HTML
const urlInput = document.getElementById("url-input");
const startExamBtn = document.getElementById("start-exam-btn");
const qrScanBtn = document.getElementById("scan-qr-btn");
const qrVideo = document.getElementById("qr-video");
const errorMessage = document.getElementById("error-message");

let examUrl = "";

// Fungsi untuk memulai ujian dengan tautan
startExamBtn.addEventListener("click", () => {
    examUrl = urlInput.value;

    if (examUrl === "") {
        errorMessage.textContent = "Tautan tidak dapat kosong. Masukkan tautan ujian.";
    } else {
        errorMessage.textContent = "";
        // Menyembunyikan input dan menampilkan iframe
        document.getElementById("url-container").style.display = "none";
        document.getElementById("qr-container").style.display = "none";
        document.getElementById("iframe-container").style.display = "block";

        // Memasukkan URL ke dalam iframe
        const examIframe = document.getElementById("exam-iframe");
        examIframe.src = examUrl;

        startTimer();  // Mulai timer setelah ujian dibuka
    }
});

// Fungsi untuk memulai pemindaian QR Code
qrScanBtn.addEventListener("click", () => {
    startQrScanner();
});

function startQrScanner() {
    // Menampilkan video untuk pemindaian QR
    qrVideo.style.display = "block";
    
    // Inisialisasi pemindai QR dengan QRScanner
    const scanner = new QrScanner(qrVideo, result => {
        qrScanResult(result);
    });

    // Memulai pemindaian QR
    scanner.start();
}

// Fungsi untuk menangani hasil pemindaian QR
function qrScanResult(result) {
    examUrl = result.data; // Menyimpan URL dari hasil pemindaian QR
    const examIframe = document.getElementById("exam-iframe");
    examIframe.src = examUrl; // Menyisipkan URL ke dalam iframe
    document.getElementById("url-container").style.display = "none"; // Menyembunyikan input
    document.getElementById("qr-container").style.display = "none"; // Menyembunyikan tombol scan QR
    document.getElementById("iframe-container").style.display = "block"; // Menampilkan iframe
}

// Menangani situasi ketika tab lain dibuka
window.addEventListener("blur", () => {
    window.location.reload(); // Reload halaman jika tab dibuka
});

// Timer (untuk ujian)
let timerInterval;
let timeLeft = 60 * 60; // 1 jam dalam detik

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Waktu ujian habis!");
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            console.log(`Waktu tersisa: ${minutes}:${seconds}`);
        }
    }, 1000);
}
