document.addEventListener("DOMContentLoaded", () => {
    const glow = document.createElement("div");
    glow.id = "glow";
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;  // Actual cursor position
    let glowX = 0, glowY = 0;    // Glow position
    const delayFactor = .07;     // Adjust this for more or less delay (0.1 = slow, 0.3 = faster)

    document.addEventListener("mousemove", (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    function animateGlow() {
        // Smoothly interpolate glow position
        glowX += (mouseX - glowX) * delayFactor;
        glowY += (mouseY - glowY) * delayFactor;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;

        requestAnimationFrame(animateGlow);
    }

    animateGlow(); // Start animation loop
});
