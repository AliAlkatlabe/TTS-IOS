
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function(event) {
        const acceleration = event.acceleration;
        console.log(`Acceleratie X: ${acceleration.x}, Y: ${acceleration.y}, Z: ${acceleration.z}`);
    });
} else {
    console.log('Accelerometer wordt niet ondersteund in deze browser.');
}




//gps ophalen

const getLocationButton = document.getElementById('get-location');
const locationElement = document.getElementById('location');


getLocationButton.addEventListener('click', () => {

    if ('geolocation' in navigator) {

        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            locationElement.textContent = `GPS-locatie: Latitude ${latitude}, Longitude ${longitude}`;
        }, function (error) {

            locationElement.textContent = `Fout bij het ophalen van de locatie: ${error.message}`;
        });
    } else {
  
        locationElement.textContent = 'Geolocation wordt niet ondersteund in deze browser.';
    }
});


const retryLocationButton = document.getElementById('retry-location');

retryLocationButton.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(function (position) {
        // Code om locatie te verwerken
    }, function (error) {
        // Code om fouten te verwerken
    });
});
retryLocationButton.addEventListener('click', () => {
    // Leid de gebruiker naar de locatie-instellingenpagina op hun apparaat
    window.location.href = "app-settings:geolocation";
});





const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Microsoft Deana Online (Natural) - Dutch (Belgium) (nl-BE)" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});






