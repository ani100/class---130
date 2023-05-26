song_perfect = "";
song_night_c = "";

right_wristX = 0;
right_wristY = 0;

left_wristX = 0;
left_wristY = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

song_status_nc = "";
song_status_perfect = "";
 
function preload() {

    song_perfect = loadSound("Ed_Sheeran_-_Perfect.mp3");
    song_night_c = loadSound("NC.mp3");
    

}

function setup() {

canvas = createCanvas(550,450);
canvas.position(480,270);
video = createCapture(VIDEO);
video.hide();
tm = ml5.poseNet(video,modelloaded);
tm.on("pose",getresults);

}

function draw() {

    background("black");
    image(video,10,10,530,430);
    fill("red");
    stroke("yellow");
   
    song_status_nc = song_night_c.isPlaying();
    console.log(song_status_nc);

    song_status_perfect = song_perfect.isPlaying();
    console.log(song_status_perfect);

    if (scoreleftWrist > 0.1) {

        circle(left_wristX,left_wristY,20);
        song_perfect.stop();

        if (song_status_nc == false) {
            
            song_night_c.play();
            document.getElementById("song_name").innerHTML = "The Song Playing is 'Night Changes'."
        }

    }

    if (scorerightWrist > 0.1) {
        
        circle(right_wristX,right_wristY,20);
        song_night_c.stop();

        
    if (song_status_perfect == false) {
       
        song_perfect.play();
        document.getElementById("song_name").innerHTML = "The Song Playing is 'Perfect'."
    }
    
    }

    
}



function modelloaded() {
    console.log("The posenet is initialised");
}

function getresults(result,error) {

    if (result) {
      
        if (result.length > 0) {

            console.log(result);
            right_wristX = result[0].pose.rightWrist.x;
            right_wristY = result[0].pose.rightWrist.y;
            left_wristX = result[0].pose.leftWrist.x;
            left_wristY = result[0].pose.leftWrist.y;
            scoreleftWrist = result[0].pose.keypoints[9].score;
            scorerightWrist = result[0].pose.keypoints[10].score;

        }

    }

    else {
        console.error(error);
    }

}

function stop_playing() {
    song_night_c.stop();
    song_perfect.stop();
    document.getElementById("song_name").innerHTML = "No Song is being played currently";
}