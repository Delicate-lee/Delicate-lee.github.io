/**
 * Created by LEE on 2016/5/6.
 */
"use strict";

const net = require('net');
//ͨ��һ��socketȥ����ָ�� �� ������
const client = net.connect({port:8124,host:'127.0.0.1'});
//����ʡ��localhost     net.connect(port)
//���ⲿ����һ�������������ж��û��Ƿ���ע�ᣬ���û��ע�ᣬ��Ϊundefined
// ����Ѿ�ע�ᣬnickname�����û����ǳ�

let nickname;

//���ͻ��˺ͷ����������ӳɹ��󴥷��ص�����
client.on('connect',() =>{
    process.stdout.write('please create username:  ');
    //���� ��׼���� data ��������
    process.stdin.on('data',(data) =>{
        //�û�ͨ������̨�������ݣ��س��ᴥ�� data �¼�
        // data ������û������ �س����з�
        //��Ҫ�� data ���ݽ��� trim()  ����
        //data �� buffer���� ����ҪtoString()
        data = data.toString().trim();
        //�������ж��Ƿ�ע��
        //����û��������ڣ��û�����ע������
        if(!nickname) {
            let send = {
                protocol: 'signup',
                nickname: data
            };
            return client.write(JSON.stringify(send));
        }

        //����Ϊͨ����Ϣ


        let arr = data.split(':');
        let send={};
        //˽��
         if(arr.length >= 2){
           let names = arr.slice(0,-1);
                send ={
                protocol:'p2p',
                nickname:nickname,
                to:names,
                message: arr.slice(-1)
            }
        }
        // �㲥
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
    //�ж�Э������
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
            //��������ڸó�Ա
            case '2001':
                console.log(`${singal.error} not exsit `);
                break;
            //���ڸó�Ա
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