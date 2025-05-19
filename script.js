// Referensi elemen HTML
const urlInput = document.getElementById("url-input");
const startExamBtn = document.getElementById("start-exam-btn");
const qrScanBtn = document.getElementById("scan-qr-btn");
const qrVideo = document.getElementById("qr-video");
const errorMessage = document.getElementById("error-message");
const timerDisplay = document.getElementById("timer");
const iframeContainer = document.getElementById("iframe-container");
const finishBtn = document.getElementById("finish-btn");
const mainContent = document.getElementById("main-content");
const urlContainer = document.getElementById("url-container");
const qrContainer = document.getElementById("qr-container");
const completeContainer = document.getElementById("complete-container");

let examUrl = "";
let timerInterval;
let timeLeft = 60 * 60; // 1 jam dalam detik

// Fungsi untuk memulai ujian dengan tautan
startExamBtn.addEventListener("click", () => {
    examUrl = urlInput.value;

    if (examUrl === "") {
        errorMessage.textContent = "Tautan tidak dapat kosong. Masukkan tautan ujian.";
    } else {
        errorMessage.textContent = "";
        // Menyembunyikan input dan menampilkan iframe
        urlContainer.style.display = "none";
        qrContainer.style.display = "none";
        iframeContainer.style.display = "block";
        completeContainer.style.display = "block";

        // Memasukkan URL ke dalam iframe
        const examIframe = document.getElementById("exam-iframe");
        examIframe.src = examUrl;

        startTimer();  // Mulai timer setelah ujian dimulai
        enterFullScreen();  // Masuk ke mode layar penuh
    }
});
// Start QR code scanner
    startQrScanBtn.addEventListener('click', () => {
      qrReader.classList.toggle('hidden');
      if (!qrScanner) {
        qrScanner = new Html5Qrcode('qr-reader');
        qrScanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            examLinkInput.value = decodedText;
            startExamBtn.disabled = false;
            qrScanner.stop();
            qrReader.classList.add('hidden');
          },
          (error) => {
            console.warn('QR scan error:', error);
          }
        ).catch((err) => {
          console.error('QR scanner error:', err);
          errorMessage.textContent = 'Gagal mengakses kamera.';
          errorMessage.classList.remove('hidden');
        });
      }
    });

// Menangani situasi ketika tab lain dibuka
window.addEventListener("blur", () => {
    window.location.reload(); // Reload halaman jika tab dibuka
});

// Timer (untuk ujian)
function startTimer() {
    timerDisplay.style.display = "block"; // Menampilkan timer setelah ujian dimulai
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Waktu ujian habis!");
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }
    }, 1000);
}

// Tombol selesai untuk mengakhiri ujian dan keluar
finishBtn.addEventListener("click", () => {
    alert("Ujian selesai. Kembali ke beranda.");
    location.reload(); // Mengembalikan halaman ke awal
});

// Masuk ke mode layar penuh
function enterFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
        document.documentElement.msRequestFullscreen();
    }
}
