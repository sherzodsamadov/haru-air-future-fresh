import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { useData } from '@/contexts/DataContext';

export default function ProductsPage() {
  const { products, categories } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-nature overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-page relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Mahsulotlar
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Shaxsiy foydalanish uchun mini tozalagichlardan shahar miqyosidagi moxli panellargacha — har bir ehtiyoj uchun yechim.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-page">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Mahsulot nomini qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground mr-2 flex items-center gap-1">
                <Filter size={16} />
                Kategoriya:
              </span>
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange('all')}
              >
                Barchasi
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.slug ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(cat.slug)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-sm text-muted-foreground">
            {filteredProducts.length} ta mahsulot topildi
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  className="card-product group"
                >
                  <div className="aspect-[4/3] bg-muted/50 relative overflow-hidden">
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute top-4 left-4 ${
                        product.category === 'personal' ? 'badge-personal' : 'badge-urban'
                      }`}
                    >
                      {product.category === 'personal' ? 'Shaxsiy' : 'Shahar uchun'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.shortDesc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {product.price.toLocaleString()} so'm
                      </span>
                      <span className="text-sm text-primary font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Batafsil <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mahsulot topilmadi</h3>
              <p className="text-muted-foreground">
                Qidiruv so'rovingizni o'zgartirib ko'ring
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
