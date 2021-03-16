import io from 'socket.io-client';

export function conn(id) {
  const socket = io('http://www.zhouqiao.art:9092', {
    query: `userid=${id}`,
    reconnect: false,
    'reconnection delay': 20000,
    transports: ['websocket'], // you need to explicitly tell it to use websockets
  }).connect();
  console.log(socket);

  // socket.on('joined', (roomid, id) => {
  //   console.log('receive joined message!', roomid, id);
  // });
  //
  // socket.on('otherjoin', (roomid) => {});
  //
  // socket.on('full', (roomid, id) => {
  //   socket.disconnect();
  //   alert('the room is full!');
  // });
  //
  // socket.on('leaved', (roomid, id) => {
  //   console.log('receive leaved message', roomid, id);
  //   socket.disconnect();
  // });
  //
  // socket.on('bye', (room, id) => {});
  //
  // socket.on('disconnect', (socket) => {});
  //
  // socket.on('messageptop', (roomid, data) => {
  //   console.log('receive message!', roomid, data);
  //
  //   if (data === null || data === undefined) {
  //     console.error('the message is invalid!');
  //     return;
  //   }
  // });
  return true;
}
