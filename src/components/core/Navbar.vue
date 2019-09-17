<template>
  <div id="navbar">
    <v-app-bar app dense dark scroll-off-screen>
      <v-app-bar-nav-icon @click="toggleNavigation()">
        <v-icon>reorder</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>InkoHX - Portfolio</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="navigation" bottom temporary fixed>
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-img src="@/assets/inkohx.png" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>InkoHX</v-list-item-title>
          <v-list-item-subtitle>ただの学生だよ！</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  private navigation: boolean = false;

  public hasNavigation (): boolean {
    return this.navigation
  }

  public toggleNavigation (): void {
    this.navigation = !this.navigation
  }
}
</script>
