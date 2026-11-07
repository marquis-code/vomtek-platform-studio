<script setup lang="ts">
import { Check, ChevronDown, Search, X } from 'lucide-vue-next'

type Option = string | number | { value: string | number; label: string; hint?: string; disabled?: boolean }
const props = withDefaults(defineProps<{
  modelValue?: string | number | null
  options: Option[]
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  compact?: boolean
  ariaLabel?: string
}>(), { modelValue: null, placeholder: 'Select an option', searchable: true, disabled: false, compact: false })

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()
const open = ref(false)
const query = ref('')
const active = ref(0)
const trigger = ref<HTMLButtonElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const position = reactive({ top: 0, left: 0, width: 240 })

const normalized = computed(() => props.options.map(o => typeof o === 'object' ? { value: o.value, label: o.label, hint: o.hint || '', disabled: !!o.disabled } : { value: o, label: String(o), hint: '', disabled: false }))
const selected = computed(() => normalized.value.find(o => String(o.value) === String(props.modelValue)))
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? normalized.value.filter(o => `${o.label} ${o.hint}`.toLowerCase().includes(q)) : normalized.value
})

function place() {
  if (!trigger.value) return
  const r = trigger.value.getBoundingClientRect()
  const width = Math.max(r.width, 220)
  const estimated = Math.min(320, window.innerHeight * .45)
  const below = r.bottom + 8
  const flip = below + estimated > window.innerHeight - 8
  position.width = width
  position.left = Math.min(Math.max(8, r.left), window.innerWidth - width - 8)
  position.top = flip ? Math.max(8, r.top - estimated - 8) : below
}
function openMenu() {
  if (props.disabled) return
  place(); open.value = true; query.value = ''
  active.value = Math.max(0, filtered.value.findIndex(o => String(o.value) === String(props.modelValue)))
  nextTick(() => { searchInput.value?.focus(); place() })
}
function close() { open.value = false; query.value = '' }
function choose(option: any) {
  if (option.disabled) return
  emit('update:modelValue', option.value); close(); nextTick(() => trigger.value?.focus())
}
function move(dir: number) {
  if (!filtered.value.length) return
  let next = active.value
  for (let i = 0; i < filtered.value.length; i++) {
    next = (next + dir + filtered.value.length) % filtered.value.length
    if (!filtered.value[next].disabled) { active.value = next; return }
  }
}
function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') { close(); trigger.value?.focus(); return }
  if (!open.value && ['ArrowDown', 'Enter', ' '].includes(event.key)) { event.preventDefault(); openMenu(); return }
  if (!open.value) return
  if (event.key === 'ArrowDown') { event.preventDefault(); move(1) }
  else if (event.key === 'ArrowUp') { event.preventDefault(); move(-1) }
  else if (event.key === 'Enter') { event.preventDefault(); const option = filtered.value[active.value]; if (option) choose(option) }
}
function onDocument(event: MouseEvent) {
  const target = event.target as Node
  if (menu.value?.contains(target) || trigger.value?.contains(target)) return
  close()
}
onMounted(() => document.addEventListener('mousedown', onDocument))
onUnmounted(() => document.removeEventListener('mousedown', onDocument))
function bindPosition() { window.addEventListener('resize', place); window.addEventListener('scroll', place, true) }
function unbindPosition() { window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true) }
watch(open, (value) => value ? bindPosition() : unbindPosition())
onUnmounted(unbindPosition)
</script>

<template>
  <div class="relative">
    <button ref="trigger" type="button" class="select-trigger" :class="[compact ? 'select-trigger-compact' : '', open ? 'select-trigger-open' : '']" :disabled="disabled" :aria-expanded="open" aria-haspopup="listbox" :aria-label="ariaLabel || placeholder" @click="open ? close() : openMenu()" @keydown="onKey">
      <span class="min-w-0 flex-1 truncate text-left" :class="selected ? '' : 'text-ink/40'">{{ selected?.label || placeholder }}</span>
      <X v-if="open" :size="compact ? 11 : 14" class="shrink-0 text-ink/35" @click.stop="close" />
      <ChevronDown v-else :size="compact ? 11 : 14" class="shrink-0 text-ink/40 transition-transform" :class="open ? 'rotate-180' : ''" />
    </button>
  </div>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 translate-y-1" leave-active-class="transition duration-100" leave-to-class="opacity-0 translate-y-1">
      <div v-if="open" ref="menu" class="fixed z-[120] overflow-hidden rounded-xl border border-ink/15 bg-white shadow-[0_24px_60px_-20px_rgba(7,16,14,.4)]" :style="{ top: `${position.top}px`, left: `${position.left}px`, width: `${position.width}px` }" role="listbox">
        <div v-if="searchable" class="border-b border-ink/10 p-2">
          <label class="flex items-center gap-2 rounded-lg bg-paper px-2.5 py-2"><Search :size="13" class="shrink-0 text-ink/35" /><input ref="searchInput" v-model="query" class="w-full bg-transparent text-[12px] outline-none placeholder:text-ink/35" placeholder="Search…" @keydown="onKey"></label>
        </div>
        <div class="max-h-64 overflow-auto p-1.5 scrollbar-thin">
          <button v-for="(option, i) in filtered" :key="String(option.value)" type="button" class="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors" :class="[i === active ? 'bg-paper' : 'hover:bg-paper/70', option.disabled ? 'cursor-not-allowed opacity-40' : '']" role="option" :aria-selected="String(option.value) === String(modelValue)" @mouseenter="active = i" @click="choose(option)">
            <span class="min-w-0 flex-1"><span class="block truncate text-[12.5px] font-medium text-ink">{{ option.label }}</span><span v-if="option.hint" class="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[.04em] text-ink/35">{{ option.hint }}</span></span>
            <Check v-if="String(option.value) === String(modelValue)" :size="13" class="shrink-0 text-vomtek" />
          </button>
          <div v-if="!filtered.length" class="px-3 py-6 text-center text-[11px] text-ink/40">No matching options</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.select-trigger { display:flex; width:100%; min-height:3rem; align-items:center; gap:.5rem; border:1px solid rgba(7,16,14,.16); border-radius:.7rem; background:#fff; padding:0 .85rem; font-size:.9rem; color:#07100e; outline:none; transition:border-color .2s,box-shadow .2s; }
.select-trigger:hover { border-color:rgba(7,16,14,.32); }
.select-trigger:focus, .select-trigger-open { border-color:#007d48; box-shadow:0 0 0 3px rgba(0,125,72,.12); }
.select-trigger:disabled { opacity:.5; cursor:not-allowed; }
.select-trigger-compact { min-height:2rem; border-radius:.4rem; padding:0 .55rem; font-family:"IBM Plex Mono",monospace; font-size:.62rem; letter-spacing:.06em; text-transform:uppercase; width:auto; }
</style>
