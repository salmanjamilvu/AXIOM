//Get Dom Elements
const container = document.getElementById('container');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const title = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');

//Song array
const tracks = ['Ertugrul', 'Fida-e-Haideri'];

//Index of currently play song
let trackIndex = 1;

//load the initial track
loadTrack(tracks[trackIndex]);

//Function to load the track
function loadTrack(track) {
    //Update the text for the titile of track
    title.innerText = track
    //Update the src in the audio element with the audio file of the selected track
    audio.src = `music/${track}.mp3`;
    albumArt.src = `images/${track}.jpg`;
}

//Function to play the track
function playTrack() {
    //Add the sound class 'play' to the container
    container.classList.add('play');
    //remove the play icon and display the pause icon instead
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

////Function to pause the track
function pauseTrack() {
    //Add the sound class 'play' to the container
    container.classList.remove('play');
    //remove the play icon and display the pause icon instead
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

// Function to switch to previous track
function prevTrack() {
    //Decrement the value of trackIndex by 1 to select the previous track from the trackArray
    trackIndex--;
    //check if selected track is less then 0
    if (trackIndex < 0) {
        //ressign the trackIndex to last track in the trackArray
        trackIndex = tracks.length -1;
    }
    //Load the selected track
    loadTrack(tracks[trackIndex]);
    //Play the selected track
    playTrack();
}

// Function to switch to next track
function nextTrack() {
    //Increment the value of trackIndex by 1 to select the previous track from the trackArray
    trackIndex++;
    console.log(trackIndex)
    //check if selected track is less then 0
    if (trackIndex > tracks.length -1) {
        //ressign the trackIndex to last track in the trackArray
        trackIndex = 0;
    }

    console.log(tracks.length);
    //Load the selected track
    loadTrack(tracks[trackIndex]);
    //Play the selected track
    playTrack();
}

// Function to update the progress bar
function updateProgress(e) {
    //Destructure the total duration and currentTime of the audio
    const { duration, currentTime } = e.srcElement;
    //Calculate percentage of overall audio player using currentTime and total duration
    const progressPersentage = currentTime / duration *100;
    //Ressign the width of progress bar using the progressPersentage
    progressBar.style.width = `${progressPersentage}%`;

}

//Function to set the progress bar
function setProgress(e) {
    //Get the overall width in px for progress bar contaier
    const width = this.clientWidth;
    //Get the x axies px value foe the location of click on the progress bar container
    const clickLocation =  e.offsetX;
    // Get the total duration of the track
    const duration = audio.duration;
    //Reassign the currentTime of audio track by calculating based on above metrics
    audio.currentTime = clickLocation / width * duration;

}

//Event Listeners
//1.Listen for click on the play button
playBtn.addEventListener('click', () =>{
    //Click if track is playing
    const isPlaying = container.classList.contains('play');
    //Conditional statement based on status of audio playback
    if (isPlaying) {
        //If track is playing, pause the track
        pauseTrack();
    }else{
        //If track is not playing, play the track
        playTrack();
    }
})

//2. Listen for click on previousBtn
previousBtn.addEventListener('click', prevTrack);

//3. Listen for click on nextBtn
nextBtn.addEventListener('click', nextTrack);

//4. Listen for a timeupdate on audio element
audio.addEventListener('timeupdate', updateProgress);

//5.  Listen for click on the progress bar
progress.addEventListener('click', setProgress);

//6. Listen for end of playback for current track
audio.addEventListener('ended', nextTrack);