import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type BrowsingHistory = {
  products: { id: string; category: string }[]
}
const initialState: BrowsingHistory = {
  products: [],
}

export const browsingHistoryStore = create<BrowsingHistory>()(
  persist(() => initialState, {
    name: 'browsingHistoryStore',
  })
)

/**
 * Returns the current browsing history and two functions to modify it.
 *
 * `products`: The current list of products in the browsing history.
 * `addItem`: Adds a product to the start of the browsing history, removing any
 * duplicates if they exist. If the length of the history exceeds 10, removes the
 * last element.
 * `clear`: Removes all items from the browsing history.
 */
export default function useBrowsingHistory() {
  const { products } = browsingHistoryStore()
  return {
    products,
    addItem: (product: { id: string; category: string }) => {
      const index = products.findIndex((p) => p.id === product.id)
      if (index !== -1) products.splice(index, 1) // Remove duplicate if it exists
      products.unshift(product) // Add id to the start

      if (products.length > 10) products.pop() // Remove excess items if length exceeds 10

      browsingHistoryStore.setState({
        products,
      })
    },

    clear: () => {
      browsingHistoryStore.setState({
        products: [],
      })
    },
  }
}
