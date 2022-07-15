let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.749808, 37.605636],
        zoom: 14,
        controls: []
    });

    var myPlacemark = new ymaps.Placemark([55.749808, 37.605636], {}, {
        iconLayout: 'default#image',
        iconImageHref: "./img/icons/marker.svg",
        iconImageSize: [58, 73],
        iconImageOffset: [-29, -73]
    });
    myMap.geoObjects.add(myPlacemark);

    myMap.behaviors.disable('scrollZoom');

};

ymaps.ready(init);