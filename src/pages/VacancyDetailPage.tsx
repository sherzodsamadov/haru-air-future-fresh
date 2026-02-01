import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Briefcase, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';

export default function VacancyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getVacancy, addApplication } = useData();
  const { toast } = useToast();
  const vacancy = getVacancy(slug || '');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const typeLabels = {
    'full-time': 'To\'liq kunlik',
    'part-time': 'Yarim kunlik',
    'contract': 'Shartnoma',
    'internship': 'Amaliyot',
  };

  if (!vacancy) {
    return (
      <PublicLayout>
        <div className="section-padding">
          <div className="container-page text-center">
            <h1 className="text-2xl font-bold mb-4">Vakansiya topilmadi</h1>
            <Link to="/vacancies">
              <Button>
                <ArrowLeft className="mr-2" size={16} />
                Vakansiyalarga qaytish
              </Button>
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addApplication({
        vacancyId: vacancy.id,
        vacancyTitle: vacancy.title,
        ...formData,
      });

      toast({
        title: 'Ariza yuborildi!',
        description: "Tez orada siz bilan bog'lanamiz.",
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
      });
    } catch (error) {
      toast({
        title: 'Xatolik',
        description: 'Ariza yuborishda xatolik yuz berdi.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Link to="/vacancies" className="text-muted-foreground hover:text-foreground">
              Vakansiyalar
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{vacancy.title}</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  {vacancy.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Briefcase size={16} />
                    {vacancy.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {vacancy.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {typeLabels[vacancy.type]}
                  </span>
                </div>
                {vacancy.salary && (
                  <div className="mt-4 text-xl font-bold text-primary">
                    {vacancy.salary}
                  </div>
                )}
              </header>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-muted-foreground">{vacancy.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Talablar</h3>
                <ul className="space-y-2">
                  {vacancy.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Vazifalar</h3>
                <ul className="space-y-2">
                  {vacancy.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-secondary" />
                      </div>
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/vacancies">
                <Button variant="outline">
                  <ArrowLeft className="mr-2" size={16} />
                  Barcha vakansiyalar
                </Button>
              </Link>
            </div>

            {/* Apply Form */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Ariza topshirish</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">To'liq ismingiz *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      placeholder="Ism Familiya"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Xat *</Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      required
                      placeholder="Nima uchun siz ushbu lavozimga mos kelasiz?"
                      rows={5}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full btn-hero"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Yuborilmoqda...' : 'Ariza yuborish'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
