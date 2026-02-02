import partnerJDU from '@/assets/partner-jdu.png';
import partnerEcology from '@/assets/partner-ecology.png';
import partnerItpark from '@/assets/partner-itpark.png';
import partnerGreencity from '@/assets/partner-greencity.png';

const partners = [
  {
    id: 1,
    name: 'Japan Digital University',
    logo: partnerJDU,
  },
  {
    id: 2,
    name: "O'zbekiston Respublikasi Ekologiya va iqlim o'zgarishi vazirligi",
    logo: partnerEcology,
  },
  {
    id: 3,
    name: 'IT Park Uzbekistan',
    logo: partnerItpark,
  },
  {
    id: 4,
    name: 'Green City',
    logo: partnerGreencity,
  },
];

export function Partners() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Bizning hamkorlarimiz
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Biz yetakchi tashkilotlar bilan hamkorlikda toza kelajak uchun ishlaymiz
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
            >
              <div className="w-full h-20 md:h-24 flex items-center justify-center mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-sm md:text-base font-medium text-foreground line-clamp-2">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
