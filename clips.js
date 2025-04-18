function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxSource = document.getElementById('lightboxSource');
    
    lightbox.style.display = 'flex';
    lightboxSource.src = src;
    lightboxVideo.load();
    lightboxVideo.play();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxSource = document.getElementById('lightboxSource');
    
    lightbox.style.display = 'none';
    lightboxVideo.pause();
    lightboxSource.src = "";
    lightboxVideo.load();
}
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.clips-swiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  });
  