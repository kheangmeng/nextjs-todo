export interface Mobile {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  specs: {
    screen: string;
    camera: string;
    battery: string;
  };
}

export interface Category {
  brand: string;
  products: Mobile[];
}

export const categories: Category[] = [
  {
    brand: 'Apple',
    products: [
      {
        id: 1,
        name: 'iPhone 17 Pro Max',
        imageUrl: '/mobiles/apple-iphone-17-pro-max-1.jpg',
        price: 1199,
        specs: { screen: '6.8" ProMotion', camera: '48MP Main', battery: 'Up to 23h video' },
      },
      {
        id: 2,
        name: 'iPhone Air',
        imageUrl: '/mobiles/apple-iphone-air-1.jpg',
        price: 999,
        specs: { screen: '6.3" Super Retina', camera: '48MP Main', battery: 'Up to 20h video' },
      },
      {
        id: 3,
        name: 'iPhone 17',
        imageUrl: '/mobiles/apple-iphone-17.jpg',
        price: 799,
        specs: { screen: '6.1" ProMotion', camera: '48MP Main', battery: 'Up to 23h video' },
      },
    ],
  },
  {
    brand: 'Samsung',
    products: [
      {
        id: 4,
        name: 'Galaxy S25 Ultra',
        imageUrl: '/mobiles/samsung-galaxy-s25-ultra-sm-s938-1.jpg',
        price: 1299,
        specs: { screen: '6.8" Dynamic AMOLED', camera: '200MP Main', battery: '5000mAh' },
      },
      {
        id: 5,
        name: 'Galaxy Z Fold 7',
        imageUrl: '/mobiles/samsung-galaxy-z-fold7.jpg',
        price: 1799,
        specs: { screen: '7.6" Foldable', camera: '50MP Main', battery: '4400mAh' },
      },
      {
        id: 6,
        name: 'Galaxy Z Flip 7',
        imageUrl: '/mobiles/samsung-galaxy-z-flip7.jpg',
        price: 1499,
        specs: { screen: '7.6" Foldable', camera: '50MP Main', battery: '4400mAh' },
      },
    ],
  },
  {
    brand: 'Google',
    products: [
      {
        id: 7,
        name: 'Pixel 10 Pro Fold',
        imageUrl: '/mobiles/google-pixel-10-pro-fold-00.jpg',
        price: 1799,
        specs: { screen: '7.6" Foldable OLED', camera: '48MP Main', battery: '4821mAh' },
      },
      {
        id: 8,
        name: 'Pixel 10 Pro XL',
        imageUrl: '/mobiles/google-pixel-10-pro-xl-.jpg',
        price: 1199,
        specs: { screen: '7.6" Foldable OLED', camera: '48MP Main', battery: '4821mAh' },
      },
      {
        id: 9,
        name: 'Pixel 8 Pro',
        imageUrl: '/mobiles/google-pixel-8-pro.jpg',
        price: 999,
        specs: { screen: '6.7" Super Actua', camera: '50MP Octa-PD', battery: '5050mAh' },
      },
    ],
  },
];