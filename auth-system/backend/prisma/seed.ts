import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS || '12', 10);

  const studentHash = await bcrypt.hash('password123', rounds);
  const teacherHash = await bcrypt.hash('password123', rounds);

  await prisma.user.upsert({
    where: { email: 'hocsinh@example.com' },
    update: {},
    create: {
      name: 'Nguyễn Văn Học Sinh',
      email: 'hocsinh@example.com',
      passwordHash: studentHash,
      role: 'STUDENT',
      emailVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'giaovien@example.com' },
    update: {},
    create: {
      name: 'Trần Thị Giáo Viên',
      email: 'giaovien@example.com',
      passwordHash: teacherHash,
      role: 'TEACHER',
      emailVerified: true,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
