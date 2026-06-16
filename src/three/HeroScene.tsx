import { SantaMuerteSkull } from './SantaMuerteSkull';
import { Lighting } from './Lighting';

export function HeroScene() {
  return (
    <>
      <Lighting redIntensity={1.4} keyIntensity={2.8} ambient={0.1} />
      <SantaMuerteSkull visible={1} interactive />
    </>
  );
}
