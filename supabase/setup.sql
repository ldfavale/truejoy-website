-- Crear la tabla de productos (juegos de mesa físicos)
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  video_url text,
  stock integer not null default 0,
  category text,
  age_range text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security (RLS) en la tabla
alter table public.products enable row level security;

-- Crear una política que permita a cualquiera leer los productos
create policy "Cualquiera puede ver los productos" 
  on public.products 
  for select 
  using (true);

-- Insertar datos semilla (productos de muestra basados en la landing)
insert into public.products (name, description, price, image_url, video_url, stock, category, age_range)
values 
  (
    'Arca de Noé', 
    'Un divertido juego de memoria y estrategia sobre la historia del Arca de Noé. Perfecto para desarrollar habilidades de concentración y aprender sobre la Biblia de una manera interactiva.',
    24900.00,
    '/images/game-1.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    15,
    'Juegos Infantiles',
    '2 - 5'
  ),
  (
    'Familia Unida', 
    'Trivia bíblica emocionante para toda la familia. Reúne a tus seres queridos y pon a prueba tus conocimientos de las Escrituras con cientos de preguntas divertidas y dinámicas grupales.',
    29900.00,
    '/images/game-2.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    25,
    'Juegos Familiares',
    '6 - 12'
  ),
  (
    'Historias Bíblicas', 
    'Aprende las historias más asombrosas de la Biblia jugando. Este juego de cartas desafía a los jugadores a ordenar cronológicamente los eventos clave del Antiguo y Nuevo Testamento.',
    19900.00,
    '/images/game-3.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    30,
    'Juegos de Cartas',
    '6 - 12'
  ),
  (
    'Aventura de Fe', 
    'Un profundo juego de mesa de estrategia y toma de decisiones basado en los viajes de los apóstoles. Supera desafíos, comparte la palabra y fortalece tu fe en cada turno.',
    34900.00,
    '/images/game-4.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    10,
    'Estrategia',
    '12 - 120'
  ),
  (
    'Quiz Bíblico', 
    'El juego de preguntas y respuestas rápido y divertido perfecto para jóvenes y campamentos. Ideal para romper el hielo y repasar las enseñanzas bíblicas con risas aseguradas.',
    17900.00,
    '/images/game-5.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    40,
    'Juegos de Bolsillo',
    '12 - 120'
  );
