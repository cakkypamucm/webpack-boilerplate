<template>
    <layout-default>
        <h1>Страница не найдена</h1>
        <router-link :to="{ name: 'index' }">Перейти на главную</router-link>
    </layout-default>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import LayoutDefault from "@/layouts/default.vue";
</script>
