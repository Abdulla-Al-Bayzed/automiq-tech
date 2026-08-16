import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import ServicesPreview from '../components/home/ServicesPreview';
import Process from '../components/home/Process';
import PortfolioPreview from '../components/home/PortfolioPreview';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';

const Home = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Automiq Tech",
    "url": "https://automiqtech.com",
    "logo": "https://automiqtech.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/automiqtech",
      "https://x.com/AutomiqTech",
      "https://www.linkedin.com/company/automiqtech/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+8801708019889",
      "contactType": "customer service"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title="Transforming Ideas Into Scalable Digital Solutions"
        description="Automiq Tech is a premium digital agency specializing in web development, mobile apps, and AI solutions for modern enterprises."
        keywords="web development, mobile apps, AI solutions, digital agency, software engineering, enterprise solutions"
        canonical="/"
        schemaData={organizationSchema}
      />
      <Hero />
      <Stats />
      <ServicesPreview />
      <Process />
      <PortfolioPreview />
      <Testimonials />
      <FAQ />
      <CTA />
    </motion.div>
  );
};

export default Home;
