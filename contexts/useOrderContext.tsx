import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import type { Discount, Promotion } from '@/contexts/usePosContext';

type actionType = 'init' | 'add' | 'remove' | 'increase' | 'decrease';
export interface OrderAction {
	type: actionType;
	payload?: OrderState;
}
export interface OrderState {
	id: string;
	name: string;
	price: number;
	quantity: number;
	discount?: Discount;
	promotion?: Promotion;
	total: number;
}

const OrderProvider = createContext<OrderState[]>([]);
const OrderDispatch = createContext<Dispatch<OrderAction> | null>(null);

function orderReducer(state: OrderState[], action: OrderAction): OrderState[] {
	switch (action.type) {
		case 'init':
			return action.payload ? [action.payload as OrderState] : [];
		case 'add':
			return action.payload ? [...state, action.payload] : state;
		case 'remove':
			return state.filter(item => item.id !== action.payload?.id);
		case 'increase':
			return state.map(item => {
				if (item.id === action.payload?.id) {
					return {
						...item,
						quantity: item.quantity + 1,
						total:	Number((item.total + item.price).toFixed(2)),
					};
				}
				return item;
			});
		case 'decrease':
			return state.map(item => {
				if (item.id === action.payload?.id) {
					return {
						...item,
						quantity: item.quantity - 1,
						total: Number((item.total - item.price).toFixed(2)),
					};
				}
				return item;
			});
		default:
			return state;
	}
}

function ContextOrderProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(orderReducer, []);

	return (
		<OrderProvider.Provider value={state}>
			<OrderDispatch.Provider value={dispatch}>
				{children}
			</OrderDispatch.Provider>
		</OrderProvider.Provider>
		);
}

export function useOrderContext() {
	return useContext(OrderProvider);
}

export function useOrderDispatch() {
	return useContext(OrderDispatch);
}

export default ContextOrderProvider;