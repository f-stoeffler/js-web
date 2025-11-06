/* eslint-disable @typescript-eslint/no-require-imports */
// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Check if Header exists, create only if missing
  const existingHeader = await prisma.header.findUnique({
    where: { pagePart: 'Header' }
  })

  if (!existingHeader) {
    await prisma.header.create({
      data: {
        pagePart: 'Header',
        navbarItems: {
          create: [
            { title: 'Home', url: '/' },
            { title: 'Projects', url: '/projects' },
          ]
        }
      }
    })
    console.log('Default Header created')
  } else {
    console.log('Header already exists, skipping creation')
  }

  // Check if Footer exists, create only if missing
  const existingFooter = await prisma.footer.findUnique({
    where: { pagePart: 'Footer' }
  })

  if (!existingFooter) {
    await prisma.footer.create({
      data: {
        pagePart: 'Footer',
        title: 'Your Website',
        bottomText: 'Copyright © 2024',
        navbarItems: {
          create: [
            { text: 'Imprint', url: '/imprint' },
            { text: 'Privacy', url: '/privacy' },
          ]
        }
      }
    })
    console.log('Default Footer created')
  } else {
    console.log('Footer already exists, skipping creation')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })