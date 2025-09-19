import * as Location from "expo-location";

export async function checkLocationPermissions() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
}

export async function checkIfUserIsInUS() {
  if (await checkLocationPermissions()) {
    const { coords } = await Location.getCurrentPositionAsync({});
    const location = await Location.reverseGeocodeAsync(coords);
    return location.some((loc) => loc.isoCountryCode === "US");
  }
}
