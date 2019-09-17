<template>
  <v-app>
    <Navbar />
    <Parallax />
    <Content />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Content from '@/components/core/Content.vue'
import Parallax from '@/components/core/Parallax.vue'
import Navbar from '@/components/core/Navbar.vue'

@Component({
  components: {
    Parallax,
    Content,
    Navbar
  }
})
export default class App extends Vue {

}
</script>
