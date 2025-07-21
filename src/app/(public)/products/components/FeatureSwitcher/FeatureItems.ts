// FeatureSwitcher/featureItems.ts
// -----------------------------------------------------------------------------
// Simple data file that lists every feature to feed into <FeatureSwitcher />
// -----------------------------------------------------------------------------

import type { FeatureItem } from './FeatureList';

/**
 *  TIP
 *  - Place the referenced images under `/public/images/` (or your own folder).
 *  - Filenames below follow kebab-case for clarity; feel free to rename.
 */
export const FEATURE_ITEMS: FeatureItem[] = [
  {
    key: 'incoming',
    title: 'Incoming Call Handling',
    description: '24/7 Auto-answer. Never miss calls - even at 3am',
    image: '/products/feature-incoming.avif',
    bg: 'linear-gradient(to bottom, #f2f8ee, #f9faf8)',
  },
  {
    key: 'smart-replies',
    title: 'AI Interaction & Smart Replies',
    description:
      'Worry about missing any important calls? Do not worry — let AI handle it for you.',
    image: '/products/feature-smart-replies.avif',
    bg: 'linear-gradient(to bottom, #f7f7ff, #fcfdfe)',
  },
  {
    key: 'tasks',
    title: 'Automatic Task Creation',
    description: 'We write down the job details so you do not have to.',
    image: '/products/feature-tasks.avif',
    bg: 'linear-gradient(to bottom, #f2f8ee, #f9faf8)',
  },
  {
    key: 'follow-ups',
    title: 'Reminders & Follow-Ups',
    description: 'Show SMS/notification bubble.',
    image: '/products/feature-follow-ups.avif',
    bg: 'linear-gradient(to bottom, #f7f7ff, #fcfdfe)',
  },
  {
    key: 'history',
    title: 'History Management',
    description: 'We have prepared your services that need to be down today.',
    image: '/products/feature-history.avif',
    bg: 'linear-gradient(to bottom, #f2f8ee, #f9faf8)',
  },
] satisfies FeatureItem[];
