export const fetchCategoriesApi = async () => {
  const res = await fetch("/api/admin/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const fetchSubcategoriesApi = async (parentId: string) => {
  const res = await fetch(`/api/admin/subcategories?parent=${parentId}`);
  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return res.json();
};

export const saveCategoryApi = async (id: string | null, data: any) => {
  const url = id ? `/api/admin/categories/${id}` : "/api/admin/categories";
  const method = id ? "PUT" : "POST";
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || "Failed to save category");
  return resData;
};

export const saveSubcategoryApi = async (id: string | null, data: any) => {
  const url = id ? `/api/admin/subcategories/${id}` : "/api/admin/subcategories";
  const method = id ? "PUT" : "POST";
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || "Failed to save subcategory");
  return resData;
};

export const deleteCategoryApi = async (id: string, isSub: boolean) => {
  const url = isSub ? `/api/admin/subcategories/${id}` : `/api/admin/categories/${id}`;
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
  return true;
};