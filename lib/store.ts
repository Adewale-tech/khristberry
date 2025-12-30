import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string | null
}

interface StoreState {
  selectedBranchId: string | null
  setSelectedBranchId: (id: string | null) => void

  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void

  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedBranchId: null,
      setSelectedBranchId: (id) => set({ selectedBranchId: id }),

      cart: [],
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((i) => i.id === item.id)
        if (existingItem) {
          return {
            cart: state.cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          }
        }
        return { cart: [...state.cart, item] }
      }),
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((i) => i.id !== itemId)
      })),
      updateQuantity: (itemId, quantity) => set((state) => ({
        cart: state.cart.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        )
      })),
      clearCart: () => set({ cart: [] }),

      isCartOpen: false,
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
    }),
    {
      name: 'restaurant-storage',
      skipHydration: true,
    }
  )
)
