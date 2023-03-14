import React, { useRef, useState, useEffect } from 'react';
// @ts-ignore eslint-disable-next-line import/no-webpack-loader-syntax  // 공식 문서에 이렇게 하라고 나와있다... 이왜진...?
import mapboxgl, {Marker} from '!mapbox-gl';
import styled from 'styled-components';


export const MapContainer = styled.div`
    width:100%;
    height:100%;
    `

export const SideBar = styled.div`
background-color: rgba(35, 55, 75, 0.9);
color: #fff;
padding: 6px 12px;
font-family: monospace;
z-index: 1;
position: absolute;
top: 0;
left: 0;
margin: 12px;
border-radius: 4px;
`

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onMapLoaded?(map: mapboxgl.Map): void;
  onMapRemoved?(): void;
}

const MapboxMap: React.FC = ({ initialOptions = {}, onMapLoaded, onMapRemoved }: MapboxMapProps) => {
  console.log("Layer/{z}/{x}/{y}.png")
  const [map, setMap] = useState<mapboxgl.Map>();

  const mapNode = useRef(null);
  const [lng, setLng] = useState(128);
  const [lat, setLat] = useState(36.5);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    const node = mapNode.current;

    if (node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v12",
      // style:MapStyle,
      center: [lng, lat],
      zoom: zoom,
      ...initialOptions,
    });

    mapboxMap.on('load', () => {
      console.log('map has loaded')
    })


    mapboxMap.on('move', () => {
      const latLng = mapboxMap.getCenter();
      setLng(latLng.lng.toFixed(4));
      setLat(latLng.lat.toFixed(4));
      setZoom(mapboxMap.getZoom().toFixed(2));
    })


    setMap(mapboxMap)

    return () => {
      mapboxMap.remove();
    }
  }, [])


  return (
    <React.Fragment>
      <SideBar>{lng} {lat} {zoom}</SideBar>
      <MapContainer ref={mapNode}>
      </MapContainer>
    </React.Fragment>
  )
}

export default MapboxMap