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

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  brandId: string;
}

export interface MenuData {
  [category: string]: {
    brand: string;
    products: Mobile[];
  }[];
}

export const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Sony', 'HTC', 'VIVO', 'OPPO', 'Huawei', 'Motorola', 'Realme', 'ASUS', 'LENOVO', 'Tecno', 'ZTE'];

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

export const carouselSlides = [
  {
    id: 1,
    title: 'iPhone 17 Pro Max',
    subtitle: 'The Ultimate iPhone.',
    imageUrl: '/mobiles/apple-iphone-17-pro-max-1.jpg',
    brandId: 'Apple',
  },
  {
    id: 2,
    title: 'Galaxy Z Fold 7',
    subtitle: 'Unfold Your World.',
    imageUrl: '/mobiles/samsung-galaxy-z-fold7-3.jpg',
    brandId: 'Samsung',
  },
  {
    id: 3,
    title: 'Pixel 10 Pro Fold',
    subtitle: 'The most advanced Pixel camera yet.',
    imageUrl: '/mobiles/google-pixel-10-pro-fold-00.jpg',
    brandId: 'Google',
  },
];

export const menuData = {
  Phone: [
    {
      brand: 'Apple',
      products: [
        { id: 1, name: 'iPhone 15 Pro', imageUrl: 'https://images.unsplash.com/photo-1695026212133-65239b561b36?q=80&w=800', price: 999, specs: { screen: '6.1" ProMotion', camera: '48MP Main', battery: 'Up to 23h video' } },
        { id: 2, name: 'iPhone 15', imageUrl: 'https://images.unsplash.com/photo-1694322308821-4b102922112e?q=80&w=800', price: 799, specs: { screen: '6.1" Super Retina', camera: '48MP Main', battery: 'Up to 20h video' } },
      ],
    },
    {
      brand: 'Samsung',
      products: [
        { id: 4, name: 'Galaxy S24 Ultra', imageUrl: 'https://images.unsplash.com/photo-1707130230911-3f1d3a54b324?q=80&w=800', price: 1299, specs: { screen: '6.8" Dynamic AMOLED', camera: '200MP Main', battery: '5000mAh' } },
        { id: 5, name: 'Galaxy Z Fold 5', imageUrl: 'https://images.unsplash.com/photo-1691212497637-a1785544719d?q=80&w=800', price: 1799, specs: { screen: '7.6" Foldable', camera: '50MP Main', battery: '4400mAh' } },
      ],
    },
    {
      brand: 'Google',
      products: [
        { id: 6, name: 'Pixel 8 Pro', imageUrl: 'https://images.unsplash.com/photo-1696204212269-425b03c809e5?q=80&w=800', price: 999, specs: { screen: '6.7" Super Actua', camera: '50MP Octa-PD', battery: '5050mAh' } },
      ],
    },
  ],
  Tablet: [
     {
      brand: 'iPad',
      products: [
        { id: 8, name: 'iPad Pro', imageUrl: 'https://images.unsplash.com/photo-1587464838239-fe383514695b?q=80&w=800', price: 799, specs: { screen: '11" Liquid Retina', camera: '12MP Wide', battery: 'Up to 10h' } },
        { id: 9, name: 'iPad Air', imageUrl: 'https://images.unsplash.com/photo-1621793333363-393bf7f13bbe?q=80&w=800', price: 599, specs: { screen: '10.9" Liquid Retina', camera: '12MP Wide', battery: 'Up to 10h' } },
      ],
    },
  ],
  Watch: [
     {
      brand: 'AppleWatch',
      products: [
        { id: 10, name: 'Apple Watch Ultra 2', imageUrl: 'https://images.unsplash.com/photo-1695346011252-c380b2a5912d?q=80&w=800', price: 799, specs: { screen: '49mm case', camera: 'N/A', battery: 'Up to 36h' } },
      ],
    },
  ],
};
