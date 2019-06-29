<template>
  <v-app dark>
    <Toolbar />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Toolbar: () => import('~/components/Toolbar.vue')
  }
})

export default class Default extends Vue {}
</script>
