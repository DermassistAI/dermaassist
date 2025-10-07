import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  // Create test providers
  const provider1 = await prisma.provider.upsert({
    where: { email: 'dr.smith@example.com' },
    update: {},
    create: {
      email: 'dr.smith@example.com',
      licenseNumber: 'MD-12345-CA',
      licenseState: 'California',
      licenseCountry: 'USA',
      licenseExpiry: new Date('2025-12-31'),
      licenseVerified: true,
    },
  })

  const provider2 = await prisma.provider.upsert({
    where: { email: 'dr.jones@example.com' },
    update: {},
    create: {
      email: 'dr.jones@example.com',
      licenseNumber: 'MD-67890-NY',
      licenseState: 'New York',
      licenseCountry: 'USA',
      licenseExpiry: new Date('2026-06-30'),
      licenseVerified: true,
    },
  })

  console.log('Created providers:', { provider1, provider2 })

  // Create test submissions
  const submission1 = await prisma.submission.upsert({
    where: { imageHash: 'test-hash-001' },
    update: {},
    create: {
      providerId: provider1.id,
      imageUrl: 'https://example.com/images/test1.jpg',
      imageHash: 'test-hash-001',
      duration: '2-4 weeks',
      symptoms: 'Mild itching, redness',
      aiProvider: 'claude',
      aiModel: 'claude-3-5-sonnet-20241022',
      status: 'APPROVED_FOR_PRACTICE',
      icd11Code: 'L20.0',
      confidence: 0.85,
      aiResponse: {
        condition: 'Atopic Dermatitis',
        description: 'Inflammatory skin condition...',
        recommendations: ['Moisturize regularly', 'Avoid triggers', 'Consult dermatologist']
      }
    },
  })

  console.log('Created submission:', submission1)

  // Create test diagnoses
  const diagnosis1 = await prisma.diagnosis.create({
    data: {
      submissionId: submission1.id,
      providerId: provider2.id,
      icd11Code: 'L20.0',
      notes: 'Consistent with atopic dermatitis presentation',
      confidence: 0.9,
    },
  })

  console.log('Created diagnosis:', diagnosis1)

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
