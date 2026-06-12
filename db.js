const SUPABASE_URL = 'https://lbazbfbktenybmjorbrs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_D7t1yYJqo0Jt2criA9KHow_DziIjba1';

const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let _cvRecordId = null;

async function getSession() {
  const { data } = await _sb.auth.getSession();
  return data.session;
}

async function getCurrentUser() {
  const { data } = await _sb.auth.getUser();
  return data.user;
}

async function signIn(email, password) {
  return _sb.auth.signInWithPassword({ email, password });
}

async function signUp(email, password) {
  return _sb.auth.signUp({ email, password });
}

async function signOut() {
  _cvRecordId = null;
  return _sb.auth.signOut();
}

async function loadCV() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await _sb
    .from('cvs')
    .select('id, data')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  _cvRecordId = data.id;
  return data.data;
}

async function saveCV(cvData) {
  const user = await getCurrentUser();
  if (!user) return { error: 'no_session' };

  const now = new Date().toISOString();

  if (_cvRecordId) {
    return _sb
      .from('cvs')
      .update({ data: cvData, updated_at: now })
      .eq('id', _cvRecordId);
  }

  const { data, error } = await _sb
    .from('cvs')
    .insert({ user_id: user.id, data: cvData, updated_at: now })
    .select('id')
    .single();

  if (!error && data) _cvRecordId = data.id;
  return { error };
}

async function deleteCV() {
  if (!_cvRecordId) return;
  const result = await _sb.from('cvs').delete().eq('id', _cvRecordId);
  _cvRecordId = null;
  return result;
}
