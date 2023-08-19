import { nearestCity } from "cityjs";

function generateRandomCoordinate() {
  const minLat = -90;
  const maxLat = 90;
  const minLng = -180;
  const maxLng = 180;

  const randomLat = Math.random() * (maxLat - minLat) + minLat;
  const randomLng = Math.random() * (maxLng - minLng) + minLng;

  return {
    latitude: randomLat.toFixed(6),
    longitude: randomLng.toFixed(6),
  };
}

export class RandomCityService {
  static getRandomCityData() {
    const randomCoordinate = generateRandomCoordinate();
    const cityNearMe = nearestCity({
      latitude: randomCoordinate.latitude,
      longitude: randomCoordinate.longitude,
    });

    return cityNearMe;
  }
}
