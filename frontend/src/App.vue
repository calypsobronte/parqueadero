<template>
  <v-app>
    <v-main>
      <Data />
    </v-main>
  </v-app>
</template>

<script>
import Data from "./views/Data";
export default {
  name: 'App',
  components: {
    Data,
  },
  data: () => ({
    //
  }),
};
</script>
