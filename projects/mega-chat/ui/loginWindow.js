// окно логина

export default class LoginWindow {
  constructor(element, onLogin) {
    this.element = element;
    this.onLogin = onLogin;

    const loginNameInput = element.querySelector('[data-role=login-name-input]'); // доступ для ввода никнейма
    const submitButton = element.querySelector('[data-role=login-submit]'); // доступ для кнопки "войти"
    const loginError = element.querySelector('[data-role=login-error]'); // сообщение при ошибке в заполнении

    submitButton.addEventListener('click', () => {
      loginError.textContent = '';

      const name = loginNameInput.value.trim();

      if (!name) {
        loginError.textContent = 'Введите свой никнейм'; // сообщение при ошибке (при пустой форме)
      } else {
        this.onLogin(name); // вызов метода onLogin при правильном вводе данных в форме
      }
    });
  }

  show() {
    this.element.classList.remove('hidden'); // удаляем класс 'hidden'
  }

  hide() {
    this.element.classList.add('hidden');
  }
}
