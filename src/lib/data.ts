export interface Property {
  id: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  features: string[];
  images: string[];
  priceHistory: { month: string; price: number }[];
  valueHistory: { year: number; value: number }[];
  agent: {
    name: string;
    avatar: string;
  };
}

const propertiesData: Property[] = [
  {
    id: '1',
    address: '123 Lavender Lane',
    city: 'Dreamville',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    description: 'A beautiful modern home with an open floor plan, high ceilings, and large windows that fill the space with natural light. The backyard is an entertainer\'s dream with a built-in BBQ and a sparkling pool.',
    features: ['Swimming Pool', '2-Car Garage', 'Central Air', 'Hardwood Floors', 'Smart Home System', 'Gourmet Kitchen'],
    images: [
      'https://picsum.photos/1280/720?random=1',
      'https://picsum.photos/1280/720?random=2',
      'https://picsum.photos/1280/720?random=3',
      'https://picsum.photos/1280/720?random=4',
    ],
    priceHistory: [
      { month: 'Jan', price: 820000 },
      { month: 'Feb', price: 825000 },
      { month: 'Mar', price: 830000 },
      { month: 'Apr', price: 840000 },
      { month: 'May', price: 845000 },
      { month: 'Jun', price: 850000 },
    ],
    valueHistory: [
        { year: 2020, value: 750000 },
        { year: 2021, value: 780000 },
        { year: 2022, value: 810000 },
        { year: 2023, value: 830000 },
        { year: 2024, value: 850000 },
    ],
    agent: {
      name: 'Isabella Chen',
      avatar: 'https://picsum.photos/100/100?random=a',
    },
  },
  {
    id: '2',
    address: '456 Violet Vista',
    city: 'Serenity Springs',
    price: 1200000,
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4200,
    description: 'Luxurious estate with panoramic views of the city. This custom-built home features impeccable craftsmanship, a home theater, wine cellar, and a stunning infinity pool overlooking the valley.',
    features: ['Infinity Pool', '3-Car Garage', 'Home Theater', 'Wine Cellar', 'Panoramic Views', 'Heated Floors'],
    images: [
      'https://picsum.photos/1280/720?random=5',
      'https://picsum.photos/1280/720?random=6',
      'https://picsum.photos/1280/720?random=7',
      'https://picsum.photos/1280/720?random=8',
    ],
    priceHistory: [
      { month: 'Jan', price: 1150000 },
      { month: 'Feb', price: 1160000 },
      { month: 'Mar', price: 1175000 },
      { month: 'Apr', price: 1185000 },
      { month: 'May', price: 1195000 },
      { month: 'Jun', price: 1200000 },
    ],
    valueHistory: [
        { year: 2020, value: 1050000 },
        { year: 2021, value: 1100000 },
        { year: 2022, value: 1140000 },
        { year: 2023, value: 1170000 },
        { year: 2024, value: 1200000 },
    ],
    agent: {
      name: 'Benjamin Carter',
      avatar: 'https://picsum.photos/100/100?random=b',
    },
  },
  {
    id: '3',
    address: '789 Orchid Oasis',
    city: 'Dreamville',
    price: 675000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1900,
    description: 'Charming single-story home with a large, private backyard and mature fruit trees. Recently remodeled kitchen with quartz countertops and stainless steel appliances. Perfect for a growing family.',
    features: ['Remodeled Kitchen', 'Large Backyard', 'Fruit Trees', 'Fireplace', '2-Car Garage', 'Quiet Street'],
    images: [
      'https://picsum.photos/1280/720?random=9',
      'https://picsum.photos/1280/720?random=10',
      'https://picsum.photos/1280/720?random=11',
    ],
    priceHistory: [
      { month: 'Jan', price: 650000 },
      { month: 'Feb', price: 655000 },
      { month: 'Mar', price: 660000 },
      { month: 'Apr', price: 665000 },
      { month: 'May', price: 670000 },
      { month: 'Jun', price: 675000 },
    ],
    valueHistory: [
        { year: 2020, value: 600000 },
        { year: 2021, value: 620000 },
        { year: 2022, value: 640000 },
        { year: 2023, value: 660000 },
        { year: 2024, value: 675000 },
    ],
    agent: {
      name: 'Olivia Rodriguez',
      avatar: 'https://picsum.photos/100/100?random=c',
    },
  },
  {
    id: '4',
    address: '101 Rosewood Retreat',
    city: 'Serenity Springs',
    price: 2500000,
    bedrooms: 6,
    bathrooms: 7,
    sqft: 7500,
    description: 'An architectural masterpiece, this sprawling contemporary home offers unparalleled luxury and privacy. Features a guest house, tennis court, and state-of-the-art security system. The ultimate private compound.',
    features: ['Guest House', 'Tennis Court', '4-Car Garage', 'Gym', 'Sauna', 'Gated Community'],
    images: [
      'https://picsum.photos/1280/720?random=12',
      'https://picsum.photos/1280/720?random=13',
      'https://picsum.photos/1280/720?random=14',
      'https://picsum.photos/1280/720?random=15',
    ],
    priceHistory: [
      { month: 'Jan', price: 2450000 },
      { month: 'Feb', price: 2460000 },
      { month: 'Mar', price: 2470000 },
      { month: 'Apr', price: 2480000 },
      { month: 'May', price: 2490000 },
      { month: 'Jun', price: 2500000 },
    ],
    valueHistory: [
        { year: 2020, value: 2200000 },
        { year: 2021, value: 2300000 },
        { year: 2022, value: 2400000 },
        { year: 2023, value: 2450000 },
        { year: 2024, value: 2500000 },
    ],
    agent: {
      name: 'Liam Goldberg',
      avatar: 'https://picsum.photos/100/100?random=d',
    },
  },
  {
    id: '5',
    address: '212 Mauve Manor',
    city: 'Dreamville',
    price: 950000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    description: 'Stately colonial-style home on a quiet cul-de-sac. Features a grand staircase, formal dining room, and a cozy library with built-in bookshelves. The expansive master suite is a true retreat.',
    features: ['Cul-de-sac', 'Library', 'Formal Dining Room', '3-Car Garage', 'Master Suite', 'Landscaped Gardens'],
    images: [
      'https://picsum.photos/1280/720?random=16',
      'https://picsum.photos/1280/720?random=17',
      'https://picsum.photos/1280/720?random=18',
    ],
    priceHistory: [
      { month: 'Jan', price: 920000 },
      { month: 'Feb', price: 925000 },
      { month: 'Mar', price: 930000 },
      { month: 'Apr', price: 940000 },
      { month: 'May', price: 945000 },
      { month: 'Jun', price: 950000 },
    ],
    valueHistory: [
        { year: 2020, value: 850000 },
        { year: 2021, value: 880000 },
        { year: 2022, value: 910000 },
        { year: 2023, value: 930000 },
        { year: 2024, value: 950000 },
    ],
    agent: {
      name: 'Isabella Chen',
      avatar: 'https://picsum.photos/100/100?random=a',
    },
  },
  {
    id: '6',
    address: '333 Periwinkle Place',
    city: 'Serenity Springs',
    price: 499000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    description: 'Stylish downtown condo with an industrial loft aesthetic. Exposed brick walls, concrete floors, and a private balcony with city views. Building amenities include a rooftop deck and fitness center.',
    features: ['Rooftop Deck', 'Fitness Center', 'Private Balcony', 'Exposed Brick', 'Walk-in Closet', 'Underground Parking'],
    images: [
      'https://picsum.photos/1280/720?random=19',
      'https://picsum.photos/1280/720?random=20',
      'https://picsum.photos/1280/720?random=21',
    ],
    priceHistory: [
      { month: 'Jan', price: 480000 },
      { month: 'Feb', price: 485000 },
      { month: 'Mar', price: 490000 },
      { month: 'Apr', price: 492000 },
      { month: 'May', price: 495000 },
      { month: 'Jun', price: 499000 },
    ],
    valueHistory: [
        { year: 2020, value: 450000 },
        { year: 2021, value: 460000 },
        { year: 2022, value: 475000 },
        { year: 2023, value: 485000 },
        { year: 2024, value: 499000 },
    ],
    agent: {
      name: 'Benjamin Carter',
      avatar: 'https://picsum.photos/100/100?random=b',
    },
  },
];

export const getProperties = (): Property[] => {
  return propertiesData;
};

export const getPropertyById = (id: string): Property | undefined => {
  return propertiesData.find((p) => p.id === id);
};
