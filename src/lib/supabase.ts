/**
 * RITESH PC OS - Supabase Live Database Client
 * Ultra-Fast Real-time Sync for Releases (Uploads) and Documentation (Guides)
 */

export const SUPABASE_URL = 'https://tfgmkrcklcmlxzgnrnwy.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_eiSEIgM2k1xy-neO275U6g_b9BeXVHA';

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

export interface SupabaseUpload {
  id?: number;
  sl_no: number;
  title: string;
  icon: string;
  links: string;
  description: string;
  created_at?: string;
}

export interface SupabaseGuide {
  id?: number;
  folder: string;
  title: string;
  content_html: string;
  author: string;
  created_at?: string;
}

// 1. Fetch All Uploads (Ordered by SL No / Created Date)
export async function fetchLiveUploads() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/uploads?select=*&order=sl_no.asc,id.asc`, {
      headers
    });
    if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
    const data: SupabaseUpload[] = await res.json();
    return data.map((d, idx) => ({
      slNo: d.sl_no || idx + 1,
      title: d.title,
      icon: d.icon || '💿',
      links: d.links,
      description: d.description || '',
      timestamp: d.created_at || new Date().toISOString()
    }));
  } catch (err) {
    console.error('Supabase fetchLiveUploads error:', err);
    return [];
  }
}

// 2. Insert New Upload
export async function insertLiveUpload(item: {
  slNo: number;
  title: string;
  icon: string;
  links: string;
  description: string;
}) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/uploads`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sl_no: item.slNo,
        title: item.title,
        icon: item.icon,
        links: item.links,
        description: item.description
      })
    });
    if (!res.ok) throw new Error(`Supabase insert error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Supabase insertLiveUpload error:', err);
    throw err;
  }
}

// 3. Fetch All Guides (Ordered by Category & ID)
export async function fetchLiveGuides() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/guides?select=*&order=id.asc`, {
      headers
    });
    if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
    const data: SupabaseGuide[] = await res.json();
    return data.map((g) => ({
      id: String(g.id || Date.now()),
      folder: g.folder,
      title: g.title,
      contentHtml: g.content_html,
      author: g.author || 'Ritesh Guru',
      timestamp: g.created_at || new Date().toISOString()
    }));
  } catch (err) {
    console.error('Supabase fetchLiveGuides error:', err);
    return [];
  }
}

// 4. Insert New Guide Post
export async function insertLiveGuide(post: {
  folder: string;
  title: string;
  contentHtml: string;
  author: string;
}) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/guides`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        folder: post.folder,
        title: post.title,
        content_html: post.contentHtml,
        author: post.author
      })
    });
    if (!res.ok) throw new Error(`Supabase insert guide error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Supabase insertLiveGuide error:', err);
    throw err;
  }
}
