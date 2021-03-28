export interface MarkerItem {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 2,
      center: { lat: 0, lng: 0 },
    });
  }

  addMarker(markerItem: MarkerItem): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: markerItem.location.lat,
        lng: markerItem.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: markerItem.markerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
