import React, { useEffect } from 'react';

const Chat: React.FC = () => {
  useEffect(() => {
    // Функция для загрузки скрипта Google Maps API
    const loadScript = (url: string) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        initMap(); // Инициализация карты после загрузки скрипта
      };
    };

    // Функция инициализации карты
    const initMap = () => {
      // Проверяем, что объект google существует
      if (!window.google) {
        console.error('Google Maps API is not loaded');
        return;
      }

      const mapOptions: google.maps.MapOptions = {
        zoom: 11,
        center: new window.google.maps.LatLng(56.874570, 53.212358), // New York
        styles: [
          { featureType: 'all', elementType: 'geometry.fill', stylers: [{ weight: '2.00' }] },
          { featureType: 'all', elementType: 'geometry.stroke', stylers: [{ color: '#9c9c9c' }] },
          { featureType: 'all', elementType: 'labels.text', stylers: [{ visibility: 'on' }] },
          { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#f2f2f2' }] },
          { featureType: 'landscape', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] },
          { featureType: 'landscape.man_made', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] },
          { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
          { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: 45 }] },
          { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#eeeeee' }] },
          { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#7b7b7b' }] },
          { featureType: 'road', elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
          { featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] },
          { featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
          { featureType: 'water', elementType: 'all', stylers: [{ color: '#46bcec' }, { visibility: 'on' }] },
          { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#c8d7d4' }] },
          { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#070707' }] },
          { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
        ],
      };

      const mapElement = document.getElementById('map') as HTMLElement;
      const map = new window.google.maps.Map(mapElement, mapOptions);

      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(56.874570, 53.212358),
        map: map,
        title: 'Snazzy!',
      });
    };

    // Загружаем скрипт Google Maps API с вашим ключом API
    loadScript('https://maps.googleapis.com/maps/api/js');
  }, []);

  return (
    <>
      <div id="map" style={{ width: '750px', height: '500px' }}></div>
    </>
  );
};

export default Chat;
