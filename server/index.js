#!/usr/bin/env node

// Minimal server to accept analysis results, de-identify and store in SQLite.
// Uses pino for structured logging.

import express from 'express';
import pino from 'pino';
import bodyParser from 'body-parser';
import { initDb, insertResult, getResult } from './db.js';
import fs from 'fs';
import path from 'path';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json({ limit: '2mb' }));

// initialize DB
const dbPath = path.resolve(process.cwd(), 'server', 'data.sqlite');
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}
initDb(dbPath);

// Serve static frontend if present (built Vite output in /dist)
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  logger.info({ distPath }, 'serving static frontend from dist');
  app.use(express.static(distPath));
  // fallback to index.html for SPA routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Simple de-identification function: remove common personal fields.
function deidentify(payload) {
  const copy = JSON.parse(JSON.stringify(payload));
  // remove or redact known personal fields
  const personalKeys = ['name', 'fullName', 'firstName', 'lastName', 'email', 'phone', 'address', 'id'];
  function redact(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    for (const k of Object.keys(obj)) {
      const lower = k.toLowerCase();
      if (personalKeys.includes(k) || personalKeys.includes(lower)) {
        obj[k] = '[REDACTED]';
      } else if (typeof obj[k] === 'object') {
        redact(obj[k]);
      }
    }
  }
  redact(copy);
  return copy;
}

app.post('/api/results', async (req, res) => {
  const { body } = req;
  logger.info({ msg: 'received results', size: JSON.stringify(body).length });

  try {
    const deid = deidentify(body);
    const id = insertResult(dbPath, deid);
    logger.info({ msg: 'stored result', id });
    res.status(201).json({ id });
  } catch (err) {
    logger.error({ err }, 'failed to store result');
    res.status(500).json({ error: 'failed to store result' });
  }
});

app.get('/api/results/:id', (req, res) => {
  const id = Number(req.params.id);
  try {
  const row = getResult(dbPath, id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
  } catch (err) {
    logger.error({ err }, 'failed to read result');
    res.status(500).json({ error: 'failed to read result' });
  }
});

app.listen(port, () => {
  logger.info({ port }, 'server listening');
});
