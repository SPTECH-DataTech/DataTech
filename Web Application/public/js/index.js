AOS.init();

let currentSlide = 0;
const totalSlides = document.querySelectorAll('.cards_integrantes').length; 

function updateSlidesToShow() {
    let slidesToShow;

    if (window.innerWidth < 768) {
        slidesToShow = 1;
    } else if (window.innerWidth < 1024) {
        slidesToShow = 2;
    } else {
        slidesToShow = 3; 
    }

    return slidesToShow;
}

function updateCarousel() {
    const slidesToShow = updateSlidesToShow();
    const maxSlide = totalSlides - slidesToShow;

    document.querySelector('.slide').style.transform = `translateX(-${(100 / slidesToShow) * currentSlide}%)`;
}

function setupEventListeners() {
    document.querySelector('.seta-esquerda').addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    document.querySelector('.seta-direita').addEventListener('click', () => {
        const slidesToShow = updateSlidesToShow();
        const maxSlide = totalSlides - slidesToShow;

        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    });
}

updateCarousel();
setupEventListeners();
window.addEventListener('resize', updateCarousel);



let slideProdutoAtual = 1;

function proximoSilideProduto() {
  slideProdutoAtual++;


  if (slideProdutoAtual > 4) {
    slideProdutoAtual = 1;
  }

  for (let i = 1; i <= 4; i++) {
    let cardAtual = document.getElementById(`card-servico${i}`);
    let slideAtual = document.getElementById(`card-servico${slideProdutoAtual}`)
    if (cardAtual == slideAtual) {
      cardAtual.style.animation = "passarSlideProduto_foward_aparecer";
      cardAtual.style.animationDuration = "0.3s";
      setTimeout(() => {
        cardAtual.style.display = "flex";
      }, 200)
    }

    if (cardAtual != slideAtual) {
      cardAtual.style.animation = "passarSlideProduto_foward_sumir";
      cardAtual.style.animationDuration = "0.3s";
      setTimeout(() => {
        cardAtual.style.display = "none";
      }, 200)
    }
  }

}

function anteriorSlideProduto() {
  slideProdutoAtual--;

  if (slideProdutoAtual < 1) {
    slideProdutoAtual = 4;
  }

  for (let i = 1; i <= 4; i++) {
    let cardAtual = document.getElementById(`card-servico${i}`);
    let slideAtual = document.getElementById(`card-servico${slideProdutoAtual}`)
    if (cardAtual == slideAtual) {
      cardAtual.style.animation = "passarSlideProduto_backward_aparecer";
      cardAtual.style.animationDuration = "0.3s";
      setTimeout(() => {
        cardAtual.style.display = "flex";
      }, 200);
    }

    if (cardAtual != slideAtual) {
      cardAtual.style.animation = "passarSlideProduto_backward_sumir";
      cardAtual.style.animationDuration = "0.3s";
      setTimeout(() => {
        cardAtual.style.display = "none";
      }, 200);
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mobileNav = document.getElementById('mobile-nav');

  hamburgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
    hamburgerMenu.classList.toggle('menu_open');
  });
});



async function enviarEmailContratar(event) {
  event.preventDefault(); 
  const nome = document.querySelector('#name').value.trim();
  const empresa = document.querySelector('#empresa').value.trim();
  const email = document.querySelector('#email').value.trim();
  const assunto = document.querySelector('#tipo').value.trim();
  const mensagem = document.querySelector('#message').value.trim();

  if (!nome || !empresa || !email || !assunto || !mensagem) {
      alert('Por favor, preencha todos os campos.');
      return;
  }

  try {
      const response = await fetch('/enviarEmailContratar', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              nome,
              empresa,
              email,
              assunto,
              mensagem,
          }),
      });

      const message = await response.text();

      if (response.ok) {
          alert('Mensagem enviada com sucesso! Verifique seu e-mail.');
      } else {
          alert(`Erro ao enviar a mensagem: ${message}`);
      }
  } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
  }
}


