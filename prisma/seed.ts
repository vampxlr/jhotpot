import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Super Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const superAdmin = await prisma.adminUser.upsert({
    where: { email: 'superadmin@jhotpot.com' },
    update: {},
    create: {
      email: 'superadmin@jhotpot.com',
      password: hashedPassword,
      name: 'Super Administrator',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Super Admin created:', superAdmin.email);

  // Create Regular Admin
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@jhotpot.com' },
    update: {},
    create: {
      email: 'admin@jhotpot.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin created:', admin.email);

  // Bangladeshi Restaurant Menu Items
  const menuItems = [
    {
      name: 'Kacchi Biryani (Mutton)',
      description: 'Authentic Bangladeshi mutton biryani with aromatic spices and tender meat',
      price: 400,
      category: 'Biryani',
      isVeg: false,
      isSpicy: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
      section: 'restaurant',
    },
    {
      name: 'Beef Tehari',
      description: 'Spicy beef rice dish with fried onions and boiled eggs',
      price: 280,
      category: 'Biryani',
      isVeg: false,
      isSpicy: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
      section: 'restaurant',
    },
    {
      name: 'Chicken Roast + Polao',
      description: 'Marinated roasted chicken with fragrant polao rice',
      price: 350,
      category: 'Main Course',
      isVeg: false,
      isSpicy: false,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800',
      section: 'restaurant',
    },
    {
      name: 'Khichuri + Beef Bhuna',
      description: 'Comfort rice and lentil dish with spicy beef curry',
      price: 320,
      category: 'Main Course',
      isVeg: false,
      isSpicy: true,
      isPopular: false,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
      section: 'restaurant',
    },
    {
      name: 'Morog Polao',
      description: 'Traditional chicken pilaf with aromatic spices',
      price: 300,
      category: 'Biryani',
      isVeg: false,
      isSpicy: false,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800',
      section: 'restaurant',
    },
    {
      name: 'Begun Bhorta',
      description: 'Mashed eggplant with mustard oil and green chilies',
      price: 120,
      category: 'Sides',
      isVeg: true,
      isSpicy: true,
      isPopular: false,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
      section: 'restaurant',
    },
    {
      name: 'Shorshe Ilish',
      description: 'Hilsa fish in mustard sauce - a Bengali delicacy',
      price: 550,
      category: 'Main Course',
      isVeg: false,
      isSpicy: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800',
      section: 'restaurant',
    },
    {
      name: 'Mishti Doi',
      description: 'Sweet yogurt - a classic Bengali dessert',
      price: 90,
      category: 'Desserts',
      isVeg: true,
      isSpicy: false,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1571212515416-37c2f0d5c1c7?w=800',
      section: 'restaurant',
    },
    {
      name: 'Fuchka Platter',
      description: 'Crispy pani puri with spicy tamarind water (12 pieces)',
      price: 150,
      category: 'Snacks',
      isVeg: true,
      isSpicy: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
      section: 'restaurant',
    },
    {
      name: 'Jhalmuri',
      description: 'Spicy puffed rice snack with vegetables',
      price: 80,
      category: 'Snacks',
      isVeg: true,
      isSpicy: true,
      isPopular: false,
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800',
      section: 'restaurant',
    },
    {
      name: 'Chotpoti',
      description: 'Chickpea curry with tamarind sauce and crispy puris',
      price: 120,
      category: 'Snacks',
      isVeg: true,
      isSpicy: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
      section: 'restaurant',
    },
    {
      name: 'Chicken Rezala',
      description: 'Chicken in white yogurt-based gravy',
      price: 380,
      category: 'Main Course',
      isVeg: false,
      isSpicy: false,
      isPopular: false,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
      section: 'restaurant',
    },
    {
      name: 'Rasgulla (4 pieces)',
      description: 'Soft cheese balls in sweet syrup',
      price: 100,
      category: 'Desserts',
      isVeg: true,
      isSpicy: false,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
      section: 'restaurant',
    },
    {
      name: 'Lachha Paratha',
      description: 'Layered flatbread (2 pieces)',
      price: 60,
      category: 'Breads',
      isVeg: true,
      isSpicy: false,
      isPopular: false,
      image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800',
      section: 'restaurant',
    },
    {
      name: 'Borhani',
      description: 'Spiced yogurt drink - perfect with biryani',
      price: 70,
      category: 'Beverages',
      isVeg: true,
      isSpicy: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=800',
      section: 'restaurant',
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: item,
    });
  }
  console.log(`✅ Created ${menuItems.length} menu items`);

  // Create Settings
  const settings = [
    { key: 'restaurant_name', value: 'Jhotpot Kitchen' },
    { key: 'lunchloop_name', value: 'Lunch Loop' },
    { key: 'catering_name', value: 'Catering Hub' },
    { key: 'delivery_charge', value: '50' },
    { key: 'default_theme', value: 'dark' },
    { key: 'logo_url', value: '/logo.png' },
  ];

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('✅ Created settings');

  console.log('🎉 Database seed completed!');
  console.log('\n📝 Login credentials:');
  console.log('Super Admin: superadmin@jhotpot.com / admin123');
  console.log('Admin: admin@jhotpot.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

