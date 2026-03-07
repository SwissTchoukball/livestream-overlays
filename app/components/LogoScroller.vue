<template>
  <div class="logo-scroller">
    <div class="logo-scroller__tag-line">Sponsors de la journée</div>
    <div class="logo-scroller__track">
      <template v-for="copy in 2" :key="copy">
        <img v-for="logo in logos" :key="`${copy}-${logo}`" :src="logo" class="logo-scroller__logo" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'ufo';

const logos = [
  withBase('/images/sponsor-logos/logo-baiutti.svg', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-bcf-fkb.svg', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-bio26.png', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-dany-sport.svg', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-fromagerie-arconciel.png', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-gfeller.png', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-groupe-e.svg', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-idl.svg', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-la-mobiliere.svg', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-loro.svg', useRuntimeConfig().app.baseURL),
  withBase('/images/sponsor-logos/logo-ville-fribourg.svg', useRuntimeConfig().app.baseURL),
];
</script>

<style scoped>
.logo-scroller {
  overflow: hidden;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
}

.logo-scroller__tag-line {
  text-align: center;
  margin-block: 0.5em;
  font-size: 3cqh;
  font-weight: 700;
}

.logo-scroller__track {
  display: flex;
  align-items: center;
  gap: 4cqw;
  width: max-content;
  margin-block: 5cqh;
  animation: scroll 20s linear infinite;
}

.logo-scroller__logo {
  max-width: 15.6cqw;
  max-height: 10.4cqw;
  flex-shrink: 0;
  object-fit: contain;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-135.5%);
  }
}
</style>
