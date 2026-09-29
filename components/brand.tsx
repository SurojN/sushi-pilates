import Image from "next/image";
import { site } from "@/config/site";

export function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Image
      className={footer ? "brand-logo brand-logo-footer" : "brand-logo"}
      src={site.brand.logo}
      alt="Sushi Pilates — Stronger, Happier, Balanced"
      width={1254}
      height={1254}
      sizes={footer ? "176px" : "(max-width: 760px) 72px, 88px"}
      loading={footer ? "lazy" : "eager"}
    />
  );
}

export function BrandCover() {
  return (
    <div className="container brand-cover">
      <Image
        src={site.brand.cover}
        alt="Sushi Pilates — Strong body. Calm mind. Better movement. Illustration of a woman practising Pilates beside a sushi roll."
        width={2172}
        height={724}
        sizes="(max-width: 760px) 92vw, (max-width: 1352px) 90vw, 1240px"
      />
    </div>
  );
}
