var mainDivHeight = 55;
	var mainDivWidth = 450;
	var columnNo = 10;
	var rowNo = 1;
	var noOf10Set ;
	var randomNumber; 
	var count = 0;
	var iconClassArry = ['fas fa-truck-pickup fa-2x' , 'fas fa-traffic-light fa-2x' , 'fas fa-bicycle fa-2x' , 'fas fa-snowman fa-2x' , 'fab fa-pied-piper-alt fa-2x' , 'fas fa-wine-glass fa-2x' , 'fas fa-spider fa-2x', 'fas fa-space-shuttle fa-2x' , 'fab fa-sketch fa-2x', 'fas fa-otter fa-2x' , 'fas fa-hippo fa-2x', 'fas fa-frog fa-2x' , 'fas fa-hiking fa-2x', 'fas fa-flag-usa fa-2x' , 'fas fa-satellite fa-2x', 'fas fa-carrot fa-2x' ];
	var iconNameAyyy = ['truck' , 'traffic' , 'bicycle' , 'snowman ' , 'pied-piper' , 'wine-glass' , 'spider', 'space-shuttle' , 'sketch', 'otter' , 'hippo', 'frog' , 'hiking', 'flag-usa' , 'satellite', 'carrot' ];
	var iconColorArry = ['#d63031','#0984e3','#00b894','#a55eea','#ffb142','#2c2c54','#33d9b2','#6D214F','#25CCF7','#2C3A47'];
	var QuectionTxt = "How many name are there ?";
	function randomNumberGet(){
		randomNumber = getRandomNumber(1,20);
		if((randomNumber % 10) == 0){
			noOf10Set = parseInt(randomNumber/10) ;
		}else{
			noOf10Set = parseInt(randomNumber/10)+1 ;
		}
			//noOf10Set = 1 ;
		count = 0;	
		//alert(randomNumber);
		
		var iconRandomNumber = getRandomNumber(0,15);
		var iconIndex = iconClassArry[iconRandomNumber];
		var iconName = iconNameAyyy[iconRandomNumber];
		var NQuectionTxt1 = QuectionTxt.replace("name", iconName);
        document.getElementById("QuectionContainer").innerHTML = NQuectionTxt1 ;
		
		for (var blockNo = 0; blockNo < noOf10Set; blockNo++) {
			var MainBlock = document.createElement("div");
			MainBlock.setAttribute("class", "mainBlock");
			MainBlock.id = "mainBlockId"+blockNo;
			document.getElementById('Block').appendChild(MainBlock);
			var bordercount = 0;
			var iconColor = iconColorArry[getRandomNumber(0,9)];
			for (var i = 0 ; i < 10; i++) {
				var div = document.createElement("div");
				div.setAttribute("class", "blockStyle");
				var subDivHeight = (mainDivHeight - (rowNo*2))/rowNo;
				var subDivWidth = (mainDivWidth - (columnNo*2))/columnNo;
				div.id = "SubDiv"+blockNo+i;
				div.style.height = (subDivHeight + "px");
				div.style.width = (subDivWidth + "px");
				div.style.lineHeight = (subDivHeight + "px");
				
				if(count < randomNumber){
					var dot = document.createElement("div");
					dot.setAttribute("class", iconIndex);
					dot.id = "dotId"+blockNo+i;
					dot.style.color= iconColor;
					dot.style.marginTop= "9px";
					div.appendChild(dot); 
					++bordercount;
				
				}
				document.getElementById("mainBlockId"+blockNo).appendChild(div);
				//document.getElementById("dotId"+blockNo+i).style.display = "none";
				++count;
				if (bordercount == 10 ) {
					for (var y = 0; y < 10; y++) {
						document.getElementById("SubDiv"+blockNo+y).style.border = "2px solid #749bff";
					}
					
				} 

			}
		}
	}
	function getRandomNumber(min ,max){
		return Math.floor(Math.random() * (max - min + 1) + min);

	}
	

function checkAnswerModel1(){
	var uAnswer = document.getElementById("userInput").value;
    if ( uAnswer == randomNumber) {
        greeting = "Correct Answer";
        document.getElementById("nextQuectionButton").style.display = "block";
    } else {
        document.getElementById("nextQuectionButton").style.display = "none";
         greeting = "Worng Answer";
    }
    document.getElementById("answer").innerHTML = greeting;

}