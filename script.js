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
        window.location.href = examUrl;
    }
});

// Fungsi untuk pemindaian QR code
qrScanBtn.addEventListener("click", () => {
    startQrScanner();
});

function startQrScanner() {
    qrVideo.style.display = "block";
    const scanner = new QrScanner(qrVideo, result => {
        qrScanResult(result);
    });

    scanner.start();
}

function qrScanResult(result) {
    examUrl = result.data;
    window.location.href = examUrl;
}

// Fungsi untuk menangani navigasi tab lain
window.addEventListener("blur", () => {
    window.location.reload(); // Mengembalikan ke halaman utama jika tab lain dibuka
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

