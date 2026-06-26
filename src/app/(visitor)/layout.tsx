import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { DomainNavigator } from "@/components/navigation/DomainNavigator";
import { RealmAccentBridge } from "@/components/realm-engine/RealmAccentBridge";
import { EasterEggListener } from "@/components/sections/easter-eggs/EasterEggListener";
import { EasterEggOverlay } from "@/components/sections/easter-eggs/EasterEggOverlay";
import { AnnouncementsBar } from "@/components/sections/announcements/AnnouncementsBar";

/** Visitor realm shell: smooth scroll, audio, navigator, accent bridge. */
export default function VisitorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <AudioProvider>
        <RealmAccentBridge />
        <AnnouncementsBar />
        <EasterEggListener />
        <EasterEggOverlay />
        {children}
        <DomainNavigator />
      </AudioProvider>
    </SmoothScrollProvider>
  );
}
