import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getUser, login, logout, handleAuthCallback, acceptInvite, updateUser, requestPasswordRecovery, onAuthChange } from '@netlify/identity';
import Logo from '../Components/Logo';
import Icon from '../Components/Icons';
import { authErrorMessage } from '../utils/auth-errors';
import AdminRoles from '../Components/AdminRoles';

const labels = { new: 'New', contacted: 'In progress', completed: 'Completed' };
const date = value => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
async function api(path = '', options = {}) {
  const response = await fetch(`/api/admin/quotes${path}`, { credentials: 'same-origin', cache: 'no-store', ...options });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || 'Unable to complete the request. Please try again.');
    error.status = response.status;
    throw error;
  }
  return result;
}

export default function Admin() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState('login');
  const [busy, setBusy] = useState(false);
  const [authError, setAuthError] = useState('');
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inviteToken = useRef(null);
  const initialization = useRef(null);
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailError, setDetailError] = useState('');
  const [detailVersion, setDetailVersion] = useState(0);
  const [detailLoading, setDetailLoading] = useState(false);
  const [draftStatus, setDraftStatus] = useState('new');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let live = true;
    initialization.current ||= (async () => {
      const callback = await handleAuthCallback();
      const current = await getUser();
      return { callback, current };
    })();
    initialization.current.then(({ callback, current }) => {
      if (!live) return;
      if (callback?.type === 'invite') { inviteToken.current = callback.token; setMode('invite'); }
      if (callback?.type === 'recovery') setMode('password');
      if (callback) window.history.replaceState(null, '', '/admin');
      setUser(current);
    }).catch(() => { if (live) setAuthError('This sign-in link is unavailable. Sign in again or request a new link.'); })
      .finally(() => { if (live) setChecking(false); });
    const unsubscribe = onAuthChange((_event, current) => {
      if (!live) return;
      setUser(current);
      if (!current) { setData(null); setSelected(null); setDetail(null); }
    });
    return () => { live = false; unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!user || mode !== 'login') return;
    const controller = new AbortController();
    setLoading(true); setError(''); setAccessDenied(false); setData(null);
    const params = new URLSearchParams({ page: String(page), status: filter, search });
    api(`?${params}`, { signal: controller.signal }).then(result => { if (!controller.signal.aborted) setData(result); })
      .catch(err => { if (controller.signal.aborted) return; setError(err.message); setAccessDenied(err.status === 403); if (err.status === 401) { setUser(null); setAuthError('Your session has expired. Please sign in again.'); } })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [user?.id, filter, search, page, refresh, mode]);

  useEffect(() => {
    if (!selected || !user) { setDetail(null); return; }
    const controller = new AbortController();
    setDetail(null); setDetailError(''); setDetailLoading(true); setSaved(false);
    api(`/${selected}`, { signal: controller.signal }).then(({ quote }) => {
      if (controller.signal.aborted) return;
      setDetail(quote); setDraftStatus(quote.status); setNotes(quote.notes);
    }).catch(err => { if (!controller.signal.aborted) setDetailError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setDetailLoading(false); });
    return () => controller.abort();
  }, [selected, user?.id, detailVersion]);

  async function authenticate(event) {
    event.preventDefault(); setBusy(true); setAuthError(''); setNotice('');
    try {
      if (mode === 'forgot') {
        await requestPasswordRecovery(email);
        setNotice('If an account exists, a password reset link has been sent to that email address.');
      } else if (mode === 'invite') {
        setUser(await acceptInvite(inviteToken.current, password)); inviteToken.current = null; setMode('login');
      } else if (mode === 'password') {
        setUser(await updateUser({ password })); setMode('login'); setNotice('Your password has been updated.');
      } else setUser(await login(email.trim(), password));
      setPassword('');
    } catch (error) {
      setAuthError(authErrorMessage(error, mode));
    } finally { setBusy(false); }
  }
  async function signOut() {
    setBusy(true); setError('');
    try { await logout(); setUser(null); setData(null); setDetail(null); setSelected(null); }
    catch { setError('Unable to sign out. Please try again.'); }
    finally { setBusy(false); }
  }
  async function save(event) {
    event.preventDefault(); setSaving(true); setDetailError(''); setSaved(false);
    try {
      const result = await api(`/${selected}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: draftStatus, notes }) });
      setDetail(result.quote); setNotes(result.quote.notes);
      setSaved(true);
      setData(previous => previous ? { ...previous, items: previous.items.map(item => item.id === selected ? { ...item, status: result.quote.status } : item) } : previous);
      // Refresh the list/counts while retaining the current saved detail.
      setRefresh(value => value + 1);
    } catch (err) { setDetailError(err.message); }
    finally { setSaving(false); }
  }
  const metadata = <Helmet><title>Studio Administration | Live Wood Studio</title><meta name="robots" content="noindex, nofollow" /><meta name="referrer" content="same-origin" /></Helmet>;
  const authCard = checking || !user || mode !== 'login';
  if (authCard) return <div className="admin-shell" lang="en">{metadata}
    <header className="admin-header"><Logo /><Link to="/">Back to website ↗</Link></header>
    <main id="main" className="admin-auth">
      <div className="admin-auth-intro"><p className="eyebrow">Live Wood Studio · Administration</p><h1>Every idea,<br /><em>a beginning.</em></h1><p>Manage customer project enquiries in one place.</p><span className="admin-auth-line" /></div>
      <section className="admin-login-card">
        <Icon name="tools" size={32} /><h2>{mode === 'forgot' ? 'Reset your password' : mode === 'invite' ? 'Complete your account' : mode === 'password' ? 'Set a new password' : 'Administrator sign-in'}</h2>
        {checking ? <p role="status">Checking your session…</p> : <>
          <p>{mode === 'login' ? 'Sign in with your authorized account to manage quote requests.' : mode === 'forgot' ? 'Enter your email address to request a password reset link.' : 'Choose a password with at least 6 characters for your account.'}</p>
          {authError && <p className="admin-error" role="alert">{authError}</p>}{notice && <p className="admin-notice" role="status">{notice}</p>}
          <form onSubmit={authenticate}><fieldset disabled={busy}>
            {['login', 'forgot'].includes(mode) && <div className="form-group"><label htmlFor="admin-email">Email</label><input id="admin-email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required maxLength={254} /></div>}
            {mode !== 'forgot' && <div className="form-group"><label htmlFor="admin-password">Password</label><input id="admin-password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={mode === 'login' ? 1 : 6} maxLength={128} /></div>}
            {mode !== 'forgot' && <button type="button" className="admin-text-button" aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>{showPassword ? 'Hide password' : 'Show password'}</button>}
            <button className="btn btn-dark" type="submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'forgot' ? 'Send reset link' : mode === 'login' ? 'Sign in to dashboard →' : 'Save password →'}</button>
          </fieldset></form>
          {['login', 'forgot'].includes(mode) && <button className="admin-text-button" disabled={busy} onClick={() => { setMode(mode === 'login' ? 'forgot' : 'login'); setAuthError(''); setNotice(''); }}>{mode === 'login' ? 'Forgot your password?' : 'Back to sign-in'}</button>}
          <details className="admin-setup"><summary>First-time administrator setup</summary>
            <p>A website account must be invited before you can sign in. Your Netlify dashboard login is a separate account.</p>
            <ol><li>Open this project's Identity users in Netlify and invite your email address.</li><li>Accept the invitation from your inbox and set your password here.</li><li>In Netlify, open that Identity user and add the <strong>admin</strong> role. Save, then sign out and sign in again.</li></ol>
            <a className="context-link" href="https://app.netlify.com/projects/mahmoudwebsite/identity" target="_blank" rel="noreferrer">Open Identity in Netlify ↗</a>
          </details>
        </>}
      </section>
    </main>
  </div>;

  return <div className="admin-shell" lang="en">{metadata}
    <header className="admin-header"><Logo /><div><Link to="/">View website ↗</Link><button onClick={signOut} disabled={busy || saving}>{busy ? 'Signing out…' : 'Sign out'}</button></div></header>
    <main id="main" className="admin-main">
      <div className="admin-page-heading"><div><p className="eyebrow">Studio inbox</p><h1>Quote requests</h1><p>{user.email}</p></div><button className="btn btn-dark" onClick={() => setRefresh(value => value + 1)} disabled={loading || saving}>Refresh inbox ↻</button></div>
      {notice && <p className="admin-notice" role="status">{notice}</p>}
      {accessDenied && <section className="admin-error" role="alert" lang="tr"><h2>Yönetici rolü gerekiyor</h2><p>Hesabınız açık ancak teklifleri görmek için gereken <strong>admin</strong> rolünüz yok. Bir yönetici bu paneldeki “Yönetici rolleri” bölümünden hesabınıza yetki verebilir.</p><p>İlk yönetici kuruluyorsa, proje sahibi Netlify → Identity → Users bölümünden ilgili kullanıcıyı açıp Roles alanına küçük harflerle <strong>admin</strong> eklemeli ve kaydetmeli. Ardından çıkış yapıp tekrar giriş yapın. Kullanıcı daveti veya Netlify ekip üyeliği tek başına bu rolü vermez.</p><a className="context-link" href="https://app.netlify.com/projects/mahmoudwebsite/identity" target="_blank" rel="noreferrer">Netlify kullanıcı ayarlarını aç ↗</a><button type="button" className="admin-text-button" onClick={signOut} disabled={busy}>Çıkış yap ve tekrar giriş yap</button></section>}
      {!accessDenied && data && <AdminRoles />}
      <div className="admin-stats">{Object.entries(labels).map(([status, label]) => <button key={status} onClick={() => { setFilter(status); setPage(1); setSelected(null); }} className={filter === status ? 'selected' : ''} disabled={saving}><span>{label}</span><strong>{data ? (data.counts.find(c => c.status === status)?.count || 0) : '—'}</strong></button>)}</div>
      <div className="admin-workspace">
        <section className="admin-inbox" aria-label="Incoming quote requests">
          <form className="admin-filters" onSubmit={e => { e.preventDefault(); setSearch(query.trim()); setPage(1); setSelected(null); }}>
            <label className="sr-only" htmlFor="quote-search">Search name, email or project title</label><input id="quote-search" type="search" placeholder="Search name, email or project title…" maxLength={120} value={query} onChange={e => setQuery(e.target.value)} disabled={saving} /><button type="submit" disabled={saving}>Search</button>
            <label className="sr-only" htmlFor="quote-status-filter">Filter by status</label><select id="quote-status-filter" value={filter} disabled={saving} onChange={e => { setFilter(e.target.value); setPage(1); setSelected(null); }}><option value="">All statuses</option>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          </form>
          {loading ? <div className="admin-placeholder" role="status">Loading quote requests…</div> : error ? <div className="admin-error" role="alert">{error}<button className="admin-text-button" onClick={() => setRefresh(v => v + 1)}>Try again</button></div> : data?.items.length ? <>
            <p className="admin-result-count" role="status">{data.total} requests · Newest first</p>
            <ul className="admin-quote-list">{data.items.map(item => <li key={item.id}><button className={selected === item.id ? 'selected' : ''} onClick={() => setSelected(item.id)} disabled={saving} aria-pressed={selected === item.id}>
              <span className="admin-quote-top"><strong>{item.name}</strong><span className={`quote-badge quote-badge-${item.status}`}>{labels[item.status]}</span></span>
              <span className="admin-quote-subject">{item.subject || item.projectType}</span><span className="admin-quote-meta">{item.email} · {date(item.createdAt)}</span>
            </button></li>)}</ul>
            <div className="admin-pagination"><button disabled={page === 1 || saving} onClick={() => { setPage(p => p - 1); setSelected(null); }}>← Previous</button><span>{page} / {Math.ceil(data.total / data.pageSize)}</span><button disabled={page * data.pageSize >= data.total || saving} onClick={() => { setPage(p => p + 1); setSelected(null); }}>Next →</button></div>
          </> : <div className="admin-placeholder"><Icon name="mail" size={38} /><h2>{search || filter ? 'No matching requests' : 'Ready for the first idea.'}</h2><p>{search || filter ? 'Try another search or change the status filter.' : 'Requests submitted through the website quote form will appear here.'}</p></div>}
        </section>
        <section className="admin-detail" aria-label="Quote details" aria-busy={detailLoading || saving}>
          {detailLoading ? <div className="admin-placeholder" role="status">Opening request…</div> : detail ? <>
            <div className="admin-detail-heading"><span className={`quote-badge quote-badge-${detail.status}`}>{labels[detail.status]}</span><time dateTime={detail.createdAt}>{date(detail.createdAt)}</time></div>
            <h2>{detail.subject || detail.projectType}</h2><p className="admin-customer-name">{detail.name}</p>
            <dl className="admin-contact-details"><div><dt>Email</dt><dd><a href={`mailto:${detail.email}`}>{detail.email}</a></dd></div>{detail.phoneNumber && <div><dt>Phone</dt><dd><a href={`tel:${detail.phoneNumber.replace(/[^+\d]/g, '')}`}>{detail.phoneNumber}</a></dd></div>}<div><dt>Project type</dt><dd>{detail.projectType}</dd></div></dl>
            <h3>Project description</h3><p className="admin-message">{detail.message}</p>
            <form onSubmit={save} className="admin-update-form"><fieldset disabled={saving}>
              <div className="form-group"><label htmlFor="detail-status">Request status</label><select id="detail-status" value={draftStatus} onChange={e => { setDraftStatus(e.target.value); setSaved(false); }}>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
              <div className="form-group"><label htmlFor="detail-notes">Internal notes</label><textarea id="detail-notes" rows={5} maxLength={5000} placeholder="Discussion notes, dimensions, next steps…" value={notes} onChange={e => { setNotes(e.target.value); setSaved(false); }} /><small>Visible to administrators only. No message is sent to the customer.</small></div>
              <button type="submit" className="btn btn-dark" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>{saved && <p className="admin-notice" role="status">Changes saved.</p>}
            </fieldset></form>
          </> : !detailError && <div className="admin-placeholder"><Icon name="pencil" size={38} /><h2>Select a request.</h2><p>Contact information, project details and notes will appear here.</p></div>}
          {detailError && <div className="admin-error" role="alert">{detailError}{!detail && <button className="admin-text-button" onClick={() => setDetailVersion(v => v + 1)}>Try again</button>}</div>}
        </section>
      </div>
    </main>
  </div>;
}
