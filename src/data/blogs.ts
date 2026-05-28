export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content: string;
  imageUrl: string;
}

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Nueva Entrada de Blog 1",
    category: "Noticias",
    date: "2026-05-22",
    readTime: "-- min",
    author: "Administrador",
    summary: "Espacio reservado para el resumen y descripción corta de la primera entrada del blog corporativo.",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    content: "Contenido de la entrada del blog 1. Próximamente se cargará el material informativo definitivo de esta entrada."
  },
  {
    id: "blog-2",
    title: "Nueva Entrada de Blog 2",
    category: "Noticias",
    date: "2026-05-22",
    readTime: "-- min",
    author: "Administrador",
    summary: "Espacio reservado para el resumen y descripción corta de la segunda entrada del blog corporativo.",
    imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800",
    content: "Contenido de la entrada del blog 2. Próximamente se cargará el material informativo definitivo de esta entrada."
  },
  {
    id: "blog-3",
    title: "Nueva Entrada de Blog 3",
    category: "Noticias",
    date: "2026-05-22",
    readTime: "-- min",
    author: "Administrador",
    summary: "Espacio reservado para el resumen y descripción corta de la tercera entrada del blog corporativo.",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
    content: "Contenido de la entrada del blog 3. Próximamente se cargará el material informativo definitivo de esta entrada."
  },
  {
    id: "blog-4",
    title: "Nueva Entrada de Blog 4",
    category: "Noticias",
    date: "2026-05-22",
    readTime: "-- min",
    author: "Administrador",
    summary: "Espacio reservado para el resumen y descripción corta de la cuarta entrada del blog corporativo.",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800",
    content: "Contenido de la entrada del blog 4. Próximamente se cargará el material informativo definitivo de esta entrada."
  },
  {
    id: "blog-5",
    title: "Nueva Entrada de Blog 5",
    category: "Noticias",
    date: "2026-05-22",
    readTime: "-- min",
    author: "Administrador",
    summary: "Espacio reservado para el resumen y descripción corta de la quinta entrada del blog corporativo.",
    imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800",
    content: "Contenido de la entrada del blog 5. Próximamente se cargará el material informativo definitivo de esta entrada."
  }
];
