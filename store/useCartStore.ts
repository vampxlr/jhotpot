import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  // Three separate carts
  restaurantCart: CartItem[];
  lunchLoopCart: CartItem[];
  cateringHubCart: CartItem[];

  // Restaurant cart actions
  addToRestaurantCart: (item: CartItem) => void;
  removeFromRestaurantCart: (id: string) => void;
  updateRestaurantCartQuantity: (id: string, quantity: number) => void;
  clearRestaurantCart: () => void;

  // Lunch Loop cart actions
  addToLunchLoopCart: (item: CartItem) => void;
  removeFromLunchLoopCart: (id: string) => void;
  updateLunchLoopCartQuantity: (id: string, quantity: number) => void;
  clearLunchLoopCart: () => void;

  // Catering Hub cart actions
  addToCateringHubCart: (item: CartItem) => void;
  removeFromCateringHubCart: (id: string) => void;
  updateCateringHubCartQuantity: (id: string, quantity: number) => void;
  clearCateringHubCart: () => void;

  // Computed values
  getRestaurantTotal: () => number;
  getLunchLoopTotal: () => number;
  getCateringHubTotal: () => number;
}

const cartStore = create<CartState>()((set, get) => ({
      restaurantCart: [],
      lunchLoopCart: [],
      cateringHubCart: [],

      // Restaurant Cart
      addToRestaurantCart: (item) =>
        set((state) => {
          const existingItem = state.restaurantCart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              restaurantCart: state.restaurantCart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { restaurantCart: [...state.restaurantCart, item] };
        }),

      removeFromRestaurantCart: (id) =>
        set((state) => ({
          restaurantCart: state.restaurantCart.filter((item) => item.id !== id),
        })),

      updateRestaurantCartQuantity: (id, quantity) =>
        set((state) => ({
          restaurantCart: state.restaurantCart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      clearRestaurantCart: () => set({ restaurantCart: [] }),

      // Lunch Loop Cart
      addToLunchLoopCart: (item) =>
        set((state) => {
          const existingItem = state.lunchLoopCart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              lunchLoopCart: state.lunchLoopCart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { lunchLoopCart: [...state.lunchLoopCart, item] };
        }),

      removeFromLunchLoopCart: (id) =>
        set((state) => ({
          lunchLoopCart: state.lunchLoopCart.filter((item) => item.id !== id),
        })),

      updateLunchLoopCartQuantity: (id, quantity) =>
        set((state) => ({
          lunchLoopCart: state.lunchLoopCart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      clearLunchLoopCart: () => set({ lunchLoopCart: [] }),

      // Catering Hub Cart
      addToCateringHubCart: (item) =>
        set((state) => {
          const existingItem = state.cateringHubCart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cateringHubCart: state.cateringHubCart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { cateringHubCart: [...state.cateringHubCart, item] };
        }),

      removeFromCateringHubCart: (id) =>
        set((state) => ({
          cateringHubCart: state.cateringHubCart.filter((item) => item.id !== id),
        })),

      updateCateringHubCartQuantity: (id, quantity) =>
        set((state) => ({
          cateringHubCart: state.cateringHubCart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      clearCateringHubCart: () => set({ cateringHubCart: [] }),

      // Computed totals
      getRestaurantTotal: () => {
        const { restaurantCart } = get();
        return restaurantCart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getLunchLoopTotal: () => {
        const { lunchLoopCart } = get();
        return lunchLoopCart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCateringHubTotal: () => {
        const { cateringHubCart } = get();
        return cateringHubCart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
}));

// Manual persist implementation
if (typeof window !== 'undefined') {
  // Load from localStorage on init
  const savedCart = localStorage.getItem('cart-storage');
  if (savedCart) {
    try {
      const parsed = JSON.parse(savedCart);
      cartStore.setState(parsed);
    } catch (e) {
      console.error('Failed to parse saved cart:', e);
    }
  }

  // Subscribe to changes and save to localStorage
  cartStore.subscribe((state) => {
    localStorage.setItem('cart-storage', JSON.stringify({
      restaurantCart: state.restaurantCart,
      lunchLoopCart: state.lunchLoopCart,
      cateringHubCart: state.cateringHubCart,
    }));
  });
}

export const useCartStore = cartStore;

