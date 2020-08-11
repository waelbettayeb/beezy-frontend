export function simpleReverseGeocoding(lat = 0, lng = 0) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lon=${lng}&lat=${lat}`;
  return fetch(url).then(function (response) {
    return response.json();
  });
}
