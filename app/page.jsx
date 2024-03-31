import FeaturedProperty from '@/components/FeaturedProperty';
import Hero from '@/components/Hero';
import HomeProperties from '@/components/HomeProperties';
import InfoBoxes from '@/components/InfoBoxes';

const HomePage = async () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperty/>
      <HomeProperties />
    </>
  )
}

export default HomePage