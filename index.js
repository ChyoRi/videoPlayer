const video = document.querySelector('video');

// 썸네일 DOM
const thumbArea = document.querySelector('.thumb-area');
const bigPlayBtn = document.querySelector('.play-button');

// 영상 DOM
const playArea = document.querySelector('.play-area');
const bottomBar = document.querySelector('.bottom-bar');
const playPauseBtn = document.querySelector('.play-pause-button');
const refreshBtn = document.querySelector('.refresh-button');
const volumeBtn = document.querySelector('.sound-button');
const durationBar = document.querySelector('.duration');
const fullScreenBtn = document.querySelector('.full-screen-button');
const nowPlayingTime = document.querySelector('.now-time');
const totalPlayingTime = document.querySelector('.total-time');
const volumeSettingInput = document.querySelector('.volume-setting');

// 영상 관련 변수
const VIDEO_SRC = './video/[official] 프렌즈의 즐거운 여름 나기 3.mp4';
let timeStamp;

// Thumbnail 화면 시작 버튼
const firstPlay = () => {
  thumbArea.classList.remove('active');
  playArea.classList.add('active');
  video.setAttribute('src', VIDEO_SRC);
  video.play();
}

// Play 화면 Play/Pause 기능
const playPause = () => {
  // 실행중
  if(playPauseBtn.childNodes[3].classList.contains('active')) {
    playPauseBtn.childNodes[3].classList.remove('active');
    playPauseBtn.childNodes[1].classList.add('active');
    video.pause();
  } else {
    playPauseBtn.childNodes[1].classList.remove('active');
    playPauseBtn.childNodes[3].classList.add('active');
    video.play();
  }
}

// Refresh 기능
const refresh = () => {
  video.currentTime = 0;
  video.play();
}

// Mute 기능
const mute = () => {
  if(volumeBtn.childNodes[3].classList.contains('active')) {
    volumeBtn.childNodes[3].classList.remove('active');
    volumeBtn.childNodes[1].classList.add('active');
    video.muted = false;
  } else {
    volumeBtn.childNodes[1].classList.remove('active');
    volumeBtn.childNodes[3].classList.add('active');
    video.muted = true;
  }
}

// Volume Setting 기능
const volumeSetting = (e) => {
  video.volume = e.target.value / 100;
  let gradient_value = 100 / e.target.attributes.max.value;
  e.target.style.background = 'linear-gradient(to right, #ffffff 0%, #ffffff '+gradient_value * e.target.value +'%, rgb(236, 236, 236) ' +gradient_value *  e.target.value + '%, rgb(236, 236, 236) 100%)';
}

// Screen 기능
const screen = () => {
  video.requestFullscreen();
}

// 영상 시간 계산
const videoTime = () => {
  timeStamp = Math.round(video.currentTime);

  const totalDuration = Math.round(video.duration);

  durationBar.style.width = (timeStamp / totalDuration) * 100 + '%';

  if(timeStamp < 10) {
    nowPlayingTime.innerHTML = `00 : 0${timeStamp}`;
  } else {
    nowPlayingTime.innerHTML = `00 : ${timeStamp}`;
  }

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

video.addEventListener('loadeddata', videoTime);
video.addEventListener('timeupdate', videoTime);

bigPlayBtn.addEventListener('click', firstPlay);
playPauseBtn.addEventListener('click', playPause);
refreshBtn.addEventListener('click', refresh);
volumeBtn.addEventListener('click', mute);
fullScreenBtn.addEventListener('click', screen);
volumeSettingInput.addEventListener('input', volumeSetting);


playArea.addEventListener('mouseover', playAreaMouseOver);
playArea.addEventListener('mouseout', playAreaMouseOut);

document.addEventListener('contextmenu', rightClickProhibition)