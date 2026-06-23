import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { doctors, facilities, services } from "../src/lib/site-data";

function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? "file:./dev.db";
}

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: getDatabaseUrl() }),
});

const defaultBlogs = [
  {
    title: "When Should You Visit the Emergency Department?",
    slug: "when-to-visit-emergency-department",
    excerpt:
      "Clear signs that need urgent medical attention and how families can act quickly.",
    category: "Emergency Guidance",
    featuredImage:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80",
    content:
      "Emergency symptoms should never be ignored. Chest pain, severe breathing difficulty, sudden weakness, uncontrolled bleeding, loss of consciousness, or major injury should be treated as urgent. If you are unsure, call the hospital and seek medical guidance immediately. This article is for awareness and does not replace a doctor's consultation.",
  },
  {
    title: "Simple Preventive Health Checks for Every Family",
    slug: "preventive-health-checks-for-families",
    excerpt:
      "Basic health checks that can help detect common issues early and support long-term wellness.",
    category: "Preventive Care",
    featuredImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80",
    content:
      "Preventive care helps families identify health concerns before they become more serious. Regular blood pressure checks, blood sugar screening, routine doctor visits, and age-appropriate tests can support better health decisions. Speak with a qualified doctor to understand what checks are right for you.",
  },
  {
    title: "How to Prepare for a Doctor Consultation",
    slug: "prepare-for-doctor-consultation",
    excerpt:
      "A short checklist to help patients make the most of their appointment.",
    category: "Health Tips",
    featuredImage:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=80",
    content:
      "Before visiting a doctor, note your symptoms, current medicines, past reports, allergies, and any questions you want to ask. Clear information helps the doctor understand your condition better and guide you more effectively.",
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@shreeshivayahospital.com";
  const password = process.env.ADMIN_PASSWORD ?? "change-this-password";
  const name = process.env.ADMIN_NAME ?? "Hospital Admin";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { name, passwordHash },
    create: { email, name, passwordHash },
  });

  for (const post of defaultBlogs) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...post,
        seoTitle: post.title,
        seoDescription: post.excerpt,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
  }

  const appointmentCount = await prisma.appointment.count();

  if (appointmentCount === 0) {
    await prisma.appointment.createMany({
      data: [
        {
          patientName: "Ramesh Patel",
          phone: "+91 98765 43210",
          department: "General Medicine",
          preferredDate: new Date(),
          preferredTime: "10:30 AM",
          message: "Fever and weakness for two days.",
        },
        {
          patientName: "Neha Shah",
          phone: "+91 91234 56780",
          department: "Maternity Care",
          preferredDate: new Date(Date.now() + 86400000),
          preferredTime: "12:00 PM",
          message: "Routine consultation.",
        },
      ],
    });
  }

  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({
      data: services.map((service, index) => ({
        ...service,
        iconKey: ["first-aid", "doctor", "clinic", "heart", "test-tube", "calendar"][index] ?? "clinic",
        sortOrder: index,
      })),
    });
  }

  if ((await prisma.facility.count()) === 0) {
    await prisma.facility.createMany({
      data: facilities.map((facility, index) => ({
        ...facility,
        iconKey: ["ambulance", "bed", "hospital", "medicine", "lab", "xray", "clean", "parking"][index] ?? "hospital",
        sortOrder: index,
      })),
    });
  }

  if ((await prisma.staffProfile.count()) === 0) {
    await prisma.staffProfile.createMany({
      data: doctors.map((doctor, index) => ({
        name: doctor.name,
        role: doctor.role,
        detail: doctor.detail,
        image: doctor.image,
        department: doctor.status,
        sortOrder: index,
      })),
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
