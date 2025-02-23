'use server'

import { connectToDatabase } from '@/lib/db'
import Product from '@/lib/db/models/product.model'

/**
 * Retrieves a list of all the categories that have at least one published
 * product. This is used to populate the category filter in the product
 * listing page.
 *
 * @returns {Promise<string[]>} A list of distinct categories.
 * @example
 * const categories = await getAllCategories()
 * // categories is ["T-Shirts", "Jeans", ...]
 */
export async function getAllCategories() {
  await connectToDatabase()
  const categories = await Product.find({ isPublished: true }).distinct(
    'category'
  )
  return categories
}
/**
 * Fetches a list of products for a card view based on a specified tag.
 *
 * This async function connects to the MongoDB database and retrieves a list
 * of products that are tagged with the specified tag and are published.
 * The products are sorted by creation date in descending order and limited
 * to a specified number. Each product in the result contains its name, a
 * constructed href using the product slug, and the first image from the
 * product's images array.
 *
 * @param tag - The tag to filter products by.
 * @param limit - The maximum number of products to retrieve (default is 4).
 * @returns A promise that resolves to an array of products, each containing
 *          a name, href, and image.
 */

export async function getProductsForCard({
  tag,
  limit = 4,
}: {
  tag: string
  limit?: number
}) {
  await connectToDatabase()
  const products = await Product.find(
    { tags: { $in: [tag] }, isPublished: true },
    {
      name: 1,
      href: { $concat: ['/product/', '$slug'] },
      image: { $arrayElemAt: ['$images', 0] },
    }
  )
    .sort({ createdAt: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as {
    name: string
    href: string
    image: string
  }[]
}
