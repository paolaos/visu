(function(){function e(e,t){for(var n=-1,r=t.length>>>0;++n<r;)if(e===t[n])return!0;return!1}YASR.plugins.gmaps=function(t){var n;return n=t.container.closest("[id]").attr("id"),{yasr:t,name:"Google Maps",hideFromSelection:!1,priority:1,canHandleResults:function(t){return t.results&&t.results.getVariables&&t.results.getVariables()&&e("lat",t.results.getVariables())&&e("lon",t.results.getVariables())},draw:function(){function e(e){google.maps.event.addListener(e.marker,"click",function(){var t,n,a,s;t="<table>";for(n in a=e.res)s=a[n],t+="<tr><th>"+n+"</th><td>"+s.value+"</td></tr>";t+="</table>",o.setContent(t),o.open(r,e.marker)})}var n,r,a,o,s,i,l,p,u;for(t.resultsContainer.html('<div id="gmap"></div>'),n={mapTypeId:google.maps.MapTypeId.SATELLITE},r=new google.maps.Map(t.resultsContainer.find("div")[0],n),a=new google.maps.LatLngBounds,o=new google.maps.InfoWindow,s=0,l=(i=t.results.getBindings()).length;l>s;++s)p=i[s],u=new google.maps.LatLng(p.lat.value,p.lon.value),a.extend(u),e.call(this,{res:p,marker:new google.maps.Marker({position:u,map:r,title:null!=p.name?p.name.value:p.lat.value+","+p.lon.value})});r.fitBounds(a),r.panToBounds(a)}}}}).call(this),function(){function e(e,t){for(var n=-1,r=t.length>>>0;++n<r;)if(e===t[n])return!0;return!1}YASR.plugins.kml=function(t){var n;return n=t.container.closest("[id]").attr("id"),{yasr:t,name:"KML",hideFromSelection:!1,priority:1,canHandleResults:function(t){return t.results&&t.results.getVariables&&t.results.getVariables()&&e("coordinates",t.results.getVariables())},draw:function(){var e,n,r;e=t.yasqe.getOption("sparql").endpoint,n=t.yasqe.getValue(),r="http://demo.seco.tkk.fi/sparql2kml/?endpoint="+encodeURIComponent(e)+"&query="+encodeURIComponent(n),t.resultsContainer.html('<button id="kml-copy" class="yasr_btn" style="float:right;position:relative; top:-30px;margin-bottom:-30px">Copy</button><div>URL for KML file: <a href="" id="kml-url"></a> (<a id="kml-e4d" href="" target="_blank">in Europeana 4D</a>)</div>'),$("#kml-url").text(r).attr("href",r),$("#kml-e4d").attr("href","http://www.informatik.uni-leipzig.de:8080/e4D/?source1=1&kml1="+encodeURIComponent(r)),$("#kml-copy").click(function(){window.prompt("Copy to clipboard with Ctrl/Cmd-C",r)}),$.ajax("https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDtS96pmj2IeRdw81zobVDpCfs0rFphHvc",{data:JSON.stringify({longUrl:r}),contentType:"application/json",type:"POST"}).success(function(e){r=e.id,$("#kml-url").text(r).attr("href",r),$("#kml-e4d").attr("href","http://www.informatik.uni-leipzig.de:8080/e4D/?source1=1&kml1="+encodeURIComponent(r))})}}}}.call(this),function(){"use strict";angular.module("app",["ui.router","ngStorage"]).config(["$stateProvider","$urlRouterProvider",function(e,t){return e.state("home",{url:"/?sparqlEndpoint&query&outputType",templateUrl:"partials/main.html",controller:"MainCtrl"}),t.otherwise("/")}])}.call(this),function(){"use strict";angular.module("app").controller("MainCtrl",["$window","$location","$http","$scope","$localStorage","$state","$stateParams","$q",function(e,t,n,r,a,o,s,i){var l,p,u,d,c,g;null!=s.sparqlEndpoint&&(a.sparqlEndpoint=s.sparqlEndpoint),null!=a.sparqlEndpoint&&(r.sparqlEndpoint=a.sparqlEndpoint),r.shareLink=function(){var a,o,s,i;t.search("sparqlEndpoint",r.sparqlEndpoint),t.search("query",l.getValue()),t.search("outputType",u.options.output);for(a in o=u.plugins)s=o[a],null!=s.getPersistentSettings&&t.search(a,JSON.stringify(s.getPersistentSettings()));i=t.absUrl(),r.shareLinkLoading=!0,n.post("https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDtS96pmj2IeRdw81zobVDpCfs0rFphHvc",{longUrl:i}).then(function(t){r.shareLinkLoading=!1,e.prompt("Copy to clipboard with Ctrl/Cmd-C",t.data.id)},function(){r.shareLinkLoading=!1,e.alert("URL updated, copy it from the browser address bar")})},l=YASQE(document.getElementById("yasqe"),{createShareLink:!1,sparql:{showQueryButton:!0,endpoint:r.sparqlEndpoint,query:""}}),null!=s.query&&l.setValue(s.query),r.sparqlEndpointInputValid=!0,p=void 0,r.$watch("sparqlEndpoint",function(e,t){null!=e&&(null!=p&&p.resolve(),p=i.defer(),n({method:"GET",url:e,params:{query:"ASK {}"},headers:{Accept:"application/sparql-results+json"},timeout:p.promise}).success(function(e){r.sparqlEndpointInputValid=null!=e["boolean"]}).error(function(){r.sparqlEndpointInputValid=!1})),e!==t&&(a.sparqlEndpoint=e,l.getOption("sparql").endpoint=e)}),u=YASR(document.getElementById("yasr"),{persistency:{outputSelector:s.outputType?!1:"visu",results:!1},getUsedPrefixes:l.getPrefixesFromQuery}),null!=s.outputType&&(u.options.output=s.outputType,u.header.find("button.selected").removeClass("selected"),u.header.find("button.select_"+s.outputType).addClass("selected")),null!=t.search().chartConfig&&(t.search("gchart",JSON.stringify({chartConfig:JSON.parse(t.search().chartConfig),motionChartState:t.search().motionChartState?t.search().motionChartState:void 0})),t.search("chartConfig",void 0),t.search("motionChartState",void 0));for(d in c=u.plugins)g=c[d],null!=g.setPersistentSettings&&t.search()[d]&&g.setPersistentSettings(JSON.parse(t.search()[d]));return u.yasqe=l,u.options.persistency.outputSelector="visu",l.options.sparql.handlers.success=function(e,t,n){return u.setResponse({response:e,contentType:n.getResponseHeader("Content-Type")})},l.options.sparql.handlers.error=function(e,t,n){var r;return r=t+" (response status code "+e.status+")",n&&n.length&&(r+=": "+n),u.setResponse({exception:r})},null!=s.sparqlEndpoint&&null!=s.query?l.query():void 0}])}.call(this),function(e){try{e=angular.module("app")}catch(t){e=angular.module("app",[])}e.run(["$templateCache",function(e){e.put("partials/main.html",'\n<div class="ui page grid">\n  <div class="column">\n    <h1 class="ui header center aligned">(Visual) SPARQL query tool</h1>\n    <div id="shareicondiv"><i id="shareicon" ng-click="shareLink()" ng-class="shareLinkLoading ? \'loading\' : \'share\'" class="icon"></i></div>\n    <div class="ui form">\n      <div ng-class="{ \'error\': !sparqlEndpointInputValid }" class="field">\n        <label>SPARQL endpoint</label>\n        <input ng-model="sparqlEndpoint" type="text"/>\n      </div>\n      <div id="yasqe"></div>\n    </div>\n    <div id="yasr"></div>\n  </div>\n</div>')}])}();