export type UserRole = 'ADMIN' | 'MANAGER' | 'CLIENT';

export type User = {
  id: string;
  password: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  refreshToken: string;
  isActivated: boolean;
  activatedLink: string;

  createdAt: Date;
  updatedAt: Date;

  products: Product[];
  likes: Like[];
  comments: Comment[];
  chats: Chat[];
  userChats: UserChat[];
  messages: Message[];
  cart?: Cart;
  orders: Order[];
  purchasedProducts: string[]; // массив ID товаров
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  avatarUrl?: string;

  likes: Like[];
  comments: Comment[];
  userId: string;
  user: User;
  cartItems: CartItem[];
  createdAt: Date;

  quantity: number;
  color?: string;
  sex?: string;
  model?: string;
  size?: string;
  age?: string;

  orderItems: OrderItem[];
};

export type Comment = {
  id: string;
  text: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  visible: boolean;
};

export type Like = {
  id: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
};

export type Chat = {
  id: string;
  users: UserChat[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  user?: User;
};

export type UserChat = {
  id: string;
  userId: string;
  user: User;
  chatId?: string;
  chat?: Chat;
};

export type Message = {
  id: string;
  text: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  chatId?: string;
  chat?: Chat;
};

export type Cart = {
  id: string;
  userId: string;
  user: User;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = {
  id: string;
  cartId: string;
  cart: Cart;
  productId: string;
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: string;
  userId: string;
  user: User;
  items: OrderItem[];
  totalPrice: number;
  status: string; // pending | shipped | delivered
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  order: Order;
  productId: string;
  product: Product;
  quantity: number;
};
