let current = 1;
let loveClicked = 0;
let namaUser = "";

function showSlide(n) {
  document.querySelector(`#slide${current}`).classList.remove('active');
  document.querySelector(`#slide${n}`).classList.add('active');
  current = n;
}

function lanjutKeSlide2() {
  const nama = document.getElementById('namaInput').value.trim();
  if (!nama) return alert("Masukin nama dulu yaa 😅");
  namaUser = nama;
  showSlide(2);
}

window.onload = () => {
  const loveContainer = document.getElementById("loveContainer");
  loveContainer.innerHTML = '';
  Array.from("❤️❤️❤️❤️").forEach((heart, i) => {
    const span = document.createElement("span");
    span.textContent = heart;
    span.onclick = () => {
      if (!span.classList.contains('clicked')) {
        span.classList.add('clicked');
        loveClicked++;
        if (loveClicked === 4) {
          setTimeout(() => {
            showSlide(3);
            ketik("waitText", "Tunggu yaaa... 🙈", () => setTimeout(() => {
              showSlide(4);
              document.getElementById("cieText").innerText = `Ciee... ${namaUser} ulang tahun yaaa 🥳`;
            }, 2000));
          }, 300);
        }
      }
    };
    loveContainer.appendChild(span);
  });
};

function nextSlide() {
  if (current === 4) {
    showSlide(5);
    ketik("bdayText", "Happy Birthday yaa " + namaUser + " 🎉💕", () => {
      setTimeout(() => {
        showSlide(6);
        const msg = `Selamat ulang tahun ya ${namaUser} 🎂✨\nSemoga harimu selalu penuh tawa, cinta, dan kejutan manis! Aku bersyukur banget punya kamu ❤️`;
        ketik("finalWish", msg);
        new ConfettiGenerator({ target: 'confetti-canvas' }).render();
      }, 2000);
    });
  }
}

function ketik(id, text, callback) {
  let i = 0;
  document.getElementById(id).innerHTML = '';
  function type() {
    if (i < text.length) {
      document.getElementById(id).innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 40);
    } else if (callback) callback();
  }
  type();
}
