import React, { useEffect, useState } from 'react';

async function usersApi(options = {}, page = 1) {
  const response = await fetch(`/api/admin/users?page=${page}`, { credentials: 'same-origin', cache: 'no-store', ...options });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Kullanıcılar yüklenemedi.');
  return result;
}

export default function AdminRoles() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setLoading(true); setError(''); setUsers([]); setHasMore(false);
    usersApi({ signal: controller.signal }, page).then(result => {
      if (!controller.signal.aborted) { setUsers(result.users); setHasMore(result.hasMore); }
    }).catch(err => { if (!controller.signal.aborted) setError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [open, page, refresh]);

  async function grant(user) {
    setSaving(user.id); setError(''); setNotice('');
    try {
      await usersApi({ method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, role: 'admin' }) });
      setUsers(previous => previous.map(item => item.id === user.id ? { ...item, admin: true } : item));
      setNotice(`${user.email} hesabına yönetici rolü eklendi. Kullanıcının çıkış yapıp tekrar giriş yapması gerekiyor.`);
    } catch (err) { setError(err.message); }
    finally { setSaving(''); }
  }

  return <section className="admin-role-settings" lang="tr" aria-labelledby="role-settings-heading">
    <h2 id="role-settings-heading">Yönetici rolleri</h2>
    <p>Mevcut kullanıcılara teklifleri görme ve yönetme yetkisi verin. Yeni hesap davetleri Netlify kullanıcı ayarlarından gönderilir.</p>
    <button type="button" className="admin-text-button" aria-expanded={open} disabled={Boolean(saving)} onClick={() => setOpen(value => !value)}>{open ? 'Kullanıcıları gizle' : 'Kullanıcıları ve rolleri göster'}</button>
    {open && <>
      {loading && <p role="status">Kullanıcılar yükleniyor…</p>}
      {error && <p className="admin-error" role="alert">{error} <button type="button" className="admin-text-button" disabled={loading || Boolean(saving)} onClick={() => setRefresh(value => value + 1)}>Tekrar dene</button></p>}
      {notice && <p className="admin-notice" role="status">{notice}</p>}
      {!loading && users.length > 0 && <ul className="admin-role-list">{users.map(user => <li key={user.id}>
        <span>{user.email}<small>{user.admin ? 'Yönetici' : 'Yönetici yetkisi yok'}</small></span>
        <button type="button" className="admin-text-button" disabled={user.admin || Boolean(saving)} onClick={() => grant(user)} aria-label={`${user.email} için yönetici rolü ekle`}>{saving === user.id ? 'Kaydediliyor…' : user.admin ? 'Yetkili' : 'Yönetici rolü ekle'}</button>
      </li>)}</ul>}
      {!loading && !error && users.length === 0 && <p>Kullanıcı bulunamadı.</p>}
      <div className="admin-pagination"><button type="button" disabled={page === 1 || loading || Boolean(saving)} onClick={() => setPage(value => value - 1)}>Önceki</button><span>Sayfa {page}</span><button type="button" disabled={!hasMore || loading || Boolean(saving)} onClick={() => setPage(value => value + 1)}>Sonraki</button></div>
    </>}
  </section>;
}
