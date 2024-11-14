<script setup lang="ts">
import productsData from '@/data.json'
interface iElement {
  image: string
  name: string
  category: string
  price: number
  quantity: number
}
const products: Ref<iElement[]> = ref(productsData)
const getTotal = computed(() => {
  let totalCount = 0
  let totalPrice = 0
  products.value.forEach(product => {
    totalCount += product.quantity
    totalPrice += product.quantity * product.price
  })
  return { totalCount, totalPrice }
})
const getActiveProducts = computed(() => {
  let activeProducts: iElement[] = []
  products.value.forEach(product => {
    if (product.quantity > 0) {
      activeProducts.push(product)
    }
  })
  return activeProducts
})
</script>
<template>
  <div class=" flex w-full bg-orange-50 px-40 py-24 text-zinc-950 font-red-hat">
    <section class=" flex flex-col gap-12 max-w-[65%]">
      <h1 class=" text-5xl font-bold">
        Postres</h1>
      <div class=" flex flex-wrap gap-x-6 gap-y-12">
        <article v-for="(product, index) in products" class=" flex flex-col gap-8">
          <div class=" relative flex flex-col items-center">
            <div
              :class="` border-[.125rem] ${product.quantity == 0 ? 'border-transparent' : 'border-red-600'} rounded-xl transition-all duration-100 overflow-hidden`">
              <img :src="product.image" :alt="`product ${index + 1}`" class=" max-w-[320px]">
            </div>
            <div :class="` absolute -bottom-[1.625rem] font-semibold select-none`">
              <button v-if="product.quantity === 0" @click="product.quantity++"
                class=" group flex items-center gap-1 bg-white px-4 py-3 hover:text-red-50 hover:bg-red-600 text-lg border border-red-600 rounded-full transition-all duration-0 overflow-hidden">
                <Icon name="mdi:cart-plus" class=" text-red-600 group-hover:text-red-50" />
                Añadir al carrito
              </button>
              <div v-else
                class=" flex justify-between items-center w-48 bg-red-600 px-4 py-3 text-red-50 text-xl border border-transparent rounded-full overflow-hidden">
                <button @click="product.quantity--"
                  class=" flex justify-center items-center hover:bg-red-50 hover:text-red-600 border-2 border-red-50 rounded-full transition-all duration-100">
                  <Icon name="mdi:minus" />
                </button>
                <h4 class=" text-lg">
                  {{ product.quantity }}</h4>
                <button @click="product.quantity++"
                  class=" flex justify-center items-center hover:bg-red-50 hover:text-red-600 border-2 border-red-50 rounded-full transition-all duration-100">
                  <Icon name="mdi:plus" />
                </button>
              </div>
            </div>
          </div>
          <div class=" flex flex-col gap-px">
            <h4 class=" text-zinc-600 font-medium">
              {{ product.category }}</h4>
            <h4 class=" text-xl font-bold">
              {{ product.name }}</h4>
            <h4 class=" text-red-600 text-xl font-bold">
              S/ {{ (product.price * 3).toFixed(2) }}</h4>
          </div>
        </article>
      </div>
    </section>
    <aside class=" fixed right-40 flex flex-col gap-6 min-w-[25%] h-fit bg-white p-8 rounded-3xl overflow-hidden">
      <h2 class=" text-red-600 text-3xl font-bold">
        Tu Carrito
        {{ getTotal.totalCount > 0 ? `(${getTotal.totalCount})` : `` }}</h2>
      <div v-show="getTotal.totalCount > 0">
        <div v-for="product in getActiveProducts" class=" flex flex-col">
          <div class=" flex justify-between items-center py-3">
            <div class=" flex flex-col gap-[.375rem]">
              <h4 class=" text-lg font-bold">
                {{ product.name }}</h4>
              <div class=" flex items-center gap-5 text-lg">
                <h4 class=" text-red-600 text-xl font-bold">
                  {{ product.quantity }}x</h4>
                <div class=" flex gap-2">
                  <h4 class=" text-zinc-500">
                    S/ {{ (product.price * 3).toFixed(2) }}</h4>
                  <h4 class=" text-zinc-700 font-semibold">
                    S/ {{ ((product.price * 3) * product.quantity).toFixed(2) }}</h4>
                </div>
              </div>
            </div>
            <button @click="product.quantity = 0"
              class=" flex justify-center items-center hover:bg-zinc-400 p-px text-zinc-500 hover:text-zinc-50 text-lg border border-zinc-400 hover:border-zinc-400 rounded-full hover:scale-[1.25] transition-all duration-100">
              <Icon name="mdi:close" />
            </button>
          </div>
          <div class=" w-full h-px bg-zinc-300" />
        </div>
      </div>
      <div v-if="getTotal.totalCount > 0" class=" flex flex-col gap-8">
        <div class=" flex justify-between items-center">
          <h3 class=" text-zinc-700 text-lg font-semibold">
            Orden Total</h3>
          <h2 class=" text-3xl font-bold">
            S/ {{ (getTotal.totalPrice * 3).toFixed(2) }}</h2>
        </div>
        <button
          class=" bg-red-600 hover:bg-red-400 py-5 text-red-50 text-xl font-semibold rounded-full transition-all duration-100">
          Confirmar Orden</button>
      </div>
      <div v-else class=" flex items-center gap-2 pt-4 text-zinc-700">
        <h4 class=" text-lg font-semibold">
          Tu carrito está vacío.</h4>
        <Icon name="tabler:mood-sad" class=" text-2xl" />
      </div>
    </aside>
  </div>
</template>