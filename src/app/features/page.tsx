
import { Container } from "@mui/material";

import FeaturesBanner from "@/app/features/components/FeaturesBanner";
import FeaturesSection from "@/app/features/components/FeaturesSection";

export default function Features() {
  return (
    <>
      <FeaturesBanner />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <FeaturesSection />
      </Container>
    </>
  );
}