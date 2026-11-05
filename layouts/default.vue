<script setup lang="ts">
import { Activity, ArrowUpRight, Boxes, Building2, ClipboardList, CreditCard, Gauge, Handshake, Home, LayoutDashboard, LogOut, Menu, Package, Radar, Settings, Truck, Users, X } from 'lucide-vue-next'
const api = useApi(); const router = useRouter(); const route = useRoute(); const open = ref(false); const ready = ref(false)
const nav = [
  { label: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Customers', to: '/customers', icon: Building2 },
  { label: 'Orders', to: '/orders', icon: Package },
  { label: 'Rentals', to: '/rentals', icon: Truck },
  { label: 'Reports', to: '/reports', icon: Radar },
  { label: 'Home jobs', to: '/jobs', icon: Home },
  { label: 'Catalog', to: '/catalog', icon: Boxes },
  { label: 'Subscriptions', to: '/subscriptions', icon: CreditCard },
  { label: 'Partners', to: '/partners', icon: Handshake },
  { label: 'Leads', to: '/leads', icon: Users },
  { label: 'Settings', to: '/settings', icon: Settings },
]
const title = computed(() => nav.find(n => n.to === route.path)?.label || 'Studio')
onMounted(async () => {
  api.init()
  if (route.path === '/login') { ready.value = true; return }
  if (!api.token.value) { router.replace('/login'); return }
  try { const me = await api.request<any>('/auth/me'); api.user.value = me.user; if (!['owner','admin','ops'].includes(me.user.role)) router.replace('/login'); ready.value = true }
  catch { api.clear(); router.replace('/login') }
})
watch(() => route.fullPath, () => { open.value = false })
function logout(){api.clear();router.push('/login')}
</script>
<template>
  <div class="min-h-screen bg-paper lg:grid lg:grid-cols-[236px_1fr]">
    <aside class="fixed inset-y-0 left-0 z-50 flex w-[236px] -translate-x-full flex-col border-r border-bone/10 bg-ink text-bone transition-transform lg:static lg:translate-x-0" :class="open ? 'translate-x-0' : ''">
      <div class="flex h-[64px] items-center justify-between border-b border-bone/10 px-5"><BrandMark tone="light" /><button class="lg:hidden" @click="open=false"><X :size="17"/></button></div>
      <div class="mx-3 mt-4 rounded-lg border border-bone/10 bg-bone/5 p-3"><p class="font-mono text-[7.5px] uppercase tracking-[.1em] text-bone/35">Operations console</p><p class="mt-1 text-[11.5px] font-medium">LineSight Studio</p><span class="mt-2 flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[.08em] text-mint"><span class="size-1.5 rounded-full bg-mint" /> All systems live</span></div>
      <nav class="mt-4 flex-1 space-y-0.5 overflow-y-auto px-2.5 pb-4">
        <NuxtLink v-for="n in nav" :key="n.to" :to="n.to" class="flex items-center gap-3 rounded-lg px-3 py-2 text-[11.5px] text-bone/50 transition-colors hover:bg-bone/5 hover:text-bone" active-class="!bg-bone/10 !text-bone"><component :is="n.icon" :size="14" :stroke-width="1.7"/>{{ n.label }}</NuxtLink>
      </nav>
      <div class="border-t border-bone/10 p-3"><div class="flex items-center gap-2 rounded-lg px-2 py-2"><span class="flex size-7 items-center justify-center rounded-full bg-mint text-[9px] font-mono text-ink">{{ (api.user.value?.name || 'LS').slice(0,2).toUpperCase() }}</span><div class="min-w-0 flex-1"><p class="truncate text-[10.5px]">{{ api.user.value?.name }}</p><p class="font-mono text-[7px] uppercase text-bone/30">{{ api.user.value?.role }}</p></div><button class="text-bone/30 hover:text-signal" @click="logout"><LogOut :size="13"/></button></div><NuxtLink to="http://localhost:3300" target="_blank" class="mt-1 flex items-center justify-between px-2 py-1.5 font-mono text-[7.5px] uppercase tracking-[.08em] text-bone/30 hover:text-bone">View website <ArrowUpRight :size="10"/></NuxtLink></div>
    </aside>
    <div v-if="open" class="fixed inset-0 z-40 bg-ink/40 lg:hidden" @click="open=false"/>
    <div class="min-w-0"><header class="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-ink/10 bg-paper/90 px-4 backdrop-blur lg:px-7"><div class="flex items-center gap-3"><button class="lg:hidden" @click="open=true"><Menu :size="18"/></button><div><p class="font-mono text-[7.5px] uppercase tracking-[.1em] text-ink/30">Studio / {{ title }}</p><p class="text-[13px] font-medium">{{ title }}</p></div></div><div class="flex items-center gap-2"><span class="hidden items-center gap-1.5 rounded-full border border-ink/12 px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-[.06em] text-ink/40 sm:flex"><span class="size-1.5 rounded-full bg-mint-deep"/> Live API</span><NuxtLink to="/catalog" class="btn btn-dark !min-h-8 !px-3 !text-[9px]">Manage catalog</NuxtLink></div></header><main class="p-4 lg:p-7"><slot v-if="ready"/><div v-else class="flex h-64 items-center justify-center"><Activity :size="20" class="animate-pulse text-ink/30"/></div></main></div>
  </div>
</template>
