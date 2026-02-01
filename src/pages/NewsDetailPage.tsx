import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { useData } from '@/contexts/DataContext';

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getNewsItem, news } = useData();
  const item = getNewsItem(slug || '');

  if (!item) {
    return (
      <PublicLayout>
        <div className="section-padding">
          <div className="container-page text-center">
            <h1 className="text-2xl font-bold mb-4">Yangilik topilmadi</h1>
            <Link to="/news">
              <Button>
                <ArrowLeft className="mr-2" size={16} />
                Yangiliklarqa qaytish
              </Button>
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const relatedNews = news
    .filter((n) => n.id !== item.id)
    .slice(0, 3);

  return (
    <PublicLayout>
      {/* Breadcrumb */}
      <section className="py-4 bg-muted/30">
        <div className="container-page">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Bosh sahifa
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/news" className="text-muted-foreground hover:text-foreground">
              Yangiliklar
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground line-clamp-1">{item.title}</span>
          </nav>
        </div>
      </section>

      {/* Article */}
      <article className="section-padding">
        <div className="container-page">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(item.publishedAt).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {item.author}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">
                {item.title}
              </h1>
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="badge-category flex items-center gap-1">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Image */}
            <div className="aspect-[16/9] bg-muted/50 rounded-2xl overflow-hidden mb-8">
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {item.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Back */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link to="/news">
                <Button variant="outline">
                  <ArrowLeft className="mr-2" size={16} />
                  Barcha yangiliklar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-page">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
              Boshqa yangiliklar
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedNews.map((relItem) => (
                <Link
                  key={relItem.id}
                  to={`/news/${relItem.slug}`}
                  className="card-product group"
                >
                  <div className="aspect-[16/10] bg-muted/50 overflow-hidden">
                    <img
                      src={relItem.image || '/placeholder.svg'}
                      alt={relItem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(relItem.publishedAt).toLocaleDateString('uz-UZ')}
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {relItem.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
