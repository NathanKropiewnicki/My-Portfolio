
document.addEventListener("DOMContentLoaded", () => {
  const lightboxLinks = document.querySelectorAll('.lightbox');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentIndex = 0;

  const images = Array.from(lightboxLinks).map(link => ({
    src: link.getAttribute('href'),
    caption: link.closest('figure')?.querySelector('figcaption')?.textContent || ''
  }));

  function showLightbox(index) {
    currentIndex = index;

    lightboxOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Hide image until loaded
    lightboxImg.style.display = 'none';
    lightboxImg.style.objectFit = 'contain';

    lightboxImg.onload = () => {
      lightboxImg.style.maxWidth = '70vw';
      lightboxImg.style.maxHeight = '80vh';
      lightboxImg.style.width = 'auto';
      lightboxImg.style.height = 'auto';
      lightboxImg.style.display = 'block';
    };

    lightboxImg.src = images[index].src;
    lightboxCaption.textContent = images[index].caption;
  }

  function closeLightbox() {
    lightboxOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  function showNext() {
    showLightbox((currentIndex + 1) % images.length);
  }

  function showPrev() {
    showLightbox((currentIndex - 1 + images.length) % images.length);
  }

  lightboxLinks.forEach((link, index) => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showLightbox(index);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', e => {
    e.stopPropagation();
    showNext();
  });
  lightboxPrev.addEventListener('click', e => {
    e.stopPropagation();
    showPrev();
  });

  lightboxOverlay.addEventListener('click', e => {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', e => {
    if (lightboxOverlay.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
});
