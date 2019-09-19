<template>
  <v-app>
    <Navbar />
    <Parallax />
    <Content />
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Content from '@/components/core/Content.vue'
import Parallax from '@/components/core/Parallax.vue'
import Navbar from '@/components/core/Navbar.vue'
import Footer from '@/components/core/Footer.vue'

@Component({
  components: {
    Parallax,
    Content,
    Navbar,
    Footer
  }
})
export default class App extends Vue {

}
</script>
