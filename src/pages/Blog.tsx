import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar, X, Tag } from 'lucide-react';
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { BlogPost, DEFAULT_BLOGS } from '../data/blogs';

interface BlogProps {
  id?: string;
  isStandalone?: boolean;
}

export default function Blog({ id = "page-blog", isStandalone = true }: BlogProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isStandalone) {
      const blogId = searchParams.get('id');
      
      let blog: BlogPost | undefined;
      
      if (slug) {
        blog = DEFAULT_BLOGS.find(b => b.slug === slug);
      } else if (blogId) {
        blog = DEFAULT_BLOGS.find(b => b.id === blogId);
      }

      if (blog) {
        setSelectedBlog(blog);
      } else {
        setSelectedBlog(null);
      }
    }
  }, [isStandalone, searchParams, slug]);

  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedBlog]);

  const blogSEO = {
    title: selectedBlog 
      ? `${selectedBlog.title} | Blog ICAAS Aviación` 
      : "Blog de Aviación y Consejos del Sector Aéreo | ICAAS",
    description: selectedBlog 
      ? selectedBlog.excerpt 
      : "Lee artículos, noticias y guías de aviación con temática para Sobrecargos (Asistentes de Vuelo), Oficiales de Operación de Aeronaves y aspirantes de aviación en Cancún.",
    path: selectedBlog 
      ? `/blog/${selectedBlog.slug}` 
      : "/blog",
    structuredData: selectedBlog 
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": selectedBlog.title,
          "description": selectedBlog.excerpt,
          "image": selectedBlog.imageUrl,
          "datePublished": selectedBlog.date,
          "author": {
            "@type": "Organization",
            "name": "ICAAS Aviación"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ICAAS Aviación",
            "logo": {
              "@type": "ImageObject",
              "url": "https://vuela-icaas.com/logo.png"
            }
          }
        }
      : {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog de Aviación | ICAAS",
          "description": "Publicaciones educativas, guías operacionales del sector aeronáutico y noticias de la escuela de aviación ICAAS.",
          "url": "https://vuela-icaas.com/blog"
        }
  };

  useSEO(blogSEO);

  const handleClose = () => {
    setSelectedBlog(null);
    if (isStandalone) {
      if (searchParams.has('id')) {
        setSearchParams({}, { replace: true });
      } else if (slug) {
        navigate('/blog');
      }
    }
  };

  return (
    <div id={id} className={`relative overflow-hidden ${isStandalone ? 'min-h-screen pt-28 md:pt-36 pb-20 bg-gradient-to-b from-[#0F1115] via-[#161922] to-[#0A0B0D] text-white' : 'py-24 bg-neutral border-t border-gray-100'}`}>
      
      {isStandalone && (
        <>
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-20 left-0 w-[350px] h-[350px] bg-[#1877F2]/5 rounded-full blur-[110px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className={`flex flex-col items-center text-center justify-center gap-4 mb-20 pb-8 border-b ${isStandalone ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center justify-center gap-2 mb-2 bg-primary/10 text-primary border border-primary/15 rounded-full px-4 py-1.5 w-fit mx-auto">
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Artículos y Actualizaciones</span>
          </div>
          <h1 className={`text-4xl md:text-[48px] font-black tracking-tighter leading-none mb-2 ${isStandalone ? 'text-white' : 'text-black'}`}>
            <span className="text-primary italic">Blog</span> de la Escuela.
          </h1>
          <p className={`max-w-2xl text-[18px] leading-relaxed text-center mx-auto font-light ${isStandalone ? 'text-gray-400' : 'text-gray-500'}`}>
            Mantente informado con las novedades de la aviación, consejos profesionales y actualizaciones de nuestra comunidad educativa.
          </p>
        </div>

        {/* Read Blog Detail Modal */}
        {mounted && createPortal(
          <AnimatePresence>
            {selectedBlog && (
              <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={handleClose}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={e => e.stopPropagation()}
                  className="bg-white max-w-4xl w-full rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col pt-12 sm:pt-16"
                >
                  <button onClick={handleClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gray-100 text-gray-500 p-2 rounded-full hover:bg-primary hover:text-white transition-colors z-10">
                    <X size={24} />
                  </button>
                  
                  <div className="p-6 sm:p-12 sm:pt-6 overflow-y-auto flex-grow">
                    <div className="flex items-center gap-4 mb-8">
                       <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedBlog.category}</span>
                       <span className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider"><Calendar size={12} /> {selectedBlog.date}</span>
                    </div>
                    <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 leading-relaxed space-y-4">
                       <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Blog Grid */}
        {DEFAULT_BLOGS.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-[32px] py-24 text-center text-gray-500 px-6">
            <Calendar className="mx-auto text-gray-300 size-16 mb-6" />
            <p className="text-xl font-bold mb-2">No hay artículos publicados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEFAULT_BLOGS.map((blog) => (
              <motion.div 
                key={blog.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col relative group cursor-pointer text-secondary h-full"
                onClick={() => {
                  if (isStandalone) {
                    navigate(`/blog/${blog.slug}`);
                  } else {
                    navigate(`/blog/${blog.slug}`);
                  }
                }}
              >
                <div className="h-56 relative overflow-hidden">
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-secondary px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                      <Tag size={10} className="text-primary"/> {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Calendar size={12} className="text-primary" /> {blog.date}
                  </div>
                  <h3 className="text-xl font-black leading-snug mb-4 text-secondary group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-light line-clamp-3 leading-relaxed mb-6">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#EE3E3A] flex items-center gap-2 group-hover:gap-3 transition-all">
                      Leer artículo <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
