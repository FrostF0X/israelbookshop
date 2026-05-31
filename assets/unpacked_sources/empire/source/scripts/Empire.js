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
  rimg.init('[data-rimg="lazy"]', { round: 1 });

  const initRipple = () => setupRippleEffect(document);

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initRipple);
  } else {
    initRipple();
  }

  const sections = new Sections();
  // Static sections
  sections.register('static-header', async section => {
    const { default: StaticHeader } = await import(/* webpackChunkName: "static-header" */ './sections/StaticHeader');
    return new StaticHeader(section);
  });
  sections.register('static-announcement', async section => {
    const { default: StaticAnnouncement } = await import(/* webpackChunkName: "static-announcement" */ './sections/StaticAnnouncement');
    return new StaticAnnouncement(section);
  });
  sections.register('static-footer', async section => {
    const { default: StaticFooter } = await import(/* webpackChunkName: "static-footer" */ './sections/StaticFooter');
    return new StaticFooter(section);
  });
  sections.register('static-article', async section => {
    const { default: StaticArticle } = await import(/* webpackChunkName: "static-article" */ './sections/StaticArticle');
    return new StaticArticle(section);
  });
  sections.register('static-blog', async section => {
    const { default: StaticBlog } = await import(/* webpackChunkName: "static-blog" */ './sections/StaticBlog');
    return new StaticBlog(section);
  });
  sections.register('static-cart', async section => {
    const { default: StaticCart } = await import(/* webpackChunkName: "static-cart" */ './sections/StaticCart');
    return new StaticCart(section);
  });
  sections.register('static-collection', async section => {
    const { default: StaticCollection } = await import(/* webpackChunkName: "static-collection" */ './sections/StaticCollection');
    return new StaticCollection(section);
  });
  sections.register('static-collection-faceted-filters', async section => {
    const { default: FacetedFilterCollection } = await import(/* webpackChunkName: "static-collection-faceted-filters" */ './sections/FacetedFilterCollection');
    return new FacetedFilterCollection(section);
  });
  sections.register('static-subcollections-menu', async section => {
    const { default: StaticSubCollectionsMenuList } = await import(/* webpackChunkName: "static-subcollections-menu" */ './sections/StaticSubCollectionsMenuList');
    return new StaticSubCollectionsMenuList(section);
  });
  sections.register('static-password', async section => {
    const { default: StaticPassword } = await import(/* webpackChunkName: "static-password" */ './sections/StaticPassword');
    return new StaticPassword(section);
  });
  sections.register('static-product', async section => {
    const { default: StaticProduct } = await import(/* webpackChunkName: "static-product" */ './sections/StaticProduct');
    return new StaticProduct(section);
  });
  sections.register('static-product-compare', async section => {
    const { default: StaticProductCompare } = await import(/* webpackChunkName: "static-product-compare" */ './sections/StaticProductCompare');
    return new StaticProductCompare(section);
  });
  sections.register('static-product-recommendations', async section => {
    const { default: StaticProductRecommendations } = await import(/* webpackChunkName: "static-product-recommendations" */ './sections/StaticProductRecommendations');
    return new StaticProductRecommendations(section);
  });
  sections.register('static-recently-viewed', async section => {
    const { default: StaticRecentlyViewed } = await import(/* webpackChunkName: "static-recently-viewed" */ './sections/StaticRecentlyViewed');
    return new StaticRecentlyViewed(section);
  });
  sections.register('static-search', async section => {
    const { default: StaticSearch } = await import(/* webpackChunkName: "static-search" */ './sections/StaticSearch');
    return new StaticSearch(section);
  });
  sections.register('static-search-faceted-filters', async section => {
    const { default: FacetedFilterSearch } = await import(/* webpackChunkName: "static-search-faceted-filters" */ './sections/FacetedFilterSearch');
    return new FacetedFilterSearch(section);
  });
  sections.register('static-utility-bar', async section => {
    const { default: StaticUtilityBar } = await import(/* webpackChunkName: "static-utility-bar" */ './sections/StaticUtilityBar');
    return new StaticUtilityBar(section);
  });
  sections.register('static-subcollections-featured-collection', async section => {
    const { default: StaticSubcollectionsFeaturedCollection } = await import(/* webpackChunkName: "static-subcollections-featured-collection" */ './sections/StaticSubcollectionsFeaturedCollection');
    return new StaticSubcollectionsFeaturedCollection(section);
  });

  // Dynamic sections (lazy loaded)
  sections.register('dynamic-blog-posts', async section => {
    const { default: DynamicBlogPosts } = await import(/* webpackChunkName: "dynamic-blog-posts" */ './sections/DynamicBlogPosts');
    return new DynamicBlogPosts(section);
  }, { lazy: true });
  sections.register('dynamic-promo-mosaic', async section => {
    const { default: DynamicPromoBlocks } = await import(/* webpackChunkName: "dynamic-promo-mosaic" */ './sections/DynamicPromoBlocks');
    return new DynamicPromoBlocks(section);
  }, { lazy: true });
  sections.register('dynamic-menu-list', async section => {
    const { default: DynamicMenuList } = await import(/* webpackChunkName: "dynamic-menu-list" */ './sections/DynamicMenuList');
    return new DynamicMenuList(section);
  }, { lazy: true });
  sections.register('dynamic-collection-list', async section => {
    const { default: DynamicCollectionList } = await import(/* webpackChunkName: "dynamic-collection-list" */ './sections/DynamicCollectionList');
    return new DynamicCollectionList(section);
  }, { lazy: true });
  sections.register('dynamic-countdown-timer', async section => {
    const { default: DynamicCountdownTimer } = await import(/* webpackChunkName: "dynamic-countdown-timer" */ './sections/DynamicCountdownTimer');
    return new DynamicCountdownTimer(section);
  }, { lazy: true });
  sections.register('dynamic-featured-collection', async section => {
    const { default: DynamicFeaturedCollection } = await import(/* webpackChunkName: "dynamic-featured-collection" */ './sections/DynamicFeaturedCollection');
    return new DynamicFeaturedCollection(section);
  }, { lazy: true });
  sections.register('dynamic-featured-product', async section => {
    const { default: DynamicFeaturedProduct } = await import(/* webpackChunkName: "dynamic-featured-product" */ './sections/DynamicProduct');
    return new DynamicFeaturedProduct(section);
  }, { lazy: true });
  sections.register('dynamic-rich-text', async section => {
    const { default: DynamicRichText } = await import(/* webpackChunkName: "dynamic-rich-text" */ './sections/DynamicRichText');
    return new DynamicRichText(section);
  }, { lazy: true });
  sections.register('dynamic-page', async section => {
    const { default: DynamicRichText } = await import(/* webpackChunkName: "dynamic-page" */ './sections/DynamicRichText');
    return new DynamicRichText(section);
  }, { lazy: true });
  sections.register('dynamic-custom-liquid', async section => {
    const { default: DynamicRichText } = await import(/* webpackChunkName: "dynamic-custom-liquid" */ './sections/DynamicRichText');
    return new DynamicRichText(section);
  }, { lazy: true });
  sections.register('dynamic-html', async section => {
    const { default: DynamicRichText } = await import(/* webpackChunkName: "dynamic-html" */ './sections/DynamicRichText');
    return new DynamicRichText(section);
  }, { lazy: true });
  sections.register('dynamic-search', async section => {
    const { default: DynamicSearch } = await import(/* webpackChunkName: "dynamic-search" */ './sections/DynamicSearch');
    return new DynamicSearch(section);
  }, { lazy: true });
  sections.register('dynamic-highlights-banner', async section => {
    const { default: DynamicHighlightsBanner } = await import(/* webpackChunkName: "dynamic-highlights-banner" */ './sections/DynamicHighlightsBanner');
    return new DynamicHighlightsBanner(section);
  });
  sections.register('dynamic-video', async section => {
    const { default: DynamicVideo } = await import(/* webpackChunkName: "dynamic-video" */ './sections/DynamicVideo');
    return new DynamicVideo(section);
  }, { lazy: true });
  sections.register('pxs-newsletter', async section => {
    const { default: DynamicNewsletter } = await import(/* webpackChunkName: "pxs-newsletter" */ './sections/DynamicNewsletter');
    return new DynamicNewsletter(section);
  }, { lazy: true });
  sections.register('pxs-map', section => new PXSMap(section), { lazy: true });
  sections.register('pxs-shoppable-image', async section => {
    const { default: DynamicShoppableImage } = await import(/* webpackChunkName: "pxs-shoppable-image" */ './sections/DynamicShoppableImage');
    return new DynamicShoppableImage(section);
  }, { lazy: false });
  sections.register('dynamic-testimonials', async section => {
    const { default: DynamicTestimonials } = await import(/* webpackChunkName: "dynamic-testimonials" */ './sections/DynamicTestimonials');
    return new DynamicTestimonials(section);
  }, { lazy: true });
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
