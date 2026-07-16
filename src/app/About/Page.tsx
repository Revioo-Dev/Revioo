'use client';

import { Heart, Target, Users, Zap } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'Transform how businesses leverage customer feedback through AI-powered insights'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously evolve our platform with cutting-edge AI technology'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Your success is our success. We're committed to your growth'
    },
    {
      icon: Heart,
      title: 'Trust',
      description: 'Build lasting relationships based on transparency and integrity'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Businesses' },
    { number: '1M+', label: 'Reviews Analyzed' },
    { number: '95%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  const team = [
    {
      name: 'Ahmed Khan',
      role: 'CEO & Co-founder',
      bio: 'Serial entrepreneur with 10+ years in AI and customer experience'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO & Co-founder',
      bio: 'AI/ML expert previously at leading tech companies'
    },
    {
      name: 'Marcus Smith',
      role: 'Head of Product',
      bio: 'Product strategist focused on user-centric solutions'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Customer Success',
      bio: 'Dedicated to ensuring every client achieves their goals'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Revioo</h1>
          <p className="text-xl text-gray-300">
            Empowering businesses to turn customer feedback into competitive advantage
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Revioo was born from a simple observation: businesses sit on goldmines of customer feedback, yet struggle to extract actionable insights. Traditional review management tools were outdated, slow, and difficult to use.
              </p>
              <p>
                In 2023, our founding team came together with a mission to revolutionize how businesses interact with customer reviews. We built Revioo with cutting-edge AI technology to automatically analyze sentiment, identify trends, and suggest strategic responses.
              </p>
              <p>
                Today, over 500 businesses across 30+ countries trust Revioo to manage their reputation and drive growth through authentic customer feedback.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-6 text-center backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                  </div>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-6 backdrop-blur-sm"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4"></div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-purple-400 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-gray-300 mb-6">
              We're building the future of customer feedback. Come be a part of something special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/get-started"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 font-semibold transition-all duration-300"
              >
                Get Started
              </a>
              <a
                href="mailto:careers@revioo.app"
                className="px-8 py-3 rounded-lg border border-purple-500/50 hover:border-purple-500 font-semibold transition-all duration-300"
              >
                We're Hiring
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
