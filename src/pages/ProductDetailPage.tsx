import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { useData } from '@/contexts/DataContext';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getProduct, products } = useData();
  const product = getProduct(slug || '');

  if (!product) {
    return (
      <PublicLayout>
        <div className="section-padding">
          <div className="container-page text-center">
            <h1 className="text-2xl font-bold mb-4">Mahsulot topilmadi</h1>
            <Link to="/products">
              <Button>
                <ArrowLeft className="mr-2" size={16} />
                Mahsulotlarga qaytish
              </Button>
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
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
            <Link to="/products" className="text-muted-foreground hover:text-foreground">
              Mahsulotlar
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery - Single main image only */}
            <div>
              <div className="aspect-square bg-muted/50 rounded-2xl overflow-hidden">
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <div
                className={`inline-block mb-4 ${
                  product.category === 'personal' ? 'badge-personal' : 'badge-urban'
                }`}
              >
                {product.category === 'personal' ? 'Shaxsiy' : 'Shahar uchun'}
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">{product.shortDesc}</p>

              <div className="text-4xl font-bold text-primary mb-8">
                {product.price.toLocaleString()} so'm
              </div>

              <div className="flex gap-4 mb-8">
                <Link to="/contact" className="flex-1">
                  <Button className="w-full btn-hero" size="lg">
                    <ShoppingCart className="mr-2" size={20} />
                    Buyurtma berish
                  </Button>
                </Link>
              </div>

              <div className="prose prose-lg text-muted-foreground mb-8">
                <p>{product.fullDesc}</p>
              </div>

              {/* Specs */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Texnik xususiyatlari</h3>
                <div className="bg-muted/30 rounded-xl overflow-hidden">
                  {product.specs.map((spec, index) => (
                    <div
                      key={index}
                      className={`flex justify-between py-3 px-4 ${
                        index !== product.specs.length - 1 ? 'border-b border-border' : ''
                      }`}
                    >
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Qo'llanilishi</h3>
                <div className="space-y-2">
                  {product.useCases.map((useCase, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-primary" />
                      </div>
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-page">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
              O'xshash mahsulotlar
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/products/${relProduct.slug}`}
                  className="card-product group"
                >
                  <div className="aspect-[4/3] bg-muted/50 overflow-hidden">
                    <img
                      src={relProduct.image || '/placeholder.svg'}
                      alt={relProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {relProduct.name}
                    </h3>
                    <div className="text-lg font-bold text-primary">
                      {relProduct.price.toLocaleString()} so'm
                    </div>
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
