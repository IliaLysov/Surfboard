const playerWrapper = document.querySelector('.player__wrapper');
const player = document.querySelector('.player__elem');
const playerControls = document.querySelector('.player__controls');
const startBtn = document.querySelector('.player__start');
const playback = document.querySelector('.player__playback');
const playbackPoint = document.querySelector('.player__playback-button');

const volume = document.querySelector('.player__volume-scale');


let eventsInit = (e) => {
    e.preventDefault();
    if (player.paused) {
        player.play();
        startBtn.classList.add('active');
    } else {
        player.pause();
        startBtn.classList.remove('active');
    }
}

startBtn.addEventListener('click', (e) => {
    eventsInit(e);
})

player.addEventListener('click', (e) => {
    eventsInit(e);
})

volume.addEventListener('mousemove', (e) => {
    player.volume = e.target.value
})

player.addEventListener('timeupdate', () => {
    const completedPercent = (player.currentTime / player.duration) * 100;
    playback.style.background = `linear-gradient(90deg, yellow ${completedPercent}%, #626262 0%)`;
    playbackPoint.style.left = `${completedPercent}%`;
})

playback.addEventListener('click', (e) => {
    const progressTime = (e.offsetX / playback.offsetWidth) * player.duration;
    player.currentTime = progressTime;
})

document.querySelector(".player__volume-scale").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = `linear-gradient(90deg, yellow ${value}%, #626262 0%)`
  };