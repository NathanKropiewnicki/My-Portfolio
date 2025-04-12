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