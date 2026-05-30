# Lighthouse Performance Notes

**Date:** May 31, 2026 (01:34 AM)
**Target URL:** `https://www.israelbookshop.com/` (Live Site)
**Form Factor:** Mobile

## Results
- **Performance:** 34
- **Accessibility:** 86
- **Best Practices:** 74
- **SEO:** 83

## Analysis
The live site is scoring around **34 in Performance** on Mobile. The performance bottlenecks remain largely consistent with our previous preview testing:
- **Unused CSS & JS:** Even with PurgeCSS applied to the theme CSS on our end, large third-party bundles and Shopify's injected assets (like `vendor.swiper.js` and `empire.js`) are still heavy. 
- **Render-Blocking Resources:** Synchronous scripts and stylesheets in the head of the document continue to delay the First Contentful Paint.
- **Main Thread Work:** High JavaScript execution time is holding back the Interactive time and Total Blocking Time (TBT).

*Note: The original PageSpeed Insights link provided (`abqt2kihp9`) reflected a snapshot prior to our branch deployments taking full effect across Shopify's CDN.*
