/**
 * Created by LEE on 2016/4/21.
 */
var urls=['birds.png','land.png','pipe1.png','pipe2.png','sky.png'];
var images=[];

var count=0;
function loading(){
    count++;
    if(count>=urls.length){
        main();
    }
}

urls.forEach(function (url) {
    var img=new Image;
    img.addEventListener('load', loading);
    img.src='./images/'+url;
    images.push(img);
})



