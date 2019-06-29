<template>
  <div id="home">
    <section>
      <v-parallax src="https://i.imgur.com/7BzjiR8.png" height="700">
        <v-layout
          justify-center
          align-center
          column
        >
          <v-avatar size="256px">
            <img src="https://avatars1.githubusercontent.com/u/33122816?s=460&v=4">
          </v-avatar>
          <br>
          <vue-typer
            class="display-1 text-xs-center mb-2"
            :text="texts"
            repeat="Infinity"
            shuffle="false"
            initial-action="erasing"
            pre-type-delay="70"
            type-delay="70"
            pre-erase-delay="2000"
            erase-delay="300"
            erase-style="select-all"
            erase-on-complete="false"
            caret-animation="blink"
          />
        </v-layout>
      </v-parallax>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      texts: ['InkoHX is Developer.']
    }
  }
}
</script>

<style>
.vue-typer .custom.char {
  color: #fff;
}

.vue-typer .custom.char.selected {
  background-color: #264F78;
}

.vue-typer .custom.caret {
  width: 3px;
  background-color: #3F51B5;
}
</style>
