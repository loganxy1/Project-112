prediction1 = "";

Webcam.set({
    height: 350,
    width: 350,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version", ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/T-DAGj5pX/model.json', modelLoaded);

function modelLoaded(){
    console.log("model Loaded");
}

function check(){
    img =  document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error();
    }

    else{
        console.log(results);
        hand_gesture = results[0].label;
        console.log(hand_gesture);

        if(hand_gesture=="Thumbs down"){
            console.log("Thumbs down");
            prediction1 = "Thumbs down, dislike";
            document.getElementById("p1").innerHTML = "Prediction = "+prediction1;
            document.getElementById("gesture").innerHTML = "&#128078";
            speak();
        }

        if(hand_gesture=="Neck yourself"){
            console.log("Neck yourself");
            prediction1 = "Neck yourself, slap yourslef on the neck";
            document.getElementById("p1").innerHTML = "Prediction = "+prediction1;
            document.getElementById("gesture").innerHTML = "&#128076";
            speak();
        }

        if(hand_gesture=="High five"){
            console.log("High five");
            prediction1 = "High five, friendship";
            document.getElementById("p1").innerHTML = "Prediction = "+prediction1;
            document.getElementById("gesture").innerHTML = "&#128400";
            speak();
        }

        if(hand_gesture=="Thumbs up"){
            console.log("Thumbs up");
            prediction1 = "Thumbs up, like";
            document.getElementById("p1").innerHTML = "Prediction = "+prediction1;
            document.getElementById("gesture").innerHTML = "&#128077";
            speak();
        }

        if(hand_gesture=="Victory"){
            console.log("Victory");
            prediction1 = "Victory, completing or winning something";
            document.getElementById("p1").innerHTML = "Prediction = "+prediction1;
            document.getElementById("gesture").innerHTML = "&#9996";
            speak();
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediciton is "+prediction1;
    var utterThis = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}