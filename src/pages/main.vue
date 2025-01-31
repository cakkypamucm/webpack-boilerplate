<template>
    <layout-default>
        <h1 class="greeting">{{ greeting }}</h1>
    </layout-default>
</template>

<script setup lang="ts">
import LayoutDefault from "@/layouts/default.vue";

const greeting = "Hello, World";
</script>

<style lang="scss" scoped>
/* eslint-disable-next-line vue-scoped-css/require-selector-used-inside, vue-scoped-css/no-unused-selector */
.main {
    display: flex;
    height: 100dvh;
    margin: 0;
}

.greeting {
    margin: auto;
}
</style>
