song="";
function preload() {
    song= loadSound("music.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    w=ml5.poseNet(video,l);
    w.on('pose',ans8); 
}

function draw() {
    image(video,0,0,600,500);
    fill("#C71585");
    stroke("#00FFFF");
    if (rw>0.2) {
        circle(rwx,rwy,20);
        if (rwy>0 && rwy<=100) {
            document.getElementById('speed').innerHTML="Speed is- 0.5x";
            song.rate(0.5);
        }
        else if(rwy>100 && rwy<=200) {
            document.getElementById('speed').innerHTML="Speed is- 1x";
            song.rate(1);
        }
        else if(rwy>200 && rwy<=300) {
            document.getElementById('speed').innerHTML="Speed is- 1.5x";
            song.rate(1.5);
        }
        else if(rwy>300 && rwy<=400) {
            document.getElementById('speed').innerHTML="Speed is- 2x";
            song.rate(2);
        }
        else if(rwy>400) {
            document.getElementById('speed').innerHTML="Speed is- 2.5x";
            song.rate(2.5);
        }
    }

    if (lw>0.2) {
        circle(lwx,lwy,20);
        v=Number(lwy);
        q=floor(v);
        d=q/500;
        song.setVolume(d);
        document.getElementById('vol').innerHTML="Volume is- "  + d;
    }
}

function l() {
    console.log('posenet is on');
}

function ans8(result) {
    if (result.length>0) {
        console.log(result);
        lwx=result[0].pose.leftWrist.x;
        lwy=result[0].pose.leftWrist.y;
        rwx=result[0].pose.rightWrist.x;
        rwy=result[0].pose.rightWrist.y;    
        lw=result[0].pose.keypoints[9].score;
        rw=result[0].pose.keypoints[10].score;
        console.log("Left x is- " + lwx  ,"Left y is- " + lwy , "Score is - " +lw);
        console.log("Right x is- " + rwx ,"Right y is- " + rwy , "Score is - " +rw);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1)
}