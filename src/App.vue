<template>
  <v-app id="app">
    <Navbar />
    <Parallax />
    <Content />
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const Content = () => import('@/components/core/Content.vue')
const Parallax = () => import('@/components/core/Parallax.vue')
const Navbar = () => import('@/components/core/Navbar.vue')
const Footer = () => import('@/components/core/Footer.vue')

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
