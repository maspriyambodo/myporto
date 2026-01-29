import React from 'react';
import SEO from './SEO';
import { Section } from './UI';
import { Award, TrendingUp, Shield, Clock } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '5+',
      label: 'Years Experience',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Award,
      value: '50+',
      label: 'Projects Completed',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Shield,
      value: '10+',
      label: 'Certifications',
      color: 'from-purple-500 to-violet-600',
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'System Monitoring',
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  return (
    <>
      <SEO
        title="About MasBodo - Fullstack Developer & SysAdmin Experience"
        description="Learn about MasBodo's 5+ years of experience as a Fullstack Developer and SysAdmin. Expertise in React, Laravel, Golang, system administration, and scalable backend architectures."
        keywords="about masbodo, fullstack developer experience, sysadmin background, software engineer biography, devops engineer"
        canonical="/about"
      />
      <Section id="about" title="About Me" dark>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Problem Solver at Heart,{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Engineer by Profession
                </span>
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                With over 5 years of experience in the tech industry, I bridge
                the gap between complex backend logic and seamless user
                experiences. My approach is rooted in efficiency, security, and
                scalability.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Whether it's architecting a microservices-based backend,
                hardening a Linux server, or optimizing a complex database
                schema, I focus on delivering high-impact solutions that solve
                real-world problems.
              </p>
              <div className="pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Let's Work Together
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 animate-scale-in">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default About;
