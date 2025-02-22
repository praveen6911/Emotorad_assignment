import { RefreshCcw, Layout, MessageCircle, Users } from 'lucide-react';

export const activityData = [
  { week: 'Week 1', User: 500, Guest: 400 },
  { week: 'Week 2', User: 350, Guest: 450 },
  { week: 'Week 3', User: 200, Guest: 300 },
  { week: 'Week 4', User: 400, Guest: 350 }
];

export const productData = [
  { name: 'Basic Tees', value: 55, color: '#4ade80' },
  { name: 'Custom Short Pants', value: 21, color: '#fbbf24' },
  { name: 'Super Hoodies', value: 24, color: '#f87171' },
];

export const statsCards = [
  { title: 'Total Revenue', value: '$2,129,430', change: '+2.5%', icon: <RefreshCcw className="stat-icon revenue" size={24} /> },
  { title: 'Total Transactions', value: '1,520', change: '+1.7%', icon: <Layout className="stat-icon transactions" size={24} /> },
  { title: 'Total Likes', value: '9,721', change: '+1.4%', icon: <MessageCircle className="stat-icon likes" size={24} /> },
  { title: 'Total Users', value: '9,721', change: '+4.2%', icon: <Users className="stat-icon users" size={24} /> },
];