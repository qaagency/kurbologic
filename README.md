# KurboLogic Website

A modern React website for KurboLogic's AI Voice Agent services.

## Features

- AI Voice Agent demo with Vapi integration
- Responsive design with Tailwind CSS
- Interactive service showcase
- ROI Calculator
- Customer testimonials
- FAQ section

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- Vapi AI (voice agent)
- Three.js (3D effects)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

## Supabase Admin Setup

This project includes an admin panel for managing FAQs using Supabase.

### 1. Database Setup

Run this SQL in your Supabase SQL editor:

```sql
create table if not exists public.faqs (
  id bigserial primary key,
  question text not null,
  answer text not null,
  updated_at timestamptz default now()
);
alter table public.faqs enable row level security;

-- Read: everyone
create policy "faqs_read_all" on public.faqs
for select using (true);

-- Write: admin/editor
create policy "faqs_insert_editors" on public.faqs
for insert with check ((auth.jwt()->'user_metadata'->>'role') in ('admin','editor'));

create policy "faqs_update_editors" on public.faqs
for update using ((auth.jwt()->'user_metadata'->>'role') in ('admin','editor'))
with check ((auth.jwt()->'user_metadata'->>'role') in ('admin','editor'));

-- Delete: admin only
create policy "faqs_delete_admin" on public.faqs
for delete using ((auth.jwt()->'user_metadata'->>'role') = 'admin');
```

### 2. Configure Supabase Client

Update `src/lib/supabaseClient.ts` with your actual Supabase project URL and anon key:

```typescript
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key-here'
```

### 3. Assign User Roles

After a user signs in for the first time:

1. Go to Supabase Dashboard → Authentication → Users
2. Click on the user
3. Scroll to "User Metadata" 
4. Add a new field:
   - Key: `role`
   - Value: `admin` or `editor`

### 4. Access Admin Panel

Visit `/admin` to access the FAQ management system.

**Permissions:**
- **Admin**: Can create, read, update, and delete FAQs
- **Editor**: Can create, read, and update FAQs (no delete)
- **Viewer**: No access to admin panel

## License

All rights reserved.