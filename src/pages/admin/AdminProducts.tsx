import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Product, ProductCategory } from '@/types';

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', category: 'personal' as ProductCategory, price: '', shortDesc: '', fullDesc: '', image: '',
  });

  const openCreate = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: 'personal', price: '', shortDesc: '', fullDesc: '', image: '' });
    setIsFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, category: product.category, price: product.price.toString(),
      shortDesc: product.shortDesc, fullDesc: product.fullDesc, image: product.image,
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    const productData = {
      name: formData.name, category: formData.category, price: Number(formData.price),
      shortDesc: formData.shortDesc, fullDesc: formData.fullDesc, image: formData.image || '/placeholder.svg',
      slug: '', specs: [], useCases: [], gallery: [formData.image || '/placeholder.svg'],
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast({ title: 'Mahsulot yangilandi' });
    } else {
      addProduct(productData);
      toast({ title: 'Mahsulot qo\'shildi' });
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteProduct(deletingId);
      toast({ title: "Mahsulot o'chirildi" });
      setIsDeleteOpen(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mahsulotlar</h1>
          <p className="text-muted-foreground">{products.length} ta mahsulot</p>
        </div>
        <Button onClick={openCreate}><Plus size={18} className="mr-2" />Yangi qo'shish</Button>
      </div>

      <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium">Rasm</th>
                <th className="text-left p-4 font-medium">Nomi</th>
                <th className="text-left p-4 font-medium">Kategoriya</th>
                <th className="text-left p-4 font-medium">Narxi</th>
                <th className="text-right p-4 font-medium">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/30">
                  <td className="p-4">
                    <img src={product.image || '/placeholder.svg'} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">
                    <span className={product.category === 'personal' ? 'badge-personal' : 'badge-urban'}>
                      {product.category === 'personal' ? 'Shaxsiy' : 'Shahar'}
                    </span>
                  </td>
                  <td className="p-4">{product.price.toLocaleString()} so'm</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => { setViewingProduct(product); setIsViewOpen(true); }}><Eye size={16} /></Button>
                      <Button size="icon" variant="ghost" onClick={() => openEdit(product)}><Pencil size={16} /></Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => { setDeletingId(product.id); setIsDeleteOpen(true); }}><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Nomi</Label><Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
            <div><Label>Kategoriya</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v as ProductCategory})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Shaxsiy</SelectItem>
                  <SelectItem value="urban">Shahar uchun</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Narxi (so'm)</Label><Input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} /></div>
            <div><Label>Qisqa tavsif</Label><Textarea value={formData.shortDesc} onChange={(e) => setFormData({...formData, shortDesc: e.target.value})} rows={2} /></div>
            <div><Label>To'liq tavsif</Label><Textarea value={formData.fullDesc} onChange={(e) => setFormData({...formData, fullDesc: e.target.value})} rows={3} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Bekor qilish</Button>
            <Button onClick={handleSave}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{viewingProduct?.name}</DialogTitle></DialogHeader>
          {viewingProduct && (
            <div className="space-y-4">
              <img src={viewingProduct.image || '/placeholder.svg'} alt={viewingProduct.name} className="w-full h-48 object-cover rounded-lg" />
              <p><strong>Kategoriya:</strong> {viewingProduct.category === 'personal' ? 'Shaxsiy' : 'Shahar'}</p>
              <p><strong>Narxi:</strong> {viewingProduct.price.toLocaleString()} so'm</p>
              <p><strong>Tavsif:</strong> {viewingProduct.shortDesc}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>O'chirishni tasdiqlang</AlertDialogTitle>
            <AlertDialogDescription>Bu amalni qaytarib bo'lmaydi. Mahsulot butunlay o'chiriladi.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">O'chirish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
