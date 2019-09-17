<template>
  <section>
    <v-parallax src="@/assets/coding.png" height="700">
      <v-layout justify-center align-center column>
        <v-avatar size="256">
          <img src="@/assets/inkohx.png" />
        </v-avatar>
        <br />
        <h1><vue-typer text="Hello, My name is InkoHX!" /></h1>
      </v-layout>
    </v-parallax>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Parallax extends Vue {}
</script>

<style lang="scss">
.vue-typer .custom.char.typed {
  color: white;
}

.vue-typer .custom.caret {
  display: none;
}

h1 {
  font-family: "Courier New", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
