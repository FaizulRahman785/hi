import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Target, Heart, Award, Shield, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function About() {
  const missionReveal = useScrollReveal();
  const valuesReveal = useScrollReveal();
  const statsReveal = useScrollReveal();

  const values = [
    { icon: Target, title: 'Focus', desc: 'Curated opportunities over massive noise.', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: Shield, title: 'Trust', desc: '100% manually verified listings.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: Award, title: 'Quality', desc: 'Industry-led skill development.', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: Heart, title: 'Empathy', desc: 'We remember what it feels like to start.', color: 'text-pink-500', bg: 'bg-pink-500/10' },
  ];

  const stats = [
    { number: '10,000+', label: 'Active Job Seekers' },
    { number: '500+', label: 'Verified Job Listings' },
    { number: '150+', label: 'Hiring Partners' },
    { number: '5,000+', label: 'Students Trained' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-28 pb-20 overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-[500px] h-[500px] top-[-40%] left-[-8%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-80 h-80 bottom-[-50%] right-[-5%] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Empowering Careers,<br />Changing Lives
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              MB Career Phagwara is a trusted career launchpad for students, fresh graduates, and professionals in India.
              We bridge the gap between talent and opportunity.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow pb-20">

        {/* Stats */}
        <section className="py-14 bg-muted/30 border-b border-border" ref={statsReveal.ref}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={statsReveal.variants.scaleIn}
                  initial="hidden"
                  animate={statsReveal.isInView ? 'visible' : 'hidden'}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-card border-b border-border" ref={missionReveal.ref}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <motion.div
                variants={missionReveal.variants.fadeLeft}
                initial="hidden"
                animate={missionReveal.isInView ? 'visible' : 'hidden'}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  To democratize access to quality career opportunities and professional education across India,
                  ensuring every ambitious individual has the tools, connections, and guidance they need to succeed.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We don't just act as a job board; we act as a career partner. From your first resume draft to
                  negotiating your senior-level salary, MB Career Phagwara is built to support every phase of your
                  professional journey.
                </p>
                <div className="mt-8 space-y-3">
                  {['Manually verified listings', 'Zero placement fees, ever', 'End-to-end career support'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={missionReveal.variants.fadeRight}
                initial="hidden"
                animate={missionReveal.isInView ? 'visible' : 'hidden'}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid grid-cols-2 gap-4"
              >
                {values.map((v, i) => (
                  <div
                    key={v.title}
                    className={`bg-background border border-border rounded-2xl p-5 text-center ${i === 1 ? 'mt-6' : ''} ${i === 2 ? '-mt-6' : ''}`}
                  >
                    <div className={`w-12 h-12 ${v.bg} ${v.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <v.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team / Story */}
        <section className="py-20" ref={valuesReveal.ref}>
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              variants={valuesReveal.variants.fadeUp}
              initial="hidden"
              animate={valuesReveal.isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Built by People Who Get It</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our founding team went through the same struggles — countless rejected applications, confusing job boards,
                and no one to guide them. We built MB Career Phagwara because we wished it had existed when we were starting out.
              </p>
            </motion.div>

            <motion.div
              variants={valuesReveal.variants.fadeUp}
              initial="hidden"
              animate={valuesReveal.isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { icon: Users, label: 'Small, dedicated team', desc: 'Based across Bangalore and Mumbai.' },
                { icon: TrendingUp, label: 'Growing fast', desc: '10,000+ users in under a year.' },
                { icon: Heart, label: 'Community-first', desc: 'Every decision is made for the job seeker.' },
              ].map((item) => (
                <div key={item.label} className="bg-card border border-border rounded-2xl p-6 text-center card-hover">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
