'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-aeffd4415184a8bc3b4d44674df30a69f61e7786c01d0f9d759e07246557978caed8a95c9193ea40b21e6b3f5dcc3ee919f3ffce5495b7d8910572c0b6e9dbc4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-aeffd4415184a8bc3b4d44674df30a69f61e7786c01d0f9d759e07246557978caed8a95c9193ea40b21e6b3f5dcc3ee919f3ffce5495b7d8910572c0b6e9dbc4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-aeffd4415184a8bc3b4d44674df30a69f61e7786c01d0f9d759e07246557978caed8a95c9193ea40b21e6b3f5dcc3ee919f3ffce5495b7d8910572c0b6e9dbc4"' :
                                            'id="xs-controllers-links-module-AppModule-aeffd4415184a8bc3b4d44674df30a69f61e7786c01d0f9d759e07246557978caed8a95c9193ea40b21e6b3f5dcc3ee919f3ffce5495b7d8910572c0b6e9dbc4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-aeffd4415184a8bc3b4d44674df30a69f61e7786c01d0f9d759e07246557978caed8a95c9193ea40b21e6b3f5dcc3ee919f3ffce5495b7d8910572c0b6e9dbc4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-aeffd4415184a8bc3b4d44674df30a69f61e7786c01d0f9d759e07246557978caed8a95c9193ea40b21e6b3f5dcc3ee919f3ffce5495b7d8910572c0b6e9dbc4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-aeffd4415184a8bc3b4d44674df30a69f61e7786c01d0f9d759e07246557978caed8a95c9193ea40b21e6b3f5dcc3ee919f3ffce5495b7d8910572c0b6e9dbc4"' :
                                        'id="xs-injectables-links-module-AppModule-aeffd4415184a8bc3b4d44674df30a69f61e7786c01d0f9d759e07246557978caed8a95c9193ea40b21e6b3f5dcc3ee919f3ffce5495b7d8910572c0b6e9dbc4"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-58cfab197bc8066d0667077180965eddd3e9d68220e2c843662f2b7915c850c8722038027185533143c71cf92d90ebc8d2d18bca2f8964aeebf8a097ff273b89"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-58cfab197bc8066d0667077180965eddd3e9d68220e2c843662f2b7915c850c8722038027185533143c71cf92d90ebc8d2d18bca2f8964aeebf8a097ff273b89"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-58cfab197bc8066d0667077180965eddd3e9d68220e2c843662f2b7915c850c8722038027185533143c71cf92d90ebc8d2d18bca2f8964aeebf8a097ff273b89"' :
                                            'id="xs-controllers-links-module-AuthModule-58cfab197bc8066d0667077180965eddd3e9d68220e2c843662f2b7915c850c8722038027185533143c71cf92d90ebc8d2d18bca2f8964aeebf8a097ff273b89"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-58cfab197bc8066d0667077180965eddd3e9d68220e2c843662f2b7915c850c8722038027185533143c71cf92d90ebc8d2d18bca2f8964aeebf8a097ff273b89"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-58cfab197bc8066d0667077180965eddd3e9d68220e2c843662f2b7915c850c8722038027185533143c71cf92d90ebc8d2d18bca2f8964aeebf8a097ff273b89"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-58cfab197bc8066d0667077180965eddd3e9d68220e2c843662f2b7915c850c8722038027185533143c71cf92d90ebc8d2d18bca2f8964aeebf8a097ff273b89"' :
                                        'id="xs-injectables-links-module-AuthModule-58cfab197bc8066d0667077180965eddd3e9d68220e2c843662f2b7915c850c8722038027185533143c71cf92d90ebc8d2d18bca2f8964aeebf8a097ff273b89"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoriesModule-f6f2ea5270b3cb659cc0621b2901a6e9cfd9224656c896bcafa75981a6673d512a40118e96b51893a291bc81d8bbc2b2712c04d32ad0771f37e9de4e12303f45"' : 'data-bs-target="#xs-controllers-links-module-CategoriesModule-f6f2ea5270b3cb659cc0621b2901a6e9cfd9224656c896bcafa75981a6673d512a40118e96b51893a291bc81d8bbc2b2712c04d32ad0771f37e9de4e12303f45"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-f6f2ea5270b3cb659cc0621b2901a6e9cfd9224656c896bcafa75981a6673d512a40118e96b51893a291bc81d8bbc2b2712c04d32ad0771f37e9de4e12303f45"' :
                                            'id="xs-controllers-links-module-CategoriesModule-f6f2ea5270b3cb659cc0621b2901a6e9cfd9224656c896bcafa75981a6673d512a40118e96b51893a291bc81d8bbc2b2712c04d32ad0771f37e9de4e12303f45"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoriesModule-f6f2ea5270b3cb659cc0621b2901a6e9cfd9224656c896bcafa75981a6673d512a40118e96b51893a291bc81d8bbc2b2712c04d32ad0771f37e9de4e12303f45"' : 'data-bs-target="#xs-injectables-links-module-CategoriesModule-f6f2ea5270b3cb659cc0621b2901a6e9cfd9224656c896bcafa75981a6673d512a40118e96b51893a291bc81d8bbc2b2712c04d32ad0771f37e9de4e12303f45"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-f6f2ea5270b3cb659cc0621b2901a6e9cfd9224656c896bcafa75981a6673d512a40118e96b51893a291bc81d8bbc2b2712c04d32ad0771f37e9de4e12303f45"' :
                                        'id="xs-injectables-links-module-CategoriesModule-f6f2ea5270b3cb659cc0621b2901a6e9cfd9224656c896bcafa75981a6673d512a40118e96b51893a291bc81d8bbc2b2712c04d32ad0771f37e9de4e12303f45"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DateRangesModule.html" data-type="entity-link" >DateRangesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DateRangesModule-f8c26e24cadc298bf9f81aa8fb2498d6370ef2b11d2ac4b6b4a806330c68cf8cf46d77f939750287c7bba34ac572d13304f19953f9ec026e1677a9b1a8ce42ac"' : 'data-bs-target="#xs-controllers-links-module-DateRangesModule-f8c26e24cadc298bf9f81aa8fb2498d6370ef2b11d2ac4b6b4a806330c68cf8cf46d77f939750287c7bba34ac572d13304f19953f9ec026e1677a9b1a8ce42ac"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DateRangesModule-f8c26e24cadc298bf9f81aa8fb2498d6370ef2b11d2ac4b6b4a806330c68cf8cf46d77f939750287c7bba34ac572d13304f19953f9ec026e1677a9b1a8ce42ac"' :
                                            'id="xs-controllers-links-module-DateRangesModule-f8c26e24cadc298bf9f81aa8fb2498d6370ef2b11d2ac4b6b4a806330c68cf8cf46d77f939750287c7bba34ac572d13304f19953f9ec026e1677a9b1a8ce42ac"' }>
                                            <li class="link">
                                                <a href="controllers/DateRangesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateRangesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DateRangesModule-f8c26e24cadc298bf9f81aa8fb2498d6370ef2b11d2ac4b6b4a806330c68cf8cf46d77f939750287c7bba34ac572d13304f19953f9ec026e1677a9b1a8ce42ac"' : 'data-bs-target="#xs-injectables-links-module-DateRangesModule-f8c26e24cadc298bf9f81aa8fb2498d6370ef2b11d2ac4b6b4a806330c68cf8cf46d77f939750287c7bba34ac572d13304f19953f9ec026e1677a9b1a8ce42ac"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DateRangesModule-f8c26e24cadc298bf9f81aa8fb2498d6370ef2b11d2ac4b6b4a806330c68cf8cf46d77f939750287c7bba34ac572d13304f19953f9ec026e1677a9b1a8ce42ac"' :
                                        'id="xs-injectables-links-module-DateRangesModule-f8c26e24cadc298bf9f81aa8fb2498d6370ef2b11d2ac4b6b4a806330c68cf8cf46d77f939750287c7bba34ac572d13304f19953f9ec026e1677a9b1a8ce42ac"' }>
                                        <li class="link">
                                            <a href="injectables/DateRangesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateRangesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/KiosksModule.html" data-type="entity-link" >KiosksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-KiosksModule-512323ad721df0243f8476a5fa77c052d0a2a3770982914a58feef909047c3113e49c385809a88ec1750b354b06179d92a775e2950f385710709e722cadd5768"' : 'data-bs-target="#xs-controllers-links-module-KiosksModule-512323ad721df0243f8476a5fa77c052d0a2a3770982914a58feef909047c3113e49c385809a88ec1750b354b06179d92a775e2950f385710709e722cadd5768"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-KiosksModule-512323ad721df0243f8476a5fa77c052d0a2a3770982914a58feef909047c3113e49c385809a88ec1750b354b06179d92a775e2950f385710709e722cadd5768"' :
                                            'id="xs-controllers-links-module-KiosksModule-512323ad721df0243f8476a5fa77c052d0a2a3770982914a58feef909047c3113e49c385809a88ec1750b354b06179d92a775e2950f385710709e722cadd5768"' }>
                                            <li class="link">
                                                <a href="controllers/KiosksController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KiosksController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-KiosksModule-512323ad721df0243f8476a5fa77c052d0a2a3770982914a58feef909047c3113e49c385809a88ec1750b354b06179d92a775e2950f385710709e722cadd5768"' : 'data-bs-target="#xs-injectables-links-module-KiosksModule-512323ad721df0243f8476a5fa77c052d0a2a3770982914a58feef909047c3113e49c385809a88ec1750b354b06179d92a775e2950f385710709e722cadd5768"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-KiosksModule-512323ad721df0243f8476a5fa77c052d0a2a3770982914a58feef909047c3113e49c385809a88ec1750b354b06179d92a775e2950f385710709e722cadd5768"' :
                                        'id="xs-injectables-links-module-KiosksModule-512323ad721df0243f8476a5fa77c052d0a2a3770982914a58feef909047c3113e49c385809a88ec1750b354b06179d92a775e2950f385710709e722cadd5768"' }>
                                        <li class="link">
                                            <a href="injectables/KiosksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KiosksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReservationsModule.html" data-type="entity-link" >ReservationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReservationsModule-7f73027bc4cfae867ea9ef32830069228decf6c441459bb1a5ccc0e333d5f6b457211fa28c9170f741194146d92e7b43890cd41c443db3dbc5f65e67b6838f75"' : 'data-bs-target="#xs-controllers-links-module-ReservationsModule-7f73027bc4cfae867ea9ef32830069228decf6c441459bb1a5ccc0e333d5f6b457211fa28c9170f741194146d92e7b43890cd41c443db3dbc5f65e67b6838f75"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReservationsModule-7f73027bc4cfae867ea9ef32830069228decf6c441459bb1a5ccc0e333d5f6b457211fa28c9170f741194146d92e7b43890cd41c443db3dbc5f65e67b6838f75"' :
                                            'id="xs-controllers-links-module-ReservationsModule-7f73027bc4cfae867ea9ef32830069228decf6c441459bb1a5ccc0e333d5f6b457211fa28c9170f741194146d92e7b43890cd41c443db3dbc5f65e67b6838f75"' }>
                                            <li class="link">
                                                <a href="controllers/ReservationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReservationsModule-7f73027bc4cfae867ea9ef32830069228decf6c441459bb1a5ccc0e333d5f6b457211fa28c9170f741194146d92e7b43890cd41c443db3dbc5f65e67b6838f75"' : 'data-bs-target="#xs-injectables-links-module-ReservationsModule-7f73027bc4cfae867ea9ef32830069228decf6c441459bb1a5ccc0e333d5f6b457211fa28c9170f741194146d92e7b43890cd41c443db3dbc5f65e67b6838f75"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReservationsModule-7f73027bc4cfae867ea9ef32830069228decf6c441459bb1a5ccc0e333d5f6b457211fa28c9170f741194146d92e7b43890cd41c443db3dbc5f65e67b6838f75"' :
                                        'id="xs-injectables-links-module-ReservationsModule-7f73027bc4cfae867ea9ef32830069228decf6c441459bb1a5ccc0e333d5f6b457211fa28c9170f741194146d92e7b43890cd41c443db3dbc5f65e67b6838f75"' }>
                                        <li class="link">
                                            <a href="injectables/ReservationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewsModule.html" data-type="entity-link" >ReviewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReviewsModule-9ca9d7244c9a6bc8f510f84daec5235707cf428c7d9e43d84d2078aea6b3ad556a39e5eb857ef3a32193490388633d7dc33d41defc401a8a50e324fdbfcfb442"' : 'data-bs-target="#xs-controllers-links-module-ReviewsModule-9ca9d7244c9a6bc8f510f84daec5235707cf428c7d9e43d84d2078aea6b3ad556a39e5eb857ef3a32193490388633d7dc33d41defc401a8a50e324fdbfcfb442"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewsModule-9ca9d7244c9a6bc8f510f84daec5235707cf428c7d9e43d84d2078aea6b3ad556a39e5eb857ef3a32193490388633d7dc33d41defc401a8a50e324fdbfcfb442"' :
                                            'id="xs-controllers-links-module-ReviewsModule-9ca9d7244c9a6bc8f510f84daec5235707cf428c7d9e43d84d2078aea6b3ad556a39e5eb857ef3a32193490388633d7dc33d41defc401a8a50e324fdbfcfb442"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReviewsModule-9ca9d7244c9a6bc8f510f84daec5235707cf428c7d9e43d84d2078aea6b3ad556a39e5eb857ef3a32193490388633d7dc33d41defc401a8a50e324fdbfcfb442"' : 'data-bs-target="#xs-injectables-links-module-ReviewsModule-9ca9d7244c9a6bc8f510f84daec5235707cf428c7d9e43d84d2078aea6b3ad556a39e5eb857ef3a32193490388633d7dc33d41defc401a8a50e324fdbfcfb442"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewsModule-9ca9d7244c9a6bc8f510f84daec5235707cf428c7d9e43d84d2078aea6b3ad556a39e5eb857ef3a32193490388633d7dc33d41defc401a8a50e324fdbfcfb442"' :
                                        'id="xs-injectables-links-module-ReviewsModule-9ca9d7244c9a6bc8f510f84daec5235707cf428c7d9e43d84d2078aea6b3ad556a39e5eb857ef3a32193490388633d7dc33d41defc401a8a50e324fdbfcfb442"' }>
                                        <li class="link">
                                            <a href="injectables/ReviewsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolPicturesModule.html" data-type="entity-link" >ToolPicturesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ToolPicturesModule-ee1f0f083672c6cbe7135d0f370ee7490370ec1676cab2aa8b8789c8f3432628d32f5d7f60a5ccc7c5d1056ea6882c2260ae2b4c841281f686b53dc06f5d7ae3"' : 'data-bs-target="#xs-controllers-links-module-ToolPicturesModule-ee1f0f083672c6cbe7135d0f370ee7490370ec1676cab2aa8b8789c8f3432628d32f5d7f60a5ccc7c5d1056ea6882c2260ae2b4c841281f686b53dc06f5d7ae3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ToolPicturesModule-ee1f0f083672c6cbe7135d0f370ee7490370ec1676cab2aa8b8789c8f3432628d32f5d7f60a5ccc7c5d1056ea6882c2260ae2b4c841281f686b53dc06f5d7ae3"' :
                                            'id="xs-controllers-links-module-ToolPicturesModule-ee1f0f083672c6cbe7135d0f370ee7490370ec1676cab2aa8b8789c8f3432628d32f5d7f60a5ccc7c5d1056ea6882c2260ae2b4c841281f686b53dc06f5d7ae3"' }>
                                            <li class="link">
                                                <a href="controllers/ToolPicturesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolPicturesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ToolPicturesModule-ee1f0f083672c6cbe7135d0f370ee7490370ec1676cab2aa8b8789c8f3432628d32f5d7f60a5ccc7c5d1056ea6882c2260ae2b4c841281f686b53dc06f5d7ae3"' : 'data-bs-target="#xs-injectables-links-module-ToolPicturesModule-ee1f0f083672c6cbe7135d0f370ee7490370ec1676cab2aa8b8789c8f3432628d32f5d7f60a5ccc7c5d1056ea6882c2260ae2b4c841281f686b53dc06f5d7ae3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ToolPicturesModule-ee1f0f083672c6cbe7135d0f370ee7490370ec1676cab2aa8b8789c8f3432628d32f5d7f60a5ccc7c5d1056ea6882c2260ae2b4c841281f686b53dc06f5d7ae3"' :
                                        'id="xs-injectables-links-module-ToolPicturesModule-ee1f0f083672c6cbe7135d0f370ee7490370ec1676cab2aa8b8789c8f3432628d32f5d7f60a5ccc7c5d1056ea6882c2260ae2b4c841281f686b53dc06f5d7ae3"' }>
                                        <li class="link">
                                            <a href="injectables/ToolPicturesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolPicturesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolsModule.html" data-type="entity-link" >ToolsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ToolsModule-abe64c467c74cb562f3be43d806d703c62503668ab29271b76ca82b6113653db4737f4efa63a5d3ffd00107079d10cb8f93c377f6c196f7dc60d6a0649d6ec97"' : 'data-bs-target="#xs-controllers-links-module-ToolsModule-abe64c467c74cb562f3be43d806d703c62503668ab29271b76ca82b6113653db4737f4efa63a5d3ffd00107079d10cb8f93c377f6c196f7dc60d6a0649d6ec97"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ToolsModule-abe64c467c74cb562f3be43d806d703c62503668ab29271b76ca82b6113653db4737f4efa63a5d3ffd00107079d10cb8f93c377f6c196f7dc60d6a0649d6ec97"' :
                                            'id="xs-controllers-links-module-ToolsModule-abe64c467c74cb562f3be43d806d703c62503668ab29271b76ca82b6113653db4737f4efa63a5d3ffd00107079d10cb8f93c377f6c196f7dc60d6a0649d6ec97"' }>
                                            <li class="link">
                                                <a href="controllers/ToolsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ToolsModule-abe64c467c74cb562f3be43d806d703c62503668ab29271b76ca82b6113653db4737f4efa63a5d3ffd00107079d10cb8f93c377f6c196f7dc60d6a0649d6ec97"' : 'data-bs-target="#xs-injectables-links-module-ToolsModule-abe64c467c74cb562f3be43d806d703c62503668ab29271b76ca82b6113653db4737f4efa63a5d3ffd00107079d10cb8f93c377f6c196f7dc60d6a0649d6ec97"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ToolsModule-abe64c467c74cb562f3be43d806d703c62503668ab29271b76ca82b6113653db4737f4efa63a5d3ffd00107079d10cb8f93c377f6c196f7dc60d6a0649d6ec97"' :
                                        'id="xs-injectables-links-module-ToolsModule-abe64c467c74cb562f3be43d806d703c62503668ab29271b76ca82b6113653db4737f4efa63a5d3ffd00107079d10cb8f93c377f6c196f7dc60d6a0649d6ec97"' }>
                                        <li class="link">
                                            <a href="injectables/ToolsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-c547da0bd44f512e3c46e8f361327571b0f7d8272b97230881877baa34f007dbbafcaa99af523e15bf48484d7303788654247824d4aa86dbb647a8c4e7eac8e9"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-c547da0bd44f512e3c46e8f361327571b0f7d8272b97230881877baa34f007dbbafcaa99af523e15bf48484d7303788654247824d4aa86dbb647a8c4e7eac8e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c547da0bd44f512e3c46e8f361327571b0f7d8272b97230881877baa34f007dbbafcaa99af523e15bf48484d7303788654247824d4aa86dbb647a8c4e7eac8e9"' :
                                            'id="xs-controllers-links-module-UsersModule-c547da0bd44f512e3c46e8f361327571b0f7d8272b97230881877baa34f007dbbafcaa99af523e15bf48484d7303788654247824d4aa86dbb647a8c4e7eac8e9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-c547da0bd44f512e3c46e8f361327571b0f7d8272b97230881877baa34f007dbbafcaa99af523e15bf48484d7303788654247824d4aa86dbb647a8c4e7eac8e9"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-c547da0bd44f512e3c46e8f361327571b0f7d8272b97230881877baa34f007dbbafcaa99af523e15bf48484d7303788654247824d4aa86dbb647a8c4e7eac8e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c547da0bd44f512e3c46e8f361327571b0f7d8272b97230881877baa34f007dbbafcaa99af523e15bf48484d7303788654247824d4aa86dbb647a8c4e7eac8e9"' :
                                        'id="xs-injectables-links-module-UsersModule-c547da0bd44f512e3c46e8f361327571b0f7d8272b97230881877baa34f007dbbafcaa99af523e15bf48484d7303788654247824d4aa86dbb647a8c4e7eac8e9"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/BankInformation.html" data-type="entity-link" >BankInformation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DateRange.html" data-type="entity-link" >DateRange</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Kiosk.html" data-type="entity-link" >Kiosk</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PaymentMethod.html" data-type="entity-link" >PaymentMethod</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Review.html" data-type="entity-link" >Review</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tool.html" data-type="entity-link" >Tool</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ToolPicture.html" data-type="entity-link" >ToolPicture</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserTool.html" data-type="entity-link" >UserTool</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CoordinatesHandler.html" data-type="entity-link" >CoordinatesHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDateRangeDto.html" data-type="entity-link" >CreateDateRangeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateKioskDto.html" data-type="entity-link" >CreateKioskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRatingDto.html" data-type="entity-link" >CreateRatingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRentingDto.html" data-type="entity-link" >CreateRentingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReservationDto.html" data-type="entity-link" >CreateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReviewDto.html" data-type="entity-link" >CreateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateToolDto.html" data-type="entity-link" >CreateToolDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRentingDto.html" data-type="entity-link" >UpdateRentingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReviewDto.html" data-type="entity-link" >UpdateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateToolDto.html" data-type="entity-link" >UpdateToolDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto-1.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Coordinates.html" data-type="entity-link" >Coordinates</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});