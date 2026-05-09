insert into
  rdmp_technical_skills (name, logo_name)
values
  ('React', 'react.svg'),
  ('TypeScript', 'ts.svg'),
  ('JavaScript', 'js.svg'),
  ('Figma', 'figma.svg'),
  ('Tailwind', 'tailwind.svg'),
  ('NextJS', 'next.svg'),
  ('Python', 'py.svg'),
  ('PostgreSQL', 'postgres.svg'),
  ('Git', 'git.svg'),
  ('Flask', 'flask.svg'),
  ('SQLite', 'sqlite.svg'),
  ('Canva', 'canva.svg'),
  ('C#', 'cs.svg')
on conflict do nothing;

insert into
  rdmp_images (images)
values
  (
    array[
      '/code-projects/hof1.jpg',
      '/code-projects/hof2.jpg',
      '/code-projects/hof3.jpg',
      '/code-projects/hof4.jpg'
    ]::text[]
  ),
  (
    array[
      '/code-projects/eq1.jpg',
      '/code-projects/eq2.jpg',
      '/code-projects/eq3.jpg',
      '/code-projects/eq4.jpg'
    ]::text[]
  ),
  (
    array[
      '/code-projects/os1.jpg',
      '/code-projects/os2.jpg',
      '/code-projects/os3.jpg',
      '/code-projects/os4.jpg'
    ]::text[]
  ),
  (array['/code-projects/snake1.jpg']::text[]),
  -- design
  (
    array[
      '/design-projects/bt.jpg',
      '/design-projects/bt2.jpg',
      '/design-projects/bt3.jpg',
      '/design-projects/bt4.jpg'
    ]::text[]
  ),
  (
    array[
      '/design-projects/pr1.jpg',
      '/design-projects/pr2.jpg',
      '/design-projects/pr3.jpg',
      '/design-projects/pr4.jpg',
      '/design-projects/pr5.jpg',
      '/design-projects/pr6.jpg',
      '/design-projects/pr7.jpg'
    ]::text[]
  ),
  (
    array[
      '/design-projects/ylc1.jpg',
      '/design-projects/ylc2.jpg',
      '/design-projects/ylc3.jpg',
      '/design-projects/ylc4.jpg',
      '/design-projects/ylc5.jpg',
      '/design-projects/ylc6.jpg'
    ]::text[]
  ),
  (
    array[
      '/design-projects/bof1.jpg',
      '/design-projects/bof2.jpg',
      '/design-projects/bof3.jpg',
      '/design-projects/bof4.jpg',
      '/design-projects/bof5.jpg'
    ]::text[]
  ),
  (
    array[
      '/design-projects/lp1.jpg',
      '/design-projects/lp2.jpg',
      '/design-projects/lp3.jpg',
      '/design-projects/lp4.jpg',
      '/design-projects/lp5.jpg'
    ]::text[]
  )
on conflict do nothing;

insert into
  rdmp_designs (image_id, logo, name, date, bio, pros, cons, top)
values
  (
    5,
    '/logos/bt.svg',
    'Black Ticket',
    date '2024-12-09',
    'Black Ticket is an event web-service that focuses on all variations of evening events. From small dinner gatherings, to late night clubs: your ticket to the night life is waiting.',
    '- Was able to build on ideas to achieve a high-quality final result
    - Colour palette is effective and high contrast
    - Attempted logo design to an effective degree',
    '- UX could be more considered
    - More respect of whitespace needed',
    false
  ),
  (
    6,
    '/logos/pr.svg',
    'Pokémon Resurgence',
    date '2025-01-22',
    'Pokémon Resurgence is a choose your own adventure website that details a bespoke fan-made story, taking place in the Pokémon world where Team Rocket makes its resurgence and attempts to take over.',
    '- Entry into using layout grids in the design process<br/>- Effective translation from low-fi into high-fi<br/>- Designed with development at the forefront
    - Minimal design with charm
    - Accounted for optimal mobile UX',
    '- Could use more of the whitespace
    - Accessibility could be considered more',
    true
  ),
  (
    7,
    '/logos/ylc.svg',
    'YLC Redesign',
    date '2025-03-05',
    'A redesign of the Young Lives vs Cancer charity website, this design is meant to showcase a more concise layout that elevates the charity''s goals.',
    '- Easy to scale to different resolutions
    - Focussed on what was necessary for a high user experience
    - Created a simpler, more accessible design for any technical literacy level',
    '- Some features on the actual site are not shown
    - Not all pages have multiple resolutions',
    false
  ),
  (
    8,
    '/logos/bof.svg',
    'Ball of Fame',
    date '2025-02-11',
    'Ball of Fame is a design for a web-based documentation system for your Pokémon teams that you have journeyed and completed a playthrough with. This site allows you to enter and view any amount of teams from any Pokémon game, and view statistics about your usage patterns.',
    '- Accounted for any screen width
    - Easily conveys important information
    - I feel i had success with my first icon/symbol designs',
    '- Subpar typography
    - Inconsistent logos',
    false
  ),
  (
    9,
    '/logos/lp.svg',
    'Lucaplex',
    date '2025-09-07',
    'Lucaplex is the site for storing and playing your owned, uploaded media for a portable, conveniant way to watch movies and tv shows in high quality, anytime.',
    '- Multiple iterations to create the best user experience
    - Clean, consistent UI choices
    - Feels familiar to other media sites',
    '- Took time to perfect to current state
    - Minimal text may lead to confusion',
    true
  )
on conflict do nothing;

insert into
  rdmp_repos (
    repo_name,
    image_id,
    logo,
    display_name,
    date,
    colours,
    bio,
    proj_link,
    git_link,
    top,
    owner
  )
values
  (
    'hall-of-fame',
    1,
    '/logos/hof.svg',
    'Hall of Fame',
    date '2025-08-27',
    '{"background": "#a15454", "foreground": "#f3f3f3"}',
    'IyBIYWxsIG9mIEZhbWUKVGhpcyBIYWxsIG9mIEZhbWUgc3ByZWFkc2hlZXQgd2FzIGNyZWF0ZWQgdG8gZG9jdW1lbnQgbXkgUG9rw6ltb24gdGVhbSB2aWN0b3JpZXMgaW4gYW4gZXh0ZXJuYWwsIHByZXNlcnZlZCB3YXkiOiBpbmNsdWRpbmcgYSBoYW5kLW1hZGUgSUQgYW5kIHNlYXJjaCBzeXN0ZW0gZm9yIHJlbmRlcmluZyBhbnkgc2VjdGlvbiBvZiBkYXRhIGluIHRoZSBzaGVldC4gVGhpcyBzaGVldChzKSB1c2VzIHNvbWUgb2YgdGhlIG1vcmUgY29tcGxleCBwYXJ0cyBvZiBnb29nbGUgc2hlZXRzLCBzdWNoIGFzIHRoZSBgPVFVRVJZKClgIGZ1bmN0aW9uLCBjb25kaXRpb25hbCBmb3JtYXR0aW5nLCBhbmQgY3VzdG9tIHNjcmlwdHMgZm9yIEFQSSBjYWxscy4KIyMgRmVhdHVyZXMKLSBzZWFyY2ggdG8gZGlzcGxheSBjZXJ0YWluIHRlYW1zLgoJLSB2aWV3IGFsbCB0aGUgbmVjZXNzYXJ5IGluZm9ybWF0aW9uIG9uIGVhY2ggdGVhbSBtZW1iZXIsIHRoZSBnYW1lIHRoZXkgZmVhdHVyZWQgaW4sIGFuZCB0aGUgcnVsZXMgaW1wb3NlZCB1cG9uIG1lIGR1cmluZyBlYWNoIHBsYXl0aHJvdWdoLgotIHZpZXcgZWFjaCBzcGVjaWVzIChhbmQgc29tZXRpbWVzIGZvcm0pIG9mIFBva8OpbW9uIEkgaGF2ZSB1c2VkLCBhbG9uZ3NpZGUgdGhlIGFtb3VudCBvZiB0aW1lcyB1c2VkIGluIGEgc2VsZiBzdXN0YWluaW5nIGxpc3Qu',
    --     # Hall of Fame
    -- This Hall of Fame spreadsheet was created to document my Pokémon team victories in an external, preserved way": including a hand-made ID and search system for rendering any section of data in the sheet. This sheet(s) uses some of the more complex parts of google sheets, such as the `=QUERY()` function, conditional formatting, and custom scripts for API calls.
    -- ## Features
    -- - search to display certain teams.
    -- 	- view all the necessary information on each team member, the game they featured in, and the rules imposed upon me during each playthrough.
    -- - view each species (and sometimes form) of Pokémon I have used, alongside the amount of times used in a self sustaining list.
    'https://docs.google.com/spreadsheets/d/1IcfILulfWmRJHvmKlMhtB1kduqd28Q23wv8qNp70fAw/edit?gid=1493606038#gid=1493606038',
    null,
    false,
    'TruckOfMinds'
  ),
  (
    'everquill',
    2,
    '/logos/eq.svg',
    'EverQuill',
    date '2025-09-06',
    '{"background": "#466fd0", "foreground": "#f7d2a1"}',
    null,
    'https://everquill.onrender.com/',
    'https://github.com/TruckOfMinds/EVERQUILL',
    true,
    'TruckOfMinds'
  ),
  (
    'occupational-specialism',
    3,
    '/logos/os.svg',
    'Occupational Specialism (T-Level)',
    date '2025-09-06',
    '{"background": "#1B9090", "foreground": "#020A0A"}',
    null,
    null,
    'https://github.com/TruckOfMinds/OS-Rolsa-Tech',
    false,
    'TruckOfMinds'
  ),
  (
    'snake-game',
    4,
    '/logos/snake.svg',
    'Snake Game',
    date '2025-07-03',
    '{"background": "#2a2a2a", "foreground": "#0000ff"}',
    null,
    null,
    'https://github.com/OCSYT/Snake-Game',
    false,
    'OCSYT'
  )
on conflict do nothing;

insert into
  rdmp_tags (name, type) overriding system value
values
  ('JavaScript', default), -- 1
  ('TypeScript', default), -- 2
  ('Python', default), -- 3
  ('C#', default), -- 4
  ('ReactJS', default), -- 5
  ('NextJS', default), -- 6
  ('Flask', default), -- 7
  ('Website', default), -- 8
  ('Web-API', default), -- 9
  ('Desktop', default), -- 10
  ('Mobile', default), -- 11
  ('Terminal', default), -- 12
  ('Game', default), -- 13
  ('E-Commerce', default), -- 14
  ('Media-Player', default), -- 15
  ('Documentaion', default), -- 16
  ('Pokémon', default), -- 17
  ('Communication', default), -- 18
  ('Real-Time', default), -- 19
  ('MVP in Progress', 'status'), -- 20   
  ('MVP Completed', 'status'), -- 21     
  ('Exceeded MVP', 'status'), -- 22      
  ('Database', default), -- 23
  ('Utility', default), -- 24
  ('Group Project', default) -- 25
on conflict do nothing;

insert into
  rdmp_repo_con_tags (repo_id, tag_id)
values
  ('hall-of-fame', 1),
  ('hall-of-fame', 16),
  ('hall-of-fame', 17),
  ('hall-of-fame', 21),
  ('everquill', 1),
  ('everquill', 6),
  ('everquill', 8),
  ('everquill', 18),
  ('everquill', 22),
  ('occupational-specialism', 1),
  ('occupational-specialism', 3),
  ('occupational-specialism', 7),
  ('occupational-specialism', 21),
  ('occupational-specialism', 14),
  ('occupational-specialism', 8),
  ('snake-game', 4),
  ('snake-game', 12),
  ('snake-game', 13),
  ('snake-game', 21),
  ('snake-game', 25)
on conflict do nothing;