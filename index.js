const thumbArea = document.querySelector('.thumb-area');
const playArea = document.querySelector('.play-area');
const video = document.querySelector('video');
const bottomBar = document.querySelector('.bottom-bar');
const bigPlayBtn = document.querySelector('.play-button');
const playPauseBtn = document.querySelector('.play-pause-button');
const refreshBtn = document.querySelector('.refresh-button');
const soundBtn = document.querySelector('.sound-button');
const durationBar = document.querySelector('.duration');
const fullScreenBtn = document.querySelector('.full-screen-button');
const nowPlayingTime = document.querySelector('.now-time');
const totalPlayingTime = document.querySelector('.total-time');

// Thumbnail 화면 시작 버튼
const firstPlay = () => {
  thumbArea.classList.remove('active');
  playArea.classList.add('active');
  video.play();
  totalDuration();
  interval = setInterval(nowDuration, 1000);
}

// Play 화면 Play/Pause 기능
const playPause = () => {
  // 실행중
  if(playPauseBtn.childNodes[3].classList.contains('active')) {
    playPauseBtn.childNodes[3].classList.remove('active');
    playPauseBtn.childNodes[1].classList.add('active');
    video.pause();
    clearInterval(interval);
  } else {
    playPauseBtn.childNodes[1].classList.remove('active');
    playPauseBtn.childNodes[3].classList.add('active');
    video.play();
    interval = setInterval(nowDuration, 1000);
  }
}

// Refresh 기능
const refresh = () => {
  video.currentTime = 0;
  video.play();
  interval = setInterval(nowDuration, 1000);
}

// Mute 기능
const sound = () => {
  if(soundBtn.childNodes[3].classList.contains('active')) {
    soundBtn.childNodes[3].classList.remove('active');
    soundBtn.childNodes[1].classList.add('active');
    video.muted = false;
  } else {
    soundBtn.childNodes[1].classList.remove('active');
    soundBtn.childNodes[3].classList.add('active');
    video.muted = true;
  }
}

// Screen 기능
const screen = () => {
  video.requestFullscreen();
}

// 영상 지금 시간
const nowDuration = () => {
  let nowTime = Math.floor(video.currentTime);
  durationBar.style.width = `${nowTime * 10}%`;
  nowPlayingTime.innerHTML = `00 : 0${nowTime}`;
  if(nowTime === 10) {
    nowPlayingTime.innerHTML = `00 : ${nowTime}`;
    clearInterval(interval);
  }
}

// 영상 총 시간
const totalDuration = () => {
  const totalDuration = Math.round(video.duration);
  totalPlayingTime.innerHTML = `00 : ${totalDuration}`;
}

// 우클릭 막기
const rightClickProhibition = (e) => {
  e.preventDefault();
}

// Play 화면 mouseOver
const playAreaMouseOver = () => {
  bottomBar.style.opacity = '1';
}

// Play 화면 mouseOut
const playAreaMouseOut = () => {
  bottomBar.style.opacity = '0';
}

bigPlayBtn.addEventListener('click', firstPlay);
playPauseBtn.addEventListener('click', playPause);
refreshBtn.addEventListener('click', refresh);
soundBtn.addEventListener('click', sound);
fullScreenBtn.addEventListener('click', screen);
playArea.addEventListener('mouseover', playAreaMouseOver);
playArea.addEventListener('mouseout', playAreaMouseOut);
document.addEventListener('contextmenu', rightClickProhibition)