export const jobFunctions = [
  "Tech", "Marketing", "Sales", "Design", "HR", "Finance", "Customer Care", "Operations", "Engineering", "Legal", "Accountant", "Bank",
  "Teacher", "Manager", "Supervisor", "Art Design", "Assistant", "Financer", "Service", "Audit", "Art", "Layer", "Guard", "CEO"];
export const locations = ["Phnom Penh", "Remote", "Siem Reap", "Battambang"];
export const industries = ["E-commerce", "Fintech", "Education", "Healthcare", "Real Estate"];
export const salaryRanges = ["$500-$1000", "$1001-$1500", "$1501-$2500", "$2501+"];
export const jobTerms = ["Full-time", "Part-time", "Contract"];

export interface Job {
  id: number;
  title: string;
  company: string;
  function: string;
  location: string;
  industry: string;
  salary: string;
  term: string;
  isUrgent: boolean;
  logo: string;
}

export const allJobs: Job[] = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  title: `Job Title ${i + 1}`,
  company: `Company ${String.fromCharCode(65 + (i % 10))}`,
  function: jobFunctions[i % jobFunctions.length],
  location: locations[i % locations.length],
  industry: industries[i % industries.length],
  salary: salaryRanges[i % salaryRanges.length],
  term: jobTerms[i % jobTerms.length],
  isUrgent: Math.random() > 0.8,
  logo: `https://placehold.co/100x100/e2e8f0/4a5568?text=${String.fromCharCode(65 + (i % 10))}`
}));

interface Employer {
  name: string;
  logo: string;
}
export const employers: Employer[] = [
  { name: 'Company A', logo: 'https://placehold.co/150x80/e2e8f0/4a5568?text=Jam+Fruit' },
  { name: 'Company B', logo: 'https://placehold.co/150x80/e2e8f0/4a5568?text=Zoom+Tech' },
  { name: 'Company C', logo: 'https://placehold.co/150x80/e2e8f0/4a5568?text=Property+PP' },
  { name: 'Company D', logo: 'https://placehold.co/150x80/e2e8f0/4a5568?text=Phama+Care' },
  { name: 'Company E', logo: 'https://placehold.co/150x80/e2e8f0/4a5568?text=Tree+School' },
  { name: 'Company F', logo: 'https://placehold.co/150x80/e2e8f0/4a5568?text=Wee+Buyer' },
];

interface CarouselItem {
  title: string;
  img: string;
}
export const carouselItems: CarouselItem[] = [
    { title: "Top Tech Companies Hiring Now", img: "https://placehold.co/1200x400/3b82f6/ffffff?text=Tech+Hiring" },
    { title: "Unlock Your Marketing Potential", img: "https://placehold.co/1200x400/ef4444/ffffff?text=Marketing+Jobs" },
    { title: "Sales Roles with High Commissions", img: "https://placehold.co/1200x400/22c55e/ffffff?text=Sales+Careers" },
];

interface Testimonial {
  id: number;
  quote: string;
  employerName: string;
  employerRole: string;
  companyName: string;
  companyLogo: string;
}
export const testimonials: Testimonial[] = [
    { id: 1, quote: "JobFinder has been an invaluable partner for our recruitment needs. The quality of candidates is consistently high, and the platform is incredibly user-friendly.", employerName: "Jane Doe", employerRole: "HR Director", companyName: "Company A", companyLogo: "https://placehold.co/100x100/e2e8f0/4a5568?text=A" },
    { id: 2, quote: "We filled three critical roles in under a month thanks to this platform. The reach and the quality of applicants exceeded our expectations.", employerName: "John Smith", employerRole: "CEO", companyName: "Company B", companyLogo: "https://placehold.co/100x100/e2e8f0/4a5568?text=B" },
    { id: 3, quote: "The best job board for finding talent in the tech industry. We highly recommend it to any company looking to grow their team.", employerName: "Emily White", employerRole: "Recruitment Lead", companyName: "Company C", companyLogo: "https://placehold.co/100x100/e2e8f0/4a5568?text=C" }
];
