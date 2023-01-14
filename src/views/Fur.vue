<script setup>
import { onMounted, computed } from "vue";
import { useTraitsStore } from "../store/traits";
const store = useTraitsStore();
const getTraits = computed(() => {
  return store.traits;
});

onMounted(() => {
  store.fetchTraits();
});
</script>

<template>
  <section>
    <h1>Furs</h1>
    <div>
      <TraitComparison :traits="getTraits" type="Fur"></TraitComparison>
    </div>
  </section>
</template>
