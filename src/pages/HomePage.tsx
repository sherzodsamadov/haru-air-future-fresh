import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Wind, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { useData } from '@/contexts/DataContext';
import { Partners } from '@/components/Partners';
import productPersonal from '@/assets/product-personal.png';
import productUrbanPanel from '@/assets/product-urban-panel.png';

export default function HomePage() {
  const { products, news, settings } = useData();
  const featuredProducts = products.slice(0, 3);
  const latestNews = news.slice(0, 3);

  const features = [
    {
      icon: Leaf,
      title: 'Tabiiy mox texnologiyasi',
      description: "O'simlik kuchini zamonaviy texnologiya bilan birlashtirdik",
    },
    {
      icon: Wind,
      title: 'Samarali filtrlash',
      description: 'PM2.5, PM10 va CO2 ni 99% gacha tozalash',
    },
    {
      icon: Shield,
      title: 'Ekologik xavfsizlik',
      description: "Tabiatga zarar bermaydigan barqaror yechimlar",
    },
    {
      icon: Zap,
      title: 'Kam energiya sarfi',
      description: "Quyosh energiyasi va samarali dizayn bilan ishlaydi",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-nature" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container-page relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Leaf size={16} />
                <span>Eko-texnologiya yechimi</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                <span className="text-gradient-eco">Toza havo</span>
                <br />
                <span className="text-foreground">toza kelajak uchun</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                {settings.slogan}. Biz tabiiy mox texnologiyasi orqali havoni tozalash bo'yicha innovatsion yechimlar taqdim etamiz.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="btn-hero">
                    Mahsulotlar
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="btn-hero-outline">
                    Bog'lanish
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-bold text-primary">275+</div>
                  <div className="text-sm text-muted-foreground">Daraxt ekvivalenti</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">99%</div>
                  <div className="text-sm text-muted-foreground">Filtrlash samarasi</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Yillik xizmat</div>
                </div>
              </div>
            </div>

            {/* Hero Images */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
                <img
                  src={productUrbanPanel}
                  alt="HARU AIR Urban Panel"
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 animate-float">
                <div className="bg-card p-4 rounded-2xl shadow-xl">
                  <img
                    src={productPersonal}
                    alt="HARU AIR Personal"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Nima uchun <span className="text-gradient-eco">HARU AIR</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Biz tabiiy yechimlarni zamonaviy texnologiya bilan birlashtirgan holda, eng samarali havo tozalash tizimlarini yaratamiz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-eco group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="section-padding">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Bizning mahsulotlar
              </h2>
              <p className="text-muted-foreground">
                Shaxsiy va shahar uchun havo tozalash yechimlari
              </p>
            </div>
            <Link to="/products" className="hidden md:flex">
              <Button variant="outline">
                Barchasini ko'rish
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="card-product group flex flex-col h-full"
              >
                <div className="aspect-[4/3] bg-muted/50 relative overflow-hidden flex-shrink-0">
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 left-4 ${product.category === 'personal' ? 'badge-personal' : 'badge-urban'}`}>
                    {product.category === 'personal' ? 'Shaxsiy' : 'Shahar uchun'}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                    {product.shortDesc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
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

          <Link to="/products" className="md:hidden mt-8 block">
            <Button variant="outline" className="w-full">
              Barchasini ko'rish
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Technology Preview */}
      <section className="section-padding bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10" />
        <div className="container-page relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Mox texnologiyasi qanday ishlaydi?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 text-primary-foreground font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Havo tortiladi</h3>
                    <p className="text-background/70">Jim ventilyator havoni panel ichiga tortib oladi</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 text-primary-foreground font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Mox orqali o'tadi</h3>
                    <p className="text-background/70">PM2.5, PM10 zarrachalari va CO2 mox tomonidan yutiladi</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 text-primary-foreground font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Tozalangan havo chiqariladi</h3>
                    <p className="text-background/70">Toza va yangi havo atrof-muhitga qaytariladi</p>
                  </div>
                </div>
              </div>
              <Link to="/technology" className="mt-8 inline-block">
                <Button className="bg-primary hover:bg-primary/90">
                  Batafsil o'qish
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/30 rounded-3xl blur-3xl" />
              <img
                src={productUrbanPanel}
                alt="HARU AIR Technology"
                className="relative rounded-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="section-padding">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                So'nggi yangiliklar
              </h2>
              <p className="text-muted-foreground">
                HARU AIR'dan eng so'nggi xabarlar
              </p>
            </div>
            <Link to="/news" className="hidden md:flex">
              <Button variant="outline">
                Barcha yangiliklar
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((item) => (
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
                  <div className="text-sm text-muted-foreground mb-2">
                    {new Date(item.publishedAt).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link to="/news" className="md:hidden mt-8 block">
            <Button variant="outline" className="w-full">
              Barcha yangiliklar
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Partners Section */}
      <Partners />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-secondary">
        <div className="container-page text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Toza kelajak bugun boshlanadi
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Biz bilan bog'laning va sizning ehtiyojlaringizga mos keladigan havo tozalash yechimini tanlang.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Bog'lanish
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Mahsulotlarni ko'rish
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
