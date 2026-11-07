<script setup lang="ts">
definePageMeta({ layout: false })
import { ArrowUpRight, LoaderCircle, ShieldCheck } from 'lucide-vue-next'
const api = useApi(); const router = useRouter(); const form = reactive({ email: 'ops@vomtek.com', password: 'VomtekOps!2026' }); const loading = ref(false); const error = ref('')
onMounted(() => {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const token = params.get('token'); const user = params.get('user')
  if (!token) return
  try {
    const parsed = JSON.parse(user || '{}')
    localStorage.setItem('ls_admin_token', token)
    localStorage.setItem('ls_admin_user', JSON.stringify(parsed))
    window.history.replaceState({}, '', window.location.pathname)
    router.replace('/')
  } catch {}
})
async function submit(){loading.value=true;error.value='';try{await api.login(form.email,form.password);router.push('/')}catch(e:any){error.value=e?.data?.message||'Invalid credentials'}finally{loading.value=false}}
</script>
<template><div class="grid min-h-screen lg:grid-cols-2"><div class="relative hidden overflow-hidden bg-ink lg:block"><img src="/images/pipeline.jpg" class="absolute inset-0 size-full object-cover opacity-30" alt=""><div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"/><div class="relative flex h-full flex-col justify-between p-10 text-bone"><BrandMark tone="light"/><div><p class="label-mono text-mint">Operations console</p><h1 class="mt-3 max-w-[12ch] font-display text-[46px] leading-[.95] tracking-[-.04em]">Run the platform behind the platform.</h1><p class="mt-4 max-w-sm text-[12px] leading-relaxed text-bone/50">Customers, revenue, reports, rentals, contractor bids and escrow — one operational view.</p></div><p class="font-mono text-[8px] uppercase tracking-[.1em] text-bone/30">Vomtek Studio · internal</p></div></div><div class="flex items-center justify-center px-5 py-12"><div class="w-full max-w-sm"><p class="label-mono text-signal-deep">Staff access</p><h1 class="mt-2 font-display text-[38px] leading-none tracking-[-.04em]">Sign in to Studio.</h1><p class="mt-2 text-[12px] text-ink/45">Use the seeded operations account.</p><form class="mt-7 space-y-4" @submit.prevent="submit"><div><label class="a-label">Email</label><input v-model="form.email" type="email" class="a-input" required></div><div><label class="a-label">Password</label><input v-model="form.password" type="password" class="a-input" required></div><button class="btn btn-dark w-full" :disabled="loading"><LoaderCircle v-if="loading" :size="13" class="animate-spin"/> {{ loading ? 'Signing in…' : 'Enter Studio' }} <ArrowUpRight v-if="!loading" :size="12"/></button><p v-if="error" class="text-[11px] text-signal-deep">{{ error }}</p></form><div class="mt-6 rounded-lg border border-ink/12 bg-bone p-4"><p class="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[.08em] text-ink/35"><ShieldCheck :size="11"/> Demo credentials</p><p class="mt-2 font-mono text-[10px] text-ink/55">ops@vomtek.com<br>VomtekOps!2026</p></div></div></div></div></template>
