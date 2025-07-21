import QASection from './components/FAQSection';
import FeatureSwitcher from './components/FeatureSwitcher';
import { FEATURE_ITEMS } from './components/FeatureSwitcher/FeatureItems';
import HeroSection from './components/HeroSection';

export default function ProductsPage() {
  return (
    <>
      <HeroSection />
      <FeatureSwitcher items={FEATURE_ITEMS} />
      <QASection />
    </>
  );
}
