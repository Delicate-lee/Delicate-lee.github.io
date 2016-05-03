/*
* @Author: LEE
* @Date:   2016-04-28 22:42:36
* @Last Modified by:   LEE
* @Last Modified time: 2016-05-03 22:33:13
*/

// 'use strict';

// header部分
//头像info点击切换文字
$('.logo-info ').on({'mouseover':function(){
  $('.logo-info p:eq(0)').text('hello');
  $('.logo-info p:eq(1)').text('world');
},
  'mouseleave':function(){
    $('.logo-info p:eq(0)').text('前端');
  $('.logo-info p:eq(1)').text('简介');
  }
});

//aside部分
//aside点击更换背景图
$('aside a').on('click',function(){
  $('aside a').removeClass('selected');
  $(this).addClass('selected');
});


    var imgs=[];
   var arrPos = [{

        left: -400,
        opacity: 0,
        transform: 'rotateY(-70deg) translateX(-96px)',
        transformOrigin: 'right',
        zIndex:1
    }, {
        left: 0,
        opacity: 0.7,
        transform: 'rotateY(-25deg) translateX(-48px) ',
        transformOrigin: 'right',
        zIndex:1

    }, {
        left: 450,
        opacity: 1,
        transform: 'rotateY(0) translateX(0)',
        transformOrigin: '',
        zIndex:3
    }, {
        left: 900,
        opacity: 0.7,
        transform: 'rotateY(25deg) translateX(48px)',
        transformOrigin: 'left',
        zIndex:1

    }, {
        left: 1300,
        opacity: 0,
        transform: 'rotateY(70deg) translateX(96px)',
        transformOrigin: 'left',
        zIndex:1
    },{
        left: 1700,
        opacity: 0,
        transform: 'rotateY(70deg) translateX(96px)',
        transformOrigin: 'left',
        zIndex:1
    },
    {
        left: 1900,
        opacity: 0,
        transform: 'rotateY(70deg) translateX(96px)',
        transformOrigin: 'left',
        zIndex:1
    },{
        left: 1900,
        opacity: 0,
        transform: 'rotateY(70deg) translateX(96px)',
        transformOrigin: 'left',
        zIndex:1
    }];

    $('.div').each(function (k,v) {
        $(this).css(arrPos[k])
    });

    $('#prev').on('click', function () {
        //先删除返回删除元素然后插入最后
        console.log(1);
        arrPos.push(arrPos.shift(arrPos[0]));
        setCss(arrPos);
    });

    $('#next').on('click', function () {
        //先删除返回删除元素然后插入最前
        console.log(2);
        arrPos.unshift(arrPos.pop(arrPos[4]));
        setCss(arrPos);
    });

    function setCss(arrPos){
        $('.div').each(function (k) {
            $(this).css(arrPos[k]);
        })
    }





//屏幕加载完成后的操作
 $(function(){
    $('#fullpage').fullpage({
      anchors: ['page1', 'page2', 'page3', 'page4','page5'],
      css3:true,
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      navigation:false,
  afterLoad: function(anchorLink,index){
    // index: index of the section. Starting from 1.
      $('.section').removeClass('current');
      setTimeout(function(){
        $('.section').eq(index-1).addClass('current');
      },100)

      $('aside a').removeClass('selected');
      setTimeout(function(){
        $('aside a:eq('+(index-1)+')').addClass('selected');
      },100);


      if(anchorLink=='page2'){
        // setTimeout(function(){
        // },10);
      }
    },
    onLeave:function(index,nextIndex,direction){
      // index 从 1 开始
      // if(nextIndex == 2){
      // }
    },
    afterRender:function(){
      var obj= $(this);
      console.log(obj);

    },
    loopBottom:true,
    keyboardScrolling:true,
    verticalCentered:true,

  });
});