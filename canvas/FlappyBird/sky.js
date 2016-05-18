/**
 * Created by LEE on 2016/4/21.
 */
function sky(img,x){
    this.img = img;
    this.x= x;
    this.waitTime=0;
    this.speed = 0.15;
}

sky.prototype.update= function (dt) {
    this.x=this.x-this.speed*dt;
    if(this.x <-800) {
        var offset = 800+this.x;
        this.x = 800 +offset;
    }
}


sky.prototype.draw= function () {
    cax.drawImage(this.img,0,0,800,600,this.x,0,800,600);
}

var sky1 = new sky(images[4],0);
var sky2 = new sky(images[4],800);