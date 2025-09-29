import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

type actionType = 'init-items' | 'init-discounts' | 'init-promotions';
export interface OrderAction {
    type: actionType;
    payload: ItemInfo[] | Discount[] | Promotion[];
}
export interface PosState {
    items: ItemInfo[];
    discounts: Discount[];
    promotions: Promotion[];
}

export interface ItemInfo {
    name: string;
    price: number;
};

export interface Discount {
    name: string;
    price: number;
}

export interface Promotion {
    name: string;
    price: number;
}


const PosProvider = createContext<PosState | null>(null);
const PosDispatch = createContext<Dispatch<OrderAction> | null>(null);

function orderReducer(state: PosState, action: OrderAction): PosState {
    switch (action.type) {
        case 'init-items':
            return { ...state, items: action.payload as ItemInfo[] };
        case 'init-discounts':
            return { ...state, discounts: action.payload as Discount[] };
        case 'init-promotions':
            return { ...state, promotions: action.payload as Promotion[] };
        default:
            return state;
    }
}

function ContextPosProvider({ children, data }: { children: ReactNode, data: PosState}) {
    // { items: [], discounts: [], promotions: [] }
    const [state, dispatch] = useReducer(orderReducer, data);

    return (
        <PosProvider.Provider value={state}>
            <PosDispatch.Provider value={dispatch}>
                {children}
            </PosDispatch.Provider>
        </PosProvider.Provider>
        );
}

export function usePosContext() {
    return useContext(PosProvider);
}

export function usePosDispatch() {
    return useContext(PosDispatch);
}

export default ContextPosProvider;