/**
 * Created by LEE on 2016/5/6.
 */
"use strict";

const net = require('net');
//1.创建server对象
const server = net.createServer();

//2.监听客户端的连接事件，只要有客户端连接就会触发

//const server = net.createServer((socket)=>{
//    //默认是监听connection事件
//}).on('error',(err)=>{
//    throw new Error('端口号被占用');
//});

//获取服务器端的 的port
//server.address().port

//node会随机为客户端分配一个端口号
//客户端的  socket.remotePort

//创建一个对象，用来存socket
let users = {};
server.on('connection',(socket) =>{
    console.log(socket.remotePort);

    //socket.write(JSON.stringify(obj));
    socket.on('data',(data) =>{
        //接收的是二进制数据，需要转换
        data = data.toString();
        //转换为json对象
        data =JSON.parse(data);
        //判断protocol类型
        let protocol = data.protocol;
        switch (protocol){
            case 'signup':
                signup(data,socket);
                break;

            case 'broadcast':
                broadcast(data);
                break;

            case 'p2p':
                p2p(data);
                break;
        }

    });
    socket.on('error', function () {
       console.log('user has exit');
    });
});

function signup(singal,socket){
    //如果存下该用户，无法注册
    if(users[singal.nickname]){
        let send = {
            protocol: 'signup',
            code: '1001',
            message:'该用户已经存在，换个名字吧!'
        };
        return socket.write(JSON.stringify(send));
    }
    //如果执行到这里证明没有此用户，插入数据库
    users[singal.nickname] = socket;

    let send = {
        protocol: 'signup',
        code: '1000',
        nickname:singal.nickname,
        message:'signup success'
    }
    socket.write(JSON.stringify(send));
}

function broadcast(singal){
    let send = {
        protocol:'broadcast',
        message: singal.message,
        from:singal.nickname
    }
    for(let nickname in users){
        users[nickname].write(JSON.stringify(send));
    }
}

function p2p(singal){
    let names = singal.to;
    let send = {
        protocol:'p2p',
        code: '2000',
        message: singal.message,
        from:singal.nickname,
        names:names
    }
    for(let k in names){
        if(!users[names[k]]){
            let send = {
                protocol:'p2p',
                code: '2001',
                message: singal.message,
                from:singal.nickname,
                names:names,
                error:names[k]
            }
            users[singal.nickname].write(JSON.stringify(send));
        }else {
            users[names[k]].write(JSON.stringify(send));
        }

    }
}

//server.listen(0,()=>{})
//随机分配客户端的端口号
server.listen(8124,'127.0.0.1',() =>{
    console.log('sever is running');
});