import { createContext, useContext, useEffect, useState } from 'react'; import api from '../api.js';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('staffsync_user')); } catch { return null; } });
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (localStorage.getItem('staffsync_token')) api.get('/auth/me').then(r => { setUser(r.data.user); localStorage.setItem('staffsync_user', JSON.stringify(r.data.user)); }).catch(() => { localStorage.removeItem('staffsync_token'); localStorage.removeItem('staffsync_user'); setUser(null); }).finally(() => setLoading(false)); else setLoading(false); }, []);
  const login = async (data) => { const r = await api.post('/auth/login', data); save(r.data); };
  const register = async (data) => { const r = await api.post('/auth/register', data); save(r.data); };
  const save = (data) => { localStorage.setItem('staffsync_token', data.token); localStorage.setItem('staffsync_user', JSON.stringify(data.user)); setUser(data.user); };
  const logout = () => { localStorage.removeItem('staffsync_token'); localStorage.removeItem('staffsync_user'); setUser(null); };
  const updateUser = (u) => { setUser(u); localStorage.setItem('staffsync_user', JSON.stringify(u)); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
