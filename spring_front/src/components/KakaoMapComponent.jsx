import React, { useEffect } from 'react';

const KakaoMapComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=9e5e154c9c3ad090b30fc5a73a06845f&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 1
        };

        const map = new window.kakao.maps.Map(container, options);
        const geocoder = new window.kakao.maps.services.Geocoder();

        const marker = new window.kakao.maps.Marker();
        const infowindow = new window.kakao.maps.InfoWindow({zIndex:1});

        function displayCenterInfo(result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            for (var i = 0; i < result.length; i++) {
              if (result[i].region_type === 'H') {
                document.getElementById('centerAddr').innerText = result[i].address_name;
                break;
              }
            }
          }
        }

        window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
          searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              var detailAddr = !!result[0].road_address ? '<div>도로명주소: ' + result[0].road_address.address_name + '</div>' : '';
              detailAddr += '<div>지번주소: ' + result[0].address.address_name + '</div>';
              var content = '<div class="bAddr">' + detailAddr + '</div>';
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);
              infowindow.setContent(content);
              infowindow.open(map, marker);
            }
          });
        });

        window.kakao.maps.event.addListener(map, 'idle', function() {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

        function searchAddrFromCoords(coords, callback) {
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords, callback) {
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="map_wrap">
        <div id="map" style={{ width: '100%', height: '350px' }}></div>
        <div className="hAddr">
          <span className="title">지도 중심 기준 행정동 주소 정보</span>
          <span id="centerAddr"></span>
        </div>
      </div>
    </>
  );
};

export default KakaoMapComponent;
