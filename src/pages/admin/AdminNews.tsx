import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { NewsItem } from '@/types';

export default function AdminNews() {
  const { news, addNews, updateNews, deleteNews } = useData();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', image: '', author: '' });

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ title: '', excerpt: '', content: '', image: '', author: 'HARU AIR' });
    setIsFormOpen(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({ title: item.title, excerpt: item.excerpt, content: item.content, image: item.image, author: item.author });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    const data = { ...formData, slug: '', publishedAt: new Date().toISOString().split('T')[0], tags: [] };
    if (editingItem) {
      updateNews(editingItem.id, data);
      toast({ title: 'Yangilik yangilandi' });
    } else {
      addNews(data);
      toast({ title: 'Yangilik qo\'shildi' });
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteNews(deletingId);
      toast({ title: "Yangilik o'chirildi" });
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Yangiliklar</h1><p className="text-muted-foreground">{news.length} ta yangilik</p></div>
        <Button onClick={openCreate}><Plus size={18} className="mr-2" />Yangi qo'shish</Button>
      </div>

      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b"><tr><th className="text-left p-4">Sarlavha</th><th className="text-left p-4">Sana</th><th className="text-left p-4">Muallif</th><th className="text-right p-4">Amallar</th></tr></thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4 text-muted-foreground">{item.publishedAt}</td>
                  <td className="p-4 text-muted-foreground">{item.author}</td>
                  <td className="p-4"><div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(item)}><Pencil size={16} /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => { setDeletingId(item.id); setIsDeleteOpen(true); }}><Trash2 size={16} /></Button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingItem ? "Tahrirlash" : "Yangi yangilik"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Sarlavha</Label><Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} /></div>
            <div><Label>Qisqa matn</Label><Textarea value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} rows={2} /></div>
            <div><Label>To'liq matn</Label><Textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={4} /></div>
            <div><Label>Muallif</Label><Input value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsFormOpen(false)}>Bekor</Button><Button onClick={handleSave}>Saqlash</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>O'chirishni tasdiqlang</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Bekor</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive">O'chirish</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
