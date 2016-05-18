/**
 * Created by LEE on 2016/4/21.
 */

function bird(frameIndex,x,y){
    this.frameIndex = frameIndex;
    this.x=x;
    this.y=y;
    this.waitTime=0;
    this.speed=0;
    this.a=0.0005;
}
bird.prototype.update=function(dt){
    this.waitTime += dt;
    if(this.waitTime >=100){
        this.frameIndex=(this.frameIndex +1) %3;
        this.waitTime -= 100;
    }

    this.speed = this.speed + this.a * dt;

    this.y += this.speed *dt;
}

bird.prototype.draw=function(){
    //保存
    cax.save();
    //坐标轴变化
    cax.translate(this.x,this.y);
    //速度范围
    this.speed= this.speed > 0.3? 0.3:this.speed;
    //角度 范围  -45---45
    var angel=this.speed /0.3*45;
//        console.log(angel);

    //坐标轴角度变化
    cax.rotate(angel / 180 * Math.PI);

    cax.drawImage(images[0],this.frameIndex*52,0,52,45,-26,-22.5,52,45);
    //保存
    cax.restore();
}

bird.prototype.fly= function () {
    this.speed= -0.3;
}

var myBird = new bird(0,200,100);




