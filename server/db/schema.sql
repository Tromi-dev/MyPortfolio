-- drop table if exists rdmp_designs,
-- rdmp_technical_skills,
-- rdmp_contact_links,
-- rdmp_repos,
-- rdmp_tags,
-- rdmp_repo_con_tags,
-- rdmp_images cascade;

create table if not exists rdmp_images (
  id bigint primary key generated always as identity,
  images text[] not null
);

create table if not exists rdmp_technical_skills (
  id bigint primary key generated always as identity,
  name text not null,
  logo_name text not null,
  unique (logo_name)
);

-- drop table if exists rdmp_repos cascade;

create table if not exists rdmp_repos (
  repo_name text primary key, -- name on github — generated if pulled from git
  display_name text not null, -- name displayed
  date date not null, -- updated
  colours jsonb, -- {background: hex, foreground: hex}
  logo text,
  image_id bigint references rdmp_images (id),
  bio text,
  proj_link text,
  git_link text,
  top boolean default false,
  is_code boolean default true,
  owner text not null,
  unique (display_name),
  unique (image_id)
);

create table if not exists rdmp_tags (
  id bigint primary key generated always as identity,
  name text not null,
  type text default 'normal',
  unique (name)
);

create table if not exists rdmp_repo_con_tags (
  primary key (repo_id, tag_id),
  repo_id text references rdmp_repos (repo_name),
  tag_id bigint references rdmp_tags (id)
);

create table if not exists rdmp_designs (
  name text primary key,
  image_id bigint references rdmp_images (id) not null,
  logo text not null,
  date date not null, -- yyyy-mm-dd
  bio text not null,
  pros text not null,
  cons text not null,
  top boolean default false,
  is_code boolean default false,
  unique (image_id)
);

create or replace view top_projects as
select
  repo_name as "id",
  display_name as "name",
  rdmp_images.images[2] as "image",
  date,
  is_code,
  owner
from
  rdmp_repos
  join rdmp_images on rdmp_images.id = rdmp_repos.image_id
where
  rdmp_repos.top = true
union all
select
  name as "id",
  name,
  rdmp_images.images[2] as "image",
  date,
  is_code,
  null as "owner"
from
  rdmp_designs
  join rdmp_images on rdmp_images.id = rdmp_designs.image_id
where
  rdmp_designs.top = true
order by
  date desc;