# marketing Specification

## Purpose
Capture the requirements for presenting marketing content on the pharmacy website with real fallback imagery sourced from `public/asset_quaythuoc`.
## Requirements
### Requirement: Product Fallback Image
The marketing product listings MUST render a fallback image from `public/asset_quaythuoc` whenever a product has no specific image available.

#### Scenario: Product without image
- **WHEN** a product card is rendered and the product has no `imageUrl`
- **THEN** the UI MUST display the fallback image sourced from `public/asset_quaythuoc`

### Requirement: Service Fallback Image
The marketing service listings MUST render a fallback image from `public/asset_quaythuoc` whenever a service has no specific image available.

#### Scenario: Service without image
- **WHEN** a service card is rendered and the service has no `imageUrl`
- **THEN** the UI MUST display the fallback image sourced from `public/asset_quaythuoc`

### Requirement: Article Fallback Image
The marketing article listings MUST render a fallback image from `public/asset_quaythuoc` whenever an article has no specific image available.

#### Scenario: Article without image
- **WHEN** an article card is rendered and the article has no `imageUrl`
- **THEN** the UI MUST display the fallback image sourced from `public/asset_quaythuoc`

### Requirement: Hero Section Background Image
The marketing hero section MUST use a real pharmacy photo from `public/asset_quaythuoc` as its primary background image.

#### Scenario: Hero section rendering
- **WHEN** the marketing hero section is rendered
- **THEN** the UI MUST display the configured background image loaded from `public/asset_quaythuoc`

### Requirement: About Section Feature Image
The marketing about section MUST display a real pharmacy photo sourced from `public/asset_quaythuoc`.

#### Scenario: About section rendering
- **WHEN** the marketing about section is rendered
- **THEN** the UI MUST display the configured feature image loaded from `public/asset_quaythuoc`
