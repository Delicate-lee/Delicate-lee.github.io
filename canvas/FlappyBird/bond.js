/**
 * Created by LEE on 2016/4/21.
 */
var bond= function (img1,img2,x) {
    this.x=x;
    this.img1=img1;
    this.img2=img2;
    this.y= getheight();
    this.waitTime=0;
    this.speed=0.1;
    this.z=this.y+570;
}
bond.prototype.update= function (dt) {

    this.h=Math.random()*150+50;

    if(this.x < -52){
        this.x = this.x+1000;
        this.y=this.h-420;
        this.z=this.h+150;
    }
    this.x -= dt*this.speed;

//        一共 600 -112= 488 -(150---50)   剩下  288---438  空格留 150
//        this.y=this.h-420;
//        this.y=this.h +150;


}
function getheight(){
    var h=Math.random()*150 +50;
    return h-420;
}

bond.prototype.draw= function () {
    cax.drawImage(this.img1,
        0,0,52,420,
        this.x,this.y,52,420);

    cax.rect(this.x,this.y,52,420);

    cax.drawImage(this.img2,
        0,0,52,420,
        this.x,this.z,52,420);

    cax.rect(this.x,this.z,52,420);

}

var bond1=new bond(images[3],images[2],800);

var bond2=new bond(images[3],images[2],1000);

var bond3=new bond(images[3],images[2],1200);

var bond4=new bond(images[3],images[2],1400);

var bond5=new bond(images[3],images[2],1600);
