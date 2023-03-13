import React, { useRef, useState, useEffect } from 'react';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

const MapboxMap : React.FC = () => {
    
    const [map, setMap] = useState<mapboxgl.Map>();
    const mapNode = useRef(null);

    useEffect(() => {
      const node = mapNode.current;

      if(node === null) return;

      const mapboxMap = new mapboxgl.Map({
        container: node,
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
        style:"mapbox://styles/mapbox/streets-v12",
        center: [0,0],
        zoom:9
      })
    
      setMap(mapboxMap)


      return () => {
        mapboxMap.remove();
      }
    }, [])
    
        
    return (
            <div ref={mapNode}>

            </div>
        )
}

export default MapboxMap