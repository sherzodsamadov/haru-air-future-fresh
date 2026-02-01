import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const { settings, updateSettings } = useData();
  const { toast } = useToast();
  const [formData, setFormData] = useState(settings);

  const handleSave = () => { updateSettings(formData); toast({ title: 'Sozlamalar saqlandi' }); };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold">Sozlamalar</h1></div>
      <div className="bg-card rounded-xl shadow-sm p-6 max-w-2xl space-y-4">
        <div><Label>Kompaniya nomi</Label><Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
        <div><Label>Slogan</Label><Input value={formData.slogan} onChange={(e) => setFormData({...formData, slogan: e.target.value})} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Email</Label><Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
          <div><Label>Telefon</Label><Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
        </div>
        <div><Label>Manzil</Label><Input value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} /></div>
        <div><Label>Ish vaqti</Label><Input value={formData.workingHours} onChange={(e) => setFormData({...formData, workingHours: e.target.value})} /></div>
        <div><Label>Kompaniya haqida</Label><Textarea value={formData.aboutText} onChange={(e) => setFormData({...formData, aboutText: e.target.value})} rows={3} /></div>
        <div><Label>Missiya</Label><Textarea value={formData.missionText} onChange={(e) => setFormData({...formData, missionText: e.target.value})} rows={3} /></div>
        <Button onClick={handleSave}>Saqlash</Button>
      </div>
    </div>
  );
}
