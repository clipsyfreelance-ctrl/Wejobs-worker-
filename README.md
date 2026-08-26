# WEJOBS — Micro Jobs Platform

Platform freelance micro-jobs: penugasan tugas, submission, saldo/ledger, penarikan dana, dan panel admin. Dibangun dengan React 19 + Vite 6 + Express + TypeScript.

## Struktur Proyek

```
src/            → Frontend React (halaman, komponen)
server/         → Backend Express (API, "database" in-memory)
server.ts       → Entry point server (dev: Vite middleware, prod: static files)
public/         → Aset statis & file download
```

## Persyaratan

- Node.js 18+ (disarankan LTS)
- API key Gemini (opsional, untuk fitur AI — lihat `.env.example`)

## Instalasi

```bash
npm install
cp .env.example .env
# isi GEMINI_API_KEY di file .env jika diperlukan
```

## Menjalankan (Development)

```bash
npm run dev
```
Server berjalan di `http://localhost:3000`.

## Build & Jalankan (Production)

```bash
npm run build
npm start
```

## Catatan Penting

- **Data disimpan in-memory** (di `server/database.ts`, memakai `Map`). Artinya seluruh data (user, task, saldo, dll) akan **hilang setiap kali server di-restart atau di-redeploy**. Ini cocok untuk demo/prototype, tapi untuk produksi sungguhan perlu diganti dengan database persisten (SQLite/PostgreSQL/dsb).
- Login memakai skema sederhana: token = `user.id`, dikirim lewat header `Authorization: Bearer <userId>`.
- Data awal (tugas, FAQ, sponsor, challenge) di-generate otomatis dari `server/seedData.ts` dan `server/challengeSeed.ts` setiap kali server start.

## Lint / Cek Tipe

```bash
npm run lint
```
