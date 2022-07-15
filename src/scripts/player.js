let player;
const playerContainer = $(".player");

let eventsInit = () => {
    $(".player__start").click(e =>  {
        e.preventDefault();

        if (playerContainer.hasClass('paused')) {
            player.pauseVideo()
        } else {
            player.playVideo()
        }
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;


        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);
    });

    $(".player__splash").click(e => {
        player.playVideo();
    })
};

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $('.player__duration-estimate').text(formatTime(durationSec));

    if (typeof interval != 'undefined') {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completeSec = player.getCurrentTime();
        const completedPercent = (completeSec / durationSec) * 100;

        $('.player__playback').css({
            background:`linear-gradient(90deg, yellow ${completedPercent}%, #626262 0%)`
        });

        $('.player__playback-button').css({
            left: `${completedPercent}%`
        });
        $('.player__duration-completed').text(formatTime(completeSec));
    }, 1000)
}

const onPlayerStateChange = event => {
    /*
    -1 – воспроизведение видео не началось
    0 – воспроизведение видео завершено
    1 – воспроизведение
    2 – пауза
    3 – буферизация
    5 – видео находится в очереди
    */
   switch (event.data) {
    case 1:
        playerContainer.addClass("active");
        playerContainer.addClass("paused");
        break;

    case 2:
        playerContainer.removeClass("active");
        playerContainer.removeClass("paused");
        break;
   }
}

const playerSectionContainer = $(".player-section__container");
const playerHeight = playerSectionContainer.css("height");
const playerWidth =  playerSectionContainer.css("width");

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: playerHeight,
        width: playerWidth,
        videoId: 'KCLWvAcPcPk?autoplay=0&controls=0&disablekb=0&showinfo=0&modestbranding=1&rel=0',
        playerVars: {
            consrols: '0',
            disablekb: '0',
            schowinfo: '0',
            rel: '0',
            autoplay: '0',
            modestbranding: '1'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

eventsInit();