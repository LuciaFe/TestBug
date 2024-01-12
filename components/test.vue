<script setup lang="ts">
import type { test } from "./testProp";
defineProps<test>();
</script>

<template>
  <div>{{ title }}</div>
</template>
