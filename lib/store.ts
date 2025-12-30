import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string // MenuItem ID
  name: string
  price: number
  quantity: number
  image?: string | null
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(item => item.id === newItem.id)
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            )
          }
        }
        return { items: [...state.items, newItem] }
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: quantity <= 0
          ? state.items.filter(item => item.id !== id)
          : state.items.map(item => item.id === id ? { ...item, quantity } : item)
      })),
      clearCart: () => set({ items: [] }),
      total: () => {
        return get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
      },
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state })
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
