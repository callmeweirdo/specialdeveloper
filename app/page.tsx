"use client";

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Zap, ArrowRight, Menu, X, TrendingUp, Users, Eye, Rocket, ExternalLink } from 'lucide-react';

interface Blog {
  id: number; title: string; excerpt: string; content: string; date: string; category: string; image: string;
}
interface Analytics {
  views: number; leads: number; engagementRate: string; topService: string;
}
interface Project {
  title: string; category: string; img: string; tag: string;
  desc: string; fullDesc: string; tech: string[]; link?: string;
}

function FloatingLabelInput({ label, name, type = "text", required = false, isTextArea = false }: {
  label: string; name: string; type?: string; required?: boolean; isTextArea?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="relative pt-6">
      <motion.label
        initial={false}
        animate={{
          y: (isFocused || hasValue) ? -24 : 0,
          scale: (isFocused || hasValue) ? 0.85 : 1,
          color: isFocused ? "#FFD700" : (hasValue ? "#71717a" : "#52525b"),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute left-0 top-8 font-mono text-[10px] font-bold uppercase tracking-widest pointer-events-none origin-left"
      >
        {label}
      </motion.label>
      {isTextArea ? (
        <textarea name={name} required={required} rows={4}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => { setIsFocused(false); setHasValue(e.target.value.length > 0); }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className="input-glass resize-none"
        />
      ) : (
        <input name={name} type={type} required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => { setIsFocused(false); setHasValue(e.target.value.length > 0); }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className="input-glass"
        />
      )}
      <motion.div
        initial={false}
        animate={{ width: isFocused ? "100%" : "0%" }}
        className="absolute bottom-0 left-0 h-[1px] bg-yellow-400/60"
      />
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [contactStatus, setContactStatus] = useState<{success?: boolean, message?: string} | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [activeForm, setActiveForm] = useState<'contact' | 'booking'>('contact');
  const [bookingStatus, setBookingStatus] = useState({ loading: false, success: false, message: '' });
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    fetch('/api/blogs').then(r => r.json()).then(setBlogs);
    fetch('/api/analytics').then(r => r.json()).then(setAnalytics);
  }, []);

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      setContactStatus(await res.json());
    } catch { setContactStatus({ success: false, message: "Something went wrong. Please try again." }); }
  };

  const handleBookingSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus({ loading: true, success: false, message: '' });
    setTimeout(() => {
      setBookingStatus({ loading: false, success: true, message: 'Reservation logged. David will confirm your session shortly.' });
    }, 2000);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  const services = [
    { id: "01", title: "Custom Development", desc: "Full-stack web applications built for speed, scale, and conversion. From landing pages to complex platforms.", tech: "React / Next.js / Node" },
    { id: "02", title: "E-Commerce", desc: "Online stores engineered to turn browsers into buyers. Seamless checkout, inventory sync, and payment integration.", tech: "Shopify / Stripe / Next.js" },
    { id: "03", title: "SEO & Growth", desc: "Search optimization and growth strategies that put your business in front of the right people at the right time.", tech: "Technical SEO / Content / Analytics" },
    { id: "04", title: "SaaS Platforms", desc: "Multi-tenant platforms with real-time features, user management, secure payments, and scalable architecture.", tech: "TypeScript / PostgreSQL / AWS" },
    { id: "05", title: "Automation", desc: "Business process automation and internal tools that eliminate manual work, cut costs, and free up your team.", tech: "Node.js / Python / APIs" },
    { id: "06", title: "Brand Systems", desc: "Cohesive design systems and visual identities that build instant trust and make your brand unforgettable.", tech: "Figma / Tailwind / DesignOps" },
  ];

  const projects: Project[] = [
    {
      title: "Spark Aura Solar",
      category: "Energy & Solar",
      img: "/sparkaurasolar.png",
      tag: "Lead Generation",
      desc: "Solar energy platform with consultation booking, pricing tools, and SEO-optimized location pages.",
      fullDesc: "Built a complete digital presence for Spark Aura Solar — Abuja's leading solar installation company. The platform features service pages for 10+ locations, a solar cost calculator, WhatsApp integration for instant quotes, and a blog optimized for local SEO. Result: 3x increase in qualified leads within 60 days.",
      tech: ["Next.js", "Tailwind CSS", "SEO"],
      link: "https://sparkaurasolar.vercel.app"
    },
    {
      title: "Bread, Banana & Butter",
      category: "Service Marketplace",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&h=800&auto=format&fit=crop",
      tag: "Platform Scale",
      desc: "Multi-vendor marketplace with real-time booking, geo-location search, and seller dashboards.",
      fullDesc: "Engineered a complete service marketplace for the Swedish market. Features include multi-vendor seller accounts, location-based service discovery, real-time availability booking, secure payments, and an admin dashboard for marketplace management.",
      tech: ["React", "Node.js", "PostgreSQL"],
      link: "https://breadbananaandbutter.se"
    },
    {
      title: "Nova Analytics",
      category: "SaaS Platform",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&h=800&auto=format&fit=crop",
      tag: "B2B SaaS",
      desc: "Real-time financial analytics dashboard with interactive visualizations and automated reporting.",
      fullDesc: "A B2B SaaS platform for financial teams. Built real-time data pipelines, interactive D3.js visualizations, role-based access control, and automated PDF report generation. Reduced client reporting time by 85%.",
      tech: ["TypeScript", "D3.js", "AWS"]
    },
    {
      title: "Maison Noir",
      category: "E-Commerce",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&h=800&auto=format&fit=crop",
      tag: "Revenue Engine",
      desc: "High-converting luxury retail platform with seamless checkout and inventory management.",
      fullDesc: "Designed and developed a premium e-commerce experience for a luxury fashion brand. Features include one-click checkout with Stripe, real-time inventory sync, and a personalized recommendation engine. Achieved 4.2% conversion rate — 2x industry average.",
      tech: ["Next.js", "Stripe", "Shopify API"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-x-hidden">
      {/* === AMBIENT BACKGROUND === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-yellow-400/[0.03] rounded-full blur-[120px] animate-orb-1" />
        <div className="absolute top-[40%] right-[5%] w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[140px] animate-orb-2" />
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-yellow-600/[0.02] rounded-full blur-[100px] animate-orb-3" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>
      <div className="grain" />
      <div className="vignette" />

      {/* === NAVIGATION === */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass-strong rounded-2xl px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-yellow-400/40 overflow-hidden shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                <img src="/david-joseph.jpg" alt="David Joseph" className="w-full h-full object-cover" />
              </div>
              <span className="font-mono text-sm font-bold tracking-[0.2em] text-white/90">DAVID JOSEPH</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => { setActiveSection(item.id); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className={`relative text-[11px] font-mono font-bold uppercase tracking-[0.15em] transition-colors ${activeSection === item.id ? 'text-yellow-400 text-glow-yellow' : 'text-white/40 hover:text-white/80'}`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-400" />
                  )}
                </button>
              ))}
              <div className="w-px h-4 bg-white/10" />
              <button onClick={() => setIsDashboardOpen(true)} className="flex items-center gap-2 text-[11px] font-mono text-yellow-400/70 hover:text-yellow-400 transition-colors">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Metrics</span>
              </button>
            </div>
            <button className="md:hidden text-white/60" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 glass-strong flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveSection(item.id); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}
                className="text-2xl font-light text-white/80 hover:text-yellow-400 transition-colors"
              >{item.label}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* === HERO === */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="container mx-auto px-6 text-center">
            <motion.div
              initial="hidden" animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <span className="tag mb-10">Full-Stack Engineer & Product Builder</span>
              </motion.div>

              <motion.h1 variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8"
              >
                <span className="block text-white/20">Building Digital</span>
                <span className="block shimmer-text mt-2">Experiences</span>
                <span className="block text-white/90 mt-2">That Convert</span>
              </motion.h1>

              <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="max-w-xl mx-auto text-sm text-white/40 leading-relaxed mb-12 font-light"
              >
                Your business deserves more than a website. It deserves a digital engine 
                that works while you sleep — turning visitors into customers and ideas into revenue.
              </motion.p>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
                  Start Your Project
                </button>
                <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">
                  View My Work
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
            />
          </motion.div>
        </section>

        {/* === ABOUT === */}
        <section className="py-32 md:py-40">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="glass-strong rounded-3xl p-2 relative">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                      <img src="/david-joseph.jpg" alt="David Joseph" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          <h3 className="text-2xl font-black text-white mb-1">David Joseph</h3>
                          <p className="text-sm text-yellow-400 font-mono uppercase tracking-widest text-[10px] text-glow-yellow">Your Special Developer</p>
                          <p className="text-xs text-white/40 mt-2">Websites • Mobile Apps • Desktop Apps</p>
                        </motion.div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-3xl border-2 border-yellow-400/20 pointer-events-none"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute inset-[-6px] rounded-[2rem] border border-yellow-400/10 pointer-events-none"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 glass-strong rounded-2xl px-6 py-4"
                >
                  <div className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest mb-1 text-glow-yellow">Experience</div>
                  <div className="text-2xl font-black text-white">5+ Years</div>
                </motion.div>
              </motion.div>

              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="section-label">About</div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-8">
                    Engineering <br />
                    <span className="text-yellow-400 text-glow-yellow">Growth.</span>
                  </h2>
                  <p className="text-white/40 leading-relaxed mb-8 max-w-md">
                    In today's market, your digital presence is your first impression and your hardest-working 
                    sales tool. I help businesses establish authority online through precision-built platforms 
                    that load fast, rank high, and convert visitors into loyal customers.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-3"
                >
                  {[
                    { val: "80+", label: "Projects Delivered" },
                    { val: "100%", label: "Client Focus" },
                    { val: "Full", label: "Stack Mastery" },
                    { val: "24/7", label: "Support" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-6 text-center"
                    >
                      <div className="text-2xl font-black text-yellow-400/90 mb-1">{stat.val}</div>
                      <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* === SERVICES === */}
        <section id="services" className="py-32 md:py-40">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="section-label">What I Do</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                Services <br />
                <span className="text-white/20">That Scale</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-8 group"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-3xl font-black text-white/[0.04] group-hover:text-yellow-400/10 transition-colors">
                      {service.id}
                    </span>
                    <Zap className="w-5 h-5 text-yellow-400/40 group-hover:text-yellow-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white/90 mb-3 group-hover:text-yellow-400 transition-colors group-hover:text-glow-yellow">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-yellow-400/40" />
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{service.tech}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === PORTFOLIO === */}
        <section id="portfolio" className="py-32 md:py-40">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="section-label">Selected Work</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                Featured <br />
                <span className="text-white/20">Projects</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((work, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    if (work.link) window.open(work.link, '_blank');
                    else setSelectedProject(work);
                  }}
                >
                  <div className="glass-card overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={work.img}
                        alt={work.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full border border-yellow-400/60 flex items-center justify-center backdrop-blur-xl bg-black/20">
                          <ArrowRight className="w-5 h-5 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-yellow-400/60 uppercase tracking-widest">{work.category}</span>
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{work.tag}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white/90 group-hover:text-yellow-400 transition-colors group-hover:text-glow-yellow mb-2">
                        {work.title}
                      </h3>
                      <p className="text-sm text-white/30 leading-relaxed">{work.desc}</p>
                      {work.link && (
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-yellow-400/40 group-hover:text-yellow-400/70 transition-colors uppercase tracking-widest">
                          <ExternalLink className="w-3 h-3" />
                          Live Site
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === BLOG === */}
        <section id="blog" className="py-32 md:py-40">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="section-label">Latest Insights</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                Thoughts on <br />
                <span className="text-white/20">Building</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, idx) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card group flex flex-col cursor-pointer"
                  onClick={() => setSelectedBlog(blog)}
                >
                  <div className="aspect-[2/1] overflow-hidden rounded-t-2xl">
                    <img src={blog.image} alt={blog.title}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">
                      <span>{blog.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-yellow-400/50">{blog.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white/80 group-hover:text-yellow-400 transition-colors group-hover:text-glow-yellow mb-3">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-white/25 leading-relaxed flex-1">{blog.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-yellow-400/40 group-hover:text-yellow-400/70 transition-colors uppercase tracking-widest">
                      <span>Read Article</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* === CONTACT === */}
        <section id="contact" className="py-32 md:py-40">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="section-label">Get In Touch</div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8">
                    Let's Build <br />
                    <span className="text-yellow-400 text-glow-yellow">Together.</span>
                  </h2>
                  <p className="text-white/30 leading-relaxed mb-12 max-w-md">
                    Have a project in mind? Let's discuss how we can transform your idea into a 
                    high-performing digital product.
                  </p>
                </motion.div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-6 rounded-2xl"
                  >
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-2">Email</div>
                    <div className="text-lg font-bold text-white/80 tracking-tight">SPECIALDEVELOPER101@GMAIL.COM</div>
                  </motion.div>

                  <motion.a
                    href="https://wa.me/2349054262534"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="block glass p-6 rounded-2xl group hover:border-green-400/20 transition-all"
                  >
                    <div className="text-[10px] font-mono text-green-400/50 uppercase tracking-widest mb-2">WhatsApp</div>
                    <div className="text-lg font-bold text-green-400/70 group-hover:text-green-400 tracking-tight transition-colors">+234 905 426 2534</div>
                  </motion.a>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-strong rounded-3xl p-8 md:p-10"
              >
                <div className="flex gap-2 mb-10">
                  {(['contact', 'booking'] as const).map((f) => (
                    <button key={f} onClick={() => setActiveForm(f)}
                      className={`flex-1 py-3 text-[11px] font-mono font-bold uppercase tracking-widest rounded-xl transition-all ${
                        activeForm === f
                          ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                          : 'text-white/20 hover:text-white/50'
                      }`}
                    >
                      {f === 'contact' ? 'Send Message' : 'Book Call'}
                    </button>
                  ))}
                </div>

                {activeForm === 'contact' ? (
                  <form onSubmit={handleContactSubmit} className="space-y-8">
                    <FloatingLabelInput label="Your Name" name="name" required />
                    <FloatingLabelInput label="Your Email" name="email" type="email" required />
                    <FloatingLabelInput label="Your Message" name="message" required isTextArea />
                    <button type="submit" className="w-full btn-primary py-5">
                      Send Message
                    </button>
                    {contactStatus && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl text-[11px] font-mono uppercase tracking-widest ${
                          contactStatus.success
                            ? 'bg-yellow-400/5 border border-yellow-400/10 text-yellow-400'
                            : 'bg-red-400/5 border border-red-400/10 text-red-400'
                        }`}
                      >
                        {contactStatus.success ? 'Message Sent' : 'Error Sending'} — {contactStatus.message}
                      </motion.div>
                    )}
                  </form>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FloatingLabelInput label="Your Name" name="name" required />
                      <FloatingLabelInput label="Your Email" name="email" type="email" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative pt-6">
                        <label className="absolute left-0 top-0 text-[10px] font-mono text-white/20 uppercase tracking-widest">Preferred Date</label>
                        <input type="date" name="date" required className="input-glass inverted-calendar-icon" />
                      </div>
                      <div className="relative pt-6">
                        <label className="absolute left-0 top-0 text-[10px] font-mono text-white/20 uppercase tracking-widest">Service Type</label>
                        <select name="service" className="input-glass appearance-none cursor-pointer">
                          <option className="bg-[#111]" value="consult">Consultation</option>
                          <option className="bg-[#111]" value="development">Full Development</option>
                          <option className="bg-[#111]" value="audit">Architecture Audit</option>
                          <option className="bg-[#111]" value="branding">Elite Branding</option>
                        </select>
                      </div>
                    </div>
                    <FloatingLabelInput label="Project Details" name="brief" required isTextArea />
                    <button type="submit" className="w-full btn-primary py-5">
                      Book Consultation
                    </button>
                    {bookingStatus.success && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/10 text-yellow-400 text-[11px] font-mono uppercase tracking-widest"
                      >
                        Booking Confirmed — {bookingStatus.message}
                      </motion.div>
                    )}
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* === FOOTER === */}
      <footer className="relative z-10 py-20 border-t border-white/[0.04]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <span className="text-yellow-400 font-black text-sm">D</span>
                </div>
                <span className="font-mono text-lg font-bold tracking-widest text-white/80">DAVID JOSEPH</span>
              </div>
              <p className="text-sm text-white/20 max-w-xs leading-relaxed">
                Building precision-engineered digital platforms. High-performance systems that drive results.
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Navigation</div>
                <div className="flex flex-col gap-3">
                  {['Services', 'Portfolio', 'Insights'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/30 hover:text-yellow-400/70 transition-colors">{item}</a>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Connect</div>
                <div className="flex flex-col gap-3">
                  <a href="#" className="text-sm text-white/30 hover:text-yellow-400/70 transition-colors">LinkedIn</a>
                  <a href="#" className="text-sm text-white/30 hover:text-yellow-400/70 transition-colors">Twitter / X</a>
                  <a href="#" className="text-sm text-white/30 hover:text-yellow-400/70 transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-white/15 font-mono tracking-wider">
              © {new Date().getFullYear()} DAVID JOSEPH. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[11px] text-white/15 hover:text-yellow-400/50 transition-colors font-mono tracking-wider">Privacy</a>
              <a href="#" className="text-[11px] text-white/15 hover:text-yellow-400/50 transition-colors font-mono tracking-wider">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* === AUDIO PLAYER === */}
      <div className="fixed bottom-6 right-6 z-[200]">
        <motion.button
          onClick={() => setIsAudioPlaying(!isAudioPlaying)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`glass rounded-full px-5 py-3 flex items-center gap-3 transition-all ${
            isAudioPlaying ? 'border-yellow-400/20' : 'border-white/5'
          }`}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-yellow-400/20">
            <img src="/david-joseph.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/40">
              {isAudioPlaying ? 'Playing' : 'Paused'}
            </span>
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
              {isAudioPlaying ? 'I Wonder — Audio On' : 'Tap to Enable'}
            </span>
          </div>
          {isAudioPlaying && (
            <div className="flex gap-[2px] h-3 items-end ml-1">
              {[0, 1, 2].map((i) => (
                <motion.div key={i}
                  animate={{ height: ["20%", "100%", "20%"] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                  className="w-[2px] bg-yellow-400/60 rounded-full"
                />
              ))}
            </div>
          )}
        </motion.button>
      </div>

      {isAudioPlaying && (
        <div className="fixed -top-[2000px] -left-[2000px] pointer-events-none opacity-0">
          <iframe
            src="https://audiomack.com/embed/browniecat/song/i-wonder"
            scrolling="no"
            width="100%"
            height="252"
            frameBorder="0"
            title="I Wonder"
            allow="autoplay"
          />
        </div>
      )}

      {/* === PROJECT MODAL === */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl"
            >
              <button onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-video overflow-hidden">
                <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono text-yellow-400/60 uppercase tracking-widest">{selectedProject.category}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{selectedProject.title}</h2>
                <p className="text-white/30 leading-relaxed mb-8">{selectedProject.fullDesc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 text-[10px] font-mono text-yellow-400/60 uppercase tracking-widest border border-yellow-400/10 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {selectedProject.link ? (
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                      Visit Live Site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button className="btn-primary">Launch Preview</button>
                  )}
                  <button onClick={() => setSelectedProject(null)} className="btn-secondary">Close</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* === BLOG MODAL === */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl"
            >
              <button onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-[2/1] overflow-hidden">
                <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-mono text-yellow-400/60 uppercase tracking-widest">{selectedBlog.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{selectedBlog.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">{selectedBlog.title}</h2>
                <div className="space-y-4 text-white/40 leading-relaxed">
                  {selectedBlog.content.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-10 pt-6 border-t border-white/[0.04]">
                  <button onClick={() => setSelectedBlog(null)} className="btn-secondary">Close Article</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* === DASHBOARD === */}
      <AnimatePresence>
        {isDashboardOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDashboardOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-[110] glass-strong border-l border-white/[0.04] p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Performance Metrics</div>
                  <h2 className="text-2xl font-black tracking-tight">Dashboard</h2>
                </div>
                <button onClick={() => setIsDashboardOpen(false)}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Eye, label: 'Page Views', value: analytics?.views.toLocaleString(), color: 'text-yellow-400' },
                  { icon: Users, label: 'New Leads', value: analytics?.leads, color: 'text-yellow-400/70' },
                  { icon: Zap, label: 'Engagement', value: analytics?.engagementRate, color: 'text-amber-400' },
                  { icon: Rocket, label: 'Top Service', value: analytics?.topService, color: 'text-yellow-600' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }}
                    className="glass p-6 rounded-2xl"
                  >
                    <item.icon className={`w-4 h-4 ${item.color} mb-4`} />
                    <div className="text-2xl font-black text-white/90 mb-1">{item.value}</div>
                    <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest border-b border-white/[0.04] pb-3 flex justify-between">
                  Recent Activity
                  <span className="text-yellow-400/40 animate-pulse">Live</span>
                </div>
                {[
                  { time: '2m ago', event: 'New project inquiry received' },
                  { time: '1h ago', event: 'Spark Aura Solar deployment completed' },
                  { time: '3h ago', event: 'Organic traffic spike detected' },
                  { time: '1d ago', event: 'New marketplace vendor onboarded' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-yellow-400/20" />
                    <div>
                      <p className="text-sm text-white/50 mb-0.5">{act.event}</p>
                      <p className="text-[10px] font-mono text-white/15">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setIsDashboardOpen(false)}
                className="w-full mt-12 py-4 glass rounded-xl text-[11px] font-mono font-bold uppercase tracking-widest text-white/30 hover:text-yellow-400/70 hover:border-yellow-400/10 transition-all"
              >
                Close Dashboard
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
