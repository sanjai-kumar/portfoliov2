// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Sanjai Kumar M',
  role: 'Full Stack Developer',
  location: 'Chennai, India',
  email: 'msanjai3107@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sanjai-kumar-m-6b332b202',
  github: '', // add your GitHub URL here and it will show up across the site
  resume: '/Sanjai_Kumar_M_Resume.pdf',
  headline: 'I build booking engines, streaming platforms and the cloud they run on.',
  rotating: ['flight booking APIs', 'VOD platforms', 'Kubernetes clusters', 'React dashboards', 'payment integrations'],
  summary:
    'Full stack developer with 5+ years building secure, scalable web, mobile and Smart TV platforms with React.js, Next.js, Node.js, Laravel and MySQL. Today I build B2C and B2B flight and bus booking platforms on AWS at Navigatio. Before that I led a team of 10 at Webnexs, shipping Video-on-Demand and eCommerce products for 60+ clients.',
}

export const stats = [
  { value: 5, suffix: '+', label: 'Years shipping production software' },
  { value: 60, suffix: '+', label: 'VOD clients delivered and maintained' },
  { value: 10, suffix: '', label: 'Developers led as team lead' },
  { value: 7, suffix: '', label: 'Payment gateways integrated' },
]

export const projects = [
  {
    id: 'navigatio',
    title: 'Navigatio Booking Platform',
    category: 'Travel',
    year: '2025 to now',
    role: 'Full Stack Developer',
    metric: 'B2C mobile and B2B web',
    accent: ['#3B82F6', '#22D3EE'],
    featured: true,
    summary: 'End-to-end flight and bus booking for travellers on mobile and for travel businesses on the web.',
    stack: ['Node.js', 'React.js', 'AWS EC2', 'S3', 'RDS', 'TekTravels', 'WorkOS', 'Cashfree', 'Twilio', 'AWS SES'],
    highlights: [
      'Designed and built Node.js B2C REST APIs for the mobile apps, covering full flight and bus booking flows through TekTravels.',
      'Developed the B2B React.js web app with booking flows, admin panels and organization management.',
      'Organization sign-in with WorkOS domain verification, plus GST and PAN verification through Cashfree.',
      'Deployed and maintain the stack on AWS EC2, S3 and RDS, owning monitoring, logging, alerting and security.',
      'WhatsApp and voice with Twilio, SMS OTP with AWS End User Messaging, transactional email with AWS SES.',
      'Deferred deep linking from email campaigns with click logging, Play Store referrer routing and iOS fallback.',
    ],
  },
  {
    id: 'multi-tenant',
    title: 'Multi-Tenant DevOps Infrastructure',
    category: 'DevOps',
    year: 'Webnexs',
    role: 'DevOps and Full Stack Engineer',
    metric: 'Auto-scaling tenants',
    accent: ['#10B981', '#A3E635'],
    summary: 'One Kubernetes platform hosting many VOD and eCommerce tenants, each securely isolated.',
    stack: ['Docker', 'Kubernetes', 'Node.js', 'Next.js', 'MySQL', 'Prisma', 'Cloudflare API'],
    highlights: [
      'Multi-tenant architecture using Kubernetes namespaces for tenant isolation and efficient resource use.',
      'Automated CI/CD for container builds, database migrations and deployments across environments.',
      'Automated domain and subdomain provisioning with Cloudflare DNS, Ingress controllers and SSL mapping.',
      'Load stability with Horizontal Pod Autoscaling and webhook-based recovery.',
    ],
  },
  {
    id: 'ai-devops',
    title: 'AI-Powered DevOps Platform',
    category: 'DevOps',
    year: 'Webnexs',
    role: 'Full Stack Developer',
    metric: 'AI-driven deploys',
    accent: ['#8B5CF6', '#EC4899'],
    summary: 'Project tracking, team tasks and AI-driven deployments for many organizations in one place.',
    stack: ['Next.js', 'Node.js', 'MySQL', 'Prisma', 'Bitbucket API', 'AI Integration'],
    highlights: [
      'Multi-organization platform for project tracking, team task management and email-thread communication.',
      'Bitbucket repositories wired to AI-driven auto-deployment and monitoring for multi-tenant projects.',
      'Faster, more reliable releases across VOD and eCommerce clients.',
    ],
  },
  {
    id: 'playmedia',
    title: 'Playmedia',
    category: 'Streaming',
    year: 'Webnexs',
    role: 'Full Stack Developer',
    metric: 'Web, Mobile and Smart TV',
    accent: ['#EF4444', '#F97316'],
    summary: 'A Video-on-Demand platform across Web, Mobile and Smart TV, with multi-user profiles.',
    stack: ['Laravel', 'Lumen', 'React.js', 'Node.js', 'MySQL', 'Sequelize', 'BunnyCDN', 'Stripe'],
    highlights: [
      'Scalable VOD platform for Web, Mobile and Smart TV with multi-user profiles.',
      'Lumen microservice APIs with JWT auth and React.js dashboards for users, content partners and channel partners.',
      'BunnyCDN, AWS S3, VideoCipher and Flussonic, plus Stripe, Razorpay, PayPal, Paystack and Cinetpay.',
      'Owned the lifecycle from architecture to deployment.',
    ],
  },
  {
    id: 'vod-web',
    title: 'VOD Web Application',
    category: 'Streaming',
    year: 'Webnexs',
    role: 'Full Stack Developer',
    metric: 'Node.js microservices',
    accent: ['#F59E0B', '#EAB308'],
    summary: 'Microservices streaming platform with role-based dashboards for every partner type.',
    stack: ['Node.js', 'Express', 'React.js', 'Lumen', 'Laravel', 'MySQL', 'Flussonic'],
    highlights: [
      'Node.js microservices VOD platform with JWT auth and REST APIs for Admin, Channel Partner and Content Partner modules.',
      'React.js frontend with multi-profile selection and role-based dashboards.',
      'Low-latency streaming through BunnyCDN and Flussonic.',
    ],
  },
  {
    id: 'flicknexs',
    title: 'Flicknexs',
    category: 'Streaming',
    year: 'Webnexs',
    role: 'Full Stack Developer',
    metric: 'Subscription streaming',
    accent: ['#EC4899', '#F43F5E'],
    summary: 'Subscription video streaming with redundant delivery and global payments.',
    stack: ['Laravel', 'JavaScript', 'Bootstrap', 'MySQL', 'Sequelize', 'VideoCipher', 'Razorpay'],
    highlights: [
      'REST APIs for mobile apps with MySQL and Sequelize for clean relational modelling.',
      'BunnyCDN, AWS S3, VideoCipher and Flussonic for redundant video streaming.',
      'Stripe, Razorpay and PayPal for subscriptions.',
    ],
  },
  {
    id: 'pgm',
    title: 'PGM Gold and Silver',
    category: 'Infrastructure',
    year: 'Infrastructure',
    role: 'Backend and Infrastructure',
    metric: '4 production sites',
    accent: ['#A1A1AA', '#FACC15'],
    summary: 'Four production sites kept secure, with a bank payment gateway over mutual TLS.',
    stack: ['Linux', 'CloudPanel', 'SSL/TLS', 'mTLS', 'Yes Bank Gateway'],
    highlights: [
      'Managed servers and SSL for four production sites.',
      'Integrated the Yes Bank payment gateway over mutual TLS with a dedicated client certificate.',
    ],
  },
]

export const experience = [
  {
    company: 'Navigatio',
    role: 'Full Stack Developer',
    period: 'Dec 2025 to present',
    current: true,
    points: [
      'B2C REST APIs for flight and bus booking on mobile, built on TekTravels',
      'B2B React.js web app with admin panels and organization management',
      'WorkOS domain sign-in and Cashfree GST and PAN verification',
      'AWS EC2, S3 and RDS deployment with monitoring, alerting and security',
      'Twilio, AWS End User Messaging and SES messaging',
      'Deferred deep linking from email campaigns',
    ],
  },
  {
    company: 'Webnexs',
    role: 'Full Stack Developer and Team Lead',
    period: 'Jul 2021 to Dec 2025',
    points: [
      'Delivered and maintained a VOD platform for 60+ clients and 3 eCommerce clients',
      'Led a team of 10 developers: workflows, task distribution and releases',
      'CI/CD pipelines with Docker, Jenkins and Bitbucket',
      'Next.js admin dashboards with ShadCN UI and role-based access control',
      'Firebase and Supabase auth, Prisma and Sequelize ORM',
      'BunnyCDN API integration and Flask automation microservices',
    ],
  },
  {
    company: 'Rajalakshmi Engineering College',
    role: 'B.E. Computer Science and Engineering',
    period: '2015 to 2019',
    points: ['Chennai'],
  },
]

export const skills = {
  Frontend: ['React.js', 'Next.js', 'ShadCN UI', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'jQuery'],
  Backend: ['Node.js', 'Express.js', 'Laravel', 'Lumen', 'CodeIgniter', 'Yii2', 'Redis', 'FFmpeg', 'JWT', 'OAuth', 'Microservices'],
  Database: ['MySQL', 'Prisma ORM', 'Sequelize ORM', 'Firebase', 'Supabase'],
  'Cloud and DevOps': ['AWS EC2', 'S3', 'RDS', 'SES', 'SNS', 'Docker', 'Kubernetes', 'Jenkins', 'Cloudflare', 'Bitbucket', 'Git'],
  Integrations: ['TekTravels', 'WorkOS', 'Cashfree', 'Twilio', 'Stripe', 'Razorpay', 'PayPal', 'Paystack', 'BunnyCDN'],
}

export const marquee = ['React.js', 'Next.js', 'Node.js', 'AWS', 'Kubernetes', 'Docker', 'MySQL', 'Redis', 'Laravel', 'Prisma', 'Twilio', 'Stripe', 'Cloudflare', 'Jenkins']

// Cities drawn as flight routes from Chennai on the hero globe.
export const routes = [
  { name: 'Chennai', lat: 13.08, lon: 80.27, home: true },
  { name: 'Delhi', lat: 28.61, lon: 77.21 },
  { name: 'Mumbai', lat: 19.08, lon: 72.88 },
  { name: 'Kolkata', lat: 22.57, lon: 88.36 },
  { name: 'Dubai', lat: 25.2, lon: 55.27 },
  { name: 'Singapore', lat: 1.35, lon: 103.82 },
  { name: 'London', lat: 51.5, lon: -0.12 },
  { name: 'Tokyo', lat: 35.68, lon: 139.69 },
]
