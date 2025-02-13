<template>
    <layout-default>
        <h1>Page not found</h1>
        <router-link :to="{ name: 'main' }">Go to homepage</router-link>
    </layout-default>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import LayoutDefault from "@/layouts/default.vue";
</script>
