function tts(txt){
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[2]; 
    msg.volume = 1; // From 0 to 1
    msg.rate = 0.8; // From 0.1 to 10
    msg.pitch = 1.5; // From 0 to 2
    // msg.text = "Good Morning , Lets Start Ower Works....Where are you ? ";
    msg.text = txt;
    msg.lang = 'es';
    speechSynthesis.speak(txt);
  }