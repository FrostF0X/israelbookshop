__webpack_public_path__ = window.__theme_asset_url__;

// jQuery plugins
import './globals/jquery';
import '@pixelunion/jquery-trend'; // eslint-disable-line
import '@pixelunion/jquery-revealer'; // eslint-disable-line

// Global imports
import scriptjs from 'scriptjs';

// Shared sections
import FAQ from '@pixelunion/pxs-faq';
import PXSMap from '@pixelunion/pxs-map';
import { SiteAgeGate, PageAgeGate } from '@pixelunion/age-gate';

// Responsive Images

// Section Manager
import Sections from './Sections';

// Polyfills

// Critical Static Sections
import StaticHeader from './sections/StaticHeader';
import StaticAnnouncement from './sections/StaticAnnouncement';
import StaticUtilityBar from './sections/StaticUtilityBar';
import StaticFooter from './sections/StaticFooter';

import polyfillUrls from './checkPolyfills';

// Static Sections



















// Dynamic sections














// Templates






// Components



// Flickity iOS fix
import flickityTouchFix from './helpers/FlickityTouchFix';
import { setupRippleEffect } from './helpers/Ripple';

import ContainSwatchTooltips from './helpers/ContainSwatchTooltips';
import { initLoadInAnimationsAutoplay } from './helpers/LoadInAnimations';

const initEmpire = () => {
  initLoadInAnimationsAutoplay();

  const initRipple = () => setupRippleEffect(document);

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initRipple);
  } else {
    initRipple();
  }

  const sections = new Sections();
  // Static sections
  // sections.register('static-header', section => new StaticHeader(section));
  sections.register('static-announcement', section => new StaticAnnouncement(section));
  sections.register('static-footer', section => new StaticFooter(section));
  sections.register('static-article', () => import(/* webpackChunkName: "static-article" */ './sections/StaticArticle'));
  sections.register('static-blog', () => import(/* webpackChunkName: "static-blog" */ './sections/StaticBlog'));
  sections.register('static-cart', () => import(/* webpackChunkName: "static-cart" */ './sections/StaticCart'));
  sections.register('static-collection', () => import(/* webpackChunkName: "static-collection" */ './sections/StaticCollection'));
  sections.register('static-collection-faceted-filters', () => import(/* webpackChunkName: "static-collection-faceted-filters" */ './sections/FacetedFilterCollection'));
  sections.register('static-subcollections-menu', () => import(/* webpackChunkName: "static-subcollections-menu" */ './sections/StaticSubCollectionsMenuList'));
  sections.register('static-password', () => import(/* webpackChunkName: "static-password" */ './sections/StaticPassword'));
  sections.register('static-product', () => import(/* webpackChunkName: "static-product" */ './sections/StaticProduct'));
  sections.register('static-product-compare', () => import(/* webpackChunkName: "static-product-compare" */ './sections/StaticProductCompare'));
  sections.register('static-product-recommendations', () => import(/* webpackChunkName: "static-product-recommendations" */ './sections/StaticProductRecommendations'));
  sections.register('static-recently-viewed', () => import(/* webpackChunkName: "static-recently-viewed" */ './sections/StaticRecentlyViewed'));
  sections.register('static-search', () => import(/* webpackChunkName: "static-search" */ './sections/StaticSearch'));
  sections.register('static-search-faceted-filters', () => import(/* webpackChunkName: "static-search-faceted-filters" */ './sections/FacetedFilterSearch'));
  sections.register('static-utility-bar', section => new StaticUtilityBar(section));
  sections.register('static-subcollections-featured-collection', () => import(/* webpackChunkName: "static-subcollections-featured-collection" */ './sections/StaticSubcollectionsFeaturedCollection'));

  // Dynamic sections (lazy loaded)
  sections.register('dynamic-blog-posts', () => import(/* webpackChunkName: "dynamic-blog-posts" */ './sections/DynamicBlogPosts'), { lazy: true });
  sections.register('dynamic-promo-mosaic', () => import(/* webpackChunkName: "dynamic-promo-mosaic" */ './sections/DynamicPromoBlocks'), { lazy: true });
  sections.register('dynamic-menu-list', () => import(/* webpackChunkName: "dynamic-menu-list" */ './sections/DynamicMenuList'), { lazy: true });
  sections.register('dynamic-collection-list', () => import(/* webpackChunkName: "dynamic-collection-list" */ './sections/DynamicCollectionList'), { lazy: true });
  sections.register('dynamic-countdown-timer', () => import(/* webpackChunkName: "dynamic-countdown-timer" */ './sections/DynamicCountdownTimer'), { lazy: true });
  sections.register('dynamic-featured-collection', () => import(/* webpackChunkName: "dynamic-featured-collection" */ './sections/DynamicFeaturedCollection'), { lazy: true });
  sections.register('dynamic-featured-product', () => import(/* webpackChunkName: "dynamic-featured-product" */ './sections/DynamicProduct'), { lazy: true });
  sections.register('dynamic-rich-text', () => import(/* webpackChunkName: "dynamic-rich-text" */ './sections/DynamicRichText'), { lazy: true });
  sections.register('dynamic-page', () => import(/* webpackChunkName: "dynamic-page" */ './sections/DynamicRichText'), { lazy: true });
  sections.register('dynamic-custom-liquid', () => import(/* webpackChunkName: "dynamic-custom-liquid" */ './sections/DynamicRichText'), { lazy: true });
  sections.register('dynamic-html', () => import(/* webpackChunkName: "dynamic-html" */ './sections/DynamicRichText'), { lazy: true });
  sections.register('dynamic-search', () => import(/* webpackChunkName: "dynamic-search" */ './sections/DynamicSearch'), { lazy: true });
  sections.register('dynamic-highlights-banner', () => import(/* webpackChunkName: "dynamic-highlights-banner" */ './sections/DynamicHighlightsBanner'));
  sections.register('dynamic-video', () => import(/* webpackChunkName: "dynamic-video" */ './sections/DynamicVideo'), { lazy: true });
  sections.register('pxs-newsletter', () => import(/* webpackChunkName: "pxs-newsletter" */ './sections/DynamicNewsletter'), { lazy: true });
  sections.register('pxs-map', section => new PXSMap(section), { lazy: true });
  sections.register('pxs-shoppable-image', () => import(/* webpackChunkName: "pxs-shoppable-image" */ './sections/DynamicShoppableImage'), { lazy: false });
  sections.register('dynamic-testimonials', () => import(/* webpackChunkName: "dynamic-testimonials" */ './sections/DynamicTestimonials'), { lazy: true });
  sections.register('age-gate', section => new PageAgeGate(section));
  sections.register('pxs-faq', section => new FAQ(section));

  if (document.body.classList.contains('template-giftcard')) {
    import(/* webpackChunkName: "giftcard" */ './templates/GiftCard').then(({ default: GiftCard }) => new GiftCard());
  }

  if (document.querySelector('[data-template-account]')) {
    import(/* webpackChunkName: "account" */ './templates/Account').then(({ default: Account }) => new Account());
  }

  if (document.querySelector('[data-template-contact]')) {
    import(/* webpackChunkName: "contact" */ './templates/Contact').then(({ default: Contact }) => new Contact());
  }

  if (document.body.classList.contains('template-page')) {
    import(/* webpackChunkName: "page" */ './templates/Page').then(({ default: Page }) => new Page());
  }

  if (document.body.classList.contains('template-order')) {
    import(/* webpackChunkName: "order" */ './templates/Order').then(({ default: Order }) => new Order());
  }

  if (document.querySelector('[data-swatch-tooltip]')) {
    new ContainSwatchTooltips();
  }

  const compareDrawer = document.querySelector('[data-product-compare-drawer]');

  if (compareDrawer) {
    import(/* webpackChunkName: "productcompareflyout" */ './components/ProductCompareFlyout').then(({ default: ProductCompareFlyout }) => new ProductCompareFlyout(compareDrawer));
  }

  const backToTop = document.querySelector('[data-back-to-top]');

  if (backToTop) {
    import(/* webpackChunkName: "backtotop" */ './components/BackToTop').then(({ default: BackToTop }) => new BackToTop(backToTop));
  }
};

flickityTouchFix();

if (polyfillUrls.length) {
  scriptjs(polyfillUrls, initEmpire);
} else {
  initEmpire();
}

const ageGatePage = document.getElementById('age-gate-page');

if (ageGatePage) {
  new SiteAgeGate(ageGatePage);
}
