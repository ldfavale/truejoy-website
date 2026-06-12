-- Productos adicionales para probar paginación del catálogo
-- Ejecutar en Supabase SQL Editor si ya tienes la base de datos inicializada

insert into public.products (name, description, price, image_url, video_url, stock, category, age_range, created_at)
values
  (
    'David y Goliat',
    'Un juego de destreza y fe inspirado en el valiente David. Lanza, apunta y aprende sobre el coraje que viene de confiar en Dios frente a los gigantes de la vida.',
    21900.00,
    '/images/game-1.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    18,
    'Juegos Infantiles',
    '2 - 5',
    now() - interval '95 days'
  ),
  (
    'Parábolas de Jesús',
    'Descubre las enseñanzas de Jesús a través de parábolas ilustradas. Une personajes, resuelve acertijos y reflexiona sobre valores como el perdón, la generosidad y el amor al prójimo.',
    26900.00,
    '/images/game-2.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    22,
    'Juegos Familiares',
    '6 - 12',
    now() - interval '90 days'
  ),
  (
    'Reyes y Profetas',
    'Recorre la historia de Israel con reyes, profetas y momentos decisivos. Un juego de estrategia ligera ideal para profundizar en el Antiguo Testamento en familia.',
    32900.00,
    '/images/game-3.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    12,
    'Estrategia',
    '12 - 120',
    now() - interval '85 days'
  ),
  (
    'Creación del Mundo',
    'Arma el universo día a día en este juego educativo para los más pequeños. Colores, animales y elementos de la creación en un formato simple y lleno de ternura.',
    18900.00,
    '/images/game-4.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    35,
    'Juegos Infantiles',
    '2 - 5',
    now() - interval '80 days'
  ),
  (
    'Frutos del Espíritu',
    'Cartas y retos que invitan a practicar amor, paz, paciencia y bondad. Perfecto para grupos de jóvenes, células y reuniones familiares con dinámicas participativas.',
    15900.00,
    '/images/game-5.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    45,
    'Juegos de Cartas',
    '6 - 12',
    now() - interval '75 days'
  ),
  (
    'Proverbios Sabios',
    'Pon a prueba tu sabiduría con citas y situaciones basadas en el libro de Proverbios. Ideal para adolescentes y adultos que disfrutan de debates y aprendizaje profundo.',
    23900.00,
    '/images/game-1.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    20,
    'Juegos de Bolsillo',
    '12 - 120',
    now() - interval '70 days'
  ),
  (
    'Salmos de Alabanza',
    'Un juego musical y cooperativo que celebra la adoración. Combina retos creativos, reflexión y momentos de alabanza para toda la familia.',
    27900.00,
    '/images/game-2.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    16,
    'Juegos Familiares',
    '6 - 12',
    now() - interval '65 days'
  ),
  (
    'Viaje por Israel',
    'Recorre ciudades bíblicas, completa misiones y descubre lugares sagrados en un tablero ilustrado. Estrategia moderada con partidas de 45 a 60 minutos.',
    38900.00,
    '/images/game-3.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    8,
    'Estrategia',
    '12 - 120',
    now() - interval '60 days'
  ),
  (
    'Apóstoles en Acción',
    'Sigue los pasos de los discípulos después de Pentecostés. Misiones, cooperación y decisiones morales en un juego dinámico para jóvenes y adultos.',
    31900.00,
    '/images/game-4.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    14,
    'Estrategia',
    '12 - 120',
    now() - interval '55 days'
  ),
  (
    'Jonás y la Ballena',
    'Aventura marina para niños con mecánicas de memoria y cooperación. Una forma tierna de contar la historia de Jonás y la importancia de obedecer a Dios.',
    20900.00,
    '/images/game-5.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    28,
    'Juegos Infantiles',
    '2 - 5',
    now() - interval '50 days'
  ),
  (
    'Moisés y las Plagas',
    'Juego de cartas rápido sobre el Éxodo de Egipto. Aprende los eventos clave mientras compites por completar secuencias históricas.',
    16900.00,
    '/images/game-1.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    32,
    'Juegos de Cartas',
    '6 - 12',
    now() - interval '45 days'
  ),
  (
    'Daniel en el Foso',
    'Cooperativo para niños: trabajen juntos para ayudar a Daniel y aprender sobre oración y valentía. Partidas cortas ideales para la hora del cuento.',
    22900.00,
    '/images/game-2.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    19,
    'Juegos Infantiles',
    '2 - 5',
    now() - interval '40 days'
  ),
  (
    'Rut y Noemí',
    'Un juego de cartas sobre lealtad, amor familiar y provisión divina. Historia conmovedora adaptada para partidas ágiles de 20 minutos.',
    18900.00,
    '/images/game-3.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    24,
    'Juegos de Cartas',
    '6 - 12',
    now() - interval '35 days'
  ),
  (
    'Estér y el Rey',
    'Intriga, valentía y fe en la corte persa. Un juego de deducción ligero para adolescentes y adultos basado en el libro de Ester.',
    29900.00,
    '/images/game-4.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    11,
    'Estrategia',
    '12 - 120',
    now() - interval '30 days'
  ),
  (
    'Torre de Babel',
    'Construye, comunica y ríe con retos de cooperación y caos controlado. Perfecto para grupos grandes en retiros y eventos de iglesia.',
    25900.00,
    '/images/game-5.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    17,
    'Juegos Familiares',
    '6 - 12',
    now() - interval '25 days'
  ),
  (
    'Jerusalén Antigua',
    'Explora el templo, los muros y la vida cotidiana en la ciudad santa. Tablero detallado con mecánicas de exploración para toda la familia.',
    36900.00,
    '/images/game-1.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    9,
    'Estrategia',
    '12 - 120',
    now() - interval '20 days'
  ),
  (
    'Noé Construye',
    'Piezas grandes y reglas simples para armar el arca antes de la lluvia. Desarrolla motricidad fina y trabajo en equipo en los más pequeños.',
    19900.00,
    '/images/game-2.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    26,
    'Juegos Infantiles',
    '2 - 5',
    now() - interval '15 days'
  ),
  (
    'Misioneros del Mundo',
    'Viaja por continentes llevando el evangelio en un juego educativo de geografía y misión. Ideal para escuelas dominicales y familias misioneras.',
    28900.00,
    '/images/game-3.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    13,
    'Juegos Familiares',
    '6 - 12',
    now() - interval '10 days'
  ),
  (
    'Tabernáculo Sagrado',
    'Monta y aprende sobre el tabernáculo con piezas detalladas y tarjetas explicativas. Experiencia educativa profunda para jóvenes y adultos.',
    41900.00,
    '/images/game-4.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    6,
    'Estrategia',
    '12 - 120',
    now() - interval '5 days'
  ),
  (
    'Fe y Obra',
    'Mini juego de bolsillo con retos prácticos de servicio y reflexión. Llévalo a cualquier reunión y activa conversaciones significativas en minutos.',
    14900.00,
    '/images/game-5.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    50,
    'Juegos de Bolsillo',
    '12 - 120',
    now() - interval '1 day'
  );
