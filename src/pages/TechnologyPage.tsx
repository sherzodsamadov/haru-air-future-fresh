import { Wind, Droplets, ThermometerSun, Leaf, Zap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/components/layout/PublicLayout';
import productUrbanPanel from '@/assets/product-urban-panel.png';
import productLiquid3 from '@/assets/product-liquid3.png';

export default function TechnologyPage() {
  const steps = [
    {
      number: 1,
      title: "Havo tortiladi",
      description: "Jim ventilyator atrof-muhitdagi iflos havoni panel ichiga tortib oladi. Shovqinsiz va kam energiya sarflaydi.",
      icon: Wind,
    },
    {
      number: 2,
      title: "Mox orqali o'tadi",
      description: "Havo maxsus o'stirilgan mox qatlami orqali o'tadi. Bu jarayonda PM2.5, PM10 zarrachalari va CO2 mox tomonidan yutiladi.",
      icon: Leaf,
    },
    {
      number: 3,
      title: "Tozalangan havo chiqariladi",
      description: "Mox tomonidan tozalangan va kislorodga boyitilgan havo atrof-muhitga qaytariladi.",
      icon: Zap,
    },
  ];

  const mossAdvantages = [
    {
      icon: Droplets,
      title: "Kam suv talab qiladi",
      description: "Moxlar o'z tuproqsiz o'sadi va minimal miqdorda suv bilan yashaydi",
    },
    {
      icon: ThermometerSun,
      title: "Iqlimga chidamli",
      description: "Issiq va sovuq iqlimga moslashgan — -30°C dan +50°C gacha",
    },
    {
      icon: Leaf,
      title: "Yuqori samaradorlik",
      description: "1 m² mox 275 ta daraxt kabi havo tozalash qobiliyatiga ega",
    },
  ];

  const pollutants = [
    { name: "PM2.5", description: "Mayda chang zarrachalari", efficiency: "99%" },
    { name: "PM10", description: "O'rta hajmli zarrachalar", efficiency: "99%" },
    { name: "CO2", description: "Karbonat angidrid", efficiency: "85%" },
    { name: "NO2", description: "Azot dioksidi", efficiency: "80%" },
    { name: "Ozon", description: "Yer sathidagi ozon", efficiency: "75%" },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-nature overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container-page relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Leaf size={16} />
              Innovatsion texnologiya
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Mox texnologiyasi
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Tabiat va texnologiyaning mukammal uyg'unligi — mox asosidagi havo tozalash tizimi qanday ishlashini bilib oling.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Qanday ishlaydi?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Urban Moss Panel tizimi uch bosqichda havoni tozalaydi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="card-eco h-full">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 text-primary-foreground">
                    <step.icon size={32} />
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={productUrbanPanel}
              alt="Urban Moss Panel in action"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-background mb-2">
                Urban Moss Panel
              </h3>
              <p className="text-background/80 max-w-2xl">
                Shahar muhitida o'rnatilgan HARU AIR panellari havoni doimiy ravishda tozalab turadi va atrof-muhitga toza havo ta'minlaydi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Moss */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Nega aynan mox?
              </h2>
              <p className="text-background/70 mb-8">
                Moxlar — tabiatdagi eng samarali havo tozalagichlardan biri. Ular ildizi yo'q, kam suv talab qiladi va turli iqlim sharoitlariga chidamli.
              </p>
              <div className="space-y-6">
                {mossAdvantages.map((adv, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                      <adv.icon size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{adv.title}</h4>
                      <p className="text-background/70">{adv.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/30 rounded-3xl blur-3xl" />
              <img
                src={productLiquid3}
                alt="Moss Technology"
                className="relative rounded-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pollutants */}
      <section className="section-padding">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Tozalanadigan moddalar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              HARU AIR tizimi quyidagi zararli moddalarni samarali tozalaydi
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-muted/30 rounded-2xl overflow-hidden">
              {pollutants.map((pollutant, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-6 ${
                    index !== pollutants.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{pollutant.name}</h4>
                      <p className="text-sm text-muted-foreground">{pollutant.description}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">{pollutant.efficiency}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-secondary">
        <div className="container-page text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Mox texnologiyasini sinab ko'ring
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Shaxsiy tozalagichdan shahar paneliga qadar — sizning ehtiyojingizga mos mahsulotni tanlang.
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              Mahsulotlarni ko'rish
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
