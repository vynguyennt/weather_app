(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{288:function(e,t,a){},289:function(e,t,a){},301:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.r(t);var r=a(109),o=a(0),c=a.n(o),i=a(6),l=a(112),s=a(19),u=a(9);a(288);var m=function(e){var t=Object(o.useState)("start"),a=Object(r.a)(t,2),n=a[0],m=a[1];return Object(o.useEffect)(function(){if(!e.loading){var t="UTC"+(e.data.timezone/3600>=0?"+":"")+Math.floor(e.data.timezone/3600),a=["sunrise","sunset"].map(function(a){return l.DateTime.fromJSDate(new Date(1e3*e.data.sys[a])).setZone(t).hour}),n=Object(r.a)(a,2),o=n[0],c=n[1],i=l.DateTime.fromJSDate(new Date(1e3*e.data.dt)).setZone(t).hour;m(o-i===1?"dawn":i===o?"sunrise":i>o&&i<=12?"morning":i>12&&i<c?"afternoon":i===c?"sunset":c-i===1?"dusk":"night")}},[e.data,e.loading]),c.a.createElement(i.b,{to:"/weather/".concat(e.data.name,"/").concat(e.data.lat,"/").concat(e.data.lon),className:"weather-widget bg-"+n+(Object(u.c)(n)?" bg-dark":"")},e.loading?c.a.createElement(s.b,null):c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"weather-widget__status"},c.a.createElement("img",{src:"https://openweathermap.org/img/wn/"+e.data.weather[0].icon+"@2x.png",alt:"",className:"weather-icon weather-status__icon"})),c.a.createElement("button",{type:"button",className:"icon-btn save-location-btn weather-widget__btn",onClick:function(t){return function(e,t,a){e.preventDefault();for(var n=JSON.parse(window.localStorage.getItem("favoriteLocations"))||[],r=-1,o=0;o<n.length;o++)if(n[o].lat==t&&n[o].lon==a){r=o;break}r>=0&&(n.splice(r,1),window.localStorage.setItem("favoriteLocations",JSON.stringify(n))),window.location.reload()}(t,e.data.lat,e.data.lon)}},c.a.createElement("i",{className:"material-icons"},"favorite")),c.a.createElement("div",{className:"weather-widget__location"},c.a.createElement("h3",{className:"weather-widget__city"},e.data.name),c.a.createElement("small",{className:"weather-widget__country"},e.data.sys.country)),c.a.createElement("h1",{className:"weather-widget__temperature"},Math.round(e.data.main.temp||0),"\xb0"),["M620, 0 C750, 150 550, 250 780, 460 L0, 460 L0, 0 Z","M650, 0 C550, 200 800, 250 750, 420 L0, 460 L0, 0 Z","M700, 0 C550, 210 800, 200 700, 420 L0, 460 L0, 0 Z"].map(function(e,t){return c.a.createElement("div",{className:"vertical-wavy-border-container",key:t},c.a.createElement("svg",{className:"vertical-wavy-border",viewBox:"0 0 800 450",preserveAspectRatio:"xMinYMin meet",style:{zIndex:-1}},c.a.createElement("path",{d:e,style:{stroke:"none",fill:"rgba(255, 255, 255, 0.5)"}})))})))},d=a(20);a(289);t.default=function(e){var t=Object(d.b)(),a=JSON.parse(window.localStorage.getItem("favoriteLocations"))||[],i=Object(o.useState)(a),l=Object(r.a)(i,2),s=l[0],u=l[1];return Object(o.useEffect)(function(){var r=!1;return e.resetBackground(),a.length&&a.map(function(e){return fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(e.lat,"&lon=").concat(e.lon,"&appid=").concat(t,"&units=metric")).then(function(e){return e.json()}).then(function(t){r||u(function(a){var r=a.concat(),o=r.findIndex(function(t){return t.lat===e.lat&&t.lon===e.lon});return r[o]=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),r.forEach(function(t){n(e,t,a[t])})}return e}({},t,r[o]),r})}).catch(function(e){return console.log(e)})}),function(){r=!0}},[]),c.a.createElement("div",{className:"screen favorite-screen"},c.a.createElement("div",{className:"widgets-list"},s.length?s.map(function(e,t){return c.a.createElement(m,{loading:!e.weather,data:e,key:e.id||t})}):c.a.createElement("span",{className:"info-msg"},c.a.createElement("i",null,"No locations saved"))))}}}]);
//# sourceMappingURL=5.3d64b755.chunk.js.map