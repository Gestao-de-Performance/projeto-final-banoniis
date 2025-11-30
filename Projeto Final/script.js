

const slide = document.querySelector(".carrosselSlide");
const img = document.querySelectorAll(".carrosselSlide img");
const antBtn = document.getElementById("antBtn");
const proBtn = document.getElementById("proBtn");

let contador = 0;
const totalSlides = img.length;
const larguraSlide = img[0].clientWidth;

function moveParaSlide(indiceSlide) {
    slide.style.transform = "translateX("+ (-larguraSlide * indiceSlide) + "px)";
}


proBtn.addEventListener("click", () =>{
    contador++;
    if (contador >= totalSlides){
        contador = 0;
    }

    moveParaSlide(contador);
});

antBtn.addEventListener("click", () =>{
    contador--;
    if (contador < 0){
        contador = totalSlides - 1;
    }
    moveParaSlide(contador);
});


// Botao agendar

const botaoAgendar = document.getElementById("botaoAgendar");
const popup = document.getElementById("popup");

botaoAgendar.addEventListener("click", () => {
    popup.style.display = "flex";
});

popup.addEventListener("click", (event) => {
    if (event.target === popup) {
    popup.style.display = "none";
    }
});


//Pop Up

document.getElementById("data").value = "2025-01-01";

document.getElementById("enviarZap").addEventListener("click", () => {
    const cidade = document.getElementById("cidade").value;
    const dataCerta = document.getElementById("data").value;
    const maquina = document.getElementById("maquina").value;
    const [ano, mes, dia] = dataCerta.split("-");
    const data = `${dia}/${mes}/${ano}`;

    const mensagem = `Olá! Gostaria de agendar uma locação da ${maquina} na cidade de ${cidade} na data ${data}.`;
    const mensagemLink = encodeURIComponent(mensagem);

    const link = `https://wa.me/5542999450136?text=${mensagemLink}`;

    window.open(link);
});
