<script setup lang="ts">
const props = defineProps<{ status: string }>()
const tone = computed(() => {
  const s = props.status?.toLowerCase()
  if (['active', 'complete', 'paid', 'fulfilled', 'released', 'acceptable', 'low', 'verified', 'awarded'].includes(s)) return 'bg-mint/20 text-mint-deep'
  if (['critical', 'high', 'failed', 'cancelled'].includes(s)) return 'bg-signal/15 text-signal-deep'
  if (['pending', 'processing', 'bidding', 'reserved', 'partially_released', 'review'].includes(s)) return 'bg-[#b8d7b2]/25 text-[#245628]'
  return 'bg-ink/10 text-ink/55'
})
</script>
<template>
  <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[.07em]" :class="tone">{{ status }}</span>
</template>
