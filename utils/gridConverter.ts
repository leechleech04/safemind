export const latLonToGrid = (latitude: number, longitude: number) => {
  const map = {
    Re: 6371.00877, // 지도반경
    grid: 5.0, // 격자간격 (km)
    slat1: 30.0, // 표준위도 1
    slat2: 60.0, // 표준위도 2
    olon: 126.0, // 기준점 경도
    olat: 38.0, // 기준점 위도
    xo: 210 / 5.0, // 기준점 X좌표
    yo: 675 / 5.0, // 기준점 Y좌표
  };

  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const re = map.Re / map.grid;
  const slat1 = map.slat1 * DEGRAD;
  const slat2 = map.slat2 * DEGRAD;
  const olon = map.olon * DEGRAD;
  const olat = map.olat * DEGRAD;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  //------------------------------
  // 0: 위경도 → x,y 변환
  //------------------------------
  let ra = Math.tan(Math.PI * 0.25 + latitude * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);

  let theta = longitude * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const x = Math.floor(ra * Math.sin(theta) + map.xo + 1.5);
  const y = Math.floor(ro - ra * Math.cos(theta) + map.yo + 1.5);

  return { x, y };
};
