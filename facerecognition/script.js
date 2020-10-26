const video = document.getElementById('video')
var FaceExpresionName =["angry" , "disgusted" , "fearfulc" , "happy" , "sad" , "neutral" ,"surprised"];
var FaceExpresion =[];
var IsFaceDetec = false;
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/CyboSchool/facerecognition/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/CyboSchool/facerecognition/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/CyboSchool/facerecognition/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/CyboSchool/facerecognition/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.getElementById('dataShow').append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, 500, 500)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    if(detections[0] != null){
       var a= detections[0]["expressions"]["angry"].toFixed(1) ;
       var h= detections[0]["expressions"]["happy"] .toFixed(1);
       var s= detections[0]["expressions"]["sad"].toFixed(1);
       var n= detections[0]["expressions"]["neutral"].toFixed(1);
       var su= detections[0]["expressions"]["surprised"].toFixed(1);
       sortExpresion(a,h,s,n,su);
        IsFaceDetec = true;
  }else{
    
    IsFaceDetec = false;
  }
    
  }, 500)
})

function sortExpresion(angry , happy , sad , neutral ,surprised){
   FaceExpresionName =["angry" , "happy" , "sad" , "neutral" ,"surprised"];
  var temp = angry -0.8;
  var FaceExpresion =[temp , happy , sad , neutral ,surprised];

  var i;
  var j;
  var max;
  for(i=0;i<7;i++){
    for(j=i+1;j<7;j++){
      if( FaceExpresion[i] < FaceExpresion[j]){
        var temp = FaceExpresion[j];
        FaceExpresion[j] = FaceExpresion[i];
        FaceExpresion[i] = temp;

         temp1 = FaceExpresionName[j];
        FaceExpresionName[j] = FaceExpresionName[i];
        FaceExpresionName[i] = temp1;
      }
    }
  }
}
function getExpresion(){
  if(IsFaceDetec){
    console.log(FaceExpresionName[0]);
    return FaceExpresionName[0];
  }else{
    console.log("NULL");
    return null;
  }
}

