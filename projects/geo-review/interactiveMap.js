export default class InteractiveMap {
    constructor(mapId, onClick) { // constructor принимает id="map" и функцию, которая вызывается при клике на любую область
      this.mapId = mapId;
      this.onClick = onClick;
    }
  
    async init() { // инициализация карты
      await this.injectYMapsScript(); // скрипт с картой
      await this.loadYMaps();
      this.initMap();
    }
  
    injectYMapsScript() {
      return new Promise((resolve) => {
        const ymapsScript = document.createElement('script');
        ymapsScript.src =
          'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        document.body.appendChild(ymapsScript);
        ymapsScript.addEventListener('load', resolve); // загрузка карты на страницу
      });
    }
  
    loadYMaps() {
      return new Promise((resolve) => ymaps.ready(resolve));
    }
  
    initMap() {
      this.clusterer = new ymaps.Clusterer({
        groupByCoordinates: true,
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: false,
      });
      //обработка кликов по кластеризатору
      this.clusterer.events.add('click', (e) => {
        const coords = e.get('target').geometry.getCoordinates();
        this.onClick(coords); // при клике вызывается функция куда передаются координаты клика
      });
      // создание карты
      this.map = new ymaps.Map(this.mapId, {
        center: [59.935274, 30.312388],
        zoom: 10,
      });
      // обработка кликов по карте (выводится форма)
      this.map.events.add('click', (e) => this.onClick(e.get('coords')));
      // добавление кластеризатора на карту
      this.map.geoObjects.add(this.clusterer);
    }

    openBalloon(coords, content) {
      this.map.balloon.open(coords, content);
    }
  
    setBalloonContent(content) {
      this.map.balloon.setData(content);
    }
  
    closeBalloon() {
      this.map.balloon.close();
    }

  // метки
  createPlacemark(coords) {
    const placemark = new ymaps.Placemark(coords);
    placemark.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.onClick(coords);
    });
    this.clusterer.add(placemark);
  }

}
  
  