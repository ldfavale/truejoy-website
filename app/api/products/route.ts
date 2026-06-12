import { NextRequest, NextResponse } from "next/server"
import { queryProducts, ProductSortOption } from "@/lib/products-query"

const VALID_SORTS: ProductSortOption[] = ["name-asc", "price-asc", "price-desc", "newest"]

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = Number(searchParams.get("page") ?? "1")
  const limit = Number(searchParams.get("limit") ?? "12")
  const sortParam = searchParams.get("sort") ?? "name-asc"
  const sort = VALID_SORTS.includes(sortParam as ProductSortOption)
    ? (sortParam as ProductSortOption)
    : "name-asc"

  const result = await queryProducts({
    page: Number.isFinite(page) ? page : 1,
    limit: Number.isFinite(limit) ? limit : 12,
    search: searchParams.get("search") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    age: searchParams.get("age") ?? undefined,
    sort,
  })

  return NextResponse.json(result)
}
