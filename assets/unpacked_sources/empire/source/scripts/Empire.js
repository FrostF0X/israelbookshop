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
import rimg from '@pixelunion/rimg-shopify'; // eslint-disable-line

// Section Manager
import Sections from './Sections';

// Polyfills
import polyfillUrls from './checkPolyfills';

// Static Sections
import StaticAnnouncement from './sections/StaticAnnouncement';
import StaticArticle from './sections/StaticArticle';
import StaticBlog from './sections/StaticBlog';
import StaticCart from './sections/StaticCart';
import StaticCollection from './sections/StaticCollection';
import StaticFooter from './sections/StaticFooter';
import StaticHeader from './sections/StaticHeader';
import StaticPassword from './sections/StaticPassword';
import StaticProduct from './sections/StaticProduct';
import StaticProductCompare from './sections/StaticProductCompare';
import StaticProductRecommendations from './sections/StaticProductRecommendations';
import StaticRecentlyViewed from './sections/StaticRecentlyViewed';
import StaticSearch from './sections/StaticSearch';
import StaticUtilityBar from './sections/StaticUtilityBar';
import StaticSubCollectionsMenuList from './sections/StaticSubCollectionsMenuList';
import StaticSubcollectionsFeaturedCollection from './sections/StaticSubcollectionsFeaturedCollection';
import FacetedFilterCollection from './sections/FacetedFilterCollection';
import FacetedFilterSearch from './sections/FacetedFilterSearch';

// Dynamic sections
import DynamicBlogPosts from './sections/DynamicBlogPosts';
import DynamicPromoBlocks from './sections/DynamicPromoBlocks';
import DynamicFeaturedCollection from './sections/DynamicFeaturedCollection';
import DynamicMenuList from './sections/DynamicMenuList';
import DynamicCollectionList from './sections/DynamicCollectionList';
import DynamicCountdownTimer from './sections/DynamicCountdownTimer';
import DynamicFeaturedProduct from './sections/DynamicProduct';
import DynamicRichText from './sections/DynamicRichText';
import DynamicSearch from './sections/DynamicSearch';
import DynamicNewsletter from './sections/DynamicNewsletter';
import DynamicHighlightsBanner from './sections/DynamicHighlightsBanner';
import DynamicShoppableImage from './sections/DynamicShoppableImage';
import DynamicTestimonials from './sections/DynamicTestimonials';

// Templates
import Account from './templates/Account';
import Contact from './templates/Contact';
import GiftCard from './templates/GiftCard';
import Page from './templates/Page';
import Order from './templates/Order';

// Components
import BackToTop from './components/BackToTop';
import ProductCompareFlyout from './components/ProductCompareFlyout';

// Flickity iOS fix
import flickityTouchFix from './helpers/FlickityTouchFix';
import { setupRippleEffect } from './helpers/Ripple';

import ContainSwatchTooltips from './helpers/ContainSwatchTooltips';
import { initLoadInAnimationsAutoplay } from './helpers/LoadInAnimations';

const initEmpire = () => {
  initLoadInAnimationsAutoplay();
  rimg.init('[data-rimg="lazy"]', { round: 1 });

  const initRipple = () => setupRippleEffect(document);

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initRipple);
  } else {
    initRipple();
  }

  const sections = new Sections();
  // Static sections
  sections.register('static-header', section => new StaticHeader(section));
  sections.register('static-announcement', section => new StaticAnnouncement(section));
  sections.register('static-footer', section => new StaticFooter(section));
  sections.register('static-article', section => new StaticArticle(section));
  sections.register('static-blog', section => new StaticBlog(section));
  sections.register('static-cart', section => new StaticCart(section));
  sections.register('static-collection', section => new StaticCollection(section));
  sections.register('static-collection-faceted-filters', section => new FacetedFilterCollection(section));
  sections.register('static-subcollections-menu', section => new StaticSubCollectionsMenuList(section));
  sections.register('static-password', section => new StaticPassword(section));
  sections.register('static-product', section => new StaticProduct(section));
  sections.register('static-product-compare', section => new StaticProductCompare(section));
  sections.register('static-product-recommendations', section => new StaticProductRecommendations(section));
  sections.register('static-recently-viewed', section => new StaticRecentlyViewed(section));
  sections.register('static-search', section => new StaticSearch(section));
  sections.register('static-search-faceted-filters', section => new FacetedFilterSearch(section));
  sections.register('static-utility-bar', section => new StaticUtilityBar(section));
  sections.register('static-subcollections-featured-collection', section => new StaticSubcollectionsFeaturedCollection(section));

  // Dynamic sections (lazy loaded)
  sections.register('dynamic-blog-posts', section => new DynamicBlogPosts(section), { lazy: true });
  sections.register('dynamic-promo-mosaic', section => new DynamicPromoBlocks(section), { lazy: true });
  sections.register('dynamic-menu-list', section => new DynamicMenuList(section), { lazy: true });
  sections.register('dynamic-collection-list', section => new DynamicCollectionList(section), { lazy: true });
  sections.register('dynamic-countdown-timer', section => new DynamicCountdownTimer(section), { lazy: true });
  sections.register('dynamic-featured-collection', section => new DynamicFeaturedCollection(section), { lazy: true });
  sections.register('dynamic-featured-product', section => new DynamicFeaturedProduct(section), { lazy: true });
  sections.register('dynamic-rich-text', section => new DynamicRichText(section), { lazy: true });
  sections.register('dynamic-page', section => new DynamicRichText(section), { lazy: true });
  sections.register('dynamic-custom-liquid', section => new DynamicRichText(section), { lazy: true });
  sections.register('dynamic-html', section => new DynamicRichText(section), { lazy: true });
  sections.register('dynamic-search', section => new DynamicSearch(section), { lazy: true });
  sections.register('dynamic-highlights-banner', section => new DynamicHighlightsBanner(section));
  sections.register('dynamic-video', async section => {
    const { default: DynamicVideo } = await import(/* webpackChunkName: "dynamic-video" */ './sections/DynamicVideo');
    return new DynamicVideo(section);
  }, { lazy: true });
  sections.register('pxs-newsletter', section => new DynamicNewsletter(section), { lazy: true });
  sections.register('pxs-map', section => new PXSMap(section), { lazy: true });
  sections.register('pxs-shoppable-image', section => new DynamicShoppableImage(section), { lazy: false });
  sections.register('dynamic-testimonials', section => new DynamicTestimonials(section), { lazy: true });
  sections.register('age-gate', section => new PageAgeGate(section));
  sections.register('pxs-faq', section => new FAQ(section));

  if (document.body.classList.contains('template-giftcard')) {
    new GiftCard();
  }

  if (document.querySelector('[data-template-account]')) {
    new Account();
  }

  if (document.querySelector('[data-template-contact]')) {
    new Contact();
  }

  if (document.body.classList.contains('template-page')) {
    new Page();
  }

  if (document.body.classList.contains('template-order')) {
    new Order();
  }

  if (document.querySelector('[data-swatch-tooltip]')) {
    new ContainSwatchTooltips();
  }

  const compareDrawer = document.querySelector('[data-product-compare-drawer]');

  if (compareDrawer) {
    new ProductCompareFlyout(compareDrawer);
  }

  const backToTop = document.querySelector('[data-back-to-top]');

  if (backToTop) {
    new BackToTop(backToTop);
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
