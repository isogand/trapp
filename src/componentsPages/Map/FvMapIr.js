

import React, { Component } from 'react';
import ReactMapboxGl, {
    Layer,
    Feature,
    GeoJSONLayer,
    Image,
    ZoomControl,
    ScaleControl,
    RotationControl,
    Popup,
    Cluster,
} from 'react-mapbox-gl';
import MapirSource from './MapirSource';
import MarkerComponent from './MarkerComponent';
import {
    setRTLTextPlugin,
    GeolocateControl,
    AttributionControl,
} from 'mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import axios from 'axios';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';


setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
);

function _extends() {
    _extends =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends.apply(this, arguments);
}



class FvMapIr extends React.Component {
    constructor(props) {
        super(props);
        this.setAttribution = this.setAttribution.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `https://map.ir/vector/load?x-api-key=${this.props.apiKey}`,
        })
            .then(function (res) {})
            .catch(function (err) {});
    }

    setAttribution(map) {
        if (this.props.userLocation) {
            map.addControl(
                new GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: false,
                        timeout: 5000,
                        maximumAge: 10000,
                    },
                    trackUserLocation: true,
                })
            );
        }
        const getElement = document.getElementsByClassName('mapboxgl-ctrl-logo');
        getElement[0].href = 'http://map.ir';
        map.addControl(new AttributionControl({ compact: true }));
    }

    render() {
        const Map = this.props.Map;

        return React.createElement(
            Map,
            _extends({}, this.props, {
                style:
                    this.props.style ||
                    `https://map.ir/vector/styles/main/mapir-xyz-style.json`,
                minZoom: this.props.minZoom || 12,
                center: this.props.center || [51.42047, 35.729054],
                tms: true,
                containerStyle: this.props.containerStyle || {
                    height: '100vh',
                    width: '100vw',
                },

                onStyleLoad: (map) => this.setAttribution(map),
            })
        );
    }
}

FvMapIr.Layer = Layer;
FvMapIr.Feature = Feature;
FvMapIr.Source = MapirSource;
FvMapIr.GeoJSONLayer = GeoJSONLayer;
FvMapIr.Image = Image;
FvMapIr.ZoomControl = ZoomControl;
FvMapIr.ScaleControl = ScaleControl;
FvMapIr.RotationControl = RotationControl;
FvMapIr.Popup = Popup;
FvMapIr.Marker = MarkerComponent;
FvMapIr.Cluster = Cluster;
FvMapIr.setToken = ReactMapboxGl;
FvMapIr.DrawControl = DrawControl;

export default FvMapIr;
