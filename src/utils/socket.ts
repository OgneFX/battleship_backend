const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
    console.log("Подключение установлено");
    socket.send(JSON.stringify({ type: "join", message: "Игрок подключился" }));
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Сообщение от сервера:", data);
};

socket.onclose = () => {
    console.log("Соединение закрыто");
};

export default socket;
