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
      :source.sync="getGeoJson"
      sourceId="departements"
      @click="handleClickDepartement"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    />
    <MglGeojsonLayer
      type="line"
      :layer="geoJsonLayerContour"
      layerId="departements-contours"
      :source.sync="getGeoJson"
      sourceId="departements"
    />
    <MglGeojsonLayer
      type="symbols"
      :layer="departementNameLayer"
      layerId="departementsName"
      :source.sync="getGeoJson"
      sourceId="departements"
    />

    <!-- COMMUNES -->
    <MglGeojsonLayer
      v-if="citygeojson != null"
      type="symbols"
      :layer="communeNameLayer"
      layerId="communeName"
      :source.sync="getCommunesGeoJson"
      sourceId="communes"
    />
    <MglGeojsonLayer
      v-if="citygeojson != null"
      type="fill"
      :layer="geoJsonCommunesLayer"
      layerId="communes"
      :source.sync="getCommunesGeoJson"
      sourceId="communes"
      @click="handleClickCity"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    />
    <MglGeojsonLayer
      type="line"
      :layer="geoJsonCommunesContourLayer"
      layerId="communes-contours"
      :source.sync="getCommunesGeoJson"
      sourceId="communes"
    />

    <!-- SECTIONS -->
    <MglGeojsonLayer
      v-if="sectionsList != null"
      type="fill"
      :layer="geoJsonSectionsLayer"
      layerId="sections"
      :source.sync="getSectionsGeoJson"
      sourceId="sections"
      @click="handleClickSections"
      @mousemove="onMouseMove2"
      @mouseleave="onMouseLeave2"
    />
    <MglGeojsonLayer
      type="line"
      :layer="geoJsonSectionsContourLayer"
      layerId="sections-contours"
      :source.sync="getSectionsGeoJson"
      sourceId="sections"
    />
    <MglGeojsonLayer
      v-if="sectionsList != null"
      type="symbols"
      :layer="sectionsNameLayer"
      layerId="sectionsName"
      :source.sync="getSectionsGeoJson"
      sourceId="sections"
    />
    <!-- PARCELLES -->
    <MglGeojsonLayer
      v-if="parcellesList != null"
      type="fill"
      :layer="geoJsonParcellesLayer"
      layerId="parcelles"
      :source.sync="getParcellesGeoJson"
      sourceId="parcelles"
      @click="handleClickParcelles"
      @mousemove="onMouseMove2"
      @mouseleave="onMouseLeave2"
    />
    <MglGeojsonLayer
      type="line"
      :layer="geoJsonParcellesContourLayer"
      layerId="parcelles-contour"
      :source.sync="getParcellesGeoJson"
      sourceId="parcelles"
    />
    <!-- <MglGeojsonLayer
      v-if="parcellesList != null"
      type="symbols"
      :layer="parcellesNameLayer"
      layerId="parcellesName"
      :source="getParcellesGeoJson"
      sourceId="parcelles"
    /> -->
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
    sectionsList: Object,
    parcellesList: Object,
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
      geoJsonSectionsLayer: {
        id: "sections",
        type: "fill",
        source: "sections",
        layout: {},
        paint: fillLayerPaint,
      },
      geoJsonSectionsContourLayer: {
        id: "sections-contour",
        type: "line",
        source: "sections",
        layout: {},
        paint: contoursPaint,
      },
      geoJsonParcellesLayer: {
        id: "parcelles",
        type: "fill",
        source: "parcelles",
        layout: {},
        paint: fillLayerPaint,
      },
      geoJsonParcellesContourLayer: {
        id: "parcelles-contour",
        type: "line",
        source: "parcelles",
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
      sectionsNameLayer: {
        id: "sectionsName",
        type: "symbol",
        source: "sections",
        minzoom: 7,
        maxzoom: 15,
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
      hoveredStateId2: null,
      hoveredStateId2: null,

      popUpCoordinates: [null, null],
      accessToken:
        "pk.eyJ1IjoicHlyZCIsImEiOiJja3RteDh1aXMyOXdoMnBxbmFqMXFldXo0In0.liLIyYljrZI7V1Nw86cYXw",
      mapStyle: "mapbox://styles/pyrd/cktmw5jb6af1y17n744enhgwa", // "mapbox://styles/mapbox/streets-v11",
      geojson: null,
      citygeojson: null,
      sectionsgeojson: null,
      parcellesgeojson: null,
      selectedDepartementId: null,
      selectedCommune: null,
      selectedSection: null,
      hoverableSources: ["departements", "communes"],
      hoverableSources2: ["sections", "parcelles"],
      selectedParcelle: null,
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
      if (
        this.selectedDepartementId == null ||
        this.selectedDepartementId != code
      ) {
        console.log("HANDLECLICK > DEPARTEMENTS");
        this.selectedDepartementId = code;
        this.$emit("selectDepartement", { input: code });
        const coord = e.mapboxEvent.lngLat;
        this.zoomOnElement(coord.lng, coord.lat, 9);
      }
    },
    handleClickCity(e) {
      e.mapboxEvent.originalEvent.stopPropagation();
      const { code } = e.mapboxEvent.features[0].properties;
      if (this.selectedCommune == null || this.selectedCommune != code) {
        console.log("HANDLECLICK > CITY");
        this.selectedCommune = code;

        // console.log(e.mapboxEvent.features[0].properties);
        this.$emit("selectCity", { input: code });

        const coord = e.mapboxEvent.lngLat;
        this.zoomOnElement(coord.lng, coord.lat, 13);
      }
    },
    handleClickSections(e) {
      e.mapboxEvent.originalEvent.stopPropagation();
      // console.log(e.mapboxEvent.features[0].properties);
      const { commune, code, id } = e.mapboxEvent.features[0].properties;
      if (
        this.selectedSection == null ||
        this.selectedSection != id + commune
      ) {
        console.log("HANDLECLICK > SECTIONS");
        this.selectedSection = id + commune;
        this.$emit("selectSection", { input: commune, sectionId: id });
        const coord = e.mapboxEvent.lngLat;
        this.zoomOnElement(coord.lng, coord.lat, 16);
      }
    },
    handleClickParcelles(e) {
      console.log("HANDLECLICK > PARCELLES");
      e.mapboxEvent.originalEvent.stopPropagation();
      console.log(e.mapboxEvent.features[0].properties);
      const { commune, code } = e.mapboxEvent.features[0].properties;
      this.$emit("selectParcelles", { input: commune });
      const coord = e.mapboxEvent.lngLat;
      // this.zoomOnElement(coord.lng, coord.lat, 19);
    },
    zoomOnElement(lng, lat, zoom) {
      // console.log(`Zomming on ${lng}, ${lat}, zoom: ${zoom}`);
      this.map.flyTo({
        center: [lng, lat],
        zoom: zoom,
        speed: 1,
      });
    },
    onMouseMove(event) {
      const { mapboxEvent, layerId } = event;
      const canvas = this.map.getCanvas();
      console.log(
        "MouseMove",
        layerId,
        mapboxEvent.features[0].source,
        this.hoveredStateId2
      );
      canvas.style.cursor = "pointer";
      if (mapboxEvent.features.length > 0) {
        if (this.hoveredStateId2 != null) {
          for (let source of this.hoverableSources) {
            this.map.setFeatureState(
              { source, id: this.hoveredStateId2 },
              { hover: false }
            );
          }
        }
        this.hoveredStateId2 = mapboxEvent.features[0].id;
        this.map.setFeatureState(
          { source: layerId, id: this.hoveredStateId2 },
          { hover: true }
        );
      }
    },

    onMouseLeave(event) {
      const { layerId } = event;

      const canvas = this.map.getCanvas();
      canvas.style.cursor = "";
      if (this.hoveredStateId2 != null) {
        this.map.setFeatureState(
          { source: layerId, id: this.hoveredStateId2 },
          { hover: false }
        );
      }
    },
    onMouseMove2(event) {
      const { mapboxEvent, layerId } = event;
      const canvas = this.map.getCanvas();
      console.log(
        "MouseMove",
        layerId,
        mapboxEvent.features[0].source,
        this.hoveredStateId2
      );
      canvas.style.cursor = "pointer";
      if (mapboxEvent.features.length > 0) {
        if (this.hoveredStateId2 != null) {
          for (let source of [
            ...this.hoverableSources,
            ...this.hoverableSources2,
          ]) {
            this.map.setFeatureState(
              { source, id: this.hoveredStateId2 },
              { hover: false }
            );
          }
        }
        this.hoveredStateId2 = mapboxEvent.features[0].id;
        this.map.setFeatureState(
          { source: layerId, id: this.hoveredStateId2 },
          { hover: true }
        );
      }
    },

    onMouseLeave2(event) {
      const { layerId } = event;

      const canvas = this.map.getCanvas();
      canvas.style.cursor = "";
      if (this.hoveredStateId2 != null) {
        this.map.setFeatureState(
          { source: layerId, id: this.hoveredStateId2 },
          { hover: false }
        );
      }
    },
  },
  computed: {
    getGeoJson() {
      return {
        type: "geojson",
        generateId: true,
        data: {
          ...this.geojson,
        },
      };
    },
    getCommunesGeoJson() {
      return {
        type: "geojson",
        generateId: true,
        data: {
          ...this.citygeojson,
        },
      };
    },
    getSectionsGeoJson() {
      return {
        type: "geojson",
        generateId: true,
        data: {
          ...this.sectionsgeojson,
        },
      };
    },
    getParcellesGeoJson() {
      return {
        type: "geojson",
        generateId: true,
        data: {
          ...this.parcellesgeojson,
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
    sectionsList(newVal, old) {
      console.log("New section layer");
      this.sectionsgeojson = newVal;
    },
    parcellesList(newVal, old) {
      console.log("New parcelles layer");
      this.parcellesgeojson = newVal;
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