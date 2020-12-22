import LoginWindow from './ui/loginWindow'; // окно логина
import MainWindow from './ui/mainWindow'; // управление главным окном (чат)
import UserName from './ui/userName'; //управление пользователями
import UserList from './ui/userList';
import MessageList from './ui/messageList';
import MessageSender from './ui/messageSender';
import UserPhoto from './ui/userPhoto';
import WSClient from './wsClient';

export default class MegaChat {
  constructor() {
    this.wsClient = new WSClient(
      `ws://${location.host}/mega-chat/ws`, // подключение к серверу
      this.onMessage.bind(this)
    );

    this.ui = {
      loginWindow: new LoginWindow(
        document.querySelector('#login'),
        this.onLogin.bind(this) // при правильном заполнении формы вызывается метод onLogin (56)
      ),
      mainWindow: new MainWindow(document.querySelector('#main')),
      userName: new UserName(document.querySelector('[data-role=user-name]')),
      userList: new UserList(document.querySelector('[data-role=user-list]')),
      messageList: new MessageList(document.querySelector('[data-role=messages-list]')),
      messageSender: new MessageSender(
        document.querySelector('[data-role=message-sender]'),
        this.onSend.bind(this)
      ),
      userPhoto: new UserPhoto(
        document.querySelector('[data-role=user-photo]'),
        this.onUpload.bind(this)
      ),
    };

    this.ui.loginWindow.show();
  }

  onUpload(data) {
    this.ui.userPhoto.set(data);

    fetch('/mega-chat/upload-photo', {
      method: 'post',
      body: JSON.stringify({
        name: this.ui.userName.get(),
        image: data,
      }),
    });
  }

  onSend(message) {
    this.wsClient.sendTextMessage(message);
    this.ui.messageSender.clear();
  }

  async onLogin(name) {
    await this.wsClient.connect(); // соединение с сервером
    this.wsClient.sendHello(name);
    this.ui.loginWindow.hide(); // скрытие окно логин
    this.ui.mainWindow.show(); // показываем окно чата
    this.ui.userName.set(name); // пользователи
    this.ui.userPhoto.set(`/mega-chat/photos/${name}.png?t=${Date.now()}`);
  }

  onMessage({ type, from, data }) {
    console.log(type, from, data);

    if (type === 'hello') {
      this.ui.userList.add(from); // при сообщении 'hello' добавляется пользователь
      this.ui.messageList.addSystemMessage(`${from} вошел в чат`);
    } else if (type === 'user-list') {
      for (const item of data) {
        this.ui.userList.add(item);
      }
    } else if (type === 'bye-bye') {
      this.ui.userList.remove(from);
      this.ui.messageList.addSystemMessage(`${from} вышел из чата`);
    } else if (type === 'text-message') {
      this.ui.messageList.add(from, data.message);
    } else if (type === 'photo-changed') {
      const avatars = document.querySelectorAll(
        `[data-role=user-avatar][data-user=${data.name}]`
      );

      for (const avatar of avatars) {
        avatar.style.backgroundImage = `url(/mega-chat/photos/${
          data.name
        }.png?t=${Date.now()})`;
      }
    }
  }
}
