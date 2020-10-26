var voiceDivInFirst =["Hello Kid, Let's get Start Our Class.",];
var voiceDivInNoFirst =["Very Good let's do this"];
var voiceDivOut =["Please, Don't do other works. Comeon let's do this.","Please, put your pointer on your Cybro School Board."];
var voiceNoFace =["Hello, Are your there." ,"I can't see you.","Where are you . I can't see you"];
var voiceDivInHappy =["You are Seemied to be Happy.","you are happy child","your smile is Beautiful"];
var voiceDivOutHappyt =["You are happy child, Let's We Start to Study","your smile is Beautiful, Let's do this"];
var voiceangry =["Oh! Don't angry kid. Do you like to dance?. I can dance for You."];
var voiceCorrectAnsw =["Wow Correct." , "Great Answer.","Amazing Answer","Your are the BEST"];
var voiceWrongAnsw =["Don't Worry Buddy, Let's do it again.","Nevermind You can do It Next Time."];
var speechTxt = "";
say(" ");
function sayTextGet(SituationName){
  speechTxt = "";

  switch(SituationName){
    case "voiceDivInFirst":
      speechTxt = voiceDivInFirst[getRandomInt(voiceDivInFirst.length)];
      break;
    case "voiceDivInNoFirst":
      speechTxt = voiceDivInNoFirst[getRandomInt(voiceDivInNoFirst.length)];
      break;
    case "voiceDivOut":
      speechTxt = voiceDivOut[getRandomInt(voiceDivOut.length)];
      break;

    case "voiceNoFace":
      speechTxt = voiceNoFace[getRandomInt(voiceNoFace.length)];
      break;
    case "voiceDivOutHappyt":
      speechTxt = voiceDivOutHappyt[getRandomInt(voiceDivOutHappyt.length)];
      break;
    case "voiceDivInHappy":
      speechTxt = voiceDivInHappy[getRandomInt(voiceDivInHappy.length)];
      break;
    case "voiceangry":
      speechTxt = voiceangry[getRandomInt(voiceangry.length)];
      break;
    case "voiceCorrectAnsw":
      speechTxt = voiceCorrectAnsw[getRandomInt(voiceCorrectAnsw.length)];
      break;
    case "voiceWrongAnsw":
      speechTxt = voiceWrongAnsw[getRandomInt(voiceWrongAnsw.length)];
      break;
    default:
      speechTxt =SituationName;
      break;
  }
  
  say(speechTxt);
  document.getElementById("modelBody").innerHTML = speechTxt;
  document.getElementById("text").innerHTML = speechTxt;
  if(SituationName == "voiceWrongAnsw" || SituationName == "voiceCorrectAnsw"){
   document.getElementById("nextQuecBtn").style.display = "block";
    
  }else{
    document.getElementById("nextQuecBtn").style.display = "none"; 
  }
  
  
 //s $("#exampleModalCenter").modal("show");
  //setTimeout(function(){ $("#exampleModalCenter").modal("hide"); }, 1000);

  return speechTxt;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function say(txt){
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[2]; 
  msg.volume = 1; // From 0 to 1
  msg.rate = 0.8; // From 0.1 to 10
  msg.pitch = 1.5; // From 0 to 2
  // msg.text = "Good Morning , Lets Start Ower Works....Where are you ? ";
  msg.text = txt;
  msg.lang = 'es';
  speechSynthesis.speak(msg);
  
}


