import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  ImagePlus,
  X,
} from "lucide-react";
import { API_BASE } from "../config/api";


// ====== Small Helpers ======
const currency = (n) =>
  (Number(n) || 0).toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + "₫";

const initialForm = {
  name: "",
  category: "",
  price: "",
  oldPrice: "",
  discount: "",
  tag: "",
  sku: "",
  description: "",
  longDescription: "",
  image: "",
  images: [],
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [showConfirm, setShowConfirm] = useState({ open: false, id: null });

  // ---------- Fetch products ----------
  const fetchProducts = async (opts = {}) => {
    const q = typeof opts.search !== "undefined" ? opts.search : search;
    const c =
      typeof opts.category !== "undefined" ? opts.category : categoryFilter;
    const p = typeof opts.page !== "undefined" ? opts.page : page;

    try {
      setLoading(true);
      let data = [];

      // ✅ Gọi /search chỉ khi có ít nhất 2 ký tự
      if (q.trim().length >= 2) {
        const res = await fetch(`https://thanhdatshoes.id.vn/api/products/search?q=${encodeURIComponent(q.trim())}`);

        data = await res.json();
      } else {
const res = await fetch("https://thanhdatshoes.id.vn/api/products");
        data = await res.json();
      }

      let list = Array.isArray(data) ? data : [];

      // ✅ Lọc theo danh mục (nếu có)
      if (c) list = list.filter((x) => x.category === c);

      // ✅ Sản phẩm mới nằm ở cuối danh sách
      list = list.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      // ✅ Phân trang client
      setTotal(list.length);
      const start = (p - 1) * limit;
      setProducts(list.slice(start, start + limit));

      // ✅ Danh sách danh mục
      const catSet = new Set(list.map((p) => p.category));
      setCategories(["", ...Array.from(catSet).filter(Boolean)]);
    } catch (e) {
      console.error("❌ Fetch products failed:", e);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Effects ----------
  useEffect(() => {
    const t = setTimeout(() => fetchProducts(), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    fetchProducts({ page: 1 });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // ---------- Handlers ----------
  const openCreate = () => {
    setEditing(null);
    setForm(initialForm);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name || "",
      category: p.category || "",
      price: p.price ?? "",
      oldPrice: p.oldPrice ?? "",
      discount: p.discount || "",
      tag: p.tag || "",
      sku: p.sku || "",
      description: p.description || "",
      longDescription: p.longDescription || "",
      image: p.image || "",
      images: Array.isArray(p.images) ? p.images : [],
    });
    setShowForm(true);
  };

  const saveProduct = async () => {
    const payload = {
      ...form,
      price: Number(form.price || 0),
      oldPrice: form.oldPrice === "" ? undefined : Number(form.oldPrice || 0),
      images: (form.images || []).filter((u) => !!u),
    };

    try {
      setLoading(true);
      const res = await fetch(
        `https://thanhdatshoes.id.vn/api/products${editing ? `/${editing._id || editing.id}` : ""}`,
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data?.message || "Lưu sản phẩm thất bại!");
        return;
      }

      setShowForm(false);
      setEditing(null);
      setForm(initialForm);
      fetchProducts();
    } catch (e) {
      console.error("❌ Save product failed:", e);
      alert("Không thể kết nối server!");
    } finally {
      setLoading(false);
    }
  };

  const askDelete = (id) => setShowConfirm({ open: true, id });
  const cancelDelete = () => setShowConfirm({ open: false, id: null });

  const doDelete = async () => {
    const id = showConfirm.id;
    if (!id) return;

    try {
      setLoading(true);
const res = await fetch(`https://thanhdatshoes.id.vn/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.message || "Xóa thất bại!");
        return;
      }
      cancelDelete();
      fetchProducts();
    } catch (e) {
      console.error("❌ Delete failed:", e);
      alert("Không thể kết nối server!");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Derived ----------
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );

  // ---------- UI ----------
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-[22px] sm:text-[24px] font-bold uppercase">
          Quản lý sản phẩm
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => fetchProducts()}
            className="inline-flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50"
            title="Làm mới"
          >
            <RefreshCw size={18} />
            Làm mới
          </button>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            <Plus size={18} />
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, SKU, tag, danh mục..."
            className="pl-9 pr-3 py-2 border rounded-md w-full"
          />
          {loading && (
            <div className="text-xs text-gray-500 italic absolute right-3 top-3">
              Đang tìm...
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-md py-2 px-3"
          >
            {categories.map((c, idx) => (
              <option key={idx} value={c}>
                {c ? c : "Tất cả danh mục"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 border">Ảnh</th>
              <th className="p-2 border text-left">Tên sản phẩm</th>
              <th className="p-2 border">Danh mục</th>
              <th className="p-2 border">Giá</th>
              <th className="p-2 border">Giá cũ</th>
              <th className="p-2 border">Giảm</th>
              <th className="p-2 border">Tag</th>
              <th className="p-2 border">SKU</th>
              <th className="p-2 border">Ngày</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading && products.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-8 text-center text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-8 text-center text-gray-500">
                  Không có sản phẩm nào.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id || p.id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded grid place-items-center">
                        <ImagePlus size={18} className="text-gray-500" />
                      </div>
                    )}
                  </td>
                  <td className="p-2 border max-w-[260px] text-left">
                    <div className="font-medium line-clamp-2">{p.name}</div>
                    <div className="text-xs text-gray-500">ID: {p._id || p.id}</div>
                  </td>
                  <td className="p-2 border text-center">{p.category || "—"}</td>
                  <td className="p-2 border text-right">{currency(p.price)}</td>
                  <td className="p-2 border text-right">
                    {p.oldPrice ? currency(p.oldPrice) : "—"}
                  </td>
                  <td className="p-2 border text-center">{p.discount || "—"}</td>
                  <td className="p-2 border text-center">{p.tag || "—"}</td>
                  <td className="p-2 border text-center">{p.sku || "—"}</td>
                  <td className="p-2 border text-center">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString("vi-VN")
                      : "—"}
                  </td>
                  <td className="p-2 border">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="inline-flex items-center gap-1 px-2 py-1 border rounded hover:bg-gray-50"
                        title="Sửa"
                      >
                        <Pencil size={16} /> Sửa
                      </button>
                      <button
                        onClick={() => askDelete(p._id || p.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 border rounded hover:bg-red-50 text-red-600 border-red-200"
                        title="Xóa"
                      >
                        <Trash2 size={16} /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Tổng: <b>{total}</b> sản phẩm • Trang {page}/{totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Trước
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      {showForm && (
        <ProductFormModal
          form={form}
          setForm={setForm}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
            setForm(initialForm);
          }}
          onSave={saveProduct}
          saving={loading}
          isEdit={!!editing}
        />
      )}

      {showConfirm.open && (
        <ConfirmDialog
          title="Xóa sản phẩm?"
          desc="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa?"
          onCancel={cancelDelete}
          onConfirm={doDelete}
          loading={loading}
        />
      )}
    </div>
  );
}

// ============ Product Form Modal ============
function ProductFormModal({ form, setForm, onClose, onSave, saving, isEdit }) {
  const [imgInput, setImgInput] = useState("");

  // 🧮 Tự động tính giá mới nếu có giá cũ & giảm giá
  useEffect(() => {
    const oldP = Number(form.oldPrice || 0);
    const discount = String(form.discount || "").replace("%", "").trim();
    const rate = Number(discount);
    if (oldP > 0 && rate > 0 && rate < 100) {
      const newPrice = Math.round((oldP * (100 - rate)) / 100);
      if (newPrice !== form.price) {
        setForm((f) => ({ ...f, price: newPrice }));
      }
    }
  }, [form.oldPrice, form.discount]);

  const addImage = () => {
    const url = imgInput.trim();
    if (!url) return;
    setForm((f) => ({ ...f, images: [...(f.images || []), url] }));
    setImgInput("");
  };

  const removeImage = (idx) => {
    setForm((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <div className="bg-white w-[860px] max-w-[95vw] max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-6 relative">
        <button
          className="absolute right-4 top-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h3 className="text-[18px] font-bold uppercase mb-4">
          {isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left */}
          <div className="space-y-3">
            <Input
              label="Tên sản phẩm"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              required
            />
            <Input
              label="Danh mục"
              placeholder="Ví dụ: Sandal"
              value={form.category}
              onChange={(v) => setForm((f) => ({ ...f, category: v }))}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Giá"
                type="number"
                value={form.price}
                onChange={(v) => setForm((f) => ({ ...f, price: v }))}
                required
              />
              <Input
                label="Giá cũ"
                type="number"
                value={form.oldPrice}
                onChange={(v) => setForm((f) => ({ ...f, oldPrice: v }))}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Giảm giá (%)"
                placeholder="20"
                value={form.discount}
                onChange={(v) => setForm((f) => ({ ...f, discount: v }))}
              />
              <Input
                label="Tag"
                placeholder="NEW / SALE"
                value={form.tag}
                onChange={(v) => setForm((f) => ({ ...f, tag: v }))}
              />
              <Input
                label="SKU"
                placeholder="SP001"
                value={form.sku}
                onChange={(v) => setForm((f) => ({ ...f, sku: v }))}
              />
            </div>
            <Input
              label="Ảnh chính (URL)"
              placeholder="https://..."
              value={form.image}
              onChange={(v) => setForm((f) => ({ ...f, image: v }))}
            />
          </div>

          {/* Right */}
          <div className="space-y-3">
            <Textarea
              label="Mô tả ngắn"
              rows={3}
              value={form.description}
              onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            />
            <Textarea
              label="Mô tả dài"
              rows={5}
              value={form.longDescription}
              onChange={(v) => setForm((f) => ({ ...f, longDescription: v }))}
            />

            {/* images[] */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Thư viện ảnh (URLs)
              </label>
              <div className="flex gap-2">
                <input
                  className="border rounded-md px-3 py-2 flex-1"
                  placeholder="https://..."
                  value={imgInput}
                  onChange={(e) => setImgInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-3 py-2 border rounded-md hover:bg-gray-50 inline-flex items-center gap-2"
                >
                  <ImagePlus size={16} /> Thêm
                </button>
              </div>
              {form.images?.length > 0 && (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {form.images.map((u, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={u}
                        alt={`img-${idx}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow hover:bg-gray-50"
                        onClick={() => removeImage(idx)}
                        title="Xóa ảnh"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className={`px-5 py-2 rounded-md text-white ${
              saving ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
            }`}
          >
            {saving ? "Đang lưu..." : isEdit ? "Lưu thay đổi" : "Tạo sản phẩm"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ Confirm Dialog ============
function ConfirmDialog({ title, desc, onCancel, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <div className="bg-white w-[420px] max-w-[95vw] rounded-lg shadow-xl p-6">
        <h4 className="text-[16px] font-semibold mb-2">{title}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onCancel} className="px-4 py-2 border rounded-md">
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ Plain Inputs ============
function Input({ label, type = "text", value, onChange, placeholder, required }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
      />
    </label>
  );
}

function Textarea({ label, value, onChange, rows = 3, placeholder }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200 resize-y"
      />
    </label>
  );
}
