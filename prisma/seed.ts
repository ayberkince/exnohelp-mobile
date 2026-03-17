import { PrismaClient, Role, VerificationStatus, RequestStatus, BookingStatus, PaymentStatus, PayoutStatus, NotificationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clean the database (Optional, but good for a fresh start)
  await prisma.notification.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.supportRequest.deleteMany();
  await prisma.helperProfile.deleteMany();
  await prisma.clientProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing data.');

  // 2. Create an Admin User
  const admin = await prisma.user.create({
    data: {
      name: 'System Admin',
      email: 'admin@exnohelp.com',
      password: 'password123', // We will hash this properly in Step 1 (Auth) later
      role: Role.ADMIN,
    },
  });

  // 3. Create a Client User (Maria)
  const clientUser = await prisma.user.create({
    data: {
      name: 'Maria G.',
      email: 'maria@example.com',
      password: 'password123',
      role: Role.CLIENT,
      clientProfile: {
        create: {
          city: 'Berlin',
          district: 'Mitte',
          emergencyContactName: 'Lukas G.',
          emergencyContactPhone: '+49 151 12345678',
        }
      }
    },
    include: { clientProfile: true }
  });

  // 4. Create a Helper User (Sarah)
  const helperUser = await prisma.user.create({
    data: {
      name: 'Sarah M.',
      email: 'sarah@example.com',
      password: 'password123',
      role: Role.HELPER,
      helperProfile: {
        create: {
          city: 'Berlin',
          district: 'Mitte',
          verificationStatus: VerificationStatus.APPROVED,
          adminNotes: 'Verified ID and background check on Mar 15, 2026.',
        }
      }
    },
    include: { helperProfile: true }
  });

  // 5. Create an Open Support Request from Maria
  const request = await prisma.supportRequest.create({
    data: {
      clientId: clientUser.clientProfile!.id,
      categorySlug: 'appointment-accompaniment',
      title: 'Need help navigating Charité Campus',
      description: 'Looking for a friendly face to help me find the right building and wait with me during my appointment.',
      requestedDate: new Date('2026-03-20T10:00:00Z'),
      city: 'Berlin',
      district: 'Mitte',
      status: RequestStatus.OPEN,
    }
  });

  // 6. Create a Confirmed Booking between Maria and Sarah
  const booking = await prisma.booking.create({
    data: {
      clientId: clientUser.clientProfile!.id,
      helperId: helperUser.helperProfile!.id,
      requestId: request.id,
      scheduledAt: new Date('2026-03-20T10:00:00Z'),
      status: BookingStatus.CONFIRMED,
      totalAmount: 46.00,  // Client pays €46
      helperAmount: 40.00, // Helper gets €40 (2hrs * €20)
      platformFee: 6.00,   // Platform keeps €6 (15%)
      
      // Wire up the Day 6 Financial Engine automatically!
      payment: {
        create: {
          amount: 46.00,
          status: PaymentStatus.PAID,
        }
      },
      payout: {
        create: {
          helperId: helperUser.helperProfile!.id,
          amount: 40.00,
          status: PayoutStatus.PENDING,
        }
      }
    }
  });

  // 7. Send a Day 9 Notification to Sarah
  await prisma.notification.create({
    data: {
      userId: helperUser.id,
      type: NotificationType.BOOKING,
      title: 'New Booking Confirmed!',
      message: 'Maria G. has booked you for an Appointment Accompaniment on Friday.',
      isRead: false,
    }
  });

  console.log('✅ Seeding complete!');
  console.log('-------------------------------------------');
  console.log(`🧑‍💼 Admin: ${admin.email}`);
  console.log(`👵 Client: ${clientUser.email}`);
  console.log(`🦸‍♀️ Helper: ${helperUser.email}`);
  console.log('-------------------------------------------');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });