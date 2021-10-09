<template>
  <MglMap
    id="map"
    ref="map"
    class="map fheight fwidth"
    :class="loading ? 'map-loading' : ''"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :zoom="1"
    :attributionControl="false"
    @load="onMapLoaded"
  >
    <!-- <MglAttributionControl /> -->
    <!-- <MglNavigationControl position="top-right" />
    <MglGeolocateControl position="top-right" />
    <MglNavigationControl position="top-right" />
    <MglScaleControl /> -->

    <!-- DEPARTEMENTS -->
    <MglGeojsonLayer
      type="fill"
      :layer="geoJsonLayer"
      layerId="departements"
      :source="getGeoJson"
      sourceId="departements"
      @click="handleClickDepartement"
    />
    <MglGeojsonLayer
      type="line"
      :layer="geoJsonLayerContour"
      layerId="departements-contours"
      :source="getGeoJson"
      sourceId="departements"
    />
    <MglGeojsonLayer
      type="symbols"
      :layer="departementNameLayer"
      layerId="departementsName"
      :source="getGeoJson"
      sourceId="departements"
    />

    <!-- COMMUNES -->
    <MglGeojsonLayer
      v-if="citygeojson != null"
      type="symbols"
      :layer="communeNameLayer"
      layerId="communeName"
      :source="getCommunesGeoJson"
      sourceId="communes"
    />
    <MglGeojsonLayer
      v-if="citygeojson != null"
      type="fill"
      :layer="geoJsonCommunesLayer"
      layerId="communes"
      :source="getCommunesGeoJson"
      sourceId="communes"
      @click="handleClickCity"
      @onMouseMove="onMouseMove"
      @onMouseLeave="onMouseLeave"
    />
    <MglGeojsonLayer
      type="line"
      :layer="geoJsonCommunesContourLayer"
      layerId="communes-contours"
      :source="getCommunesGeoJson"
      sourceId="communes"
    />
  </MglMap>
</template>


<script>
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl,
  MglGeojsonLayer,
  MglPopup,
} from "vue-mapbox";

import { fillLayerPaint, contoursPaint } from "../assets/map.styles";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglAttributionControl,
    MglFullscreenControl,
    MglScaleControl,
    MglGeojsonLayer,
    MglPopup,
  },
  props: {
    departementList: Object,
    communesList: Object,
    selectedDepartement: String,
    selectedComunes: String,
    loading: Boolean,
  },
  data() {
    return {
      geoJsonLayer: {
        id: "departements",
        type: "fill",
        source: "departements",
        layout: {},
        paint: fillLayerPaint,
      },
      geoJsonLayerContour: {
        id: "departements-contours",
        source: "departements",
        type: "line",
        paint: contoursPaint,
      },
      geoJsonCommunesLayer: {
        id: "communes",
        type: "fill",
        source: "communes",
        layout: {},
        paint: fillLayerPaint,
      },
      geoJsonCommunesContourLayer: {
        id: "communes-contour",
        type: "line",
        source: "communes",
        layout: {},
        paint: contoursPaint,
      },
      departementNameLayer: {
        id: "departementsName",
        type: "symbol",
        source: "departements",
        minzoom: 5,
        maxzoom: 8,
        paint: {
          "text-color": "#000",
        },
        layout: {
          "text-field": ["get", "code"],
          "text-variable-anchor": ["top", "bottom", "left", "right"],
          "text-radial-offset": 0.5,
          "text-justify": "auto",
          "icon-image": ["get", "icon"],
        },
      },
      communeNameLayer: {
        id: "communeName",
        type: "symbol",
        source: "communes",
        minzoom: 7,
        maxzoom: 15,
        paint: {
          "text-color": "#000",
        },
        layout: {
          "text-field": ["get", "nom"],
          "text-variable-anchor": ["top", "bottom", "left", "right"],
          "text-radial-offset": 0.5,
          "text-justify": "auto",
          "icon-image": ["get", "icon"],
        },
      },
      hoveredStateId: null,
      popUpCoordinates: [null, null],
      accessToken:
        "pk.eyJ1IjoicHlyZCIsImEiOiJja3RteDh1aXMyOXdoMnBxbmFqMXFldXo0In0.liLIyYljrZI7V1Nw86cYXw",
      mapStyle: "mapbox://styles/pyrd/cktmw5jb6af1y17n744enhgwa", // "mapbox://styles/mapbox/streets-v11",
      geojson: null,
      citygeojson: null,
    };
  },
  created() {
    this.mapbox = Mapbox;
  },
  methods: {
    showName(e) {
      console.log(e.mapboxEvent.features[0].properties);
    },
    mapInitialized(map) {
      this.map = map;
    },
    async onMapLoaded({ map, component }) {
      this.map = map;
      const asyncActions = component.actions;
      const newParams = await asyncActions.flyTo({
        center: [2.0, 46.0],
        zoom: 5,
        speed: 1,
      });
    },
    handleSelectDepartement() {},
    handleClickDepartement(e) {
      e.mapboxEvent.originalEvent.stopPropagation();
      const { code } = e.mapboxEvent.features[0].properties;
      this.$emit("selectDepartement", { input: code });

      const coord = e.mapboxEvent.lngLat;
      console.log(coord);
      this.zoomOnElement(coord.lng, coord.lat, 7);
    },
    handleClickCity(e) {
      e.mapboxEvent.originalEvent.stopPropagation();
      console.log(e.mapboxEvent.features[0].properties);
      const { code } = e.mapboxEvent.features[0].properties;
      this.$emit("selectCity", { input: code });

      const coord = e.mapboxEvent.lngLat;
      this.zoomOnElement(coord.lng, coord.lat, 11);
    },
    zoomOnElement(lng, lat, zoom) {
      console.log(`Zomming on ${lng}, ${lat}, zoom: ${zoom}`);
      this.map.flyTo({
        center: [lng, lat],
        zoom: zoom,
        speed: 1,
      });
    },
    onMouseMove(event, source) {
      const canvas = map.getCanvas();
      canvas.style.cursor = "pointer";

      if (event.features.length > 0) {
        if (hoveredStateId !== null) {
          hoverableSources.map(function (source) {
            map.setFeatureState(
              { source, id: hoveredStateId },
              { hover: false }
            ); // clean all sources to prevent error
          });
        }
        hoveredStateId = event.features[0].id;
        map.setFeatureState({ source, id: hoveredStateId }, { hover: true });
      }
    },

    onMouseLeave(event, source) {
      const canvas = map.getCanvas();
      canvas.style.cursor = "";

      if (hoveredStateId !== null) {
        map.setFeatureState({ source, id: hoveredStateId }, { hover: false });
      }
    },
  },
  computed: {
    getGeoJson() {
      return {
        type: "geojson",
        data: {
          ...this.geojson,
        },
      };
    },
    getCommunesGeoJson() {
      return {
        type: "geojson",
        data: {
          ...this.citygeojson,
        },
      };
    },
  },
  beforeMount() {
    this.geojson = this.departementList;
  },
  watch: {
    departementList(newVal, old) {
      console.log("New departement layer");
      this.geojson = newVal;
    },
    communesList(newVal, old) {
      console.log("New commune layer");
      this.citygeojson = newVal;
    },
  },
};
</script>
<style lang="scss" >
#map {
  display: flex;
  flex: 1;
}
.mapboxgl-map {
  display: flex;
  flex: 1;
}
.map-container {
  position: relative;
  display: flex;
  flex-direction: column;
}

.map-loading {
  cursor: wait;
}
.mapboxgl-canvas-container {
  cursor: none;
}
.mapboxgl-canvas-container.mapboxgl-interactive {
  cursor: unset;
}
</style>