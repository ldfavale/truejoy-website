export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  video_url: string | null
  stock: number
  category: string | null
  age_range: string | null
  created_at: string
}
