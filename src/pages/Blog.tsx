import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Calendar, Clock, User, Plus, Trash2, 
  Copy, Check, BookOpen, AlertCircle, ArrowLeft, ChevronRight, Filter, FileText
} from 'lucide-react';
import { DEFAULT_BLOGS, BlogPost } from '../data/blogs';

export default function Blog({ id, isStandalone = false }: { id: string; isStandalone?: boolean }) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(isStandalone);
  
  // Admin Panel states
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  
  // Create Post fields
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Noticias');
  const [newAuthor, setNewAuthor] = useState('');
  const [newReadTime, setNewReadTime] = useState('5 min de lectura');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Built-in cool covers for fast creation
  const TEMPLATE_IMAGES = [
    { name: "Cabina de Pilotos", url: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800" },
    { name: "Cataratas / Vuelo", url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800" },
    { name: "Estudiantes / Clase", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" },
    { name: "Avión en Pista", url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800" },
  ];

  // Initialize blogs list from LocalStorage + defaults
  useEffect(() => {
    const stored = localStorage.getItem('icaas_blogs');
    if (stored) {
      try {
        setBlogs(JSON.parse(stored));
      } catch (e) {
        setBlogs(DEFAULT_BLOGS);
      }
    } else {
      setBlogs(DEFAULT_BLOGS);
      localStorage.setItem('icaas_blogs', JSON.stringify(DEFAULT_BLOGS));
    }
  }, []);

  // Save changes to localstorage helper
  const updateBlogsStateAndStorage = (updatedList: BlogPost[]) => {
    setBlogs(updatedList);
    localStorage.setItem('icaas_blogs', JSON.stringify(updatedList));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newContent || !newSummary) {
      alert("Por favor rellena los campos requeridos.");
      return;
    }

    const newPost: BlogPost = {
      id: newTitle.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
      title: newTitle,
      category: newCategory,
      date: new Date().toISOString().split('T')[0],
      readTime: newReadTime,
      author: newAuthor,
      summary: newSummary,
      content: newContent,
      imageUrl: newImageUrl || TEMPLATE_IMAGES[0].url
    };

    const updatedList = [newPost, ...blogs];
    updateBlogsStateAndStorage(updatedList);
    
    // Clear form
    setNewTitle('');
    setNewAuthor('');
    setNewSummary('');
    setNewContent('');
    setNewImageUrl('');
    
    setSuccessMsg("¡Entrada creada con éxito localmente! Copia el código JSON usando el panel a la derecha prara integrarlo estáticamente.");
    setTimeout(() => setSuccessMsg(''), 8000);
  };

  const handleDeletePost = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDeleteId(idToDelete);
  };

  const handleResetDefaults = () => {
    setConfirmReset(true);
  };

  const handleCopyJSON = () => {
    const codeString = `export const DEFAULT_BLOGS: BlogPost[] = ${JSON.stringify(blogs, null, 2)};`;
    navigator.clipboard.writeText(codeString)
      .then(() => {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 3000);
      });
  };

  // Categories list
  const categories = ['Todos', ...Array.from(new Set(blogs.map(b => b.category)))];

  // Filtering list
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'Todos' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate items to display (initial 3, or all when expanded)
  const displayedBlogs = isSectionExpanded ? filteredBlogs : filteredBlogs.slice(0, 3);

  return (
    <section id={id} className={`py-16 sm:py-24 bg-gradient-to-b from-[#0F1115] via-[#161922] to-[#0A0B0D] text-white overflow-hidden border-t border-white/5 scroll-mt-16 selection:bg-primary selection:text-white ${isStandalone ? 'pt-28 md:pt-36 min-h-screen' : ''}`}>
      
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <span className="text-[10px] text-primary tracking-[0.3em] font-extrabold uppercase mb-3 block">Bitácora de Vuelo</span>
          <h2 className="text-3xl sm:text-5xl mb-4 text-white font-black tracking-tighter">
            Nuestro <span className="text-primary italic">Blog.</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Explora noticias, artículos e información del fascinante mundo de la aviación.
          </p>
          
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="mt-6 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0 bg-transparent text-gray-400 hover:text-primary hover:bg-primary/5 border border-dashed border-white/10 hover:border-primary/40 px-4 py-2.5 rounded-xl font-bold text-[9px] uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
          >
            <FileText size={12} />
            {isAdminMode ? "Cerrar Panel" : "Administrar Artículos"}
          </button>
        </div>

        {/* ================= ADMIN ZONE ================= */}
        <AnimatePresence>
          {isAdminMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-[#12151d]/65 border-2 border-white/15 rounded-3xl p-6 sm:p-8 shadow-inner mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
                  <div>
                    <h2 className="text-base font-black italic text-primary flex items-center gap-2">
                      <Plus className="size-4" /> Panel de Administración y Carga de Blogs
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-1 font-light">
                      Agrega nuevos artículos en segundos. Los cambios se guardarán localmente para previsualizarlos de inmediato en el Home.
                    </p>
                  </div>
                  <button 
                    onClick={handleResetDefaults}
                    className="text-[9px] text-red-400 hover:text-red-500 bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black uppercase transition-colors"
                  >
                    Restablecer Originales
                  </button>
                </div>

                {successMsg && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="my-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 text-xs font-semibold flex items-start gap-2.5"
                  >
                    <div className="p-1 bg-emerald-500 text-white rounded-full"><Check size={12} /></div>
                    <div>{successMsg}</div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 text-center">
                  {/* CREATE FORM */}
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-4 border-primary pl-2">Nueva Entrada (Local)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Título del Artículo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Requisitos médicos para sobrecargos"
                          value={newTitle}
                          onChange={e => setNewTitle(e.target.value)}
                          className="w-full bg-[#161a25]/65 border border-white/10 focus:border-primary text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Autor / Instructor *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Instructora Diana Gómez"
                          value={newAuthor}
                          onChange={e => setNewAuthor(e.target.value)}
                          className="w-full bg-[#161a25]/65 border border-white/10 focus:border-primary text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Categoría *</label>
                        <select
                          value={newCategory}
                          onChange={e => setNewCategory(e.target.value)}
                          className="w-full bg-[#161a25]/65 border border-white/10 focus:border-primary text-white rounded-xl px-4 py-2.5 text-xs outline-none transition-colors cursor-pointer"
                        >
                          <option value="Noticias" className="bg-[#161a25] text-white">Noticias</option>
                          <option value="Sobrecargos" className="bg-[#161a25] text-white">Sobrecargos</option>
                          <option value="Oficial de Operaciones" className="bg-[#161a25] text-white">Oficial de Operaciones</option>
                          <option value="Idiomas" className="bg-[#161a25] text-white">Idiomas</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Tiempo de Lectura</label>
                        <input
                          type="text"
                          placeholder="Ej. 5 min de lectura"
                          value={newReadTime}
                          onChange={e => setNewReadTime(e.target.value)}
                          className="w-full bg-[#161a25]/65 border border-white/10 focus:border-primary text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1 font-bold">Imagen de portada (URL)</label>
                      <input
                        type="url"
                        placeholder="Inserta un link de Unsplash u otra imagen"
                        value={newImageUrl}
                        onChange={e => setNewImageUrl(e.target.value)}
                        className="w-full bg-[#161a25]/65 border border-white/10 focus:border-primary text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors text-ellipsis"
                      />
                      <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                        {TEMPLATE_IMAGES.map((img, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setNewImageUrl(img.url)}
                            className={`px-2 py-1 text-[8px] bg-white/5 hover:bg-white/15 rounded text-gray-300 font-bold transition-all whitespace-nowrap border ${
                              newImageUrl === img.url ? 'border-primary ring-1 ring-primary/30 text-primary bg-primary/5' : 'border-transparent'
                            }`}
                          >
                            🎨 {img.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Resumen de Introducción *</label>
                      <textarea
                        required
                        rows={2}
                        maxLength={220}
                        placeholder="Escribe una breve descripción atractiva de un párrafo para las tarjetas del blog."
                        value={newSummary}
                        onChange={e => setNewSummary(e.target.value)}
                        className="w-full bg-[#161a25]/65 border border-white/10 focus:border-primary text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-gray-400 mb-1">Contenido Completo (Salto de Línea Soportado) *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Desarrolla el contenido extenso del blog..."
                        value={newContent}
                        onChange={e => setNewContent(e.target.value)}
                        className="w-full bg-[#161a25]/65 border border-white/10 focus:border-primary text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-md cursor-pointer"
                    >
                      Crear en Vista Local
                    </button>
                  </form>

                  {/* HOW TO PUBLISH EXPORT BLOCK */}
                  <div className="bg-[#1e2333]/40 rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="text-primary size-4" />
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-white">¿Cómo se publica de manera estática?</h4>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Este sitio web se ejecuta de manera estática. Para que tus nuevos artículos sean persistentes de forma definitiva para todos los usuarios:
                      </p>
                      
                      <ol className="list-decimal text-[11px] text-gray-400 mt-2 pl-4 space-y-1.5 leading-relaxed">
                        <li>Agrega tus blogs utilizando el formulario de la izquierda.</li>
                        <li>Haz clic en el botón abajo para <strong>"Copiar Código JSON de Blogs"</strong>.</li>
                        <li>Pega la constante copiada reemplazando los blogs en el archivo: <code className="bg-[#161a25] text-primary px-1 rounded text-[10px] font-mono">/src/data/blogs.ts</code></li>
                      </ol>

                      {/* EXCLUSIVE COPYABLE PREVIEW SCREEN */}
                      <div className="mt-4 bg-[#0f1115] rounded-xl p-3 border border-white/5 text-center relative group">
                        <div className="flex items-center justify-between pb-1.5 border-white/5 text-[9px] font-mono text-gray-400">
                          <span>blogs.ts</span>
                          <span className="text-gray-500 uppercase tracking-widest text-[8px] font-bold">Vista Preliminar</span>
                        </div>
                        <pre className="text-[9px] font-mono text-emerald-400 max-h-32 overflow-y-auto mt-2 leading-relaxed custom-scrollbar whitespace-pre-wrap select-all focus:outline-none">
                          {`export const DEFAULT_BLOGS: BlogPost[] = ${JSON.stringify(blogs.map(b => ({
                            id: b.id,
                            title: b.title,
                            category: b.category,
                            date: b.date,
                            readTime: b.readTime,
                            author: b.author,
                            summary: b.summary,
                            imageUrl: b.imageUrl,
                            content: b.content.substring(0, 50) + '...'
                          })), null, 2)};`}
                        </pre>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleCopyJSON}
                        className="w-full border-2 border-dashed border-primary/40 hover:border-primary text-white hover:text-primary bg-[#12151d] py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {copiedCode ? (
                          <>
                            <Check size={14} className="text-emerald-500 animate-bounce" />
                            <span className="text-emerald-500">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copiar Código JSON de Blogs</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= CLASSIFICATIONS & SEARCH FILTER ================= */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-10 text-center">
          
          {/* CATEGORIES CHIPS */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-gray-400 text-[10px] uppercase font-black tracking-widest flex items-center gap-1 mr-2"><Filter size={11} /> Categorías:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' 
                    : 'bg-[#12151d]/50 text-white/85 hover:bg-white/5 border border-white/5 hover:border-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SEARCH BOX */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar artículo..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#161a25]/60 border border-white/10 placeholder-gray-500 focus:border-primary/40 rounded-full pl-11 pr-5 py-2 text-xs outline-none transition-colors shadow-sm text-white font-medium"
            />
          </div>
        </div>

        {/* ================= BLOG CARDS DISPLAY ================= */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-[#12151d]/40 rounded-3xl border border-white/5 shadow-sm max-w-lg mx-auto px-6">
            <BookOpen className="mx-auto text-primary size-10 mb-4 stroke-1 opacity-70" />
            <h3 className="text-base font-bold text-white mb-1">Sin entradas que mostrar</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              No hemos encontrado artículos que coincidan con la búsqueda. Intenta otra búsqueda o agrega un artículo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {displayedBlogs.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.4, 
                  delay: (idx % 3) * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                onClick={() => setActivePost(post)}
                className="bg-[#12151d]/40 rounded-[24px] sm:rounded-[32px] overflow-hidden border-2 border-white/15 hover:border-primary/45 hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* COVER IMAGE */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase font-black px-3 py-1 rounded-full tracking-widest shadow-md">
                      {post.category}
                    </div>
                    {/* Delete button (only in admin view / locally created) */}
                    {isAdminMode && (
                      <button
                        onClick={(e) => handleDeletePost(post.id, e)}
                        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                        title="Eliminar artículo"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>

                  {/* INFO CONTAINER */}
                  <div className="p-6">
                    {/* Meta stats */}
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-2.5">
                      <span className="flex items-center gap-1"><Calendar size={10} className="text-primary" /> {post.date.replace(/-/g, ' / ')}</span>
                      <span className="flex items-center gap-1"><Clock size={10} className="text-primary" /> {post.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black leading-tight text-white group-hover:text-primary transition-colors duration-300 mb-2 italic">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-xs font-light leading-relaxed mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* FOOTER CTA */}
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase text-gray-400 flex items-center gap-1">
                    <User size={10} className="text-primary" /> {post.author}
                  </span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 group-hover:scale-105 transition-transform">
                    Leer más <ChevronRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* EXPAND OR COLLAPSE BUTTON */}
        {filteredBlogs.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                setIsSectionExpanded(!isSectionExpanded);
                if (isSectionExpanded) {
                  // Smoothly scroll back to blog heading
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 bg-[#12151d] border border-white/10 hover:bg-primary text-white font-black text-[10px] tracking-widest uppercase px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isSectionExpanded ? "Colapsar Artículos" : "Ver Más Artículos"}
            </button>
          </div>
        )}
      </div>

      {/* ================= DETAIL POST MODAL: IMMERSIVE READER ================= */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10">
            
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Centered Reader Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-[#0F1115] rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden max-h-[92vh] md:max-h-[90vh] flex flex-col z-10 border border-white/10 focus:outline-none text-white font-sans"
            >
              
              {/* Back stick header for scroll */}
              <div className="sticky top-0 right-0 left-0 bg-[#0F1115]/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between z-10 text-center">
                <button
                  onClick={() => setActivePost(null)}
                  className="flex items-center gap-2 hover:text-primary text-white text-[10px] font-black uppercase tracking-widest pl-1.5 cursor-pointer"
                >
                  <ArrowLeft size={16} /> Volver al inicio
                </button>
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 text-primary text-[8px] sm:text-[10px] uppercase font-black px-3 py-1.5 rounded-full tracking-widest">
                    {activePost.category}
                  </span>
                  <button 
                    onClick={() => setActivePost(null)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-white cursor-pointer"
                  >
                    <Plus className="rotate-45 size-5" />
                  </button>
                </div>
              </div>

              {/* POST CONTENT */}
              <article className="flex-grow text-center overflow-y-auto overscroll-contain">
                {/* Large Cover Image */}
                <div className="relative aspect-[21/9] w-full bg-slate-900 overflow-hidden">
                  <img
                    src={activePost.imageUrl}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent" />
                  
                  {/* Floating Absolute title content in Image overlay */}
                  <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-2xl text-white">
                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-2">{activePost.category}</p>
                    <h2 className="text-xl md:text-3xl font-black italic tracking-tight leading-tight text-white">
                      {activePost.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 md:p-12 max-w-3xl mx-auto">
                  {/* Meta stats below cover */}
                  <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-white/5 text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-8">
                    <span className="flex items-center gap-2 text-white"><User size={13} className="text-primary" /> {activePost.author}</span>
                    <span className="flex items-center gap-2"><Calendar size={13} className="text-primary" /> {activePost.date}</span>
                    <span className="flex items-center gap-2"><Clock size={13} className="text-primary" /> {activePost.readTime}</span>
                  </div>

                  {/* INTRO SUMMARY */}
                  <div className="leading-relaxed bg-[#161922]/70 border-l-4 border-primary p-5 sm:p-6 rounded-r-2xl mb-8">
                    <blockquote className="text-sm font-semibold italic text-white leading-relaxed">
                      "{activePost.summary}"
                    </blockquote>
                  </div>

                  {/* BODY TEXT */}
                  <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6">
                    {activePost.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('###')) {
                        return (
                          <h3 key={index} className="text-lg sm:text-xl font-extrabold text-white italic mt-8 pt-4 pb-1 border-b border-white/5">
                            {paragraph.replace('###', '').trim()}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('*')) {
                        const listItems = paragraph.split('\n').filter(Boolean);
                        return (
                          <ul key={index} className="list-disc pl-5 space-y-2 mt-2">
                            {listItems.map((li, liIdx) => (
                              <li key={liIdx} className="text-xs sm:text-sm text-gray-300">
                                {li.replace('*', '').trim()}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (paragraph.startsWith('1.')) {
                        const listItems = paragraph.split('\n').filter(Boolean);
                        return (
                          <ol key={index} className="list-decimal pl-5 space-y-2.5 mt-2 text-gray-300">
                            {listItems.map((li, liIdx) => {
                              const cleanText = li.replace(/^\d+\.\s*/, '').trim();
                              if (cleanText.includes('**')) {
                                const parts = cleanText.split('**');
                                return (
                                  <li key={liIdx} className="text-xs sm:text-sm text-gray-300">
                                    <strong className="text-white">{parts[1]}</strong> {parts[2]}
                                  </li>
                                );
                              }
                              return (
                                <li key={liIdx} className="text-xs sm:text-sm text-gray-300">
                                  {cleanText}
                                </li>
                              );
                            })}
                          </ol>
                        );
                      }
                      
                      if (paragraph.includes('**')) {
                        const parts = paragraph.split('**');
                        return (
                          <p key={index} className="text-xs sm:text-sm sm:text-[15px] font-light leading-relaxed text-gray-300">
                            {parts[0]}
                            <strong className="text-white">{parts[1]}</strong>
                            {parts[2]}
                          </p>
                        );
                      }

                      return (
                        <p key={index} className="text-xs sm:text-sm sm:text-[15px] font-light leading-relaxed text-gray-300 whitespace-pre-line">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* CALL TO ACTION */}
                  <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-primary mb-3">¿Te apasiona el mundo aeronáutico?</p>
                    <h4 className="text-xl font-black italic text-white leading-tight mb-4">¡Inicia hoy tu carrera internacional en ICAAS!</h4>
                    <div className="flex flex-wrap justify-center gap-4">
                      <a
                        href="https://wa.me/529987510172?text=Hola,%20le%C3%AD%20el%20art%C3%ADculo%20sobre%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-secondary text-white font-black text-[10px] uppercase tracking-widest px-8 py-3.5 rounded-full transition-transform hover:scale-105 shadow-lg shadow-primary/20 cursor-pointer"
                      >
                        Hablar con un asesor vía WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </article>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Confirmation Modal for Delete */}
      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDeleteId(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#12151d] text-white rounded-3xl p-6 sm:p-8 max-w-sm w-full relative z-10 border border-white/10 shadow-2xl text-center"
            >
              <span className="text-3xl mb-4 block">🗑️</span>
              <h3 className="text-base font-black text-white uppercase tracking-tight mb-2">¿Eliminar artículo?</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                Esta acción eliminará el artículo de tu vista local. Tendrás que re-importarlo o reiniciar para recuperarlo.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 bg-white/5 hover:bg-white/15 text-white text-[10px] font-black uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updatedList = blogs.filter(p => p.id !== confirmDeleteId);
                    updateBlogsStateAndStorage(updatedList);
                    if (activePost?.id === confirmDeleteId) {
                      setActivePost(null);
                    }
                    setConfirmDeleteId(null);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-red-600/10"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Confirmation Modal for Reset Defaults */}
      <AnimatePresence>
        {confirmReset && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmReset(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#12151d] text-white rounded-3xl p-6 sm:p-8 max-w-sm w-full relative z-10 border border-white/10 shadow-2xl text-center"
            >
              <span className="text-3xl mb-4 block">🔄</span>
              <h3 className="text-base font-black text-white uppercase tracking-tight mb-2">¿Restablecer Blogs?</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                Se restablecerán todos los artículos a los originales del sistema. Se perderán permanentemente tus cambios locales no guardados en el código.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 bg-white/5 hover:bg-white/15 text-white text-[10px] font-black uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateBlogsStateAndStorage(DEFAULT_BLOGS);
                    setConfirmReset(false);
                  }}
                  className="flex-1 bg-primary hover:bg-secondary text-white text-[10px] font-black uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-primary/10"
                >
                  Restablecer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
