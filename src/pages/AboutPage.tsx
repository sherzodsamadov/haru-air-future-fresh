import { Link } from 'react-router-dom';
import { Target, Users, Leaf, Shield, Globe, Award } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { useData } from '@/contexts/DataContext';
import productUrbanPanel from '@/assets/product-urban-panel.png';
import productDesktop from '@/assets/product-desktop.png';

export default function AboutPage() {
  const { settings } = useData();

  const values = [
    {
      icon: Leaf,
      title: 'Ekologik barqarorlik',
      description: "Tabiatni asraydigan va unga zarar bermaydigan yechimlar yaratamiz",
    },
    {
      icon: Target,
      title: 'Innovatsiya',
      description: "Eng so'nggi texnologiyalarni tabiat bilan uyg'unlashtirish",
    },
    {
      icon: Users,
      title: 'Jamoaviy ish',
      description: "Hamkorlikda katta maqsadlarga erishamiz",
    },
    {
      icon: Shield,
      title: 'Sifat kafolati',
      description: "Har bir mahsulotimiz yuqori standartlarga javob beradi",
    },
    {
      icon: Globe,
      title: 'Global ta\'sir',
      description: "O'zbekistondan jahon ekologiyasiga hissa qo'shamiz",
    },
    {
      icon: Award,
      title: "Mukammallikka intilish",
      description: "Doimo o'z ustimizda ishlaymiz va rivojlanamiz",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-nature overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-page relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Biz haqimizda
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              HARU AIR — O'zbekistonda birinchi marta tabiiy mox texnologiyasidan foydalangan holda havo tozalash tizimlarini ishlab chiquvchi innovatsion kompaniya.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Korxona faoliyati
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>{settings.aboutText}</p>
                <p className="mt-4">
                  Bizning mahsulotlarimiz shaxsiy foydalanish uchun kichik havo tozalagichlardan tortib, 
                  shahar maydonchalari va sanoat hududlari uchun katta miqyosdagi moxli panellargacha 
                  keng assortimentni o'z ichiga oladi.
                </p>
                <p className="mt-4">
                  Har bir mahsulotimiz qat'iy sifat nazoratidan o'tadi va uzoq muddatli xizmat ko'rsatish 
                  kafolati bilan ta'minlanadi.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
              <img
                src={productUrbanPanel}
                alt="HARU AIR in action"
                className="relative rounded-2xl w-full shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-muted/30">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-3xl blur-2xl" />
              <img
                src={productDesktop}
                alt="HARU AIR Mission"
                className="relative rounded-2xl w-full shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Target size={16} />
                Bizning missiya
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Toza havo — har bir inson huquqi
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {settings.missionText}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">2022</div>
                  <div className="text-sm text-muted-foreground">Asos solingan</div>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">O'rnatilgan tizimlar</div>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">1000+</div>
                  <div className="text-sm text-muted-foreground">Mijozlar</div>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-1">15+</div>
                  <div className="text-sm text-muted-foreground">Jamoa a'zolari</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Bizning qadriyatlarimiz
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Biz har kuni shu qadriyatlar asosida ishlaymiz va qarorlar qabul qilamiz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card-eco">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-page text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Biz bilan hamkorlik qiling
          </h2>
          <p className="text-background/70 max-w-xl mx-auto mb-8">
            Sizning loyihangiz uchun eng mos havo tozalash yechimini topishga yordam beramiz.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Bog'lanish
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
