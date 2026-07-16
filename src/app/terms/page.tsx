'use client';

import { FileText, AlertCircle, Scale, DollarSign } from 'lucide-react';

export default function Terms() {
  const sections = [
    {
      icon: FileText,
      title: '1. Acceptance of Terms',
      content: `
        By accessing and using Revioo, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
      `
    },
    {
      icon: AlertCircle,
      title: '2. Use License',
      content: `
        Permission is granted to temporarily download one copy of the materials (information or software) on Revioo for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        • Modifying or copying the materials
        • Using the materials for any commercial purpose or for any public display
        • Attempting to decompile or reverse engineer any software contained on Revioo
        • Transferring the materials to another person or "mirroring" the materials on any other server
        • Removing any copyright or other proprietary notations from the materials
      `
    },
    {
      icon: Scale,
      title: '3. Disclaimer',
      content: `
        The materials on Revioo are provided on an 'as is' basis. Revioo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      `
    },
    {
      icon: DollarSign,
      title: '4. Limitations',
      content: `
        In no event shall Revioo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Revioo, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
      `
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Scale className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl sm:text-5xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-xl text-gray-300 mb-4">
            Please read these terms carefully
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
            <p className="text-gray-300">
              These Terms of Service ("Terms") govern your access to and use of Revioo's website, application, and services (collectively, the "Service"). By accessing or using Revioo, you agree to be bound by these Terms. If you do not agree to all of the Terms, you may not access or use the Service.
            </p>
          </div>
        </div>
      </div>

      {/* Main Sections */}
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
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </div>
            );
          })}

          {/* Accuracy of Materials */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">5. Accuracy of Materials</h2>
            <p className="text-gray-300 mb-4">
              The materials appearing on Revioo could include technical, typographical, or photographic errors. Revioo does not warrant that any of the materials on our website are accurate, complete, or current. Revioo may make changes to the materials contained on our website at any time without notice.
            </p>
          </div>

          {/* Links */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">6. Links</h2>
            <p className="text-gray-300 mb-4">
              Revioo has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Revioo of the site. Use of any such linked website is at the user's own risk.
            </p>
          </div>

          {/* Modifications */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">7. Modifications</h2>
            <p className="text-gray-300 mb-4">
              Revioo may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service. We will provide notice of material changes via email or prominent display on our website.
            </p>
          </div>

          {/* Governing Law */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">8. Governing Law</h2>
            <p className="text-gray-300 mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>

          {/* User Responsibilities */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">9. User Responsibilities</h2>
            <p className="text-gray-300 mb-4">
              You agree to:
            </p>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li>• Use the Service only for lawful purposes</li>
              <li>• Not engage in any conduct that restricts others' use of the Service</li>
              <li>• Not upload content that is illegal, harmful, or infringes third-party rights</li>
              <li>• Maintain the confidentiality of your account credentials</li>
              <li>• Notify us immediately of unauthorized access to your account</li>
              <li>• Not attempt to gain unauthorized access to the Service</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">10. Intellectual Property Rights</h2>
            <p className="text-gray-300 mb-4">
              All materials on Revioo, including but not limited to software, graphics, text, logos, and images, are the property of Revioo or its content suppliers and are protected by international copyright laws. You may not reproduce, modify, distribute, or transmit any content without our prior written permission.
            </p>
            <p className="text-gray-300">
              However, you retain all rights to the customer reviews and feedback data you upload. We have a limited license to use this data to provide our Services and improve our AI models.
            </p>
          </div>

          {/* Payment & Refunds */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">11. Payment & Refunds</h2>
            <p className="text-gray-300 mb-4">
              • All prices are exclusive of applicable taxes
              • Payments are processed monthly or annually depending on your plan
              • All fees are non-refundable except as required by law
              • We reserve the right to change prices with 30 days' notice
              • Failed payments may result in service suspension
            </p>
          </div>

          {/* Termination */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">12. Termination</h2>
            <p className="text-gray-300 mb-4">
              Revioo may terminate or suspend your account and access to the Service immediately, without prior notice or liability, if you breach these Terms or for any other reason at our sole discretion. Upon termination, your right to use the Service will immediately cease.
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">13. Contact Information</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-slate-800/50 rounded p-4 space-y-2 text-gray-300">
              <p>📧 Email: legal@revioo.app</p>
              <p>📱 Phone: +92 335 3727314</p>
              <p>🏢 Address: Revioo HQ, Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
