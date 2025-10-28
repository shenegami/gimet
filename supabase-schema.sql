-- Schema لإنشاء الجداول الأساسية في Supabase
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  summary text,
  status text not null default 'on-track',
  progress numeric not null default 0,
  due_date date,
  owner_id uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  member_id uuid references public.profiles(id) on delete cascade,
  role text not null default 'viewer'
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  name text not null,
  url text not null,
  mime_type text,
  size integer,
  uploaded_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.ai_reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id),
  summary text,
  risks text[],
  recommendations text[],
  generated_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id),
  title text not null,
  description text,
  severity text default 'info',
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  role text default 'viewer'
);
