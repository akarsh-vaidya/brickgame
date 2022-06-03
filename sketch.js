let ball_x, ball_y, ball_dx,ball_dy, ball_diameter;
let paddle_x, paddle_y,paddle_dx,paddle_dy, paddle_length,paddle_width;
let brickRowCount,brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft;
let brickX, brickY, bricks_visible;

let rightPressed, leftPressed;

let bricks = [];
let score = 0;
let life = 3;
// let interval=setInterval(draw,10);

function setup() {
  createCanvas(400, 400);
  background("black");
  fill("white");
  ball_x=width/2;
  ball_y=height/2;
  paddle_length=90;
  paddle_width=20;
  paddle_x=width/2-(paddle_length/2);
  paddle_y=height-paddle_width;
  ball_dx=1;
  ball_dy=1;
  ball_diameter=30;
//   circle(x,y,radius)  
  
  brickRowCount = 5;
  brickColumnCount = 6;
  brickWidth = 50;
  brickHeight = 15;
  brickPadding = 10;
  brickOffsetTop = 50;
  brickOffsetLeft = 25;
  bricks_visible=true;
  
  rightPressed = false;
  leftPressed = false;
  
  for(let i=0; i<brickColumnCount; i++) {
    bricks[i] = [];
    for(let j=0; j<brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}
  
  
}

function draw(){

  
  
  background("black")
  
  
  circle(ball_x,ball_y,ball_diameter);
//   rect(x,y,height,width)
    
  textSize(12);
  text("Score: "+score, 10, 30);
  
  textSize(12);
  text("Life: " +life, 330, 30);
  
  
  ball_x+=ball_dx;
  ball_y+=ball_dy;
  
  
  if(ball_x + ball_dx > width-ball_diameter/2 || ball_x + ball_dx < ball_diameter/2) {
        ball_dx = -ball_dx;
    }
    if(ball_y + ball_dy < ball_diameter/2) {
        ball_dy = -ball_dy;
    } else if(ball_y + ball_dy > height-ball_diameter/2){
      if(life>0){
        life--;
          ball_x=width/2;
          ball_y=height/2;
        
      }else{
        alert("GAME OVER");
        ball_x=width/2;
        ball_y=height/2;
        ball_dx=0;
        ball_dy=0;
      }
    }
    
    ball_x += ball_dx;
    ball_y += ball_dy;
  
  
  rect(paddle_x,paddle_y,paddle_length,paddle_width);
  
  
//   key pressed changes the location of the item by 0 to a position not smooth
  
  
  
  
  if (keyIsDown(LEFT_ARROW)) {
    if(paddle_x>0){
      paddle_x=paddle_x-5;
    }
    
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if(paddle_x + (paddle_length) < width){
      // console.log(paddle_x);
      paddle_x=paddle_x+5;
    }
  }
   if (
    ball_x - ball_diameter/2 > paddle_x &&
    ball_x + ball_diameter/2 < paddle_x + paddle_length &&
    ball_y + ball_diameter/2 > paddle_y
  ) {
    ball_dy = -ball_dy;
  }

//   build bricks
  for(let i=0; i<brickColumnCount; i++) {
        for(let j=0; j<brickRowCount; j++) {
            if(bricks[i][j].status == 1){
              brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
            brickY = (j*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[i][j].x = brickX;
            bricks[i][j].y = brickY;
             // canvas.beginPath();
            rect(brickX, brickY, brickWidth, brickHeight);
            fill(bricks_visible? 'white' : 'transparent');
           // canvas.closePath();
            }
        }
    }
//   for(let i=0; i<brickColumnCount; i++) {
//         for(let j=0; j<brickRowCount; j++) {
//           if (bricks_visible) {
//         if (
//           ball_x - ball_diameter/2 > brickX && // left brick side check
//           ball_x + ball_diameter/2 < brickX + brickWidth && // right brick side check
//           ball_y + ball_diameter/2 > brickY && // top brick side check
//           ball_y - ball_diameter/2 < brickY + brickHeight // bottom brick side check
//         ) {
//           ball_dy *= -1;
//           bricks_visible = false;

//           // increaseScore();
//         }
//       }
//     }
//   }
   for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            let b = bricks[i][j];
            if (b.status == 1) {
                if (ball_x > b.x && ball_x < b.x + brickWidth && ball_y > b.y && ball_y < b.y + brickHeight) {
                    ball_dy = -ball_dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                    }
                }
            }
        }
    }
  
  
  
}






