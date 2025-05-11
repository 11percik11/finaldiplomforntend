// export type User = {
//   id: string;
//   password: string;
//   email: string;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
// };


export type User = {
  id: string;
  password: string;
  email: string;
  name: string;
  phone: string;
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
  cart?: Cart; // Optional, as a user might not have a cart
};

export type UserRole = 'ADMIN' | 'MANAGER' | 'CLIENT';

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
};

export type Comment = {
  id: string;
  text: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
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
  userId?: string; // Optional, as not all chats may be associated with a specific user
  user?: User; // Optional, as not all chats may be associated with a specific user
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