//область с фото пользователя

export default class UserPhoto {
  constructor(element, onUpload) {
    this.element = element; // запоминаем элемент для которого создается метод UserPhoto
    this.onUpload = onUpload;

    // обработчик (если над элементом проносят файл)
    this.element.addEventListener('dragover', (e) => {
      if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file') {
        // если это файл, то бросаем в нужную область
        e.preventDefault();
      }
    });
    // обработчик (если "бросить" файл в нужную область)
    this.element.addEventListener('drop', (e) => {
      const file = e.dataTransfer.items[0].getAsFile();
      const reader = new FileReader();

      reader.readAsDataURL(file); // прочитывается, то что было "брошено" (base64)
      reader.addEventListener('load', () => this.onUpload(reader.result));
      e.preventDefault();
    });
  }

  set(photo) {
    this.element.style.backgroundImage = `url(${photo})`; // изменение background на фото
  }
}
