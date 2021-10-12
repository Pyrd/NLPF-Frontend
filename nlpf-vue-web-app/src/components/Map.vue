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
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
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
      :layer="geoJsonParcellesUnmutatedLayer"
      layerId="parcellesUnmutated"
      :source.sync="getUnMutatedParcellesGeoJson"
      sourceId="parcellesUnmutated"
      @click="handleClickParcelles"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    />
    <MglGeojsonLayer
      v-if="parcellesList != null"
      type="line"
      :layer="geoJsonParcellesMutatedContourLayer"
      layerId="parcellesMutated-contour"
      :source.sync="getParcellesGeoJson"
      sourceId="parcellesMutated"
    />
    <MglGeojsonLayer
      v-if="parcellesList != null"
      type="fill"
      :layer="geoJsonParcellesMutatedLayer"
      layerId="parcellesMutated"
      :source.sync="getMutatedParcellesGeoJson"
      sourceId="parcellesMutated"
      @click="handleClickParcelles"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    />
    <MglGeojsonLayer
      v-if="parcellesList != null"
      type="line"
      :layer="geoJsonParcellesUnmutatedContourLayer"
      layerId="parcellesUnmutated-contour"
      :source.sync="getParcellesGeoJson"
      sourceId="parcellesUnmutated"
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

import {
  fillLayerPaint,
  fillLayerPaint2,
  contoursPaint,
  mutationColor,
  mutationSelectedColor,
  mutationLieesColor,
  unmutatedColor,
  borderColor,
} from "../assets/map.styles";

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
    results: Array,
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
        paint: fillLayerPaint2,
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
        paint: fillLayerPaint2,
      },
      geoJsonParcellesContourLayer: {
        id: "parcelles-contour",
        type: "line",
        source: "parcelles",
        layout: {},
        paint: contoursPaint,
      },
      geoJsonParcellesUnmutatedLayer: {
        id: "parcellesUnmutated",
        type: "fill",
        source: "parcellesUnmutated",
        layout: {},
        paint: {
          "fill-color": unmutatedColor,
          "fill-opacity": 0.05,
        },
      },
      geoJsonParcellesUnmutatedContourLayer: {
        id: "parcellesUnmutated-contour",
        type: "line",
        source: "parcellesUnmutated",
        layout: {},
        paint: contoursPaint,
      },
      geoJsonParcellesMutatedLayer: {
        id: "parcellesMutated",
        type: "fill",
        source: "parcellesMutated",
        layout: {},
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            mutationSelectedColor,
            mutationColor,
          ],
          "fill-outline-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            mutationLieesColor,
            borderColor,
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            ["boolean", ["feature-state", "selected"], false],
            0.8,
            0.4,
          ],
        },
      },
      geoJsonParcellesMutatedContourLayer: {
        id: "parcellesMutated-contour",
        type: "line",
        source: "parcellesMutated",
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
      hoveredLayerId: null,
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
      selectedStateId: null,
      hoverableSources: ["departements", "communes"],
      hoverableSources2: [
        "departements",
        "communes",
        "sections",
        "parcellesMutated",
        "parcellesUnmutated",
      ],
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
      console.log(e.mapboxEvent.features[0].properties);
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
      console.log(JSON.stringify(e.mapboxEvent.features[0]));

      this.map.setFeatureState(
        { source: "parcellesMutated", id: this.selectedStateId },
        { selected: false }
      );

      this.selectedStateId = e.mapboxEvent.features[0].id;
      this.map.setFeatureState(
        { source: "parcellesMutated", id: this.selectedStateId },
        { selected: true }
      );

      const { commune, sectionId } = e.mapboxEvent.features[0].properties;
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
      event.mapboxEvent.originalEvent.stopPropagation();

      const { mapboxEvent, layerId } = event;
      const canvas = this.map.getCanvas();
      canvas.style.cursor = "pointer";
      // console.log(">>>", layerId);
      try {
        if (mapboxEvent.features.length > 0) {
          if (this.hoveredStateId != null) {
            //  layerId === "communes" &&
            // (this.hoveredLayerId == "sections" ||
            //   this.hoveredLayerId == "parcelles")
            if (
              layerId == "communes" &&
              ["sections", "parcellesUnmutated", "parcellesMutated"].includes(
                this.hoveredLayerId
              )
            ) {
              for (let source of this.hoverableSources) {
                this.map.setFeatureState(
                  { source, id: this.hoveredStateId },
                  { hover: false }
                );
              }
            } else {
              for (let source of this.hoverableSources2) {
                this.map.setFeatureState(
                  { source, id: this.hoveredStateId },
                  { hover: false }
                );
              }
            }
          }
          if (
            layerId != "communes" ||
            (layerId == "communes" &&
              ["sections", "parcellesUnmutated", "parcellesMutated"].includes(
                this.hoveredLayerId
              ) == false)
          ) {
            this.hoveredStateId = mapboxEvent.features[0].id;
            this.hoveredLayerId = layerId;
            this.map.setFeatureState(
              { source: layerId, id: this.hoveredStateId },
              { hover: true }
            );
          }
        }
      } catch (err) {}
    },

    onMouseLeave(event) {
      event.mapboxEvent.originalEvent.stopPropagation();
      const { layerId } = event;

      const canvas = this.map.getCanvas();
      canvas.style.cursor = "";
      if (this.hoveredStateId != null) {
        this.map.setFeatureState(
          { source: layerId, id: this.hoveredStateId },
          { hover: false }
        );
      }
    },
    isMutatedBien(id) {
      for (let bien of this.results) {
        if (bien.id_parcelle === id) {
          console.log("IsMutatedbien TRUE>", id);
          return true;
        }
      }
      // console.log("IsMutatedbien FALSE>", id);

      return false;
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
    getUnMutatedParcellesGeoJson() {
      if (!this.parcellesgeojson) {
        return {
          type: "geojson",
          generateId: true,
          data: {},
        };
      }
      const features = this.parcellesgeojson.features;
      const unmutated = features.filter((e) => {
        return !this.isMutatedBien(e.properties.id);
      });
      // console.log("get unmutated", unmutated);
      return {
        type: "geojson",
        generateId: true,
        data: {
          ...this.parcellesgeojson,
          features: unmutated,
        },
      };
    },
    getMutatedParcellesGeoJson() {
      if (!this.parcellesgeojson) {
        return {
          type: "geojson",
          generateId: true,
          data: {},
        };
      }
      const features = this.parcellesgeojson.features;
      const mutated = features.filter((e) =>
        this.isMutatedBien(e.properties.id)
      );
      // console.log("get mutated", mutated);

      return {
        type: "geojson",
        generateId: true,
        data: {
          ...this.parcellesgeojson,
          features: mutated,
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