import { LocationType, MapConfig } from "../types/mapTypes";
// import {GeoJSON } from "geo"


export const locationInit: LocationType = {
    lng : 38.0,
    lat : 128.5
}

export const mapConfig : MapConfig = {
    minZoom : 1,
    maxZoom : 15,
    type : "raster",
    style : "mapbox://styles/mapbox/streets-v12",
    accessToken : process.env.REACT_APP_MAPBOX_KEY!,
    title : 'map',
    avatar : "",
}
