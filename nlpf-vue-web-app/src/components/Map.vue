<template>
  <MglMap
    id="map"
    class="map fheight fwidth"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    @load="onMapLoaded"
  />
</template>


<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

export default {
  components: {
    MglMap,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoicHlyZCIsImEiOiJja3RteDh1aXMyOXdoMnBxbmFqMXFldXo0In0.liLIyYljrZI7V1Nw86cYXw",
      mapStyle: "mapbox://styles/pyrd/cktmw5jb6af1y17n744enhgwa", // "mapbox://styles/mapbox/streets-v11",
    };
  },

  created() {
    this.mapbox = Mapbox;
  },
  methods: {
    async onMapLoaded(event) {
      const asyncActions = event.component.actions;

      const newParams = await asyncActions.flyTo({
        center: [2.0, 46.0],
        zoom: 5,
        speed: 1,
      });
      console.log(newParams);
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