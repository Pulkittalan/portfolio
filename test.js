const hero = document.getElementById("hero");
const topImage = document.getElementById("topImage");

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  topImage.style.clipPath = `circle(120px at ${x}px ${y}px)`;
});



const heroImage = document.querySelector(".hero-image");

heroImage.addEventListener("mousemove", (e) => {
  const rect = heroImage.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 12;
  const rotateY = (centerX - x) / 12;

  heroImage.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.05)
  `;
});

heroImage.addEventListener("mouseleave", () => {
  heroImage.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
  `;
});