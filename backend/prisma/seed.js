const express = require('express')
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');



const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/api/data', async(req, res)=>{
  try{
    console.log(`reached /api/data`)
    const data = await prisma.user.getMany();
    return res.json(data);
  } catch(error) {
    console.error('Error fetching data: ', error);
    res.status(500).json({error: 'Internal server error'});
  }
});




async function main() {
  // Clean existing data
  await prisma.user.deleteMany();

  // Create 5 users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        role: i === 0 ? 'ADMIN' : i === 1 ? 'EDITOR' : 'USER',
      },
    });
    users.push(user);
    console.log(`Created user: ${user.name}`);
  }

}



main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });