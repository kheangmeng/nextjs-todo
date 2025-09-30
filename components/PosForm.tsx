'use client'

import { startTransition, use, useActionState, useState } from "react"
import * as motion from "motion/react-client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Hamburger, BadgeDollarSign, BadgePercent, Trash, Loader2Icon } from "lucide-react"
import 
  ContextOrderProvider, 
  {
    useOrderContext,
    useOrderDispatch,
    type OrderState,
  } from "@/contexts/useOrderContext"
import ContextPosProvider, { usePosContext } from "@/contexts/usePosContext" 
import { formatCurrency } from "@/lib/utils"
import type { Discount, Promotion, ItemInfo } from '@/contexts/usePosContext';

interface PosProps {
  discounts: Promise<Discount[]>;
  promotions: Promise<Promotion[]>;
  items: Promise<ItemInfo[]>;
}
export default function Pos({discounts, promotions, items}: PosProps) {
	const allDiscounts = use(discounts)
	const allPromotions = use(promotions)
	const allItems = use(items)
	
  return (
		<ContextPosProvider data={{ items: allItems, discounts: allDiscounts, promotions: allPromotions }}>
			<ContextOrderProvider>
				<PosContent />
			</ContextOrderProvider>
		</ContextPosProvider>
  )
}

function PosContent() {
	const posState = usePosContext()
  const state = useOrderContext()
  const dispatch = useOrderDispatch()

  const addItemToOrder = (item: ItemInfo, dis?: Discount, promo?: Promotion) => {
    if(!dispatch) return
    
    const id = `${item.name}-${dis?.name}-${promo?.name}`
    const order: OrderState = {
      id,
      name: item.name,
      price: item.price,
      quantity: 1,
      discount: dis,
      promotion: promo,
      total: item.price,
    }
    
    if(state.find(order => order.id === id)) {
      dispatch({ type: 'increase', payload: order })
    } else {
      dispatch({ type: 'add', payload: order })
    }
  }

  return (
    <>
      <div className="flex justify-center items-center mt-2">
        <div className="relative">
          <h1 className="bg-gradient text-center text-2xl font-bold py-5 px-3 border rounded-full border-b-2 border-gray-300">POS</h1>
          <Badge
            className="absolute top-0 left-10 rounded-full bg-orange-600"
          >
            Beta
          </Badge>
        </div>
      </div>
      <Card className="flex flex-col md:flex-row gap-6 p-2 m-2">
        <div className="w-full md:w-2/3 flex flex-col gap-2 justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            { 
              posState?.items.map((item: ItemInfo) => (
                <ItemCard item={item} key={item.name} addCard={(dis, promo) => addItemToOrder(item, dis, promo)} />
              ))
            }
          </div>
          <div className="px-2 mx-2 mt-6">
            <ActionGroup />
          </div>
        </div>
        <div className="w-full md:w-1/3 border-l-2 border-gray-300 flex flex-col justify-between">
          <div className="flex flex-col pl-5">
            <div className="static"><OrderLabel /></div>
            <div className="flex flex-col gap-2 overflow-y-scroll h-[650px]">
              { 
                state.length > 0 ? state.map((order: OrderState) => (<OrderCard order={order} key={order.id} />)) 
                  : <p className="text-center text-gray-400 mt-20">No order yet</p>
              }
            </div>
          </div>
          <div className="border-t-2 border-gray-300 pt-3">
            <div className="pl-5"><OrderTotal /></div>
          </div>
        </div>
      </Card>
    </>
  )
}

const onPayment = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    toast.success("Pay successfully!");
    return true
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      toast.error("Failed to add todo!");
    }
  }
  return false
}
function ActionGroup() {
  const [lock, setLock] = useState(false)
  const [save, setSave] = useState('')
  const orders = useOrderContext()

  return <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 md:items-center md:justify-center">
    <Button className="basis-1/5" onClick={() => setLock(!lock)}>{lock ? 'Unlock' : 'Lock'}</Button>
    <Button 
      className="basis-1/5" 
      disabled={ lock || orders.length === 0} 
      onClick={() => setSave('save')}
    >Save</Button>
    <ActionPay disabled={ lock || save==''} onPay={() => setSave('')}/>
  </div>
}

function ActionPay({ onPay, ...props}: React.ComponentProps<"button"> & { onPay: () => void }){
  const dispatch = useOrderDispatch();
  const [state, action, pending ] = useActionState(onPayment, false)

  const handlePayment = () => {
    action();
    if (dispatch) {
      dispatch({ type: 'init' });
      onPay();
    }
  };

  return <Button 
    className="basis-1/5"
    onClick={() => {startTransition(handlePayment)}}
    {...props}
  >
    { pending ? <Loader2Icon className="animate-spin" /> : 'Pay'}
  </Button>
}

function ItemCard({ item, addCard }: { item: ItemInfo, addCard: (dis?: Discount, promo?: Promotion) => void}) {
	const posState = usePosContext()
  const [ discount, setDiscount ] = useState<Discount>()
  const [ promotion, setPromotion ] = useState<Promotion>()

  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
    > 
      <Card 
        onClick={() => addCard(discount, promotion)}
        className="flex flex-col gap-2 p-2 items-center justify-center hover:bg-gray-100 cursor-pointer" 
      >
        <Hamburger />
        <div>{item.name}</div>
        <div>{formatCurrency(item.price)}</div>
        <div className="flex flex-row gap-2 w-full">
          
          <Tooltip>
            <TooltipTrigger asChild>
              <BadgeDollarSign />
            </TooltipTrigger>
            <TooltipContent>
              Discount
            </TooltipContent>
          </Tooltip>
          <div className="flex flex-row gap-2 items-center justify-center">
            { posState?.discounts.map((dis: Discount) => (
                <div className="flex items-center gap-1" key={dis.name + item.name}>
                <Checkbox 
                  value={dis.name}
                  id={dis.name + item.name} 
                  onPointerDownCapture={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    setDiscount(dis)
                  }} 
                />
                <Label htmlFor={dis.name + item.name}>{dis.name}</Label>
              </div>))
            }
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <BadgePercent />
            </TooltipTrigger>
            <TooltipContent>
              Promotion
            </TooltipContent>
          </Tooltip>
          <div className="flex flex-row gap-2 items-center justify-center">
            { posState?.promotions.map((promo: Promotion) => (
                <div className="flex items-center gap-1" key={promo.name + item.name}>
                <Checkbox 
                  value={promo.name}
                  id={promo.name + item.name} 
                  onPointerDownCapture={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    setPromotion(promo)
                  }} 
                />
                <Label htmlFor={promo.name + item.name}>{promo.name}</Label>
              </div>))
            }
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function OrderLabel() {
  return (
    <div className="flex flex-row gap-2 p-2 items-center justify-center text-xs font-semibold text-gray-400">
      <div className="w-2/5">NAME</div>
      <div className="w-1/5">QTY</div>
      <div className="w-1/5">PRICE</div>
      <div className="w-1/5">TOTAL</div>
    </div>
  )
}

function OrderTotal() {
  const state = useOrderContext()
  const totalPrice = state.reduce((acc, order) => acc + order.total, 0)

  return  (
    <div className="flex flex-row justify-between items-center font-semibold mb-1">
      <div>Total Price:</div>
      <div>{formatCurrency(totalPrice)}</div>
    </div>
  )
}

function OrderCard({ order }: { order: OrderState }) {
  const dispatch = useOrderDispatch()
  const removeOrder = () => {
    if(!dispatch) return
    dispatch({ type: 'remove', payload: order })
  }

  return (
    <div className="flex flex-row gap-2 items-center justify-center hover:bg-gray-100">
      <div className="w-2/5">{order.name}</div>
      <div className="w-1/5">{order.quantity}</div>
      <div className="w-1/5">{formatCurrency(order.price)}</div>
      <div className="w-1/5 flex flex-row gap-2 ">
        <div>{formatCurrency(order.total)}</div>
        <Trash onClick={removeOrder} className="hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  )
}