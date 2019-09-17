<template>
    <v-content>
        <v-container fluid>
            <router-view />
        </v-container>
    </v-content>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class Parallax extends Vue {}
</script>
