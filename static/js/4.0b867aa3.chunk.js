(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{164:function(e,t,a){},291:function(e,t,a){"use strict";a.r(t);var n=a(284),r=a(0),l=a.n(r),c=a(1),s=a(163),o=a(295),m=a(298),i=a(299),u=a(292),d=a(20);a(164);t.default=function(e){var t=Object(c.f)(),a=t.name,h=t.lat,p=t.lon,w=Object(r.useState)(!1),E=Object(n.a)(w,2),f=E[0],v=E[1],y=Object(r.useState)({lat:0,lon:0,timezone:0,timezone_offset:0,current:{dt:0,sunrise:0,sunset:0,temp:0,feels_like:0,pressure:0,humidity:0,dew_point:0,uvi:0,clouds:0,visibility:0,wind_speed:0,wind_deg:0,weather:[{id:0,main:"",description:"",icon:""}]},hourly:[],daily:[]}),b=Object(n.a)(y,2),N=b[0],g=b[1],M=Object(r.useState)(!0),k=Object(n.a)(M,2),j=k[0],_=k[1],x=Object(r.useRef)(null);return Object(r.useEffect)(function(){Object(d.c)(),fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(h,"&lon=").concat(p,"&exclude=minutely,alerts&appid=dd7b078955b9a8f743b67fdd8db9a012&units=metric")).then(function(e){return e.json()}).then(function(t){if(t.cod)v(!0);else{v(!1),t.hourly=t.hourly.filter(function(e,t,a){return t%2===0}).slice(0,7),g(t),t.current.rain&&Object(d.d)(),t.current.snow&&Object(d.e)();var a=["dt","sunrise","sunset"].map(function(e){return s.DateTime.fromJSDate(new Date(1e3*t.current[e])).setZone(t.timezone).hour}),r=Object(n.a)(a,3),l=r[0],c=r[1],o=r[2];e.setTimeAndRain(l,c,o,!!t.current.rain)}x.current.clientHeight<=window.innerHeight&&_(!1)}).catch(function(e){return console.log(e)})},[e.searchValue,h,p]),f?l.a.createElement("div",{className:"screen"},l.a.createElement("h2",null,"No data found")):l.a.createElement("div",{className:"screen weather-screen",ref:x},l.a.createElement("section",{className:"weather-summary back-row-toggle splat-toggle"},l.a.createElement("div",{className:"rain front-row",id:"front-row"}),l.a.createElement("div",{className:"rain back-row",id:"back-row"}),l.a.createElement("div",{className:"snowflakes"}),l.a.createElement("h1",null,a.toUpperCase()),l.a.createElement("h3",null,s.DateTime.fromJSDate(new Date(1e3*N.current.dt)).setZone(N.timezone).toFormat("cccc, HH:mm")),l.a.createElement("div",{className:"temp-range"},l.a.createElement("h1",null,N.daily[0]?Math.round(N.daily[0].temp.min):Math.round(N.current.temp),"\xb0"),l.a.createElement("p",null,"Low")),l.a.createElement("div",{className:"current-temp"},Math.round(N.current.temp),"\xb0C"),l.a.createElement("div",{className:"temp-range"},l.a.createElement("h1",null,N.daily[0]?Math.round(N.daily[0].temp.max):Math.round(N.current.temp),"\xb0"),l.a.createElement("p",null,"High")),l.a.createElement("h3",{className:"weather-status"},Object(d.a)(N.current.weather[0].description))),l.a.createElement("section",{className:"weather-details "+(j?"":"show-more")},l.a.createElement("div",{className:"wavy-border-container"},l.a.createElement("svg",{className:"wavy-border",viewBox:"0 0 500 150",preserveAspectRatio:"xMinYMin meet",style:{zIndex:-2}},l.a.createElement("path",{d:"M0, 50 C150, 120 350,  0 500, 70 L500, 250 L0, 250 Z",style:{stroke:"none",fill:"rgba(255, 255, 255, 0.5)"}}))),l.a.createElement("div",{className:"wavy-border-container"},l.a.createElement("svg",{className:"wavy-border",viewBox:"0 0 500 150",preserveAspectRatio:"xMinYMin meet",style:{zIndex:-1}},l.a.createElement("path",{d:"M0, 30 C300, 0 400,   200 500, 20 L500, 250 L0, 250 Z",style:{stroke:"none",fill:"rgba(255, 255, 255, 0.5)"}}))),l.a.createElement("div",{className:"wavy-border-container"},l.a.createElement("svg",{className:"wavy-border",viewBox:"0 0 500 150",preserveAspectRatio:"xMinYMin meet",style:{zIndex:-3}},l.a.createElement("path",{d:"M0, 50 C150, 200 350,  0 500, 50 L500, 250 L0, 250 Z",style:{stroke:"none",fill:"rgba(255, 255, 255, 0.5)"}}))),l.a.createElement("div",{className:"show-more-btn "+(j?"":"hidden"),onClick:function(){document.getElementsByClassName("show-more-btn")[0].classList.toggle("show-more"),document.getElementsByClassName("weather-summary")[0].classList.toggle("show-more"),document.getElementsByClassName("weather-details")[0].classList.toggle("show-more")}}),l.a.createElement("section",{className:"weather-current"},l.a.createElement("button",{type:"button",className:"icon-btn save-location-button hidden",onClick:function(e){return t=N.lat+N.lon,e.preventDefault(),void console.log("Update favorite: "+t);var t}},e.favorited?l.a.createElement("i",{className:"material-icons"},"favorite"):l.a.createElement("i",{className:"material-icons"},"favorite_border")),l.a.createElement("div",{className:"weather-stat"},l.a.createElement("span",null,"Humidity:")," ",N.current.humidity||0," %"),l.a.createElement("div",{className:"weather-stat"},l.a.createElement("span",null,"Pressure:")," ",N.current.pressure||0," hPa"),l.a.createElement("div",{className:"weather-stat"},l.a.createElement("span",null,"Wind:")," ",N.current.wind_speed||0," m/s"),l.a.createElement("div",{className:"weather-stat"},l.a.createElement("span",null,"Cloud:")," ",N.current.clouds||0," %"),l.a.createElement("div",{className:"weather-stat"},l.a.createElement("span",null,"Rain:")," ",N.current.rain?N.current.rain["1h"]:0," mm"),l.a.createElement("div",{className:"weather-stat"},l.a.createElement("span",null,"Snow:")," ",N.current.snow?N.current.snow["1h"]:0," mm")),N.hourly.length&&l.a.createElement("section",{className:"hourly-forecast"},l.a.createElement("h3",{className:"section_label"},"Forecast"),l.a.createElement("div",{className:"scroll-container"},l.a.createElement(o.a,{domainPadding:{y:10},padding:{top:40,right:20,bottom:40,left:20},containerComponent:l.a.createElement(m.a,{style:{pointerEvents:"auto",userSelect:"auto",touchAction:"auto"}}),height:150},l.a.createElement(i.a,null),l.a.createElement(u.a,{style:{data:{stroke:"#c43a31"}},interpolation:"natural",data:N.hourly.map(function(e){var t=s.DateTime.fromJSDate(new Date(1e3*e.dt)).setZone(N.timezone).hour;return{x:t>12?"".concat(t-12,"pm"):"".concat(t,"am"),y:Math.round(e.temp)}}),labels:function(e){return e.datum.y+"\xb0"}})))),N.daily.length&&l.a.createElement("section",{className:"daily-forecast"},l.a.createElement("h3",{className:"section_label"},"This week"),l.a.createElement("div",{className:"scroll-container"},l.a.createElement("ul",{className:"daily-forecast__list"},N.daily.map(function(e){return l.a.createElement("li",{className:"daily-forecast__item",key:e.dt},l.a.createElement("p",null,s.DateTime.fromJSDate(new Date(1e3*e.dt)).setZone(N.timezone).weekdayShort),l.a.createElement("img",{src:"http://openweathermap.org/img/wn/"+e.weather[0].icon+"@2x.png",alt:"",className:"weather-icon daily-forecast__icon"}),l.a.createElement("p",null,Math.round(e.temp.min),"\xb0 - ",Math.round(e.temp.max),"\xb0"))}))))))}}}]);
//# sourceMappingURL=4.0b867aa3.chunk.js.map