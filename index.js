import WebSocket, {WebSocketServer } from 'ws';

const wss= new WebSocketServer({port:3000});

wss.on("connection",function cnx(ws){
    ws.on('message',function message(msg){
        const data = JSON.parse(msg);

        if(data.type==="message"){
            wss.clients.forEach((client)=>{
                if(client !==ws && client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({type:"message",data:data.data}));
                }
            })
        }
    })
})