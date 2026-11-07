<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'dark' | 'light'; compact?: boolean }>(), { tone: 'dark', compact: false })
</script>
<template>
  <NuxtLink to="/" class="group inline-flex items-center gap-3" aria-label="Vomtek home">
    <span class="relative flex size-9 items-center justify-center rounded-[10px] border" :class="tone === 'dark' ? 'border-ink/20 bg-ink text-mint' : 'border-bone/25 bg-bone/5 text-mint'">
      <svg viewBox="0 0 32 32" class="size-5" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="9.5" stroke="currentColor" stroke-width="2.2" />
        <path d="M16 6.5v6M16 19.5v6M6.5 16h5M20.5 16h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
        <circle cx="16" cy="16" r="2.6" fill="currentColor" />
      </svg>
    </span>
    <span v-if="!compact" class="leading-none">
      <span class="block font-display text-[18px] font-semibold tracking-[-0.04em]" :class="tone === 'dark' ? 'text-ink' : 'text-bone'">VOMTEK</span>
      <span class="mt-1 block font-mono text-[8px] uppercase tracking-[0.22em]" :class="tone === 'dark' ? 'text-ink/45' : 'text-bone/45'">Pipeline intelligence</span>
    </span>
  </NuxtLink>
</template>
