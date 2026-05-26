import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { blogPosts } from '@/data/blog/blogPosts';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function BlogPage() {
  return (
    <MainLayout>
      <section className="relative pt-36 pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-slate-900/90 to-slate-900" />
        <motion.div {...fade()} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 mb-6">
            Resources
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Blog
          </h1>
          <p className="text-slate-400 text-lg">
            Insights and guides for California workers' comp legal professionals.
          </p>
        </motion.div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div key={post.slug} {...fade(i * 0.1)}>
                <Link to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full p-8 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">
                    {post.category}
                  </span>
                  <h2 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed flex-1 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
