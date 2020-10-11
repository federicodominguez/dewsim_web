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
                    <a href="index.html" data-type="index-link">dewsimweb documentation</a>
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
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-056cb6705f08394b31af96b6aa77fcc8"' : 'data-target="#xs-components-links-module-AppModule-056cb6705f08394b31af96b6aa77fcc8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-056cb6705f08394b31af96b6aa77fcc8"' :
                                            'id="xs-components-links-module-AppModule-056cb6705f08394b31af96b6aa77fcc8"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeviceDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeviceDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OverviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidenavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskDetailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-056cb6705f08394b31af96b6aa77fcc8"' : 'data-target="#xs-injectables-links-module-AppModule-056cb6705f08394b31af96b6aa77fcc8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-056cb6705f08394b31af96b6aa77fcc8"' :
                                        'id="xs-injectables-links-module-AppModule-056cb6705f08394b31af96b6aa77fcc8"' }>
                                        <li class="link">
                                            <a href="injectables/DetailService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DetailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeviceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DeviceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JobService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JobService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ScheduleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ScheduleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Device.html" data-type="entity-link">Device</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link">Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Jobs.html" data-type="entity-link">Jobs</a>
                            </li>
                            <li class="link">
                                <a href="classes/Schedule.html" data-type="entity-link">Schedule</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link">Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/TasksByDevice.html" data-type="entity-link">TasksByDevice</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DetailService.html" data-type="entity-link">DetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeviceAdapter.html" data-type="entity-link">DeviceAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeviceService.html" data-type="entity-link">DeviceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsAdapter.html" data-type="entity-link">JobsAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobService.html" data-type="entity-link">JobService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScheduleAdapter.html" data-type="entity-link">ScheduleAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScheduleService.html" data-type="entity-link">ScheduleService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Adapter.html" data-type="entity-link">Adapter</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});