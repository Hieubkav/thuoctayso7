## Why

The pharmacy landing page still relied on abstract gradients and text placeholders instead of real photos. Using actual images from the pharmacy should improve trust, better showcase available services, and provide consistent fallbacks when upstream data is missing an image.

## What Changes

- Add concrete fallback image paths for products, services, and articles in `public/asset_quaythuoc`
- Render the hero section with a real background photo sourced from the fallback dataset
- Render the about section with a real photo overlay and supporting content card

## Impact

- Affected specs: marketing
- Impacted code:
  - `features/marketing/data/fallback.ts`
  - `features/marketing/components/hero-section.tsx`
  - `features/marketing/components/about-section.tsx`
  - `features/marketing/components/products-section.tsx`
  - `features/marketing/components/services-section.tsx`
  - `features/marketing/components/articles-section.tsx`
