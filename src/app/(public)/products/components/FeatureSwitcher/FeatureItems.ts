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
    description: 'AI answers business phone calls — even at 2 am.',
    image: '/products/feature-incoming.avif',
  },
  {
    key: 'smart-replies',
    title: 'AI Interaction & Smart Replies',
    description:
      'Verify details, answer FAQs and collect customer info — let AI handle it for you.',
    image: '/products/feature-smart-replies.avif',
  },
  {
    key: 'tasks',
    title: 'Automatic Task Creation',
    description:
      'We save time by pushing tasks (calls, notes, follow-ups) straight to your inbox or CRM.',
    image: '/products/feature-tasks.avif',
  },
  {
    key: 'follow-ups',
    title: 'Reminders & Follow-Ups',
    description:
      'Sends follow-up emails or SMS automatically — never forget to nurture a lead.',
    image: '/products/feature-follow-ups.avif',
  },
  {
    key: 'history',
    title: 'History Management',
    description:
      'A crystal-clear timeline of every call and action, searchable at any time.',
    image: '/products/feature-history.avif',
  },
] satisfies FeatureItem[];
