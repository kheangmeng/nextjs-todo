"use server"

import PosForm from "@/components/PosForm";
import type { Discount, Promotion, ItemInfo } from '@/contexts/usePosContext';

const getDiscounts = async () => {
  let discounts: Discount[] = []
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/discount`)
      discounts = (await data.json()).discounts || []
      if(discounts.length > 0) {
        discounts = discounts.map((todo: Discount) => ({
          name: todo.name,
          price: todo.price,
        }))
      }
  } catch (error) {
    console.log('error discount:', error)
  }
  return discounts
}
const getPromotions = async () => {
  let promotions: Promotion[] = []
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/promotion`)
    promotions = (await data.json()).promotions || []
    if(promotions.length > 0) {
      promotions = promotions.map((todo: Promotion) => ({
        name: todo.name,
        price: todo.price,
      }))
    }
  } catch (error) {
    console.log('error promotion:', error)
  }
  return promotions
}
const getItems = async () => {
  let items: ItemInfo[] = []
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/api/item`)
    items = (await data.json()).items || []
    if(items.length > 0) {
      items = items.map((todo: ItemInfo) => ({
        name: todo.name,
        price: todo.price,
      }))
    }
  } catch (error) {
    console.log('error item:', error)
  }
  return items
}

export default async function Page() {
  const discounts = getDiscounts()
  const promotions = getPromotions()
  const items = getItems()

  return <PosForm discounts={discounts} promotions={promotions} items={items}/>
}