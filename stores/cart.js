import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart', () => {
   count = ref(0)
   function incrementCount() {
      count.value++
   }
})