import fs from 'fs';
import path from 'path';

// Simple file-backed storage as a fallback when native sqlite can't be built.
// Stores newline-delimited JSON records in results.jsonl and a lastid.txt counter.

function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function initDb(dbPath) {
  const dir = path.dirname(dbPath);
  ensureDirExists(dir);
  const resultsFile = path.join(dir, 'results.jsonl');
  const lastIdFile = path.join(dir, 'lastid.txt');
  if (!fs.existsSync(resultsFile)) fs.writeFileSync(resultsFile, '');
  if (!fs.existsSync(lastIdFile)) fs.writeFileSync(lastIdFile, '0');
  // return a small object for compatibility
  return { dir, resultsFile, lastIdFile };
}

export function insertResult(dbPath, payload) {
  const { resultsFile, lastIdFile } = initDb(dbPath);
  const raw = fs.readFileSync(lastIdFile, 'utf8');
  const last = Number(raw || '0');
  const id = last + 1;
  fs.writeFileSync(lastIdFile, String(id));
  const created_at = new Date().toISOString();
  const record = { id, created_at, payload };
  fs.appendFileSync(resultsFile, JSON.stringify(record) + '\n');
  return id;
}

export function getResult(dbPath, id) {
  const { resultsFile } = initDb(dbPath);
  if (!fs.existsSync(resultsFile)) return null;
  const lines = fs.readFileSync(resultsFile, 'utf8').split('\n').filter(Boolean);
  for (const line of lines) {
    try {
      const row = JSON.parse(line);
      if (row && row.id === id) return row;
    } catch (e) {
      // ignore parse errors
    }
  }
  return null;
}
