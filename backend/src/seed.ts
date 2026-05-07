import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const colleges = [
  {
    name: 'Indian Institute of Technology Bombay',
    location: 'Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    rating: 4.8,
    totalFees: 800000,
    type: 'Government',
    established: 1958,
    naacGrade: 'A++',
    nirfRank: 3,
    totalSeats: 1200,
    description: 'IIT Bombay is one of India\'s premier engineering institutions, known for world-class research and innovation.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.Tech', duration: 4, fees: 200000, seats: 120 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: 4, fees: 200000, seats: 90 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: 4, fees: 200000, seats: 90 },
      { name: 'Data Science & AI', degree: 'M.Tech', duration: 2, fees: 150000, seats: 60 },
    ],
    placements: [
      { year: 2023, avgPackage: 2200000, highestPackage: 25000000, placementRate: 98 },
      { year: 2022, avgPackage: 2000000, highestPackage: 22000000, placementRate: 97 },
    ],
    reviews: [
      { author: 'Rahul Sharma', rating: 5, comment: 'World-class faculty and amazing peer network.', year: 2023 },
      { author: 'Priya Nair', rating: 4.5, comment: 'Great placements but intense academics.', year: 2022 },
    ],
  },
  {
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    rating: 4.7,
    totalFees: 820000,
    type: 'Government',
    established: 1961,
    naacGrade: 'A++',
    nirfRank: 2,
    totalSeats: 1100,
    description: 'IIT Delhi is a top engineering institute located in the heart of the capital, known for research excellence.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.Tech', duration: 4, fees: 205000, seats: 110 },
      { name: 'Civil Engineering', degree: 'B.Tech', duration: 4, fees: 205000, seats: 85 },
      { name: 'Chemical Engineering', degree: 'B.Tech', duration: 4, fees: 205000, seats: 80 },
    ],
    placements: [
      { year: 2023, avgPackage: 2100000, highestPackage: 24000000, placementRate: 97 },
    ],
    reviews: [
      { author: 'Amit Kumar', rating: 5, comment: 'Top-notch education with amazing startup culture.', year: 2023 },
    ],
  },
  {
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    city: 'Pilani',
    state: 'Rajasthan',
    rating: 4.5,
    totalFees: 1800000,
    type: 'Deemed',
    established: 1964,
    naacGrade: 'A',
    nirfRank: 26,
    totalSeats: 2000,
    description: 'BITS Pilani offers unique dual degree programs and industry-focused education with a strong alumni network.',
    courses: [
      { name: 'Computer Science', degree: 'B.E.', duration: 4, fees: 450000, seats: 200 },
      { name: 'Electronics & Communication', degree: 'B.E.', duration: 4, fees: 450000, seats: 180 },
      { name: 'Mechanical Engineering', degree: 'B.E.', duration: 4, fees: 450000, seats: 160 },
    ],
    placements: [
      { year: 2023, avgPackage: 1600000, highestPackage: 20000000, placementRate: 95 },
    ],
    reviews: [
      { author: 'Sneha Patel', rating: 4.5, comment: 'Great autonomy and amazing industry connections.', year: 2023 },
    ],
  },
  {
    name: 'National Institute of Technology Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    rating: 4.3,
    totalFees: 600000,
    type: 'Government',
    established: 1964,
    naacGrade: 'A++',
    nirfRank: 8,
    totalSeats: 1800,
    description: 'NIT Trichy is consistently ranked among the top NITs with strong academic programs and placement records.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.Tech', duration: 4, fees: 150000, seats: 150 },
      { name: 'Electronics & Communication', degree: 'B.Tech', duration: 4, fees: 150000, seats: 120 },
    ],
    placements: [
      { year: 2023, avgPackage: 1200000, highestPackage: 15000000, placementRate: 93 },
    ],
    reviews: [
      { author: 'Karthik R', rating: 4, comment: 'Great value for money and solid academics.', year: 2023 },
    ],
  },
  {
    name: 'Vellore Institute of Technology',
    location: 'Vellore, Tamil Nadu',
    city: 'Vellore',
    state: 'Tamil Nadu',
    rating: 4.0,
    totalFees: 1200000,
    type: 'Deemed',
    established: 1984,
    naacGrade: 'A++',
    nirfRank: 11,
    totalSeats: 8000,
    description: 'VIT is one of India\'s largest private universities known for its strong industry connections and diverse student body.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.Tech', duration: 4, fees: 300000, seats: 800 },
      { name: 'Mechanical Engineering', degree: 'B.Tech', duration: 4, fees: 280000, seats: 600 },
      { name: 'MBA', degree: 'MBA', duration: 2, fees: 350000, seats: 300 },
    ],
    placements: [
      { year: 2023, avgPackage: 800000, highestPackage: 10000000, placementRate: 88 },
    ],
    reviews: [
      { author: 'Divya S', rating: 4, comment: 'Good placements and great campus life.', year: 2023 },
    ],
  },
  {
    name: 'Indian Institute of Management Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    city: 'Ahmedabad',
    state: 'Gujarat',
    rating: 4.9,
    totalFees: 2500000,
    type: 'Government',
    established: 1961,
    naacGrade: 'A++',
    nirfRank: 1,
    totalSeats: 400,
    description: 'IIM Ahmedabad is India\'s #1 management institution and one of the most prestigious business schools in Asia.',
    courses: [
      { name: 'Post Graduate Programme in Management', degree: 'MBA', duration: 2, fees: 2500000, seats: 400 },
      { name: 'Executive MBA', degree: 'EMBA', duration: 1, fees: 3000000, seats: 100 },
    ],
    placements: [
      { year: 2023, avgPackage: 4500000, highestPackage: 80000000, placementRate: 100 },
    ],
    reviews: [
      { author: 'Rohan Mehta', rating: 5, comment: 'Life-changing experience. Worth every penny.', year: 2023 },
    ],
  },
  {
    name: 'Delhi Technological University',
    location: 'New Delhi, Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    rating: 3.9,
    totalFees: 500000,
    type: 'Government',
    established: 1941,
    naacGrade: 'A',
    nirfRank: 43,
    totalSeats: 2200,
    description: 'DTU is one of Delhi\'s oldest and most reputed technical universities with strong placement records.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.Tech', duration: 4, fees: 125000, seats: 180 },
      { name: 'Software Engineering', degree: 'B.Tech', duration: 4, fees: 125000, seats: 120 },
      { name: 'Electrical Engineering', degree: 'B.Tech', duration: 4, fees: 125000, seats: 150 },
    ],
    placements: [
      { year: 2023, avgPackage: 1000000, highestPackage: 12000000, placementRate: 90 },
    ],
    reviews: [
      { author: 'Ankita Singh', rating: 4, comment: 'Great for Delhi students with good placements.', year: 2023 },
    ],
  },
  {
    name: 'Manipal Institute of Technology',
    location: 'Manipal, Karnataka',
    city: 'Manipal',
    state: 'Karnataka',
    rating: 4.1,
    totalFees: 1600000,
    type: 'Private',
    established: 1957,
    naacGrade: 'A++',
    nirfRank: 50,
    totalSeats: 5000,
    description: 'MIT Manipal is a premier private institution known for its international exposure and strong alumni network.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.Tech', duration: 4, fees: 400000, seats: 400 },
      { name: 'Information Technology', degree: 'B.Tech', duration: 4, fees: 380000, seats: 300 },
    ],
    placements: [
      { year: 2023, avgPackage: 900000, highestPackage: 9500000, placementRate: 85 },
    ],
    reviews: [
      { author: 'Aditya B', rating: 4, comment: 'Amazing campus and great international exposure.', year: 2022 },
    ],
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    rating: 3.7,
    totalFees: 1400000,
    type: 'Deemed',
    established: 1985,
    naacGrade: 'A++',
    nirfRank: 30,
    totalSeats: 10000,
    description: 'SRM is one of India\'s largest private universities with global partnerships and diverse programs.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.Tech', duration: 4, fees: 350000, seats: 1000 },
      { name: 'Biomedical Engineering', degree: 'B.Tech', duration: 4, fees: 320000, seats: 200 },
    ],
    placements: [
      { year: 2023, avgPackage: 700000, highestPackage: 8000000, placementRate: 80 },
    ],
    reviews: [
      { author: 'Meera K', rating: 3.5, comment: 'Good for networking, average academics.', year: 2023 },
    ],
  },
  {
    name: 'Amity University',
    location: 'Noida, Uttar Pradesh',
    city: 'Noida',
    state: 'Uttar Pradesh',
    rating: 3.5,
    totalFees: 1300000,
    type: 'Private',
    established: 2005,
    naacGrade: 'A',
    nirfRank: 62,
    totalSeats: 12000,
    description: 'Amity is a large multi-campus private university offering a wide range of programs with modern infrastructure.',
    courses: [
      { name: 'Computer Science', degree: 'B.Tech', duration: 4, fees: 325000, seats: 600 },
      { name: 'MBA', degree: 'MBA', duration: 2, fees: 600000, seats: 500 },
      { name: 'Law', degree: 'LLB', duration: 5, fees: 280000, seats: 200 },
    ],
    placements: [
      { year: 2023, avgPackage: 600000, highestPackage: 7000000, placementRate: 75 },
    ],
    reviews: [
      { author: 'Vikram J', rating: 3.5, comment: 'Good infrastructure but hit-or-miss placements.', year: 2022 },
    ],
  },
  {
    name: 'Indian Institute of Technology Madras',
    location: 'Chennai, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    rating: 4.9,
    totalFees: 780000,
    type: 'Government',
    established: 1959,
    naacGrade: 'A++',
    nirfRank: 1,
    totalSeats: 1100,
    description: 'IIT Madras is ranked #1 in India for engineering and is known for its research output and startup ecosystem.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.Tech', duration: 4, fees: 195000, seats: 100 },
      { name: 'Aerospace Engineering', degree: 'B.Tech', duration: 4, fees: 195000, seats: 70 },
    ],
    placements: [
      { year: 2023, avgPackage: 2300000, highestPackage: 28000000, placementRate: 99 },
    ],
    reviews: [
      { author: 'Lakshmi P', rating: 5, comment: 'The best in India. Period.', year: 2023 },
    ],
  },
  {
    name: 'Jadavpur University',
    location: 'Kolkata, West Bengal',
    city: 'Kolkata',
    state: 'West Bengal',
    rating: 4.2,
    totalFees: 120000,
    type: 'Government',
    established: 1955,
    naacGrade: 'A',
    nirfRank: 12,
    totalSeats: 3000,
    description: 'Jadavpur University is one of India\'s finest public universities offering excellent education at minimal cost.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.E.', duration: 4, fees: 30000, seats: 120 },
      { name: 'Electrical Engineering', degree: 'B.E.', duration: 4, fees: 30000, seats: 100 },
    ],
    placements: [
      { year: 2023, avgPackage: 1100000, highestPackage: 14000000, placementRate: 91 },
    ],
    reviews: [
      { author: 'Subhashish D', rating: 4, comment: 'Exceptional value for money.', year: 2023 },
    ],
  },
  {
    name: 'PSG College of Technology',
    location: 'Coimbatore, Tamil Nadu',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    rating: 4.0,
    totalFees: 700000,
    type: 'Private',
    established: 1951,
    naacGrade: 'A',
    nirfRank: 35,
    totalSeats: 4000,
    description: 'PSG Tech is one of South India\'s oldest and most respected private engineering colleges.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.E.', duration: 4, fees: 175000, seats: 300 },
      { name: 'Mechanical Engineering', degree: 'B.E.', duration: 4, fees: 165000, seats: 250 },
    ],
    placements: [
      { year: 2023, avgPackage: 750000, highestPackage: 8000000, placementRate: 87 },
    ],
    reviews: [
      { author: 'Kavitha R', rating: 4, comment: 'Excellent discipline and industry ties.', year: 2023 },
    ],
  },
  {
    name: 'Thapar Institute of Engineering & Technology',
    location: 'Patiala, Punjab',
    city: 'Patiala',
    state: 'Punjab',
    rating: 4.1,
    totalFees: 1500000,
    type: 'Deemed',
    established: 1956,
    naacGrade: 'A',
    nirfRank: 27,
    totalSeats: 2500,
    description: 'Thapar is a well-regarded deemed university known for strong engineering programs and good industry exposure.',
    courses: [
      { name: 'Computer Science & Engineering', degree: 'B.E.', duration: 4, fees: 375000, seats: 250 },
      { name: 'Electronics & Communication', degree: 'B.E.', duration: 4, fees: 360000, seats: 200 },
    ],
    placements: [
      { year: 2023, avgPackage: 1100000, highestPackage: 12000000, placementRate: 92 },
    ],
    reviews: [
      { author: 'Gurpreet S', rating: 4, comment: 'Worth the fees for the placements you get.', year: 2022 },
    ],
  },
  {
    name: 'Christ University',
    location: 'Bengaluru, Karnataka',
    city: 'Bengaluru',
    state: 'Karnataka',
    rating: 3.8,
    totalFees: 900000,
    type: 'Deemed',
    established: 1969,
    naacGrade: 'A+',
    nirfRank: 71,
    totalSeats: 15000,
    description: 'Christ University is a progressive private university in Bangalore known for liberal arts and management programs.',
    courses: [
      { name: 'BBA', degree: 'BBA', duration: 3, fees: 200000, seats: 500 },
      { name: 'MBA', degree: 'MBA', duration: 2, fees: 450000, seats: 400 },
      { name: 'B.Com', degree: 'B.Com', duration: 3, fees: 150000, seats: 600 },
    ],
    placements: [
      { year: 2023, avgPackage: 600000, highestPackage: 6000000, placementRate: 78 },
    ],
    reviews: [
      { author: 'Nisha M', rating: 3.5, comment: 'Good for commerce and management programs.', year: 2022 },
    ],
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  for (const college of colleges) {
    const { courses, placements, reviews, ...collegeData } = college;

    const created = await prisma.college.create({
      data: {
        ...collegeData,
        courses: {
          create: courses,
        },
        placements: {
          create: placements,
        },
        reviews: {
          create: reviews,
        },
      },
    });

    console.log(`✅ Created: ${created.name}`);
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
