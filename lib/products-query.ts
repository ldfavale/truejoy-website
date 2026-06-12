import { createClient } from "@/lib/supabase/server"
import { MOCK_PRODUCTS } from "@/lib/mock-data"
import { Product } from "@/lib/types"

export type ProductSortOption = "name-asc" | "price-asc" | "price-desc" | "newest"

export interface ProductsQueryParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  age?: string
  sort?: ProductSortOption
}

export interface ProductsQueryResult {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
  categories: string[]
}

const DEFAULT_LIMIT = 12

function sortProducts(products: Product[], sort: ProductSortOption): Product[] {
  return [...products].sort((a, b) => {
    if (sort === "name-asc") return a.name.localeCompare(b.name)
    if (sort === "price-asc") return a.price - b.price
    if (sort === "price-desc") return b.price - a.price
    if (sort === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    return 0
  })
}

function filterMockProducts(
  products: Product[],
  { search, category, age }: Pick<ProductsQueryParams, "search" | "category" | "age">
): Product[] {
  const query = search?.trim().toLowerCase() ?? ""

  return products.filter((product) => {
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      (product.description?.toLowerCase().includes(query) ?? false)

    const matchesCategory = !category || category === "Todos" || product.category === category
    const matchesAge = !age || age === "Todos" || product.age_range === age

    return matchesSearch && matchesCategory && matchesAge
  })
}

function getCategoriesFromRows(rows: { category: string | null }[]): string[] {
  const allCategories = rows.map((p) => p.category).filter(Boolean) as string[]
  return ["Todos", ...Array.from(new Set(allCategories))]
}

function paginateProducts(products: Product[], page: number, limit: number) {
  const start = (page - 1) * limit
  return products.slice(start, start + limit)
}

function queryMockProducts(params: ProductsQueryParams): ProductsQueryResult {
  const page = Math.max(1, params.page ?? 1)
  const limit = Math.max(1, Math.min(params.limit ?? DEFAULT_LIMIT, 48))
  const sort = params.sort ?? "name-asc"

  const filtered = sortProducts(
    filterMockProducts(MOCK_PRODUCTS, params),
    sort
  )

  return {
    products: paginateProducts(filtered, page, limit),
    total: filtered.length,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
    categories: getCategoriesFromRows(MOCK_PRODUCTS),
  }
}

export async function queryProducts(params: ProductsQueryParams): Promise<ProductsQueryResult> {
  const page = Math.max(1, params.page ?? 1)
  const limit = Math.max(1, Math.min(params.limit ?? DEFAULT_LIMIT, 48))
  const sort = params.sort ?? "name-asc"
  const search = params.search?.trim() ?? ""
  const category = params.category
  const age = params.age

  try {
    const supabase = await createClient()

    let query = supabase.from("products").select("*", { count: "exact" })

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (category && category !== "Todos") {
      query = query.eq("category", category)
    }

    if (age && age !== "Todos") {
      query = query.eq("age_range", age)
    }

    if (sort === "name-asc") {
      query = query.order("name", { ascending: true })
    } else if (sort === "price-asc") {
      query = query.order("price", { ascending: true })
    } else if (sort === "price-desc") {
      query = query.order("price", { ascending: false })
    } else if (sort === "newest") {
      query = query.order("created_at", { ascending: false })
    }

    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.warn("Supabase query error (using mock fallback):", error.message)
      return queryMockProducts(params)
    }

    const { count: totalInDb } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })

    if (!totalInDb || totalInDb === 0) {
      return queryMockProducts(params)
    }

    const { data: categoryRows } = await supabase
      .from("products")
      .select("category")
      .not("category", "is", null)

    const categories = getCategoriesFromRows(categoryRows ?? [])
    const total = count ?? 0

    return {
      products: (data ?? []) as Product[],
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      categories,
    }
  } catch (error) {
    console.warn("Failed to connect to Supabase (using mock fallback):", error)
    return queryMockProducts(params)
  }
}
