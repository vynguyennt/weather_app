(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{295:function(e,t,a){"use strict";a.r(t);var n=a(10),r=a(11),c=a(14),s=a(12),o=a(13),i=a(0),h=a.n(i),l=a(1),u=a(22),p=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(c.a)(this,Object(s.a)(t).call(this,e))).handleSearch=function(e,t,n){e=e.trim(),a.props.setSearchValue(e),e&&e.length>2&&(a.props.setLocation(t,n),a.setState({redirectToResult:!0}))},a.state={redirectToResult:!1},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.props.resetBackground()}},{key:"render",value:function(){return this.state.redirectToResult?h.a.createElement(l.a,{to:"/weather/".concat(this.props.searchValue,"/").concat(this.props.lat,"/").concat(this.props.lon)}):h.a.createElement("div",{className:"screen"},h.a.createElement(u.a,{showTitle:!0,handleSearch:this.handleSearch,searchValue:this.props.searchValue||""}))}}]),t}(i.Component);t.default=p}}]);
//# sourceMappingURL=7.5a20f9d9.chunk.js.map