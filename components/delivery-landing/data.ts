
export interface Promotion {
    id: number;
    title: string;
    imageUrl: string;
}
export const promotions = [
    { id: 1, title: "50% OFF your first order!", imageUrl: "https://placehold.co/1200x400/ec4899/ffffff?text=50%_OFF&font=inter" },
    { id: 2, title: "Free Delivery on everything!", imageUrl: "https://placehold.co/1200x400/8b5cf6/ffffff?text=Free_Delivery&font=inter" },
];

export interface FoodType {
    name: string;
    imageUrl: string;
}
export const foodTypes = [
    { name: 'Pizza', imageUrl: 'https://placehold.co/200x200/f97316/ffffff?text=Pizza&font=inter' },
    { name: 'Burgers', imageUrl: 'https://placehold.co/200x200/ef4444/ffffff?text=Burgers&font=inter' },
    { name: 'Asian', imageUrl: 'https://placehold.co/200x200/22c55e/ffffff?text=Asian&font=inter' },
    { name: 'Desserts', imageUrl: 'https://placehold.co/200x200/3b82f6/ffffff?text=Desserts&font=inter' },
    { name: 'Sushi', imageUrl: 'https://placehold.co/200x200/14b8a6/ffffff?text=Sushi&font=inter' },
    { name: 'Khmer Food', imageUrl: 'https://placehold.co/200x200/f59e0b/ffffff?text=Khmer&font=inter' },
    { name: 'Coffee', imageUrl: 'https://placehold.co/200x200/6b7280/ffffff?text=Coffee&font=inter' },
];

export interface Restaurant {
    id: number;
    name: string;
    cuisine: string;
    imageUrl: string;
    tags: string[];
    rating: number;
    deliveryTime: string;
    promotion: string | null;
    isPopular: boolean;
    offers: {
        freeDelivery: boolean;
        deals: boolean;
    };
}
export const allRestaurants = [
    { id: 1, name: "The Pizza Company", cuisine: "Pizza", imageUrl: "https://placehold.co/400x250/f97316/ffffff?text=Pizza+Co.", tags: ['Pizza', 'Italian'], rating: 4.5, deliveryTime: '25-35 min', promotion: '20% OFF', isPopular: true, offers: { freeDelivery: false, deals: true } },
    { id: 2, name: "Burger King", cuisine: "Burgers", imageUrl: "https://placehold.co/400x250/ef4444/ffffff?text=Burger+King", tags: ['Burgers', 'Fast Food'], rating: 4.3, deliveryTime: '15-25 min', promotion: 'Free Fries', isPopular: true, offers: { freeDelivery: true, deals: true } },
    { id: 3, name: "Yi Sang Restaurant", cuisine: "Asian", imageUrl: "https://placehold.co/400x250/22c55e/ffffff?text=Yi+Sang", tags: ['Asian', 'Chinese'], rating: 4.8, deliveryTime: '30-40 min', promotion: null, isPopular: true, offers: { freeDelivery: false, deals: false } },
    { id: 4, name: "Dairy Queen", cuisine: "Desserts", imageUrl: "https://placehold.co/400x250/3b82f6/ffffff?text=DQ", tags: ['Desserts', 'Ice Cream'], rating: 4.7, deliveryTime: '10-20 min', promotion: 'BOGO Sundae', isPopular: true, offers: { freeDelivery: false, deals: true } },
    { id: 5, name: "Sushi Tei", cuisine: "Sushi", imageUrl: "https://placehold.co/400x250/14b8a6/ffffff?text=Sushi+Tei", tags: ['Sushi', 'Japanese'], rating: 4.6, deliveryTime: '35-45 min', promotion: null, isPopular: false, offers: { freeDelivery: false, deals: false } },
    { id: 6, name: "Brown Coffee", cuisine: "Coffee", imageUrl: "https://placehold.co/400x250/6b7280/ffffff?text=Brown+Coffee", tags: ['Coffee', 'Bakery'], rating: 4.9, deliveryTime: '10-15 min', promotion: 'Morning Combo', isPopular: true, offers: { freeDelivery: true, deals: true } },
    { id: 7, name: "Domino's Pizza", cuisine: "Pizza", imageUrl: "https://placehold.co/400x250/1d4ed8/ffffff?text=Domino's", tags: ['Pizza', 'Fast Food'], rating: 4.2, deliveryTime: '20-30 min', promotion: null, isPopular: false, offers: { freeDelivery: false, deals: false } },
    { id: 8, name: "Malis Restaurant", cuisine: "Khmer Food", imageUrl: "https://placehold.co/400x250/f59e0b/ffffff?text=Malis", tags: ['Khmer Food', 'Fine Dining'], rating: 4.9, deliveryTime: '40-50 min', promotion: null, isPopular: true, offers: { freeDelivery: false, deals: false } },
    { id: 9, name: "KFC", cuisine: "Fast Food", imageUrl: "https://placehold.co/400x250/dc2626/ffffff?text=KFC", tags: ['Chicken', 'Fast Food'], rating: 4.1, deliveryTime: '15-25 min', promotion: 'Family Bucket Deal', isPopular: true, offers: { freeDelivery: false, deals: true } },
    { id: 10, name: "Tube Coffee", cuisine: "Coffee", imageUrl: "https://placehold.co/400x250/a16207/ffffff?text=Tube+Coffee", tags: ['Coffee'], rating: 4.7, deliveryTime: '5-10 min', promotion: null, isPopular: false, offers: { freeDelivery: false, deals: false } },
    { id: 11, name: "Carl's Jr.", cuisine: "Burgers", imageUrl: "https://placehold.co/400x250/facc15/000000?text=Carl's+Jr.", tags: ['Burgers', 'American'], rating: 4.4, deliveryTime: '20-30 min', promotion: null, isPopular: false, offers: { freeDelivery: false, deals: false } },
    { id: 12, name: "PastaMania", cuisine: "Italian", imageUrl: "https://placehold.co/400x250/4d7c0f/ffffff?text=PastaMania", tags: ['Pasta', 'Italian'], rating: 4.3, deliveryTime: '25-35 min', promotion: 'Student Deal', isPopular: false, offers: { freeDelivery: true, deals: true } },
    // ...Array.from({ length: 12 }, (_, i) => ({
    //     id: 13 + i, name: `Restaurant #${i + 1}`, cuisine: "Various", imageUrl: `https://placehold.co/400x250/78716c/ffffff?text=Restaurant+${i+1}`, tags: ['Various'], rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), deliveryTime: '20-40 min', promotion: i % 3 === 0 ? '10% OFF' : null, isPopular: false, offers: { freeDelivery: i % 2 === 0, deals: i % 3 === 0 }
    // }))
];

export const duplicateRestaurants = () => {
    let res = allRestaurants
    for(let i=10; i < 120; i++ ) {
        const dup = allRestaurants.map(r => ({...r, id: r.id+ Math.random()}))
        res = [...res, ...dup]
    }

    return res
}