'use client';

import { CheckCircle, Circle, Zap } from 'lucide-react';

export default function Roadmap() {
  const roadmapItems = [
    {
      quarter: 'Plan 1',
      status: 'completed',
      features: [
        'AI-powered sentiment analysis',
        'Multi-language review support',
        'Basic analytics dashboard',
        'Email notifications'
      ]
    },
    {
      quarter: 'Plan 2',
      status: 'in-progress',
      features: [
        'Advanced filtering & search',
        'Custom review templates',
        'API integration',
        'White-label options'
      ]
    },
    {
      quarter: 'Plan 3',
      status: 'planned',
      features: [
        'Mobile app launch (iOS & Android)',
        'Video review support',
        'AI chatbot for customer engagement',
        'Competitive analysis tool'
      ]
    },
       {
      quarter: 'Plan 4',
      status: 'planned',
      features: [
        'Advanced AI insights',
        'Team collaboration features',
        'Custom reporting',
        'Automation tools'
      ]
    }
  ];

  return (
    <div>
      {/* Your roadmap UI here */}
    </div>
  );
}
