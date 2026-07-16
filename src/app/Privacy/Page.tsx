'use client';

import { Lock, Shield, Eye, Database } from 'lucide-react';

export default function Privacy() {
  const sections = [
    {
      icon: Lock,
      title: '1. Information We Collect',
      content: `
        We collect information you provide directly, such as:
        • Account registration data (name, email, phone, company)
        • Payment information (processed securely via Stripe)
        • Review and feedback data you upload
        • Communication preferences and usage patterns
        • Technical data (IP address, browser type, device information)
      `
    },
    {
      icon: Shield,
      title: '2. How We Use Your Information',
      content: `
        We use your information to:
        • Provide and improve our AI-powered platform
        • Analyze customer reviews using machine learning
        • Send service updates and support communications
        • Comply with legal obligations
        • Prevent fraud and maintain security
        • Generate analytics and business intelligence for your account
      `
    },
    {
      icon: Eye,
      title: '3. Data Sharing & Disclosure',
      content: `
        We do NOT sell your data. We share information only with:
        • Third-party service providers (payment processors, email services)
        • Law enforcement when required by law
        • Business partners with your explicit consent
        • Within Revioo to provide better service
        
        All third parties are bound by confidentiality agreements.
      `
    },
    {
      icon: Database,
      title: '4. Data Security',
      content: `
        We implement comprehensive security measures:
        • 256-bit SSL/TLS encryption for all data in transit
        • AES-256 encryption for data at rest
        • Regular security audits and penetration testing
        • Compliance with GDPR, CCPA, and SOC 2 standards
        • Multi-factor authentication for accounts
        • Restricted access to sensitive data
      `
    },
    {
      icon: Lock,
      title: '5. Your Data Rights',
      content: `
        You have the right to:
        • Access your personal data
        • Request correction of inaccurate data
        • Request deletion of your data (Right to be Forgotten)
        • Export your data in portable format
        • Withdraw consent at any time
        • Lodge a complaint with data protection authorities
        
        To exercise these rights, email privacy@revioo.app
      `
    },
    {
      icon: Shield,
      title: '6. Data Retention',
      content: `
        • Account data: Retained as long as your account is active
        • Review data: Retained for the duration of your subscription
        • Deleted data: Permanently removed within 30 days
        • Backups: Retained for 90 days for disaster recovery
        • Compliance data: Retained as required by law
      `
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl sm:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-300 mb-4">
            Your privacy is our priority
          </p>
          <p className="text-gray-400">
            Last updated: January 2025
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <p className="text-gray-300 mb-4">
              Revioo ("we," "us," or "our") operates the Revioo platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            <p className="text-gray-400">
              By accessing and using Revioo, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our practices, please do not use our services.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            );
          })}

          {/* Additional Sections */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">7. Cookies & Tracking</h2>
            <p className="text-gray-300 mb-4">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Essential cookies for authentication and security</li>
              <li>• Analytics cookies to understand usage patterns</li>
              <li>• Preference cookies to remember your settings</li>
              <li>• Marketing cookies (only with your consent)</li>
            </ul>
            <p className="text-gray-400 mt-4">
              You can control cookies through your browser settings.
            </p>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">8. Third-Party Services</h2>
            <p className="text-gray-300 mb-4">
              Our platform integrates with third-party services:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Stripe (payment processing)</li>
              <li>• Amazon Web Services (cloud hosting)</li>
              <li>• SendGrid (email delivery)</li>
              <li>• Google Analytics (usage analytics)</li>
            </ul>
            <p className="text-gray-400 mt-4">
              These services have their own privacy policies. We recommend reviewing them.
            </p>
          </div>

          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">9. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              For privacy-related questions or to exercise your rights:
            </p>
            <div className="bg-slate-800/50 rounded p-4 space-y-2 text-gray-300">
              <p>📧 Email: privacy@revioo.app</p>
              <p>📱 Phone: +92 335 3727314</p>
              <p>🏢 Address: Revioo HQ, Pakistan</p>
            </div>
            <p className="text-gray-400 mt-4">
              We'll respond to requests within 30 days as required by law.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
