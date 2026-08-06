
const logo = document.querySelector(".logo");
const fugirdistancia = 100;
const forcafugir = 40;

const slide = document.querySelector(".carrosselSlide");
const img = document.querySelectorAll(".carrosselSlide img");
const antBtn = document.getElementById("antBtn");
const proBtn = document.getElementById("proBtn");

const canvas = document.getElementById('js-background');
const petalagif = document.getElementById('petala');
const ctx = canvas.getContext('2d');
const petalas = [];

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

//petalas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//esse de baixo eu pesquisei pra entender como fazer

for (let i = 0; i < 80; i++) {
  petalas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 10,
    speedX: Math.random() * 2 - 1,
    speedY: Math.random() * 2 + 1,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 3 - 1.5,
    opacity: Math.random() * 0.6 + 0.4
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petalas.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;
    ctx.drawImage(petalagif, -p.size, -p.size / 2, p.size * 2, p.size);
    ctx.restore();

    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(draw);
}

draw();

//logo fugir
document.addEventListener("mousemove", (event) => {
  const rect = logo.getBoundingClientRect();
  const logoX = rect.left + rect.width / 2;
  const logoY = rect.top + rect.height / 2;
  const distanciaX = event.clientX - logoX;
  const distanciaY = event.clientY - logoY;
  const distancia = Math.sqrt (distanciaX ** 2 + distanciaY ** 2);

  if (distancia < fugirdistancia){
    const angulo = Math.atan2(distanciaY,distanciaX);
    const forca = (fugirdistancia - distancia) / fugirdistancia;
    const deslocamentoX = -Math.cos(angulo) * forcafugir * forca;
    const deslocamentoY = -Math.sin(angulo) * forcafugir * forca;

    logo.style.transform = `translate(${deslocamentoX}px, ${deslocamentoY}px)`;
    } else {
      logo.style.transform = `translate(0px, 0px)`;
    }

}

)

//esse de baixo sofri mas fiz quase tudo sozinho

const botaotema = document.getElementById("botaotema");
let tema = false;
const header = document.querySelector(".header");
const equipamentos = document.querySelector(".displayEquipamentos");
const carrossel = document.querySelector(".carrosselContainer");
const sigma = document.getElementById("sigma");
const botoes= document.querySelectorAll(".botao");

botaotema.addEventListener("click", () => {
    if (tema === false) {

      fetch("https://api.nekosia.cat/api/v1/images/catgirl")
        .then (imagem => imagem.json())
        .then (imagemobj => {
          document.body.style.backgroundImage = `url("${imagemobj.image.original.url}")`;
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          tema = true;
        });

      fetch("https://api.nekosia.cat/api/v1/images/catgirl")
        .then (imagem => imagem.json())
        .then (imagemobj => {
            botoes.forEach(botao => {
              botao.style.backgroundImage = `url("${imagemobj.image.original.url}")`;
              botao.style.backgroundSize = "cover";
              botao.style.backgroundRepeat = "no-repeat";
        });
        tema = true;
        });

        sigma.muted = false;
        sigma.style.opacity = "1";
        sigma.play();

        equipamentos.style.opacity = "0.3";

        fetch("https://api.nekosia.cat/api/v1/images/catgirl")
        .then (imagem => imagem.json())
        .then (imagemobj => {
          header.style.backgroundImage = `url("${imagemobj.image.original.url}")`;
          header.style.backgroundSize = "auto 100%";
          header.style.backgroundRepeat = "repeat";
          tema = true;
        });




    } else {document.body.style.backgroundImage = "";
      header.style.backgroundImage = "";
      equipamentos.style.opacity = "1";
      sigma.pause();
      sigma.style.opacity = "0";
      tema = false;

    }


}

)