//управление пользователями

export default class UserName {
  constructor(element) {
    this.element = element;
  }

  set(name) {
    this.name = name; // запоминание имени пользователя
    this.element.textContent = name; // наполняем текстовым содержимым класс в разметке
  }

  get() {
    return this.name; // извлечение введенных данных
  }
}
