class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var any=await database.ref('playerCount').once("value")
      if(any.exists()){playerCount=any.val()
      player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200);
    car2=createSprite(300,200);
    car3=createSprite(500,200);
    car4=createSprite(700,200);
    cars=[car1,car2,car3,car4];
    car1.addImage(car1_Img)
    car2.addImage(car2_Img)
    car3.addImage(car3_Img)
    car4.addImage(car4_Img)
    finish=false;
  }
  play(){
    form.hide();
    textSize(20);
    text("gameStart",120,100)
    Player.getplayerinfo();
    player.getcarsatend();
    if(allplayers!==undefined){
      background("#c68767")
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      var index=0;
      //var position=130;
      var x=175;
      var y;
      for (var plr in allplayers ){
        index=index+1
        x=x+200
        y=displayHeight-allplayers[plr].distance
        cars[index-1].x=x
        cars[index-1].y=y
        if(index===player.index){
          fill('red')
          ellipse(x,y,60,60)
        cars[index-1].shapeColor="red";
       camera.position.x=displayWidth/2
       camera.position.y=cars[index-1].y
      } 
        text(allplayers[plr].name,cars[index-1].x,cars[index-1].y+75)
    }
      }
      if(keyIsDown(UP_ARROW)&& player.index!==null && finish!==true){
        player.distance=player.distance+50
        player.update();
      }
      if(player.distance>3600 && finish===false){
        Player.updatecarsatend();
        player.rank=carsatend
        player.update();
        finish=true
      }
      drawSprites();
    }
    displayranks(){
      camera.position.x=0
      camera.position.y=0
      imageMode(CENTER)
      Player.getplayerinfo();
      image(bronze,displayWidth/-4,-100+displayHeight/9,200,240)
      image(silver,displayWidth/4,-100+displayHeight/9,225,270)
      image(gold,0,-100,250,200)
      textSize(50)
      for(var plr in allplayers){
        if(allplayers[plr].rank===1){
          text("1st : "+allplayers[plr].name,0,85)
        }
        else if(allplayers[plr].rank===2){
          text("2nd : "+allplayers[plr].name,-350,175)
      }
       else if(allplayers[plr].rank===3){
        text("3rd : "+allplayers[plr].name,350,175)
    } 
      else {
        text("honourable mention: "+allplayers[plr].name,0,200)
      }
    }
    }
  }
