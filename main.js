song = "";

function preload() {
    song = loadSound("music.mp3");
}

scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup() {
    Canvas = createCanvas(400, 400);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + " scoreRightWrist = " + scoreRightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}
function draw() {
    image(Video, 0, 0, 400, 400);
    fill("#ff0000")
    stroke("#ff0000");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
    
    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    } else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    } else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    } else if (rightWristY > 400) {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
}
if (scoreLeftWrist > 0.2) {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    new_leftWristY = floor(InNumberleftWristY * 2);
    leftWristY_Divide = new_LeftWristY / 1000;
    document.getElementById("volume").innerHTML = "volume = " + leftWristY_Divide;
    song.setVolume(leftWristY_Divide);
}
}

function Play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}