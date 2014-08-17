(function(){"use strict";function t(t,e,a){function o(t,e,r){var s,c,p,u,h,g,d,w;if(null==t||null==e)return t===e;if(t.__placeholder__||e.__placeholder__)return!0;if(t===e)return 0!==t||1/t==1/e;if(s=n.call(t),n.call(e)!=s)return!1;switch(s){case"[object String]":return t==String(e);case"[object Number]":return t!=+t?e!=+e:0==t?1/t==1/e:t==+e;case"[object Date]":case"[object Boolean]":return+t==+e;case"[object RegExp]":return t.source==e.source&&t.global==e.global&&t.multiline==e.multiline&&t.ignoreCase==e.ignoreCase}if("object"!=typeof t||"object"!=typeof e)return!1;for(c=r.length;c--;)if(r[c]==t)return!0;if(r.push(t),p=0,u=!0,"[object Array]"==s){if(h=t.length,g=e.length,l){switch(a){case"===":u=h===g;break;case"<==":u=g>=h;break;case"<<=":u=g>h}p=h,l=!1}else u=h===g,p=h;if(u)for(;p--&&(u=p in t==p in e&&o(t[p],e[p],r)););}else{if("constructor"in t!="constructor"in e||t.constructor!=e.constructor)return!1;for(d in t)if(i(t,d)&&(p++,!(u=i(e,d)&&o(t[d],e[d],r))))break;if(u){w=0;for(d in e)i(e,d)&&++w;l?u="<<="===a?w>p:"<=="===a?w>=p:p===w:(l=!1,u=p===w)}}return r.pop(),u}var n={}.toString,r={}.hasOwnProperty,i=function(t,e){return r.call(t,e)},l=!0;return o(t,e,[])}YASR.plugins.gchart=function(e,a,o){var n,r,i,l;return n=e.container.closest("[id]").attr("id"),null==e.options.gchart&&(e.options.gchart={}),null==e.options.gchart.motionChartState&&(e.options.gchart.motionChartState=localStorage.getItem(n+"_motionChartState")),null==e.options.gchart.chartConfig&&(e.options.gchart.chartConfig=localStorage.getItem(n+"_chartConfig")),r=function(t){if(null==t.type||"typed-literal"!==t.type&&"literal"!==t.type)return"string";switch(t.datatype){case"http://www.w3.org/2001/XMLSchema#float":case"http://www.w3.org/2001/XMLSchema#decimal":case"http://www.w3.org/2001/XMLSchema#int":case"http://www.w3.org/2001/XMLSchema#integer":case"http://www.w3.org/2001/XMLSchema#long":case"http://www.w3.org/2001/XMLSchema#gYearMonth":case"http://www.w3.org/2001/XMLSchema#gYear":case"http://www.w3.org/2001/XMLSchema#gMonthDay":case"http://www.w3.org/2001/XMLSchema#gDay":case"http://www.w3.org/2001/XMLSchema#gMonth":return"number";case"http://www.w3.org/2001/XMLSchema#date":return"date";case"http://www.w3.org/2001/XMLSchema#dateTime":return"datetime";case"http://www.w3.org/2001/XMLSchema#time":return"timeofday";default:return"string"}},i=function(t){if(null==t)return null;if(null==t.type||"typed-literal"!==t.type&&"literal"!==t.type)return t.value;switch(t.datatype){case"http://www.w3.org/2001/XMLSchema#float":case"http://www.w3.org/2001/XMLSchema#decimal":case"http://www.w3.org/2001/XMLSchema#int":case"http://www.w3.org/2001/XMLSchema#integer":case"http://www.w3.org/2001/XMLSchema#long":case"http://www.w3.org/2001/XMLSchema#gYearMonth":case"http://www.w3.org/2001/XMLSchema#gYear":case"http://www.w3.org/2001/XMLSchema#gMonthDay":case"http://www.w3.org/2001/XMLSchema#gDay":case"http://www.w3.org/2001/XMLSchema#gMonth":return Number(t.value);case"http://www.w3.org/2001/XMLSchema#date":case"http://www.w3.org/2001/XMLSchema#dateTime":case"http://www.w3.org/2001/XMLSchema#time":return new Date(t.value);default:return t.value}},l=new google.visualization.ChartEditor,google.visualization.events.addListener(l,"ok",function(){var a,o;a=l.getChartWrapper(),t(a.getChartType,"MotionChart","===")||(e.options.gchart.motionChartState=a.n,localStorage.setItem(n+"_motionChartState",e.options.gchart.motionChartState),a.setOption("state",e.options.gchart.motionChartState),a.setOption("width",800),a.setOption("height",500),google.visualization.events.addListener(a,"ready",function(){var t;t=a.getChart(),google.visualization.events.addListener(t,"statechange",function(){e.options.gchart.motionChartState=t.getState(),localStorage.setItem(n+"_motionChartState",e.options.gchart.motionChartState)})})),o=a.getDataTable(),a.setDataTable(null),e.options.gchart.chartConfig=a.toJSON(),localStorage.setItem(n+"_chartConfig",e.options.gchart.chartConfig),a.setDataTable(o),a.draw()}),{options:o,parent:a,yasr:e,name:"Google Chart",hideFromSelection:!1,priority:5,editor:l,canHandleResults:function(t){var e,a;return(null!=(e=t.results)&&null!=(a=e.getVariables())?a.length:void 0)>0},draw:function(){var t,o,s,c,p,u,h,g,d,w,m,f,y;for(a.html('<button id="typeeditor" class="yasr_btn" style="float:right;position:relative; top:-30px;margin-bottom:-30px">Type</button><div id="chart"></div>'),$("#typeeditor").click(function(){l.openDialog(y)}),t=new google.visualization.DataTable,o=e.results.getAsJson(),s=0,p=(c=o.head.vars).length;p>s;++s)u=c[s],h=r(o.results.bindings[0][u]),t.addColumn(h,u);for(s=0,p=(c=o.results.bindings).length;p>s;++s){for(g=c[s],d=[],w=0,f=(m=o.head.vars).length;f>w;++w)u=m[w],d.push(i(g[u]));t.addRow(d)}e.options.gchart.chartConfig?(y=new google.visualization.ChartWrapper(e.options.gchart.chartConfig),"MotionChart"===y.getChartType()&&null!=e.options.gchart.motionChartState&&(y.setOption("state",e.options.gchart.motionChartState),google.visualization.events.addListener(y,"ready",function(){var t;t=y.getChart(),google.visualization.events.addListener(t,"statechange",function(){e.options.gchart.motionChartState=t.getState(),localStorage.setItem(n+"_motionChartState",e.options.gchart.motionChartState)})})),y.setDataTable(t)):y=new google.visualization.ChartWrapper({chartType:"Table",dataTable:t,options:{title:"VISUalization"},containerId:"chart"}),y.draw()}}}}).call(this),function(){YASR.plugins.kml=function(t,e){var a;return a=t.container.closest("[id]").attr("id"),{parent:e,yasr:t,name:"KML",hideFromSelection:!1,priority:1,canHandleResults:function(){return!0},draw:function(){var a,o,n;a=t.yasqe.getOption("sparql").endpoint,o=t.yasqe.getValue(),n="http://demo.seco.tkk.fi/sparql2kml/?endpoint="+encodeURIComponent(a)+"&query="+encodeURIComponent(o),e.html('<button id="kml-copy" class="yasr_btn" style="float:right;position:relative; top:-30px;margin-bottom:-30px">Copy</button><div>URL for KML file: <a href="" id="kml-url"></a> (<a id="kml-e4d" href="" target="_blank">in Europeana 4D</a>)</div>'),$("#kml-url").text(n).attr("href",n),$("#kml-e4d").attr("href","http://www.informatik.uni-leipzig.de:8080/e4D/?source1=1&kml1="+encodeURIComponent(n)),$("#kml-copy").click(function(){window.prompt("Copy to clipboard with Ctrl/Cmd-C",n)}),$.ajax("https://www.googleapis.com/urlshortener/v1/url",{data:JSON.stringify({key:"AIzaSyDtS96pmj2IeRdw81zobVDpCfs0rFphHvc",longUrl:n}),contentType:"application/json",type:"POST"}).success(function(t){n=t.id,$("#kml-url").text(n).attr("href",n),$("#kml-e4d").attr("href","http://www.informatik.uni-leipzig.de:8080/e4D/?source1=1&kml1="+encodeURIComponent(n))})}}}}.call(this),function(){"use strict";angular.module("app",["ui.router","ngStorage"]).config(["$stateProvider","$urlRouterProvider",function(t,e){return t.state("home",{url:"/?sparqlEndpoint&query&outputType&chartConfig&motionChartState",templateUrl:"partials/main.html",controller:"MainCtrl"}),e.otherwise("/")}])}.call(this),function(){"use strict";angular.module("app").controller("MainCtrl",["$window","$http","$scope","$localStorage","$state","$stateParams",function(t,e,a,o,n,r){var i,l,s;return null!=r.sparqlEndpoint&&(o.sparqlEndpoint=r.sparqlEndpoint),null!=o.sparqlEndpoint&&(a.sparqlEndpoint=o.sparqlEndpoint),a.shareLink=function(){var o;o=n.href(".",{sparqlEndpoint:a.sparqlEndpoint,query:i.getValue(),outputType:l.options.output,chartConfig:l.options.gchart.chartConfig,motionChartState:l.options.gchart.motionChartState},{absolute:!0}),a.shareLinkLoading=!0,e.post("https://www.googleapis.com/urlshortener/v1/url",{key:"AIzaSyDtS96pmj2IeRdw81zobVDpCfs0rFphHvc",longUrl:o}).then(function(e){a.shareLinkLoading=!1,t.prompt("Copy to clipboard with Ctrl/Cmd-C",e.data.id)},function(){a.shareLinkLoading=!1,t.prompt("Copy to clipboard with Ctrl/Cmd-C",o)})},i=YASQE(document.getElementById("yasqe"),{createShareLink:!1,sparql:{showQueryButton:!0,endpoint:a.sparqlEndpoint,query:""}}),null!=r.query&&i.setValue(r.query),a.sparqlEndpointInputValid=!0,a.$watch("sparqlEndpoint",function(t,n){null!=t&&e({method:"GET",url:t,params:{query:"ASK {}"},headers:{Accept:"application/sparql-results+json"}}).success(function(t){a.sparqlEndpointInputValid=null!=t.boolean}).error(function(){a.sparqlEndpointInputValid=!1}),t!==n&&(o.sparqlEndpoint=t,i.getOption("sparql").endpoint=t)}),l=YASR(document.getElementById("yasr"),{persistency:{outputSelector:r.outputType?!1:"visu",results:!1},getUsedPrefixes:i.getPrefixesFromQuery,output:null!=(s=r.outputType)?s:void 0,gchart:{chartConfig:r.chartConfig,motionChartState:r.motionChartState}}),l.yasqe=i,l.options.persistency.outputSelector="visu",i.options.sparql.handlers.success=function(t,e,a){return l.setResponse({response:t,contentType:a.getResponseHeader("Content-Type")})},i.options.sparql.handlers.error=function(t,e,a){var o;return o=e+" (response status code "+t.status+")",a&&a.length&&(o+=": "+a),l.setResponse({exception:o})},null!=r.sparqlEndpoint&&null!=r.query?i.query():void 0}])}.call(this),function(t){try{t=angular.module("app")}catch(e){t=angular.module("app",[])}t.run(["$templateCache",function(t){t.put("partials/main.html",'\n<div class="ui page grid">\n  <div class="column">\n    <h1 class="ui header center aligned">(Visual) SPARQL query tool</h1>\n    <div id="shareicondiv"><i id="shareicon" ng-click="shareLink()" ng-class="shareLinkLoading ? \'loading\' : \'share\'" class="icon"></i></div>\n    <div class="ui form">\n      <div ng-class="{ \'error\': !sparqlEndpointInputValid }" class="field">\n        <label>SPARQL endpoint</label>\n        <input ng-model="sparqlEndpoint" type="text"/>\n      </div>\n      <div id="yasqe"></div>\n    </div>\n    <div id="yasr"></div>\n  </div>\n</div>')}])}();