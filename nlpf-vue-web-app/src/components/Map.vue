<template>
  <MglMap
    id="map"
    class="map fheight fwidth"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :zoom="4"
    :center="[2.0, 46.0]"
    :attributionControl="false"
    @load="onMapLoaded"
  >
    <!-- <MglAttributionControl /> -->
    <!-- <MglNavigationControl position="top-right" />
    <MglGeolocateControl position="top-right" />
    <MglNavigationControl position="top-right" />
    <MglScaleControl /> -->
    <MglGeojsonLayer
      v-if="citygeojson != null"
      type="fill"
      :layer="geoJsonCommunesLayer"
      layerId="secondary"
      :source="getCommunesGeoJson"
      sourceId="secondary"
      @click="handleClick"
    />
    <MglGeojsonLayer
      type="fill"
      :layer="geoJsonLayer"
      layerId="maine"
      :source="getGeoJson"
      sourceId="maine"
      @click="handleClick"
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
} from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglAttributionControl,
    MglFullscreenControl,
    MglScaleControl,
    MglGeojsonLayer,
  },
  props: {
    departementList: Object,
    communesList: Object,
    selectedDepartement: String,
    selectedComunes: String,
  },
  data() {
    return {
      geoJsonLayer: {
        id: "maine",
        type: "fill",
        source: "maine", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.5,
        },
      },
      geoJsonCommunesLayer: {
        id: "secondary",
        type: "fill",
        source: "secondary", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#ff80ff", // blue color fill
          "fill-opacity": 0.5,
        },
      },

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
    async onMapLoaded(event) {
      // const asyncActions = event.component.actions;
      // const newParams = await asyncActions.flyTo({
      //   center: [2.0, 46.0],
      //   zoom: 5,
      //   speed: 1,
      // });
      // console.log(newParams);
    },
    handleClick(e) {
      console.log(JSON.stringify(e));
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
      this.geojson = newVal;
    },
    communesList(newVal, old) {
      this.citygeojson = newVal;
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>