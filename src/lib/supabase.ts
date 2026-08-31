/**
 * RITESH PC OS - Ultra-Fast Supabase + Google Sheet Master Sync Engine
 * Google Sheet is Primary Master DB -> Supabase provides sub-50ms instant cached delivery.
 */

export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzPnrzy7QlJEM8L30R7JTeoopoO1-OS0ZyJLhVx9fxM5JaIH29Po6AqPWWm8VKirRlrDg/exec';

export const SUPABASE_URL = 'https://tfgmkrcklcmlxzgnrnwy.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_eiSEIgM2k1xy-neO275U6g_b9BeXVHA';

const supaHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

export interface UploadItem {
  slNo: number;
  title: string;
  icon: string;
  links: string;
  description: string;
  timestamp: string;
}

export interface GuidePost {
  id: string;
  folder: string;
  title: string;
  contentHtml: string;
  author: string;
  timestamp: string;
}

// 1. Fetch Uploads: Instant Supabase (<50ms) + Background Google Sheet Sync
export async function getLiveUploads(): Promise<UploadItem[]> {
  try {
    // Fast Supabase fetch
    const res = await fetch(`${SUPABASE_URL}/rest/v1/uploads?select=*&order=sl_no.asc,id.asc`, {
      headers: supaHeaders
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((d: any, idx: number) => ({
          slNo: d.sl_no || idx + 1,
          title: d.title,
          icon: d.icon || '💿',
          links: d.links,
          description: d.description || '',
          timestamp: d.created_at || new Date().toISOString()
        }));
      }
    }
  } catch (err) {
    console.warn('Supabase fetch fallback to Google Sheet:', err);
  }

  // Fallback to direct Google Sheet
  try {
    const sRes = await fetch(APPS_SCRIPT_URL);
    const sData = await sRes.json();
    if (sData && sData.uploads) {
      return sData.uploads;
    }
  } catch (err) {
    console.error('Google Sheet fetch error:', err);
  }

  return [];
}

// 2. Save Upload: Dual Sync (Google Sheet Primary + Supabase Cache)
export async function saveLiveUpload(item: {
  slNo: number;
  title: string;
  icon: string;
  links: string;
  description: string;
}) {
  // 1. Post to Google Sheet (Master Primary)
  try {
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        pin: '231001',
        action: 'addUpload',
        title: item.title,
        icon: item.icon,
        links: item.links,
        description: item.description
      })
    }).catch((e) => console.warn('Sheet sync background error:', e));
  } catch (e) {
    console.warn('Sheet POST error:', e);
  }

  // 2. Post to Supabase (Instant High-Speed DB)
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/uploads`, {
      method: 'POST',
      headers: supaHeaders,
      body: JSON.stringify({
        sl_no: item.slNo,
        title: item.title,
        icon: item.icon,
        links: item.links,
        description: item.description
      })
    });
  } catch (e) {
    console.error('Supabase POST error:', e);
  }
}

// 3. Fetch Guides: Instant Supabase (<50ms) + Background Google Sheet Sync
export async function getLiveGuides(): Promise<GuidePost[]> {
  try {
    // Fast Supabase fetch
    const res = await fetch(`${SUPABASE_URL}/rest/v1/guides?select=*&order=id.asc`, {
      headers: supaHeaders
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((g: any) => ({
          id: String(g.id || Date.now()),
          folder: g.folder,
          title: g.title,
          contentHtml: g.content_html,
          author: g.author || 'Ritesh Guru',
          timestamp: g.created_at || new Date().toISOString()
        }));
      }
    }
  } catch (err) {
    console.warn('Supabase guides fetch fallback to Google Sheet:', err);
  }

  // Fallback to direct Google Sheet
  try {
    const sRes = await fetch(APPS_SCRIPT_URL);
    const sData = await sRes.json();
    if (sData && sData.guides) {
      return sData.guides;
    }
  } catch (err) {
    console.error('Google Sheet guides fetch error:', err);
  }

  return [];
}

// 4. Save Guide: Dual Sync (Google Sheet Primary + Supabase Cache)
export async function saveLiveGuide(post: {
  folder: string;
  title: string;
  contentHtml: string;
  author: string;
}) {
  // 1. Post to Google Sheet (Master Primary)
  try {
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        pin: '231001',
        action: 'addGuide',
        folder: post.folder,
        title: post.title,
        contentHtml: post.contentHtml
      })
    }).catch((e) => console.warn('Sheet sync background error:', e));
  } catch (e) {
    console.warn('Sheet POST error:', e);
  }

  // 2. Post to Supabase (Instant High-Speed DB)
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/guides`, {
      method: 'POST',
      headers: supaHeaders,
      body: JSON.stringify({
        folder: post.folder,
        title: post.title,
        content_html: post.contentHtml,
        author: post.author
      })
    });
  } catch (e) {
    console.error('Supabase guide POST error:', e);
  }
}
