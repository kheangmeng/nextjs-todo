"use server"

import { Suspense } from "react";
import PosForm from "@/components/PosForm";
import type { Discount, Promotion, ItemInfo } from '@/contexts/usePosContext';

const getDiscounts = async () => {
  let discounts: Discount[] = []
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/discount`)
    discounts = (await data.json()).discounts || []
    if(discounts.length > 0) {
      discounts = discounts.map((todo: Discount) => ({
        name: todo.name,
        price: todo.price,
      }))
    }
    return discounts
}
const getPromotions = async () => {
  let promotions: Promotion[] = []
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/promotion`)
    promotions = (await data.json()).promotions || []
    if(promotions.length > 0) {
      promotions = promotions.map((todo: Promotion) => ({
        name: todo.name,
        price: todo.price,
      }))
    }
    return promotions
}
const getItems = async () => {
  let items: ItemInfo[] = []
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/item`)
    items = (await data.json()).items || []
    if(items.length > 0) {
      items = items.map((todo: ItemInfo) => ({
        name: todo.name,
        price: todo.price,
      }))
    }
    return items
}

export default async function Page() {
  const discounts = getDiscounts()
  const promotions = getPromotions()
  const items = getItems()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PosForm discounts={discounts} promotions={promotions} items={items}/>
    </Suspense>
  )
}