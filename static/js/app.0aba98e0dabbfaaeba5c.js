webpackJsonp([1],{"/AJC":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("lXtq"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("m8Ut"),o=n("VU/8")(a.a,r.a,!1,null,null,null);e.default=o.exports},"/QBt":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(n("Dd8w")),a=n("NYxO"),s=r(n("0xDb"));function r(t){return t&&t.__esModule?t:{default:t}}e.default={props:["item"],computed:(0,i.default)({},(0,a.mapState)(["disabled","isSick"]),{actions:function(){var t=["discard"];return"food"!==this.item.type&&"drink"!==this.item.type||t.push("consume"),t}}),methods:(0,i.default)({},(0,a.mapMutations)(["removeInventory","increase","getSick","getCured"]),{discard:function(t){this.removeInventory({item:t.id})},doAction:function(t){if("consume"===t){var e="food"===this.item.type?"food":"water";this.calculateRisk(this.item.risk)?(alert("you got sick!"),this.getSick()):"medicinal-tea"===this.item.id&&(this.isSick&&alert("you got cured!"),this.getCured()),this.increase({stat:e,amount:this.item.value})}this.discard(this.item)},calculateRisk:function(t){for(var e=[],n=0;n<10;n++)n<t?e.push(!0):e.push(!1);return e[s.default.randomizeWithinRange(e.length)]}})}},"/o5o":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Aqhm"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("4A8X"),o=n("VU/8")(a.a,r.a,!1,null,null,null);e.default=o.exports},"/p12":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=u(n("Dd8w")),a=n("NYxO"),s=u(n("M4fF")),r=n("K30H"),o=u(n("tcnj"));function u(t){return t&&t.__esModule?t:{default:t}}e.default={name:"inventory",data:function(){return{order:"asc",key:"dateAdded"}},computed:(0,i.default)({},(0,a.mapState)(["inventory"]),{length:function(){return this.inventory.length},maxLength:function(){return r.MAXINVENTORY},orderedList:function(){return s.default.orderBy(this.inventory,this.key,this.order)}}),components:{list:o.default}}},"0pd7":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n("zU9e"),s=(i=a)&&i.__esModule?i:{default:i};e.default={name:"list",props:["list"],components:{consume:s.default}}},"0tlR":function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("camp-upgrades"),t._v(" "),n("h2",{staticClass:"SectionTitle"},[t._v("Food and water")]),t._v(" "),n("ul",[t._l(t.foodItems,function(e){return n("craftable-item",{key:e.id,attrs:{item:e},on:{craft:t.craft}})}),t._v(" "),t._l(t.drinkItems,function(e){return n("craftable-item",{key:e.id,attrs:{item:e},on:{craft:t.craft}})})],2),t._v(" "),n("h2",{staticClass:"SectionTitle"},[t._v("Tools")]),t._v(" "),n("ul",t._l(t.tools,function(e){return n("craftable-item",{key:e.id,attrs:{item:e},on:{craft:t.craft}})})),t._v(" "),n("h2",{staticClass:"SectionTitle"},[t._v("Weapons")]),t._v(" "),n("ul",t._l(t.weapons,function(e){return n("craftable-item",{key:e.id,attrs:{item:e},on:{craft:t.craft}})}))],1)},staticRenderFns:[]};e.a=i},"0xDb":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={randomizeWithinRange:function(t){return Math.floor(Math.random()*t)},randomizeItems:function(t,e){for(var n=[],a=0;a<e;a++){var s=i.randomizeWithinRange(t.length);n.push(t[s])}return n}};e.default=i},"4/1n":function(t,e){},"4A8X":function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.visible?n("div",[n("div",[n("header",[t._t("header")],2),t._v(" "),n("section",[t._t("body")],2),t._v(" "),n("footer",[t.isCloseable?n("button",{attrs:{type:"button"},on:{click:function(e){t.close()}}},[t._v("\n        "+t._s(t.closeText)+"\n      ")]):t._e(),t._v(" "),t._t("actions")],2)])]):t._e()},staticRenderFns:[]};e.a=i},"7u0+":function(t,e,n){"use strict";var i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("section",[e("h2",{staticClass:"SectionTitle"},[this._v("Backpack "+this._s(this.length)+"/"+this._s(this.maxLength))]),this._v(" "),e("list",{attrs:{list:this.orderedList}})],1)},staticRenderFns:[]};e.a=i},"9Ca7":function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Menu"},[n("button",{staticClass:"Btn Menu__toggle",on:{click:t.toggleMenu}},[n("span")]),t._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:t.isMenuVisible,expression:"isMenuVisible"}],staticClass:"Menu__dropdown"},[n("li",{on:{click:function(e){t.goTo("home")}}},[t._v("\n      Actions\n    ")]),t._v(" "),n("li",{on:{click:function(e){t.goTo("inventory")}}},[t._v("\n      Backpack\n    ")]),t._v(" "),n("li",{on:{click:function(e){t.goTo("crafting")}}},[t._v("\n      Crafting\n    ")])])])},staticRenderFns:[]};e.a=i},"9r+9":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n("Dd8w"),s=(i=a)&&i.__esModule?i:{default:i},r=n("NYxO");e.default={data:function(){return{isMenuVisible:!1}},methods:(0,s.default)({},(0,r.mapMutations)(["changePage"]),{toggleMenu:function(){this.isMenuVisible=!this.isMenuVisible},goTo:function(t){this.changePage({newPage:t}),this.toggleMenu()}})}},Aqhm:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"modal",data:function(){return{visible:!1}},props:{isCloseable:{type:Boolean,default:!1},closeText:{type:String,default:"Ok"}},methods:{open:function(){this.visible=!0,this.isCloseable||setTimeout(this.close,3e3)},close:function(){this.visible=!1}}}},B3y0:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("GppE"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("UQXY"),o=n("VU/8")(a.a,r.a,!1,null,null,null);e.default=o.exports},C5qG:function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[t.hasStarted?n("main-component",{on:{newGame:t.start}}):n("section",{staticClass:"Splash"},[n("h1",[t._v("Live")]),t._v(" "),n("p",[t._v("A game about survival")]),t._v(" "),n("button",{staticClass:"Btn",on:{click:t.start}},[t._v("New Game")])]),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("footer",{staticClass:"Footer"},[this._v("\n    Bug report via\n    "),e("a",{attrs:{href:"https://github.com/nuria-fl/live"}},[this._v("Github")]),this._v("\n    or\n    "),e("a",{attrs:{href:"https://twitter.com/pincfloit"}},[this._v("Twitter")]),this._v("\n    ·\n    ☕ "),e("a",{attrs:{href:"https://ko-fi.com/G2G5AV2X"}},[this._v("Buy Me a Coffee")])])}]};e.a=i},DGml:function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"Stats"},t._l(t.stats,function(e,i){return n("li",{staticClass:"Stats__item"},[n("span",{staticClass:"Stats__icon"},[t._v(t._s(t.icons[i]))]),t._v(" "),n("strong",{class:{warning:e<50,danger:e<20}},[t._v("\n      "+t._s(e)+"\n    ")])])}))},staticRenderFns:[]};e.a=i},"Fa3/":function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",{staticClass:"SectionTitle"},[t._v("Actions")]),t._v(" "),n("modal",{ref:"modalResult"},[n("div",{attrs:{slot:"body"},slot:"body"},[t._v("\n      You got "+t._s(t.lastActionResult)+"\n    ")])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.inProgress,expression:"inProgress"}],staticClass:"progress"},[t._v("\n    "+t._s(t.currentAction)+"\n  ")]),t._v(" "),t._l(t.actions,function(e){return n("button",{staticClass:"Btn Action",attrs:{type:"button",disabled:t.disabled},on:{click:e.method}},[n("h3",{staticClass:"Action__title"},[t._v("\n      "+t._s(e.name)+"\n    ")]),t._v(" "),n("p",{staticClass:"Action__stats"},[t._v("\n      "+t._s(e.stats)+"\n    ")]),t._v(" "),n("p",{staticClass:"Action__desc"},[t._v("\n      "+t._s(e.description)+"\n    ")])])})],2)},staticRenderFns:[]};e.a=i},GW1v:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("N3hn"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("WkoT"),o=n("VU/8")(a.a,r.a,!1,null,null,null);e.default=o.exports},GppE:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(n("Dd8w")),a=n("NYxO"),s=o(n("/AJC")),r=o(n("GW1v"));function o(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Fire:s.default,WaterCollector:r.default},computed:(0,i.default)({},(0,a.mapGetters)(["craftableItems"]),{items:function(){return this.craftableItems.filter(function(t){return"camp"===t.type})}})}},HSKk:function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[this.gameOver?n("div",{staticClass:"Splash"},[n("h1",[t._v("GAME OVER")]),t._v(" "),n("p",[t._v("You survived "+t._s(t.daysSurvived)+" days")]),t._v(" "),n("button",{staticClass:"Btn",on:{click:function(e){t.newGame()}}},[t._v("Start over")])]):t._e(),t._v(" "),this.gameOver?t._e():n("div",[n("header",{staticClass:"Header"},[n("div",{staticClass:"Header__content"},[n("mobile-menu"),t._v(" "),n("stats"),t._v(" "),n("days-counter")],1)]),t._v(" "),n("div",{staticClass:"Main"},[t.mobileHome?n("div",{staticClass:"Main__column"},[n("actions")],1):t._e(),t._v(" "),t.mobileInventory?n("div",{staticClass:"Main__column"},[n("inventory")],1):t._e(),t._v(" "),t.mobileCrafting?n("div",{staticClass:"Main__column"},[n("crafting")],1):t._e()])])])},staticRenderFns:[]};e.a=i},HbTY:function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("article",{staticClass:"Item"},[n("h4",[t._v(t._s(t.item.name))]),t._v(" "),n("p",[t._v("\n      Items needed:\n      "+t._s(t.item.items.join(", "))+"\n    ")]),t._v(" "),n("button",{staticClass:"Btn",attrs:{type:"button",disabled:!t.item.isCraftable||t.disabled},on:{click:t.craft}},[t._v("\n      Craft\n    ")]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.showFireTip,expression:"showFireTip"}]},[t._v("\n      (You need fire to craft this item)\n    ")])])])},staticRenderFns:[]};e.a=i},Hvfw:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("9r+9"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("9Ca7");var o=function(t){n("PZSe")},u=n("VU/8")(a.a,r.a,!1,o,null,null);e.default=u.exports},IcnI:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=u(n("7+uW")),a=u(n("NYxO")),s=n("lwq5"),r=u(n("ukYY")),o=u(n("mUbh"));function u(t){return t&&t.__esModule?t:{default:t}}i.default.use(a.default);var c=new a.default.Store({state:s.state,getters:s.getters,mutations:r.default,actions:o.default});e.default=c},JATg:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("/p12"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("7u0+"),o=n("VU/8")(a.a,r.a,!1,null,null,null);e.default=o.exports},K30H:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.MAX=100,e.MAXINVENTORY=10},KrHW:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(n("Dd8w")),a=n("NYxO"),s=o(n("t/14")),r=o(n("B3y0"));function o(t){return t&&t.__esModule?t:{default:t}}e.default={components:{CraftableItem:s.default,CampUpgrades:r.default},computed:(0,i.default)({},(0,a.mapState)(["hasFire","disabled"]),(0,a.mapGetters)(["craftableItems"]),{foodItems:function(){return this.craftableItems.filter(function(t){return"food"===t.type})},drinkItems:function(){return this.craftableItems.filter(function(t){return"drink"===t.type})},tools:function(){return this.craftableItems.filter(function(t){return"tool"===t.type})},weapons:function(){return this.craftableItems.filter(function(t){return"weapon"===t.type})}}),methods:(0,i.default)({},(0,a.mapMutations)(["removeInventory","addInventory","enableFire"]),{craft:function(t){var e=this;t.items.forEach(function(t){e.removeInventory({item:t})}),this.addInventory({item:t})}})}},M93x:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("xJD8"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("C5qG");var o=function(t){n("cvFk")},u=n("VU/8")(a.a,r.a,!1,o,null,null);e.default=u.exports},N3hn:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n("Dd8w"),s=(i=a)&&i.__esModule?i:{default:i},r=n("NYxO");e.default={data:function(){return{hasWaterCollector:!1,isCollecting:!1,isReady:!1,usesRemaining:3}},props:{item:{type:Object}},computed:(0,s.default)({},(0,r.mapState)(["disabled"])),methods:(0,s.default)({},(0,r.mapMutations)(["increase","removeInventory","addInventory"]),{buildWaterCollector:function(){var t=this;this.item.items.forEach(function(e){t.removeInventory({item:e})}),this.usesRemaining=3,this.hasWaterCollector=!0,this.startCollecting()},startCollecting:function(){var t=this;this.isCollecting=!0,setTimeout(function(){t.isCollecting=!1},6e4)},drinkWater:function(){this.increase({stat:"water",amount:20}),this.usesRemaining--,0===this.usesRemaining?this.hasWaterCollector=!1:this.startCollecting()}})}},NHnr:function(t,e,n){"use strict";var i=r(n("7+uW")),a=r(n("M93x")),s=r(n("IcnI"));function r(t){return t&&t.__esModule?t:{default:t}}new i.default(i.default.util.extend({store:s.default},a.default)).$mount("#app")},O4Ep:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("d4kc"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("Fa3/");var o=function(t){n("gmAF")},u=n("VU/8")(a.a,r.a,!1,o,null,null);e.default=u.exports},OdHo:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n("Dd8w"),s=(i=a)&&i.__esModule?i:{default:i},r=n("NYxO");e.default={name:"consume",props:["item"],computed:(0,s.default)({},(0,r.mapState)(["hasFire","disabled"]),{showFireTip:function(){return"fire"===this.item.condition&&!this.hasFire}}),methods:{craft:function(){this.$emit("craft",this.item)}}}},PZSe:function(t,e){},TjtX:function(t,e){},UQXY:function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",{staticClass:"SectionTitle"},[t._v("Camp upgrades")]),t._v(" "),n("ul",t._l(t.items,function(e){return n("li",["fire"===e.id?n("fire",{attrs:{item:e}}):t._e(),t._v(" "),"water-collector"===e.id?n("water-collector",{attrs:{item:e}}):t._e()],1)}))])},staticRenderFns:[]};e.a=i},"UvP+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=d(n("Dd8w")),a=n("NYxO"),s=d(n("Z/1V")),r=d(n("Hvfw")),o=d(n("dY3R")),u=d(n("O4Ep")),c=d(n("rA5C")),l=d(n("JATg"));function d(t){return t&&t.__esModule?t:{default:t}}e.default={name:"mainElement",data:function(){return{navMenu:["Actions","Inventory","Crafting"],isMobile:!0}},components:{Actions:u.default,Crafting:c.default,Inventory:l.default,DaysCounter:s.default,MobileMenu:r.default,Stats:o.default},mounted:function(){var t=document.querySelector("body").getBoundingClientRect();this.isMobile=t.width<=680},computed:(0,i.default)({},(0,a.mapState)(["disabled","gameOver","daysSurvived","currentPage"]),{mobileHome:function(){return!1===this.isMobile||this.isMobile&&"home"===this.currentPage},mobileInventory:function(){return!1===this.isMobile||this.isMobile&&"inventory"===this.currentPage},mobileCrafting:function(){return!1===this.isMobile||this.isMobile&&"crafting"===this.currentPage}}),methods:{newGame:function(){window.location.reload()}}}},VZrM:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("UvP+"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("HSKk");var o=function(t){n("4/1n")},u=n("VU/8")(a.a,r.a,!1,o,null,null);e.default=u.exports},WkoT:function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("article",{staticClass:"Item"},[n("h4",[t._v("Water collector")]),t._v(" "),t.hasWaterCollector?t.isCollecting?[t._v("\n    Uses remaining: "+t._s(t.usesRemaining-1)),n("br"),t._v(" "),n("span",{staticClass:"progress"},[t._v("\n      Collecting water\n    ")])]:[t._v("\n    Uses remaining: "+t._s(t.usesRemaining)),n("br"),t._v(" "),n("button",{staticClass:"Btn",attrs:{disabled:t.disabled},on:{click:t.drinkWater}},[t._v("\n      Drink water\n    ")])]:[n("p",[t._v("\n      Items needed:\n      "+t._s(t.item.items.join(", "))+"\n      "),n("br"),t._v("\n      Build a water collector to get rain water\n    ")]),t._v(" "),n("div",{staticClass:"Item__actions"},[n("button",{staticClass:"Btn",attrs:{type:"button",disabled:!t.item.isCraftable||t.disabled},on:{click:function(e){t.buildWaterCollector()}}},[t._v("\n        Craft\n      ")])])]],2)},staticRenderFns:[]};e.a=i},Woqv:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n("Dd8w"),s=(i=a)&&i.__esModule?i:{default:i},r=n("NYxO");e.default={data:function(){return{decreaseLoop:null,icons:{health:"❤️",water:"💧",food:"🍗",sleep:"⚡"}}},mounted:function(){this.startGameLoop()},beforeDestroy:function(){this.resetGameLoop()},computed:(0,s.default)({},(0,r.mapState)(["stats","gameOver","isSick"]),{isActive:function(){return!1===this.gameOver}}),methods:(0,s.default)({},(0,r.mapMutations)(["decrease"]),{startGameLoop:function(){this.decreaseStats()},decreaseStats:function(){var t=this;this.loop=setTimeout(function(){t.isActive&&(t.decrease({stat:"water",amount:3}),t.decrease({stat:"food",amount:1}),t.decrease({stat:"sleep",amount:2}),t.isSick&&t.decrease({stat:"health",amount:2}),t.decreaseStats())},12e3)},resetGameLoop:function(){clearTimeout(this.decreaseLoop),this.decreaseLoop=null}})}},"Z/1V":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("vO53"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("sm8E"),o=n("VU/8")(a.a,r.a,!1,null,null,null);e.default=o.exports},cvFk:function(t,e){},d4kc:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(n("Dd8w")),a=n("NYxO"),s=r(n("/o5o"));function r(t){return t&&t.__esModule?t:{default:t}}e.default={name:"actions",data:function(){return{lastActionResult:"",currentAction:null,inProgress:!1,actions:[{name:"Sleep",description:"Rest to replenish your energy",stats:"+35 energy",method:this.sleep},{name:"Hunt",description:"Hunt for food and fur to craft equipment",stats:"-10 energy, -10 water. -6 food",method:this.goHunt},{name:"Scavenge",description:"Find useful items to survive",stats:"-5 energy, -5 water. -3 food",method:this.goScavenge}]}},computed:(0,i.default)({},(0,a.mapState)(["disabled","gameOver","inventory"]),(0,a.mapGetters)(["isInventoryFull","slotsInInventoryLeft"])),methods:(0,i.default)({},(0,a.mapActions)(["increaseAsync","hunt","scavenge"]),{handleFullInventory:function(){alert("Your inventory is full. Remove at least one item to proceed.")},sleep:function(){var t=this;this.startProgress("Sleeping"),this.increaseAsync({stat:"sleep",amount:35,time:5e3}).then(function(){t.handleResult()}).catch(function(){console.error("oops")})},goHunt:function(){var t=this;this.isInventoryFull?this.handleFullInventory():this.inventory.filter(function(t){return"weapon"===t.type}).length>0?(this.startProgress("Hunting"),this.lastActionResult="",this.hunt({time:8e3}).then(function(e){t.handleResult(e)})):alert("you need to craft a weapon first")},goScavenge:function(){var t=this;this.isInventoryFull?this.handleFullInventory():(this.startProgress("Scavenging"),this.lastActionResult="",this.scavenge({time:3e3}).then(function(e){t.handleResult(e)}))},handleResult:function(t){if(this.endProgress(),t){var e=[];t.forEach(function(t){e.push(t.name)}),this.$refs.modalResult.open(),this.lastActionResult=e.join(", ")}},startProgress:function(t){this.currentAction=t,this.inProgress=!0},endProgress:function(){this.currentAction=null,this.inProgress=!1}}),components:{modal:s.default}}},dY3R:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Woqv"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("DGml");var o=function(t){n("wifN")},u=n("VU/8")(a.a,r.a,!1,o,null,null);e.default=u.exports},ftWB:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{id:"meat-cooked",type:"food",name:"Cooked meat",items:["meat"],value:20,risk:0},{id:"water-clean",type:"drink",name:"Clean water",items:["water-dirty"],value:20,risk:0}]},"gSR+":function(t,e,n){"use strict";var i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"List"},this._l(this.list,function(t){return e("li",[e("consume",{attrs:{item:t}})],1)}))},staticRenderFns:[]};e.a=i},gmAF:function(t,e){},kHbX:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{type:"food",id:"berries",name:"Berries",value:5,risk:0,action:"scavenge"},{type:"food",id:"meat",name:"Raw meat",value:20,risk:6,action:"hunt"},{type:"drink",id:"water-dirty",name:"Dirty Water",value:20,risk:6,action:"scavenge"},{type:"junk",id:"salt",name:"Salt",action:"scavenge"},{type:"junk",id:"string",name:"String",action:"scavenge"},{type:"junk",id:"wood",name:"Wood",action:"scavenge"},{type:"junk",id:"plastic",name:"Plastic",action:"scavenge"},{type:"junk",id:"bottle",name:"Empty bottle",action:"scavenge"},{type:"junk",id:"flint",name:"Flint",action:"scavenge"},{type:"junk",id:"medicinal-herbs",name:"Medicinal herbs",action:"scavenge"}]},lXtq:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n("Dd8w"),s=(i=a)&&i.__esModule?i:{default:i},r=n("NYxO");e.default={props:{item:{type:Object,required:!0}},computed:(0,s.default)({},(0,r.mapState)(["hasFire","disabled"])),methods:(0,s.default)({},(0,r.mapMutations)(["removeInventory","enableFire"]),{startFire:function(t){var e=this;this.item.items.forEach(function(t){e.removeInventory({item:t})}),this.enableFire()}})}},lwq5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getters=e.state=void 0;var i=l(n("Dd8w")),a=l(n("Gu7T")),s=n("K30H"),r=l(n("kHbX")),o=l(n("tG6q")),u=l(n("ftWB")),c=l(n("0xDb"));function l(t){return t&&t.__esModule?t:{default:t}}var d={gameOver:!1,disabled:!1,stats:{health:s.MAX,water:s.MAX,food:s.MAX,sleep:s.MAX},existingItems:r.default,inventory:c.default.randomizeItems(r.default,2),hasFire:!1,isSick:!1,daysSurvived:0,currentPage:"home"},f={isInventoryFull:function(){return d.inventory.length===s.MAXINVENTORY},slotsInInventoryLeft:function(){return s.MAXINVENTORY-d.inventory.length},craftableItems:function(){return u.default.forEach(function(t){t.condition="fire"}),[].concat((0,a.default)(o.default),(0,a.default)(u.default)).map(function(t){var e=(0,i.default)({},t),n=[],a=d.inventory.map(function(t){return t.id});return e.items.forEach(function(t){var i=a.indexOf(t);-1!==i?(a.splice(i,1),n.push(t)):e.isCraftable=!1}),n.length===e.items.length&&(e.isCraftable=!0,"fire"!==e.condition||d.hasFire||(e.isCraftable=!1)),e})}};e.state=d,e.getters=f},m8Ut:function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("article",{staticClass:"Item"},[n("h4",[t._v("Fire")]),t._v(" "),t.hasFire?n("p",[t._v("\n    Fire is burning\n  ")]):[n("p",[t._v("\n      Items needed:\n      "+t._s(t.item.items.join(", "))+"\n      "),n("br"),t._v("\n      Start a fire to cook items\n    ")]),t._v(" "),n("button",{staticClass:"Btn",attrs:{type:"button",disabled:!t.item.isCraftable||t.disabled},on:{click:function(e){t.startFire(t.item)}}},[t._v("\n      Craft\n    ")])]],2)},staticRenderFns:[]};e.a=i},mUbh:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(n("//Fk")),a=s(n("0xDb"));function s(t){return t&&t.__esModule?t:{default:t}}e.default={decreaseAsync:function(t,e){var n=t.state,a=t.commit,s=e.stat,r=e.amount,o=e.time;return new i.default(function(t,e){a("disable"),n.gameOver?e(new Error("game is over")):setTimeout(function(){a("enable"),a("decrease",{stat:s,amount:r}),t()},o)})},increaseAsync:function(t,e){var n=t.state,a=t.commit,s=e.stat,r=e.amount,o=e.time;return new i.default(function(t,e){a("disable"),n.gameOver?e(new Error("game is over")):setTimeout(function(){a("enable"),a("increase",{stat:s,amount:r}),t()},o)})},scavenge:function(t,e){var n=t.state,s=t.getters,r=t.commit,o=e.time;return new i.default(function(t,e){r("disable"),n.gameOver?e(new Error("game is over")):setTimeout(function(){var e=n.existingItems.filter(function(t){return"scavenge"===t.action}),i=s.slotsInInventoryLeft>3?3:s.slotsInInventoryLeft,o=a.default.randomizeItems(e,i);o.forEach(function(t){r("addInventory",{item:t})}),r("decrease",{stat:"sleep",amount:5}),r("decrease",{stat:"water",amount:5}),r("decrease",{stat:"sleep",amount:3}),r("enable"),t(o)},o)})},hunt:function(t,e){var n=t.state,s=t.commit,r=e.time;return new i.default(function(t,e){s("disable"),n.gameOver?e(new Error("game is over")):setTimeout(function(){var e=n.existingItems.filter(function(t){return"hunt"===t.action}),i=a.default.randomizeItems(e,1);i.forEach(function(t){s("addInventory",{item:t})}),s("decrease",{stat:"sleep",amount:10}),s("decrease",{stat:"water",amount:10}),s("decrease",{stat:"sleep",amount:6}),s("enable"),t(i)},r)})}}},rA5C:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("KrHW"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("0tlR"),o=n("VU/8")(a.a,r.a,!1,null,null,null);e.default=o.exports},sm8E:function(t,e,n){"use strict";var i={render:function(){var t=this.$createElement;return(this._self._c||t)("section",[this._v("\n  Days survived: "+this._s(this.daysSurvived)+"\n")])},staticRenderFns:[]};e.a=i},"t/14":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("OdHo"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("HbTY"),o=n("VU/8")(a.a,r.a,!1,null,null,null);e.default=o.exports},tG6q:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=[{id:"fire",type:"camp",name:"Fire",items:["wood","flint"]},{id:"rope",type:"tool",name:"Rope",items:["string","string"]},{id:"bow",type:"weapon",name:"Bow",items:["string","wood"]},{id:"water-collector",type:"camp",name:"Water collector",items:["plastic","rope","bottle"]},{id:"jerky",type:"food",name:"Jerky",items:["meat","salt"],value:20,risk:0},{id:"medicinal-tea",type:"drink",name:"Medicinal tea",items:["water-clean","medicinal-herbs"],value:20,risk:0}]},tcnj:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("0pd7"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("gSR+"),o=n("VU/8")(a.a,r.a,!1,null,null,null);e.default=o.exports},thws:function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("article",{staticClass:"Item"},[n("h4",[t._v(t._s(t.item.name))]),t._v(" "),n("p",[t._v(t._s(t.item.description))]),t._v(" "),n("div",{staticClass:"Item__actions Item__actions--multi"},t._l(t.actions,function(e){return n("button",{staticClass:"Btn",attrs:{disabled:t.disabled},on:{click:function(n){t.doAction(e)}}},[t._v("\n      "+t._s(e)+"\n    ")])}))])},staticRenderFns:[]};e.a=i},ukYY:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("K30H");e.default={changePage:function(t,e){var n=e.newPage;t.currentPage=n},increaseDayCount:function(t){t.daysSurvived++},decrease:function(t,e){var n=e.stat,i=e.amount;t.stats[n]=t.stats[n]-i,t.stats[n]<=0&&(t.gameOver=!0,t.disabled=!0)},increase:function(t,e){var n=e.stat,a=e.amount;t.stats[n]=t.stats[n]+a,t.stats[n]>i.MAX&&(t.stats[n]=i.MAX)},addInventory:function(t,e){var n=e.item;t.inventory.length<i.MAXINVENTORY&&t.inventory.push(n)},removeInventory:function(t,e){var n,i=e.item,a=(n=i,t.inventory.findIndex(function(t){return t.id===n}));-1!==a&&t.inventory.splice(a,1)},disable:function(t){t.disabled=!0},enable:function(t){t.disabled=!1},enableFire:function(t){t.hasFire=!0},getSick:function(t){t.isSick=!0},getCured:function(t){t.isSick=!1,t.stats.health=i.MAX}}},vO53:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n("Dd8w"),s=(i=a)&&i.__esModule?i:{default:i},r=n("NYxO");e.default={data:function(){return{daysLoop:null}},mounted:function(){this.startGameLoop()},beforeDestroy:function(){this.resetGameLoop()},computed:(0,s.default)({},(0,r.mapState)(["gameOver","daysSurvived"]),{isActive:function(){return!1===this.gameOver}}),methods:(0,s.default)({},(0,r.mapMutations)(["increaseDayCount"]),{startGameLoop:function(){this.startDayTimer()},startDayTimer:function(){var t=this;this.daysLoop=setTimeout(function(){t.isActive&&(t.increaseDayCount(),t.startDayTimer())},6e4)},resetGameLoop:function(){clearTimeout(this.daysLoop),this.daysLoop=null}})}},wifN:function(t,e){},xJD8:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n("VZrM"),s=(i=a)&&i.__esModule?i:{default:i};e.default={data:function(){return{hasStarted:!1}},components:{MainComponent:s.default},methods:{start:function(){this.hasStarted=!0}}}},zU9e:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("/QBt"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);var r=n("thws");var o=function(t){n("TjtX")},u=n("VU/8")(a.a,r.a,!1,o,null,null);e.default=u.exports}},["NHnr"]);
//# sourceMappingURL=app.0aba98e0dabbfaaeba5c.js.map