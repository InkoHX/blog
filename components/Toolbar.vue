<template>
  <div>
    <v-navigation-drawer
      v-model="toggle"
      fixed
      app
      absolute
      temporary
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            InkoHX - Portfolio
          </v-list-tile-title>
        </v-list-tile>

        <v-divider />

        <v-list-tile v-for="(item, key) in items" :key="key" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app flat>
      <v-toolbar-side-icon @click="toggle = !toggle" />
      <v-toolbar-title>InkoHX - Portfolio</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Toolbar extends Vue {
  toggle: Boolean = false

  items: Array<Object> = [
    {
      icon: 'home',
      title: 'Home',
      to: '/'
    }
  ]
}
</script>
