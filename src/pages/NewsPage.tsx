import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { useData } from '@/contexts/DataContext';

export default function NewsPage() {
  const { news } = useData();

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-nature overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-page relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Yangiliklar
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              HARU AIR kompaniyasidan eng so'nggi xabarlar, loyihalar va yutuqlar haqida bilib oling.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding">
        <div className="container-page">
          {news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.slug}`}
                  className="card-product group"
                >
                  <div className="aspect-[16/10] bg-muted/50 relative overflow-hidden">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
                    <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                    <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      O'qish <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Yangiliklar yo'q</h3>
              <p className="text-muted-foreground">
                Tez orada yangi xabarlar paydo bo'ladi
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
