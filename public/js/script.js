
let currentSong = null;
let audio = new Audio();

let playlist = Array.from(document.querySelectorAll(".item"));
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const seekBar = document.querySelector(".seek-bar");
const volumeBar = document.querySelector(".volume-bar");
let notChangingSeekBar = true;
let currentItem = null;
volumeBar.max = 100;
let playIsActive = false;
let repeate = false;


document.querySelector("#search-line").oninput = function () {
  let val = this.value.trim().toLowerCase();
  let sItems = document.querySelectorAll(".item");
  if (val != "") {
    sItems.forEach(function (elem) {
      if (elem.innerText.toLowerCase().search(val) == -1) {
        elem.classList.add("hide");
      } else {
        elem.classList.remove("hide");
      }
    });
  } else {
    sItems.forEach(function (elem) {
      elem.classList.remove("hide");
    });
  }
};


function likedTracksRemoveItem(item) {
  // let index = likedTracks.indexOf(item);
  // if (index > -1) {
  //   likedTracks.splice(index, 1);
  // }
}

function refreshBarHeart(elemHeartIsActive) {
  if (elemHeartIsActive != null) {
    if (elemHeartIsActive) {
      document.querySelector('#footer-heart').classList.add('active');
    } else {
      document.querySelector('#footer-heart').classList.remove('active');
    }
  } else {
    if (currentSong.parentElement.parentElement.parentElement.querySelector('.fa-heart').classList.contains('active')) {
      document.querySelector('#footer-heart').classList.remove('active');
      currentSong.parentElement.parentElement.parentElement.querySelector('.fa-heart').classList.remove('active');
      likedTracksRemoveItem(parseInt(currentSong.parentElement.parentElement.parentElement.attributes.data.value));
    } else {
      document.querySelector('#footer-heart').classList.add('active');
      currentSong.parentElement.parentElement.parentElement.querySelector('.fa-heart').classList.add('active');
      likedTracks.push(parseInt(currentSong.parentElement.parentElement.parentElement.attributes.data.value));
    }
    if (storageAvailable()) {
      localStorage.setItem("likedTracks", JSON.stringify(likedTracks));
    }
    else {
      console.log(storageAvailable());
    }
  }

}




function likeProduct(elem) {
  elem.classList.toggle("active");
  if (elem.classList.contains("active")) {
    // likedTracks.push(parseInt(elem.parentElement.parentElement.parentElement.parentElement.attributes.data.value));
  } else {
    // likedTracksRemoveItem(parseInt(elem.parentElement.parentElement.parentElement.parentElement.attributes.data.value));
  }
  if (currentSong != null) {
    if (currentSong.parentElement.parentElement.parentElement == elem.parentElement.parentElement.parentElement.parentElement) {
      refreshBarHeart(elem.classList.contains("active"));
    }
  }
  // if (storageAvailable()) {
  //   localStorage.setItem("likedTracks", JSON.stringify(likedTracks));
  // }
  // else {
  //   console.log(storageAvailable());
  // }

}


function playSong(elem) {
  playIsActive = elem.classList.contains('fa-pause');
  if (playIsActive) {
    if (audio != undefined) {
      audio.pause();
    }
    document.querySelector('#footer-play-btn').classList.remove('fa-pause');
    document.querySelector('#footer-play-btn').classList.add('fa-play');
    elem.classList.remove('fa-pause');
    elem.classList.add('fa-play');
  } else {
    if (currentSong == null) {
      document.querySelector('footer').classList.add('opened');
      volumeBar.value = audio.volume * 100;
    }
    document.querySelector('#footer-play-btn').classList.add('fa-pause');
    document.querySelector('#footer-play-btn').classList.remove('fa-play');
    elem.classList.remove('fa-play');
    elem.classList.add('fa-pause');
    if (currentSong != elem) {
      if (currentSong != null) {
        currentSong.classList.remove('fa-pause')
        currentSong.classList.add('fa-play');
      }
      currentItem = elem.parentElement.parentElement.parentElement;
      setSong(currentItem);
      currentSong = elem;
    }
    if (audio != undefined) {
      audio.play();
    }
  }
}

function footerPlaySong(elem) {
  let playIsActive = elem.classList.contains('fa-pause');
  if (playIsActive) {
    elem.classList.remove('fa-pause');
    elem.classList.add('fa-play');
    currentSong.classList.remove('fa-pause')
    currentSong.classList.add('fa-play');
    if (audio != undefined) {
      audio.pause();
    }
  } else {
    elem.classList.add('fa-pause');
    elem.classList.remove('fa-play');
    currentSong.classList.add('fa-pause')
    currentSong.classList.remove('fa-play');
    if (audio != undefined) {
      audio.play();
    }
  }
}


const formatTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
}


setInterval(() => {
  if (notChangingSeekBar) {
    seekBar.value = audio.currentTime * 10;
    currentTime.innerHTML = formatTime(audio.currentTime);
    if (audio.currentTime == audio.duration) {
      if (repeate) {
        seekBar.value = 0;
        audio.currentTime = 0;
        audio.play();
      } else {
        forwardButton();
      }
    }
  }
}, 1000)

seekBar.addEventListener('input', () => {
  notChangingSeekBar = false;
  currentTime.innerHTML = formatTime(seekBar.value / 10);
})

seekBar.addEventListener('change', () => {
  if (audio.currentTime == audio.duration) {
    audio.play();
  }
  audio.currentTime = seekBar.value / 10;
  notChangingSeekBar = true;
})


volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value / 100;
})

function setSong(item) {
  if (audio != undefined) {
    audio.pause();
  }
  audio.currentTime = 0;
  audio = item.querySelector('#audio');
  currentTime.innerHTML = '0 : 00';
  songDuration.innerHTML = formatTime(audio.duration);
  seekBar.value = 0;
  seekBar.max = audio.duration * 10;
  audio.volume = volumeBar.value / 100;
  let song_name = item.querySelector('.name').innerText;
  // let song_info = item.querySelector('.info').innerText;
  let song_img = item.querySelector('.item-img').src;
  document.querySelector('.current-song-name').textContent = song_name;
  // document.querySelector('.current-song-info').textContent = song_info;
  document.querySelector('.current-song-img').src = song_img;
  refreshBarHeart(item.querySelector('.fa-heart').classList.contains('active'));
}

function backwardButton() {
  let index = playlist.indexOf(currentItem);
  let length = playlist.length - 1;
  if (audio.currentTime < 5) {
    if (index <= 0) {
      setSong(playlist[length]);
      currentSong.classList.remove('fa-pause')
      currentSong.classList.add('fa-play');
      currentSong = playlist[length].querySelector('.fa-play');
      currentItem = playlist[length];
      currentSong.classList.remove('fa-play')
      currentSong.classList.add('fa-pause');
      document.querySelector('#footer-play-btn').classList.remove('fa-play');
      document.querySelector('#footer-play-btn').classList.add('fa-pause');
      if (audio != undefined) {
        audio.play();
      }
    } else {
      setSong(playlist[index - 1]);
      currentSong.classList.remove('fa-pause')
      currentSong.classList.add('fa-play');
      currentSong = playlist[index - 1].querySelector('.fa-play');
      currentItem = playlist[index - 1];
      currentSong.classList.remove('fa-play')
      currentSong.classList.add('fa-pause');
      document.querySelector('#footer-play-btn').classList.remove('fa-play');
      document.querySelector('#footer-play-btn').classList.add('fa-pause');
      if (audio != undefined) {
        audio.play();
      }
    }
  } else {
    seekBar.value = 0;
    audio.currentTime = 0;

  }
}

function forwardButton() {
  let index = playlist.indexOf(currentItem);
  let length = playlist.length - 1;
  if (index >= length) {
    setSong(playlist[0]);
    currentSong.classList.remove('fa-pause')
    currentSong.classList.add('fa-play');
    currentSong = playlist[0].querySelector('.fa-play');
    currentItem = playlist[0];
    currentSong.classList.remove('fa-play');
    currentSong.classList.add('fa-pause');
    document.querySelector('#footer-play-btn').classList.remove('fa-play');
    document.querySelector('#footer-play-btn').classList.add('fa-pause');
    if (audio != undefined) {
      audio.play();
    }
  } else {
    setSong(playlist[index + 1]);
    currentSong.classList.remove('fa-pause')
    currentSong.classList.add('fa-play');
    currentSong = playlist[index + 1].querySelector('.fa-play');
    currentItem = playlist[index + 1];
    currentSong.classList.remove('fa-play')
    currentSong.classList.add('fa-pause');
    document.querySelector('#footer-play-btn').classList.remove('fa-play');
    document.querySelector('#footer-play-btn').classList.add('fa-pause');
    if (audio != undefined) {
      audio.play();
    }
  }
}

function Repeate(elem) {
  if (elem.classList.contains('active')) {
    elem.classList.remove('active');
    repeate = false;
  } else {
    elem.classList.add('active');
    repeate = true;
  }
}