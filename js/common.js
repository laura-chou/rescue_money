const getPathName = () => {
  let path = "/"
  if (window.location.pathname.includes("rescue_money")) {
    path = "/rescue_money/"
  }
  return path
}

export const pathName = getPathName()

export const audioEffect = (src) => {
  const audio = new Audio();
  audio.src = `${getPathName()}music/${src}.mp3`;
  audio.play();
}

export const moneyFormat = (money) => {
  return new Intl.NumberFormat("zh-TW").format(money)
}

export const randNumber = (max) => {
  const min = 1
  const random = Math.random() * (max - min) + min;
  return Math.round(random)
}

export const randNumberWithMin = (min, max) => {
  const random = Math.random() * (max - min) + min;
  return Math.round(random)
}

export const setParticles = (effect) => {
  particlesJS.load("particles-js", `${getPathName()}assets/${effect}-particles.json`);
}

export const accordionEffect = (element) => {
  element.classList.toggle("active");
  let state = "up"
  const angleElement = element.querySelector("i.fa-solid");
  const panel = element.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
    state = "down"
  } 
  $(angleElement).attr("class", `fa-solid fa-angle-${state}`)
}
