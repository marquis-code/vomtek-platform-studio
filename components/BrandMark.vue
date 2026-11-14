<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'dark' | 'light'; compact?: boolean }>(), { tone: 'dark', compact: false })
</script>
<template>
  <NuxtLink to="/" class="group inline-flex items-center gap-2.5" aria-label="Vomtek Studio home">
    <span class="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg" :class="tone === 'dark' ? '' : 'bg-white p-0.5'">
      <img src="/images/vomtek-logo.png" alt="Vomtek" width="32" height="32" class="size-full object-cover" />
    </span>
    <span v-if="!compact" class="leading-none">
      <span class="block font-display text-[17px] font-extrabold tracking-[-.02em]" :class="tone === 'dark' ? 'text-ink' : 'text-bone'">VOMTEK</span>
      <span class="mt-1 block font-sans text-[8px] font-semibold uppercase tracking-[.12em]" :class="tone === 'dark' ? 'text-ink/55' : 'text-bone/55'">Operations studio</span>
    </span>
  </NuxtLink>
</template>
