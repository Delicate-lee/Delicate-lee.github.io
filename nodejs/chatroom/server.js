/**
 * Created by LEE on 2016/5/6.
 */
"use strict";

const net = require('net');
//1.����server����
const server = net.createServer();

//2.�����ͻ��˵������¼���ֻҪ�пͻ������Ӿͻᴥ��

//const server = net.createServer((socket)=>{
//    //Ĭ���Ǽ���connection�¼�
//}).on('error',(err)=>{
//    throw new Error('�˿ںű�ռ��');
//});

//��ȡ�������˵� ��port
//server.address().port

//node�����Ϊ�ͻ��˷���һ���˿ں�
//�ͻ��˵�  socket.remotePort

//����һ������������socket
let users = {};
server.on('connection',(socket) =>{
    console.log(socket.remotePort);

    //socket.write(JSON.stringify(obj));
    socket.on('data',(data) =>{
        //���յ��Ƕ��������ݣ���Ҫת��
        data = data.toString();
        //ת��Ϊjson����
        data =JSON.parse(data);
        //�ж�protocol����
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
    //������¸��û����޷�ע��
    if(users[singal.nickname]){
        let send = {
            protocol: 'signup',
            code: '1001',
            message:'���û��Ѿ����ڣ��������ְ�!'
        };
        return socket.write(JSON.stringify(send));
    }
    //���ִ�е�����֤��û�д��û����������ݿ�
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
//�������ͻ��˵Ķ˿ں�
server.listen(8124,'127.0.0.1',() =>{
    console.log('sever is running');
});