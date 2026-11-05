export function useApi() {
  const config = useRuntimeConfig()
  const token = useState<string | null>('ls_admin_token', () => null)
  const user = useState<any>('ls_admin_user', () => null)
  function init() { if (!import.meta.client || token.value) return; const t = localStorage.getItem('ls_admin_token'), u = localStorage.getItem('ls_admin_user'); if (t) token.value = t; if (u) { try { user.value = JSON.parse(u) } catch {} } }
  async function request<T = any>(path: string, opts: any = {}): Promise<T> {
    init(); const headers: Record<string,string> = { ...(opts.headers||{}) }; if (opts.body) headers['Content-Type']='application/json'; if (token.value) headers.Authorization=`Bearer ${token.value}`
    return await $fetch<T>(`${config.public.apiBase}${path}`, { ...opts, headers })
  }
  async function login(email:string,password:string) { const data=await request<any>('/auth/login',{method:'POST',body:{email,password}}); token.value=data.token; user.value=data.user; if(import.meta.client){localStorage.setItem('ls_admin_token',data.token);localStorage.setItem('ls_admin_user',JSON.stringify(data.user))}; return data }
  function clear(){ token.value=null;user.value=null;if(import.meta.client){localStorage.removeItem('ls_admin_token');localStorage.removeItem('ls_admin_user')} }
  return { request, login, clear, init, token, user }
}
export function money(v:any){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Number(v||0))}
export function shortDate(v:any){if(!v)return '—';return new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric'}).format(new Date(v))}
