const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

$circle.addEventListener('click', (e) => {
    const rect = $circle.getBoundingClientRect();
    console.log(rect);

    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    
    const DEG = 40;
    
    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * DEG;
    
    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);
    
    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0deg`);
        $circle.style.setProperty('--tiltY', `0deg`);
    }, 300);
    
    const plusOne = document.createElement('div');
    plusOne.style.left = `${e.clientX - rect.left}px`;
    plusOne.style.top = `${e.clientY - rect.top}px`;
    plusOne.textContent = '+1';
    plusOne.classList.add('plus-one');
    addOne();
    
    $circle.parentElement.appendChild(plusOne);
    setTimeout(() => {
        plusOne.remove();
    }, 750);
});

function start() {
    setScore(getScore());
    setImage();
}

function setScore(score) {
    localStorage.setItem("score", score);
    $score.textContent = score;
}

function setImage() {
    if (getScore() >= 20) {
        $circle.setAttribute('src', './assets/images/lizzard.png')
    }
}

function getScore() {
    return Number(localStorage.getItem('score')) || 0;
}

function addOne() {
    setScore(getScore() + 1);
    setImage();
}

function reset() {
    setScore(0);
    $circle.setAttribute('src', './assets/images/frog.png')
}

start();