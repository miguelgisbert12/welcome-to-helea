// Gestión de los elementos voladores del menú principal

const bubbles = document.querySelectorAll(".flying-asset");

const images = [
    "media/assets/asset1.png",
    "media/assets/asset2.png",
    "media/assets/asset3.png",
    "media/assets/asset4.png",
    "media/assets/asset5.png",
    "media/assets/asset6.png",
    "media/assets/asset7.png",
    "media/assets/asset8.png",
    "media/assets/asset9.png",
    "media/assets/asset10.png",
    "media/assets/asset11.png",
    "media/assets/asset12.png",
    "media/assets/asset13.png",
    "media/assets/asset14.png",
    "media/assets/asset15.png",
    "media/assets/asset16.png",
    "media/assets/asset17.png",
    "media/assets/asset18.png",
    "media/assets/asset19.png",
    "media/assets/asset20.png",
    "media/assets/asset21.png",
    "media/assets/asset22.png",
    "media/assets/asset23.png",
    "media/assets/asset24.png",
    "media/assets/asset25.png",
];

const availableImages = [...images];

function getUniqueRandomImage() {

    if(availableImages.length === 0) {
        availableImages.push(...images);
    };
    
    const index = Math.floor(Math.random() * availableImages.length);
    return availableImages.splice(index, 1)[0];
};

// Inicializar las burbujas con una imagen aleatoria

bubbles.forEach(asset => {
    const img = getUniqueRandomImage();
    if(!img) return;

    asset.style.backgroundImage = `url(${img})`;
});

// Función para cambiar la imagen de una burbuja específica

function changeImg(bubble) {
    const img = getUniqueRandomImage();
    if(!img) return;

    bubble.style.backgroundImage = `url(${img})`;
}

// Hacer que las burbujas floten por la pantalla

const screenPadding = 100;

const bubbleData = [...bubbles].map(bubble => ({
    el: bubble,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3, // velocidad horizontal de las burbujas
    vy: (Math.random() - 0.5) * 0.3 // velocidad vertical de las burbujas
}));

function animateBubbles() {
    bubbleData.forEach(bubble => {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        if(bubble.x < -screenPadding) {
            bubble.x = window.innerWidth + screenPadding;
            changeImg(bubble.el);
        };

        if(bubble.x > window.innerWidth + screenPadding) {
            bubble.x = -screenPadding;
            changeImg(bubble.el);
        };

        if(bubble.y < -screenPadding) {
            bubble.y = window.innerHeight + screenPadding;
        };

        if(bubble.y > window.innerHeight + screenPadding) {
            bubble.y = -screenPadding;
        }; 

        bubble.el.style.transform = `translate(${bubble.x}px, ${bubble.y}px)`;
    });

    requestAnimationFrame(animateBubbles);
};

animateBubbles();


