// songs src
var songs = [
  "./songs/Beethoven - Moonlight.mp3",
  "./songs/Chopin - Nocturne 20.mp3",
  "./songs/Mozart - K 545.mp3"
];

// artworks src
var poster = [
  "./artworks/beethoven.jpg",
  "./artworks/chopin.jpg",
  "./artworks/mozart.jpg"
];

var songTitle = document.getElementById("song-title");
var fillBar = document.getElementById("fill");

function init() {
  $("#bg img").attr("src", poster[0]);
  $("#image img").attr("src", poster[0]);
}
init();

var currentTime = document.getElementById("current-time");

var song = new Audio(); // important
var currentSong = 0;

window.onload = playSong;

function playSong() {
  song.src = songs[currentSong]; // set the source of the 0th song

  //technical bullshit so that songTtle donesn't dislplay "./Song/###"
  var names = songs.map(
    song =>
      song
        .split("/") // to separate ., Songs, songName.mp3
        .pop() // to get songName.mp3
        .split(".")[0] // to get songName
  );
  songTitle.textContent = names[currentSong];

  song.play();
}

function playOrPauseSong() {
  if (song.paused) {
    song.play();
    $("#play img").attr("src", "./icons/Pause.png");
  } else {
    song.pause();
    $("#play img").attr("src", "./icons/Play.png");
  }
}

song.addEventListener("timeupdate", function() {
  var position = song.currentTime / song.duration;

  fillBar.style.width = position * 100 + "%";

  convertTime(Math.round(song.currentTime));
  song.ended ? next() : null;
});

function convertTime(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;

  //convert time
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  currentTime.textContent = `${min}:${sec}  `;

  totalTime(Math.round(song.duration));
}
function totalTime(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;

  //convert time
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;
  currentTime.append(` / ${min}:${sec}`);
}

function next() {
  currentSong++;
  if (currentSong > 2) {
    currentSong = 0;
  }
  playSong();
  $("#play img").attr("src", "./icons/Pause.png");
  $("#image img").attr("src", poster[currentSong]);
  $("#bg img").attr("src", poster[currentSong]);
}

function prev() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = 2;
  }
  playSong();
  $("#play img").attr("src", "./icons/Pause.png");
  $("#image img").attr("src", poster[currentSong]);
  $("#bg img").attr("src", poster[currentSong]);
}

function volUp() {
  song.volume > 0.9 ? (song.volume = 1) : (song.volume += 0.1);
}

function volDown() {
  song.volume < 0.1 ? (song.volume = 0) : (song.volume -= 0.1);
}

function mute() {
  song.volume = song.volume ? 0 : 1;
}
