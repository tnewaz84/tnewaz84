import type { LocationData } from "./location-types"

const locationData: Record<string, Record<string, LocationData>> = {
  bangladesh: {
    dhaka: {
      country: "bangladesh",
      city: "Dhaka",
      slug: "dhaka",
      title: "Professional Digital Marketing Services in Dhaka",
      niche: "Digital Marketing",
      primaryService: "SEO",
      secondaryService: "Social Media Marketing",
      clientName: "Your Company Name",
      introduction:
        "Looking for professional digital marketing services in Dhaka? Our team of experts specializes in SEO, social media marketing, content creation, and PPC advertising to help your business grow in the competitive Dhaka market. With years of experience and a proven track record, we deliver results that matter.",
      services: [
        {
          name: "Search Engine Optimization (SEO)",
          description:
            "Our Dhaka-based SEO experts will optimize your website to rank higher in search engines, driving more organic traffic and potential customers to your business.",
        },
        {
          name: "Social Media Marketing",
          description:
            "We create and manage engaging social media campaigns tailored to the Dhaka audience, helping you build brand awareness and connect with your target market.",
        },
        {
          name: "Content Marketing",
          description:
            "Our content specialists create high-quality, relevant content that resonates with your Dhaka audience and establishes your brand as an industry authority.",
        },
        {
          name: "Pay-Per-Click Advertising",
          description:
            "Maximize your ROI with our targeted PPC campaigns designed specifically for the Dhaka market, driving immediate traffic and conversions.",
        },
      ],
      faqs: [
        {
          question: "How long does it take to see results from SEO in Dhaka?",
          answer:
            "While some improvements can be seen within a few weeks, significant results from SEO in Dhaka typically take 3-6 months. This timeline varies based on your industry competition, website condition, and the specific keywords you're targeting in the Dhaka market.",
        },
        {
          question: "What social media platforms are most effective for businesses in Dhaka?",
          answer:
            "In Dhaka, Facebook has the highest user base, followed by YouTube and Instagram. However, the most effective platforms for your business depend on your target audience, industry, and marketing goals. Our team conducts thorough research to determine the best platforms for your specific business needs.",
        },
        {
          question: "How much should a business in Dhaka invest in digital marketing?",
          answer:
            "Digital marketing investment in Dhaka varies based on business size, goals, and industry. Small businesses typically start with 10,000-30,000 BDT monthly, while larger companies may invest 100,000+ BDT. We offer customized packages to fit various budgets while maximizing ROI.",
        },
      ],
      cityFacts:
        "Dhaka, the capital of Bangladesh, is one of the most densely populated cities in the world. Known for its vibrant culture, historical sites like Lalbagh Fort and Ahsan Manzil, and bustling markets such as New Market and Bashundhara City Shopping Complex. The city is a major economic hub in South Asia, with a rapidly growing digital landscape and increasing internet penetration, making digital marketing increasingly important for businesses looking to thrive in this competitive market.",
      address: "123 Gulshan Avenue, Gulshan, Dhaka 1212, Bangladesh",
      phone: "+880 1234 567890",
      email: "info@yourcompany.com",
      hours: "Monday-Friday: 9AM-6PM, Saturday: 10AM-4PM",
      metaTitle: "Professional Digital Marketing Services in Dhaka | Your Company Name",
      metaDescription:
        "Boost your business with our expert digital marketing services in Dhaka. Specializing in SEO, social media, content marketing & PPC. Get a free consultation today!",
    },
  },
  indonesia: {
    jakarta: {
      country: "indonesia",
      city: "Jakarta",
      slug: "jakarta",
      title: "Expert Web Development Services in Jakarta",
      niche: "Web Development",
      primaryService: "Website Design",
      secondaryService: "E-commerce Development",
      clientName: "Your Company Name",
      introduction:
        "Need professional web development services in Jakarta? Our team delivers cutting-edge website design, e-commerce solutions, and web applications tailored to the unique needs of Jakarta businesses. With our technical expertise and understanding of the local market, we help you establish a powerful online presence that drives growth.",
      services: [
        {
          name: "Responsive Website Design",
          description:
            "We create stunning, mobile-friendly websites that provide an exceptional user experience for your Jakarta audience across all devices and screen sizes.",
        },
        {
          name: "E-commerce Development",
          description:
            "Our Jakarta-based developers build secure, user-friendly online stores with local payment gateways integration, helping you tap into Indonesia's growing e-commerce market.",
        },
        {
          name: "Custom Web Applications",
          description:
            "We develop tailored web applications that streamline your business processes and provide innovative solutions for your specific industry needs in Jakarta.",
        },
        {
          name: "Website Maintenance & Support",
          description:
            "Our team provides ongoing maintenance and support services to ensure your website remains secure, up-to-date, and performs optimally in the Jakarta market.",
        },
      ],
      faqs: [
        {
          question: "How long does it take to build a website for a Jakarta business?",
          answer:
            "The timeline for building a website in Jakarta typically ranges from 2-8 weeks, depending on the complexity, features, and scope of the project. A simple informational website might take 2-3 weeks, while a complex e-commerce platform could take 6-8 weeks or more. We provide detailed timelines during our initial consultation.",
        },
        {
          question: "What payment gateways do you integrate for Jakarta e-commerce websites?",
          answer:
            "For Jakarta e-commerce websites, we integrate popular local payment solutions including DANA, OVO, GoPay, and LinkAja, as well as international options like credit cards, PayPal, and bank transfers. We ensure your online store accommodates the preferred payment methods of Indonesian customers.",
        },
        {
          question: "Do you provide hosting services for websites in Jakarta?",
          answer:
            "Yes, we offer reliable hosting solutions optimized for businesses in Jakarta and throughout Indonesia. Our hosting packages include regular backups, security monitoring, and technical support. We also work with local data centers to ensure fast loading speeds for your Indonesian audience.",
        },
      ],
      cityFacts:
        "Jakarta, Indonesia's capital and largest city, is a dynamic metropolis and the country's economic, cultural, and political center. Home to over 10 million people, it features landmarks like the National Monument (Monas) and Istiqlal Mosque. As Indonesia's digital economy booms, Jakarta has become a tech hub with a growing startup ecosystem. The city has one of the highest internet penetration rates in the country, making an effective web presence crucial for businesses targeting this market.",
      address: "88 Sudirman Central Business District, Jakarta 12190, Indonesia",
      phone: "+62 21 1234 5678",
      email: "jakarta@yourcompany.com",
      hours: "Monday-Friday: 9AM-5PM",
      metaTitle: "Expert Web Development Services in Jakarta | Your Company Name",
      metaDescription:
        "Professional web development services in Jakarta. Custom websites, e-commerce solutions & web applications for Jakarta businesses. Contact us for a free quote!",
    },
  },
  nigeria: {
    lagos: {
      country: "nigeria",
      city: "Lagos",
      slug: "lagos",
      title: "Reliable IT Support Services in Lagos",
      niche: "IT Support",
      primaryService: "Technical Support",
      secondaryService: "Network Management",
      clientName: "Your Company Name",
      introduction:
        "Looking for dependable IT support services in Lagos? Our team provides comprehensive technical support, network management, cybersecurity, and cloud solutions for businesses across Lagos. With our 24/7 support and local expertise, we ensure your IT infrastructure runs smoothly so you can focus on growing your business.",
      services: [
        {
          name: "Technical Support & Helpdesk",
          description:
            "Our Lagos-based technical support team provides prompt resolution to IT issues through remote assistance and on-site support, minimizing downtime for your business.",
        },
        {
          name: "Network Setup & Management",
          description:
            "We design, implement, and manage reliable network infrastructure tailored to the unique challenges of the Lagos business environment, ensuring optimal connectivity.",
        },
        {
          name: "Cybersecurity Solutions",
          description:
            "Protect your Lagos business from cyber threats with our comprehensive security services, including threat detection, prevention, and employee training.",
        },
        {
          name: "Cloud Services & Migration",
          description:
            "We help Lagos businesses leverage cloud technology for improved efficiency and scalability, with solutions optimized for local internet infrastructure.",
        },
      ],
      faqs: [
        {
          question: "What is your response time for IT emergencies in Lagos?",
          answer:
            "For critical IT emergencies in Lagos, our response time is typically under 1 hour for remote support and within 3-4 hours for on-site assistance, depending on your location within the city. Our 24/7 support team ensures your business-critical systems receive immediate attention, even during weekends and holidays.",
        },
        {
          question: "How do you handle power-related IT issues common in Lagos?",
          answer:
            "We understand Lagos's power challenges and provide comprehensive solutions including UPS systems, power management strategies, and backup configurations. Our team designs resilient IT setups that minimize disruption during power outages and protect your equipment from power surges, ensuring business continuity despite infrastructure challenges.",
        },
        {
          question: "Do you offer IT support packages for small businesses in Lagos?",
          answer:
            "Yes, we offer affordable IT support packages specifically designed for small businesses in Lagos. Our SME plans start from ₦150,000 monthly and include essential services like helpdesk support, basic network management, and cybersecurity protection. We also offer pay-as-you-go options for businesses with occasional IT support needs.",
        },
      ],
      cityFacts:
        "Lagos is Nigeria's largest city and the commercial hub of West Africa. With a population of over 20 million, it's known for its vibrant culture, bustling markets like Computer Village (the largest technology market in Africa), and growing tech ecosystem. Lagos is home to \"Yabacon Valley,\" Nigeria's tech startup hub, and hosts major tech events like Lagos Tech Fest. Despite infrastructure challenges, the city has a rapidly growing digital economy, with one of the highest concentrations of tech-savvy businesses in Africa, making reliable IT support services essential for companies operating in this dynamic market.",
      address: "15 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
      phone: "+234 801 234 5678",
      email: "lagos@yourcompany.com",
      hours: "Monday-Friday: 8AM-6PM, Saturday: 9AM-3PM",
      metaTitle: "Reliable IT Support Services in Lagos | Your Company Name",
      metaDescription:
        "24/7 IT support services in Lagos. Technical support, network management, cybersecurity & cloud solutions for Lagos businesses. Call us for immediate assistance!",
    },
  },
  australia: {
    sydney: {
      country: "australia",
      city: "Sydney",
      slug: "sydney",
      title: "Premium Graphic Design Services in Sydney",
      niche: "Graphic Design",
      primaryService: "Brand Identity Design",
      secondaryService: "Print Design",
      clientName: "Your Company Name",
      introduction:
        "Searching for exceptional graphic design services in Sydney? Our creative team specializes in brand identity design, print materials, packaging, and digital graphics that help Sydney businesses stand out in a competitive market. With our strategic approach and attention to detail, we create visual solutions that communicate your brand's unique story and connect with your target audience.",
      services: [
        {
          name: "Brand Identity Design",
          description:
            "We create distinctive brand identities for Sydney businesses, including logos, color palettes, typography, and brand guidelines that reflect your unique values and resonate with local audiences.",
        },
        {
          name: "Print Design & Collateral",
          description:
            "From business cards to brochures, our print designs help Sydney businesses make a lasting impression, with high-quality materials optimized for local printing standards.",
        },
        {
          name: "Packaging Design",
          description:
            "We design eye-catching packaging that enhances product appeal and stands out on Sydney retail shelves, combining aesthetics with practical considerations for your industry.",
        },
        {
          name: "Digital Graphics & Social Media",
          description:
            "Our team creates engaging digital graphics and social media assets tailored to connect with Sydney audiences across various online platforms and devices.",
        },
      ],
      faqs: [
        {
          question: "What is the process for creating a logo for a Sydney business?",
          answer:
            "Our logo design process for Sydney businesses begins with a discovery session to understand your brand, target audience, and competitors in the Sydney market. We then develop concept sketches, refine selected directions, and deliver final logo files in all formats needed for both print and digital use. The process typically takes 3-4 weeks and includes multiple revision rounds to ensure your complete satisfaction.",
        },
        {
          question: "How much does professional graphic design cost in Sydney?",
          answer:
            "Graphic design costs in Sydney vary based on project complexity and deliverables. Logo design typically ranges from $1,500-$5,000 AUD, while comprehensive brand identity packages range from $5,000-$15,000 AUD. Print collateral design starts around $500 AUD per item. We provide detailed quotes after understanding your specific requirements and offer packages to accommodate different budgets.",
        },
        {
          question: "Do you understand design requirements specific to Sydney businesses?",
          answer:
            "Absolutely. Our team has extensive experience working with Sydney businesses across various industries. We understand local design preferences, cultural nuances, and regulatory requirements for different sectors in Sydney. We stay current with Sydney design trends while creating timeless visuals that resonate with local audiences and reflect the city's innovative, multicultural character.",
        },
      ],
      cityFacts:
        "Sydney, Australia's largest city, is known for its iconic Opera House, Harbour Bridge, and stunning beaches like Bondi and Manly. As a global city with a diverse population of over 5 million, Sydney is a major business hub in the Asia-Pacific region. The city has a thriving creative industry, hosting events like Semi-Permanent and Sydney Design Week. With its blend of urban sophistication and natural beauty, Sydney attracts tourists and businesses alike, creating a competitive market where distinctive visual branding is essential for standing out.",
      address: "42 Oxford Street, Surry Hills, Sydney NSW 2010, Australia",
      phone: "+61 2 9876 5432",
      email: "sydney@yourcompany.com",
      hours: "Monday-Friday: 9AM-5:30PM",
      metaTitle: "Premium Graphic Design Services in Sydney | Your Company Name",
      metaDescription:
        "Award-winning graphic design services in Sydney. Brand identity, print design, packaging & digital graphics for Sydney businesses. Book a consultation today!",
    },
  },
  usa: {
    newyork: {
      country: "usa",
      city: "New York",
      slug: "new-york",
      title: "Advanced Cybersecurity Solutions in New York",
      niche: "Cybersecurity",
      primaryService: "Security Assessments",
      secondaryService: "Threat Management",
      clientName: "Your Company Name",
      introduction:
        "Need robust cybersecurity solutions in New York? Our expert team provides comprehensive security assessments, threat management, compliance services, and incident response for businesses across New York City. With the rising cyber threats targeting NYC organizations, our proactive approach and industry-specific expertise help protect your valuable digital assets and maintain business continuity.",
      services: [
        {
          name: "Security Assessments & Testing",
          description:
            "We conduct thorough vulnerability assessments and penetration testing for New York businesses, identifying security gaps before they can be exploited by malicious actors.",
        },
        {
          name: "Threat Detection & Response",
          description:
            "Our 24/7 monitoring services provide real-time threat detection and rapid response for New York organizations, minimizing the impact of security incidents.",
        },
        {
          name: "Compliance & Risk Management",
          description:
            "We help New York businesses navigate complex regulatory requirements including NYCRR 500, GDPR, HIPAA, and PCI DSS with tailored compliance solutions.",
        },
        {
          name: "Employee Security Training",
          description:
            "Our customized security awareness programs educate your New York staff about the latest threats and best practices, strengthening your organization's human firewall.",
        },
      ],
      faqs: [
        {
          question: "How vulnerable are New York businesses to cyber attacks?",
          answer:
            "New York businesses face a high risk of cyber attacks due to the city's status as a global financial and business hub. According to recent data, NYC organizations experience 40% more cyber attacks than the national average, with financial services, healthcare, and professional services being the most targeted sectors. The dense concentration of high-value targets makes robust cybersecurity essential for businesses operating in New York.",
        },
        {
          question: "What cybersecurity regulations affect New York businesses?",
          answer:
            "New York businesses must comply with several regulations, most notably the NY SHIELD Act and NYCRR 500 (for financial institutions). Additionally, depending on your industry, you may need to comply with federal regulations like HIPAA (healthcare), PCI DSS (payment processing), or GDPR (if serving EU customers). Our team helps navigate these complex requirements and implement appropriate security controls to maintain compliance.",
        },
        {
          question: "What is the average cost of a data breach for a New York business?",
          answer:
            "For New York businesses, the average cost of a data breach exceeds $9.5 million, significantly higher than the national average of $4.35 million. This includes direct costs like forensic investigations, legal fees, and customer notifications, as well as indirect costs such as reputational damage and lost business. Small businesses in NYC face average costs of $200,000-$300,000 per incident, which can be devastating without proper security measures.",
        },
      ],
      cityFacts:
        "New York City, the most populous city in the United States, is a global center for finance, media, culture, and technology. Home to Wall Street, the UN Headquarters, and landmarks like the Empire State Building and Times Square, NYC attracts businesses and talent from around the world. The city has a thriving tech ecosystem centered around Silicon Alley, with major tech companies and startups choosing NYC as their base. With its concentration of financial institutions and corporate headquarters, New York is a prime target for cybercriminals, making robust security essential for businesses operating in this dynamic metropolis.",
      address: "350 Fifth Avenue, Suite 4200, New York, NY 10118, USA",
      phone: "+1 (212) 555-0123",
      email: "nyc@yourcompany.com",
      hours: "Monday-Friday: 8AM-6PM",
      metaTitle: "Advanced Cybersecurity Solutions in New York | Your Company Name",
      metaDescription:
        "Protect your New York business with our comprehensive cybersecurity services. Security assessments, threat management, compliance & incident response. 24/7 protection.",
    },
  },
}

export function getLocationData(country: string, city: string): LocationData | undefined {
  const normalizedCountry = country.toLowerCase()
  const normalizedCity = city.toLowerCase()

  return locationData[normalizedCountry]?.[normalizedCity]
}

export function getAllLocationSlugs(): { country: string; city: string }[] {
  const slugs: { country: string; city: string }[] = []

  Object.entries(locationData).forEach(([country, cities]) => {
    Object.keys(cities).forEach((city) => {
      slugs.push({ country, city })
    })
  })

  return slugs
}
