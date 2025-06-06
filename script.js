// Variáveis globais
let isMobileMenuOpen = false;
let currentSlide = 0;
let currentRecommendedIndex = 0;
let openFAQItems = [];

// Função para alternar o menu mobile
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    isMobileMenuOpen = !isMobileMenuOpen;

    if (isMobileMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Função para fechar o menu mobile
function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    isMobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

// Função para rolar até uma seção específica
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// CARROSSEL DO HERO
function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
    });

    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

function moveRecommended(direction) {
    const track = document.getElementById('recommendedTrack');
    const book = document.querySelector('.recommended-book');
    const books = document.querySelectorAll('.recommended-book');

    if (!track || !book) return;

    const bookWidth = book.offsetWidth + 24; // largura + gap (~24px entre livros)
    const container = track.parentElement;
    const containerWidth = container.offsetWidth;
    const visibleCount = Math.floor(containerWidth / bookWidth);

    const maxIndex = books.length - visibleCount;

    currentRecommendedIndex += direction;

    if (currentRecommendedIndex < 0) currentRecommendedIndex = 0;
    if (currentRecommendedIndex > maxIndex) currentRecommendedIndex = maxIndex;

    const translateX = -(currentRecommendedIndex * bookWidth);
    track.style.transform = `translateX(${translateX}px)`;

    // Atualizar botões
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');

    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentRecommendedIndex === 0;
        nextBtn.disabled = currentRecommendedIndex === maxIndex;
    }
}


// FAQ
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqItem = faqItems[index];

    if (openFAQItems.includes(index)) {
        faqItem.classList.remove('active');
        openFAQItems = openFAQItems.filter(item => item !== index);
    } else {
        faqItem.classList.add('active');
        openFAQItems.push(index);
    }
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    goToSlide(0); // Garantir que o primeiro slide apareça
    moveRecommended(0); // Posiciona o carrossel de livros

    // Auto-play do carrossel principal
    setInterval(nextSlide, 5000);
});

// Responsividade
window.addEventListener('resize', function () {
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
        closeMobileMenu();
    }

    currentRecommendedIndex = 0;
    moveRecommended(0);
});
