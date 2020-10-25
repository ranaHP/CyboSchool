const video = document.getElementById('video')
var FaceExpresionName =["angry" , "disgusted" , "fearfulc" , "happy" , "sad" , "neutral" ,"surprised"];
var FaceExpresion =[];
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/facerecognition/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/facerecognition/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/facerecognition/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/facerecognition/models')
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
     //console.log(interpolatedExpressionsPredictions(detections[0]["expressions"]));
      // console.log(" angry - " + detections[0]["expressions"]["angry"].toFixed(2) );
      // console.log(" happy - " + detections[0]["expressions"]["happy"].toFixed(2));
      // console.log(" sad - " + detections[0]["expressions"]["sad"].toFixed(2));
      // console.log(" nutural - " + detections[0]["expressions"]["neutral"].toFixed(2));
      // console.log(" surprised - " + detections[0]["expressions"]["surprised"].toFixed(2));

       var a= detections[0]["expressions"]["angry"].toFixed(1) ;
       var h= detections[0]["expressions"]["happy"] .toFixed(1);
       var s= detections[0]["expressions"]["sad"].toFixed(1);
       var n= detections[0]["expressions"]["neutral"].toFixed(1);
       var su= detections[0]["expressions"]["surprised"].toFixed(1);
    
      
        //console.log(a,h,s,n,su);
      sortExpresion(a,h,s,n,su);


        // console.log(detections[0]);
       }
    
  }, 100)
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

  
  //console.log("Face Expression is -" + FaceExpresionName[0] + " -- " + FaceExpresion[0] );
  // console.log("Face Expression is -" + FaceExpresionName[1] + " -- " + FaceExpresion[1] );
  // console.log("Face Expression is -" + FaceExpresionName[2] + " -- " + FaceExpresion[2] );
  // console.log("Face Expression is -" + FaceExpresionName[3] + " -- " + FaceExpresion[3] );
  // console.log("Face Expression is -" + FaceExpresionName[4] + " -- " + FaceExpresion[4] );

}
function getExpresion(){
  return FaceExpresionName[0];
}