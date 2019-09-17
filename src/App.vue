<template>
  <v-app>
    <Navbar />
    <Parallax />
    <Content />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Content from '@/components/core/Content'
import Footer from '@/components/core/Footer'
import Parallax from '@/components/core/Parallax'
import Navbar from '@/components/core/Navbar'

@Component({
  components: {
    Parallax,
    Content,
    Footer,
    Navbar
  }
})
export default class App extends Vue {

}
</script>
