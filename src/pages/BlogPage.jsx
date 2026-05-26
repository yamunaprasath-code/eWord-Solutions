import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
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
      {/* Hero */}
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

      {/* Cards grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {blogPosts.map((post, i) => (
              <motion.div key={post.slug} {...fade(i * 0.1)}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  {/* Image placeholder */}
                  <div className={`aspect-[16/9] bg-gradient-to-br ${post.gradient} flex-shrink-0`} />

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-600 font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-500 text-sm leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-3 transition-all">
                      Read more <span aria-hidden>→</span>
                    </div>
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
