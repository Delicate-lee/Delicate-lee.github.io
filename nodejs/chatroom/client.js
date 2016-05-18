/**
 * Created by LEE on 2016/5/6.
 */
"use strict";

const net = require('net');
//通过一个socket去链接指定 的 服务器
const client = net.connect({port:8124,host:'127.0.0.1'});
//可以省略localhost     net.connect(port)
//在外部定义一个变量，用来判断用户是否已注册，如果没有注册，则为undefined
// 如果已经注册，nickname就是用户的昵称

let nickname;

//当客户端和服务器端链接成功后触发回掉函数
client.on('connect',() =>{
    process.stdout.write('please create username:  ');
    //监听 标准输入 data 是流对象
    process.stdin.on('data',(data) =>{
        //用户通过控制台输入数据，回车会触发 data 事件
        // data 会包含用户输入的 回车换行符
        //需要对 data 数据进行 trim()  处理
        //data 是 buffer类型 ，需要toString()
        data = data.toString().trim();
        //进来就判断是否注册
        //如果用户名不存在，用户发送注册数据
        if(!nickname) {
            let send = {
                protocol: 'signup',
                nickname: data
            };
            return client.write(JSON.stringify(send));
        }

        //以下为通话信息


        let arr = data.split(':');
        let send={};
        //私聊
         if(arr.length >= 2){
           let names = arr.slice(0,-1);
                send ={
                protocol:'p2p',
                nickname:nickname,
                to:names,
                message: arr.slice(-1)
            }
        }
        // 广播
        else {
                send ={
                protocol:'broadcast',
                nickname:nickname,
                message:data
            }
        }
        client.write(JSON.stringify(send));

    });
});

client.on('data',(data) =>{

    let singal =  JSON.parse(data.toString());
    //判断协议类型
    let protocol = singal.protocol;

    if(protocol === 'signup'){
        switch (singal.code){
            case '1000':
                console.log('signup success!');
                nickname = singal.nickname;
                break;
            case '1001':
                console.log('the nickname is exist, please change');
                break;
            case '1002':
                console.log('the nickname is illegal')
                break;
        }
    }else if(protocol === 'p2p'){
        switch (singal.code){
            //如果不存在该成员
            case '2001':
                console.log(`${singal.error} not exsit `);
                break;
            //存在该成员
            case '2000':
                if(singal.names.length === 1){
                    console.log(`${singal.from} say to you: ${singal.message}`);
                }else {
                    console.log(`group member -- ${singal.from} say to you: ${singal.message}`);
                }

                break;
        }
    }else if(protocol === 'broadcast'){
        console.log(`${singal.from} say: ${singal.message}`);
    }

});

client.on('end',() =>{
    console.log('disconnected from server');
});