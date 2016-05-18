/**
 * Created by LEE on 2016/4/21.
 */
function ground(img,x){
    this.img=img;
    this.x=x;
    this.waitTime=0;
    this.speed=0.3;
}

ground.prototype.update= function (dt) {
    this.x=this.x-this.speed*dt;
    if(this.x <-336){
        var offset=this.x+336;
        this.x=336*3+offset;
    }
}

ground.prototype.draw= function () {
    cax.drawImage(this.img,0,0,336,112,this.x,488,336,112);
}


var ground1=new ground(images[1],0);
var ground2 =new ground(images[1],336);
var ground3=new ground(images[1],672);
var ground4 =new ground(images[1],1008);