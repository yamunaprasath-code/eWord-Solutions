import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { blogPostsMap } from '@/data/blog/blogPosts';
import { ROUTES } from '@/constants/routes';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPostsMap[slug];

  return (
    <MainLayout>
      <div className="pt-[72px]">
        {post ? (
          <>
            <section className="py-20 bg-slate-900">
              <div className="max-w-3xl mx-auto px-6">
                <Link
                  to={ROUTES.BLOG}
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-4 block">
                    {post.category}
                  </span>
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="py-16 bg-white">
              <div className="max-w-3xl mx-auto px-6">
                <div className="prose prose-slate prose-lg max-w-none">
                  {post.body
                    .trim()
                    .split('\n\n')
                    .map((para, i) => {
                      if (para.startsWith('## ')) {
                        return (
                          <h2
                            key={i}
                            className="font-display text-2xl font-bold text-slate-900 mt-10 mb-4"
                          >
                            {para.replace('## ', '')}
                          </h2>
                        );
                      }
                      return (
                        <p key={i} className="text-slate-600 leading-relaxed mb-5">
                          {para}
                        </p>
                      );
                    })}
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <Link
                    to={ROUTES.BLOG}
                    className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm hover:text-brand-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                  </Link>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
              <h1 className="font-display text-3xl font-bold text-slate-900 mb-4">
                Post not found
              </h1>
              <Link to={ROUTES.BLOG} className="text-brand-600 font-semibold hover:underline">
                Back to Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
