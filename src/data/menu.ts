export type MenuCategory =
  | 'tacos'
  | 'quesadillas'
  | 'antojitos'
  | 'grill'
  | 'bar'
  | 'desserts';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
}

export const categoryLabels: Record<MenuCategory, string> = {
  tacos: 'Tacos',
  quesadillas: 'Quesadillas',
  antojitos: 'Antojitos',
  grill: 'Grill',
  bar: 'Коктейли',
  desserts: 'Desserts',
};

export const menuItems: MenuItem[] = [
  {
    id: 't1',
    category: 'tacos',
    name: 'Birria de Res',
    description: 'Медленно тушённая говядина, consomé, кинза, лук-порей',
    price: 890,
  },
  {
    id: 't2',
    category: 'tacos',
    name: 'Carnitas Negras',
    description: 'Свинина confit, чёрный чили, лайм, микрозелень',
    price: 750,
  },
  {
    id: 't3',
    category: 'tacos',
    name: 'Pulpo al Pastor',
    description: 'Осьминог, ананас, achiote, копчёная соль',
    price: 1120,
  },
  {
    id: 'q1',
    category: 'quesadillas',
    name: 'Queso Oaxaca',
    description: 'Растягивающийся сыр, huitlacoche, трюфельное масло',
    price: 680,
  },
  {
    id: 'q2',
    category: 'quesadillas',
    name: 'Chorizo & Manchego',
    description: 'Домашняя чоризо, манчего, сальса verde',
    price: 720,
  },
  {
    id: 'a1',
    category: 'antojitos',
    name: 'Elote Negro',
    description: 'Чёрная кукуруза, cotija, chipotle mayo, лайм',
    price: 520,
  },
  {
    id: 'a2',
    category: 'antojitos',
    name: 'Tostadas de Atún',
    description: 'Тунец татаки, авокадо, yuzu, кунжут',
    price: 980,
  },
  {
    id: 'g1',
    category: 'grill',
    name: 'Arrachera',
    description: 'Мраморная говядина, chimichurri, печёный перец',
    price: 2450,
  },
  {
    id: 'g2',
    category: 'grill',
    name: 'Pescado a la Brasa',
    description: 'Дорадо на углях, salsa macha, фенхель',
    price: 1890,
  },
  {
    id: 'b1',
    category: 'bar',
    name: 'Negroni Oaxaqueño',
    description: 'Мескаль, Campari, vermouth rosso, апельсин',
    price: 890,
  },
  {
    id: 'b2',
    category: 'bar',
    name: 'Paloma de Muerte',
    description: 'Текила reposado, грейпфрут, sal de gusano',
    price: 780,
  },
  {
    id: 'd1',
    category: 'desserts',
    name: 'Churros de Canela',
    description: 'Тёплые чуррос, dulce de leche, ваниль',
    price: 480,
  },
  {
    id: 'd2',
    category: 'desserts',
    name: 'Flan de Mascarpone',
    description: 'Карамель, мускатный орех, кофейная пена',
    price: 520,
  },
];

export const categories: MenuCategory[] = [
  'tacos',
  'quesadillas',
  'antojitos',
  'grill',
  'bar',
  'desserts',
];
