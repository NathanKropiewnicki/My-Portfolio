document.addEventListener("DOMContentLoaded", () => {
    const glow = document.createElement("div");
    glow.id = "glow";
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;  
    let glowX = 0, glowY = 0;   
    const delayFactor = .07;    

    document.addEventListener("mousemove", (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * delayFactor;
        glowY += (mouseY - glowY) * delayFactor;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
});


