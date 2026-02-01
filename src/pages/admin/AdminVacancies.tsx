import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Vacancy } from '@/types';

export default function AdminVacancies() {
  const { vacancies, addVacancy, updateVacancy, deleteVacancy } = useData();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Vacancy | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', department: '', location: '', description: '', salary: '', isActive: true });

  const openCreate = () => { setEditingItem(null); setFormData({ title: '', department: '', location: 'Toshkent', description: '', salary: '', isActive: true }); setIsFormOpen(true); };
  const openEdit = (item: Vacancy) => { setEditingItem(item); setFormData({ title: item.title, department: item.department, location: item.location, description: item.description, salary: item.salary || '', isActive: item.isActive }); setIsFormOpen(true); };

  const handleSave = () => {
    const data = { ...formData, slug: '', type: 'full-time' as const, requirements: [], responsibilities: [] };
    if (editingItem) { updateVacancy(editingItem.id, data); toast({ title: 'Vakansiya yangilandi' }); }
    else { addVacancy(data); toast({ title: 'Vakansiya qo\'shildi' }); }
    setIsFormOpen(false);
  };

  const handleDelete = () => { if (deletingId) { deleteVacancy(deletingId); toast({ title: "Vakansiya o'chirildi" }); setIsDeleteOpen(false); } };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Vakansiyalar</h1><p className="text-muted-foreground">{vacancies.length} ta vakansiya</p></div>
        <Button onClick={openCreate}><Plus size={18} className="mr-2" />Yangi qo'shish</Button>
      </div>

      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b"><tr><th className="text-left p-4">Lavozim</th><th className="text-left p-4">Bo'lim</th><th className="text-left p-4">Joylashuv</th><th className="text-left p-4">Holati</th><th className="text-right p-4">Amallar</th></tr></thead>
          <tbody>
            {vacancies.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4">{item.department}</td>
                <td className="p-4">{item.location}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${item.isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{item.isActive ? 'Faol' : 'Nofaol'}</span></td>
                <td className="p-4"><div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(item)}><Pencil size={16} /></Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => { setDeletingId(item.id); setIsDeleteOpen(true); }}><Trash2 size={16} /></Button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent><DialogHeader><DialogTitle>{editingItem ? "Tahrirlash" : "Yangi vakansiya"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Lavozim</Label><Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Bo'lim</Label><Input value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} /></div>
              <div><Label>Joylashuv</Label><Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} /></div>
            </div>
            <div><Label>Tavsif</Label><Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} /></div>
            <div><Label>Maosh</Label><Input value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} placeholder="Ixtiyoriy" /></div>
            <div className="flex items-center gap-2"><Switch checked={formData.isActive} onCheckedChange={(v) => setFormData({...formData, isActive: v})} /><Label>Faol</Label></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsFormOpen(false)}>Bekor</Button><Button onClick={handleSave}>Saqlash</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>O'chirishni tasdiqlang</AlertDialogTitle></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Bekor</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive">O'chirish</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}
