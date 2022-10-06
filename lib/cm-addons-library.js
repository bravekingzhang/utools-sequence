!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";var t={autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0},r={autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,allowMissingTagName:!1,caseFold:!1};e.defineMode("xml",function(n,a){function o(e,t){function r(r){return t.tokenize=r,r(e,t)}var n=e.next();if("<"==n)return e.eat("!")?e.eat("[")?e.match("CDATA[")?r(u("atom","]]>")):null:e.match("--")?r(u("comment","--\x3e")):e.match("DOCTYPE",!0,!0)?(e.eatWhile(/[\w\._\-]/),r(c(1))):null:e.eat("?")?(e.eatWhile(/[\w\._\-]/),t.tokenize=u("meta","?>"),"meta"):(T=e.eat("/")?"closeTag":"openTag",t.tokenize=i,"tag bracket");if("&"==n){return(e.eat("#")?e.eat("x")?e.eatWhile(/[a-fA-F\d]/)&&e.eat(";"):e.eatWhile(/[\d]/)&&e.eat(";"):e.eatWhile(/[\w\.\-:]/)&&e.eat(";"))?"atom":"error"}return e.eatWhile(/[^&<]/),null}function i(e,t){var r=e.next();if(">"==r||"/"==r&&e.eat(">"))return t.tokenize=o,T=">"==r?"endTag":"selfcloseTag","tag bracket";if("="==r)return T="equals",null;if("<"==r){t.tokenize=o,t.state=f,t.tagName=t.tagStart=null;var n=t.tokenize(e,t);return n?n+" tag error":"tag error"}return/[\'\"]/.test(r)?(t.tokenize=function(e){var t=function(t,r){for(;!t.eol();)if(t.next()==e){r.tokenize=i;break}return"string"};return t.isInAttribute=!0,t}(r),t.stringStartCol=e.column(),t.tokenize(e,t)):(e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),"word")}function u(e,t){return function(r,n){for(;!r.eol();){if(r.match(t)){n.tokenize=o;break}r.next()}return e}}function c(e){return function(t,r){for(var n;null!=(n=t.next());){if("<"==n)return r.tokenize=c(e+1),r.tokenize(t,r);if(">"==n){if(1==e){r.tokenize=o;break}return r.tokenize=c(e-1),r.tokenize(t,r)}}return"meta"}}function l(e){e.context&&(e.context=e.context.prev)}function s(e,t){for(var r;;){if(!e.context)return;if(r=e.context.tagName,!x.contextGrabbers.hasOwnProperty(r)||!x.contextGrabbers[r].hasOwnProperty(t))return;l(e)}}function f(e,t,r){return"openTag"==e?(r.tagStart=t.column(),d):"closeTag"==e?m:f}function d(e,t,r){return"word"==e?(r.tagName=t.current(),j="tag",k):x.allowMissingTagName&&"endTag"==e?(j="tag bracket",k(e,t,r)):(j="error",d)}function m(e,t,r){if("word"==e){var n=t.current();return r.context&&r.context.tagName!=n&&x.implicitlyClosed.hasOwnProperty(r.context.tagName)&&l(r),r.context&&r.context.tagName==n||!1===x.matchClosing?(j="tag",p):(j="tag error",v)}return x.allowMissingTagName&&"endTag"==e?(j="tag bracket",p(e,t,r)):(j="error",v)}function p(e,t,r){return"endTag"!=e?(j="error",p):(l(r),f)}function v(e,t,r){return j="error",p(e,0,r)}function k(e,t,r){if("word"==e)return j="attribute",g;if("endTag"==e||"selfcloseTag"==e){var n=r.tagName,a=r.tagStart;return r.tagName=r.tagStart=null,"selfcloseTag"==e||x.autoSelfClosers.hasOwnProperty(n)?s(r,n):(s(r,n),r.context=new function(e,t,r){this.prev=e.context,this.tagName=t||"",this.indent=e.indented,this.startOfLine=r,(x.doNotIndent.hasOwnProperty(t)||e.context&&e.context.noIndent)&&(this.noIndent=!0)}(r,n,a==r.indented)),f}return j="error",k}function g(e,t,r){return"equals"==e?y:(x.allowMissing||(j="error"),k(e,0,r))}function y(e,t,r){return"string"==e?b:"word"==e&&x.allowUnquoted?(j="string",k):(j="error",k(e,0,r))}function b(e,t,r){return"string"==e?b:k(e,0,r)}var h=n.indentUnit,x={},w=a.htmlMode?t:r;for(var M in w)x[M]=w[M];for(var M in a)x[M]=a[M];var T,j;return o.isInText=!0,{startState:function(e){var t={tokenize:o,state:f,indented:e||0,tagName:null,tagStart:null,context:null};return null!=e&&(t.baseIndent=e),t},token:function(e,t){if(!t.tagName&&e.sol()&&(t.indented=e.indentation()),e.eatSpace())return null;T=null;var r=t.tokenize(e,t);return(r||T)&&"comment"!=r&&(j=null,t.state=t.state(T||r,e,t),j&&(r="error"==j?r+" error":j)),r},indent:function(t,r,n){var a=t.context;if(t.tokenize.isInAttribute)return t.tagStart==t.indented?t.stringStartCol+1:t.indented+h;if(a&&a.noIndent)return e.Pass;if(t.tokenize!=i&&t.tokenize!=o)return n?n.match(/^(\s*)/)[0].length:0;if(t.tagName)return!1!==x.multilineTagIndentPastTag?t.tagStart+t.tagName.length+2:t.tagStart+h*(x.multilineTagIndentFactor||1);if(x.alignCDATA&&/<!\[CDATA\[/.test(r))return 0;var u=r&&/^<(\/)?([\w_:\.-]*)/.exec(r);if(u&&u[1])for(;a;){if(a.tagName==u[2]){a=a.prev;break}if(!x.implicitlyClosed.hasOwnProperty(a.tagName))break;a=a.prev}else if(u)for(;a;){var c=x.contextGrabbers[a.tagName];if(!c||!c.hasOwnProperty(u[2]))break;a=a.prev}for(;a&&a.prev&&!a.startOfLine;)a=a.prev;return a?a.indent+h:t.baseIndent||0},electricInput:/<\/[\s\w:]+>$/,blockCommentStart:"\x3c!--",blockCommentEnd:"--\x3e",configuration:x.htmlMode?"html":"xml",helperType:x.htmlMode?"html":"xml",skipAttribute:function(e){e.state==y&&(e.state=k)},xmlCurrentTag:function(e){return e.tagName?{name:e.tagName,close:"closeTag"==e.type}:null},xmlCurrentContext:function(e){for(var t=[],r=e.context;r;r=r.prev)t.push(r.tagName);return t.reverse()}}}),e.defineMIME("text/xml","xml"),e.defineMIME("application/xml","xml"),e.mimeModes.hasOwnProperty("text/html")||e.defineMIME("text/html",{name:"xml",htmlMode:!0})}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("javascript",function(t,r){function n(e,t,r){return Pe=e,$e=r,t}function a(e,t){var r=e.next();if('"'==r||"'"==r)return t.tokenize=function(e){return function(t,r){var o,i=!1;if(Le&&"@"==t.peek()&&t.match(Be))return r.tokenize=a,n("jsonld-keyword","meta");for(;null!=(o=t.next())&&(o!=e||i);)i=!i&&"\\"==o;return i||(r.tokenize=a),n("string","string")}}(r),t.tokenize(e,t);if("."==r&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return n("number","number");if("."==r&&e.match(".."))return n("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(r))return n(r);if("="==r&&e.eat(">"))return n("=>","operator");if("0"==r&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return n("number","number");if(/\d/.test(r))return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),n("number","number");if("/"==r)return e.eat("*")?(t.tokenize=o,o(e,t)):e.eat("/")?(e.skipToEnd(),n("comment","comment")):qe(e,t,1)?(function(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}(e),e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),n("regexp","string-2")):(e.eat("="),n("operator","operator",e.current()));if("`"==r)return t.tokenize=i,i(e,t);if("#"==r&&"!"==e.peek())return e.skipToEnd(),n("meta","meta");if("#"==r&&e.eatWhile(Ge))return n("variable","property");if("<"==r&&e.match("!--")||"-"==r&&e.match("->")&&!/\S/.test(e.string.slice(0,e.start)))return e.skipToEnd(),n("comment","comment");if(He.test(r))return">"==r&&t.lexical&&">"==t.lexical.type||(e.eat("=")?"!"!=r&&"="!=r||e.eat("="):/[<>*+\-|&?]/.test(r)&&(e.eat(r),">"==r&&e.eat(r))),"?"==r&&e.eat(".")?n("."):n("operator","operator",e.current());if(Ge.test(r)){e.eatWhile(Ge);var u=e.current();if("."!=t.lastType){if(De.propertyIsEnumerable(u)){var c=De[u];return n(c.type,c.style,u)}if("async"==u&&e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return n("async","keyword",u)}return n("variable","variable",u)}}function o(e,t){for(var r,o=!1;r=e.next();){if("/"==r&&o){t.tokenize=a;break}o="*"==r}return n("comment","comment")}function i(e,t){for(var r,o=!1;null!=(r=e.next());){if(!o&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=a;break}o=!o&&"\\"==r}return n("quasi","string-2",e.current())}function u(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){if(Fe){var n=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r));n&&(r=n.index)}for(var a=0,o=!1,i=r-1;i>=0;--i){var u=e.string.charAt(i),c=Ye.indexOf(u);if(c>=0&&c<3){if(!a){++i;break}if(0==--a){"("==u&&(o=!0);break}}else if(c>=3&&c<6)++a;else if(Ge.test(u))o=!0;else if(/["'\/`]/.test(u))for(;;--i){if(0==i)return;if(e.string.charAt(i-1)==u&&"\\"!=e.string.charAt(i-2)){i--;break}}else if(o&&!a){++i;break}}o&&!a&&(t.fatArrowAt=i)}}function c(e,t,r,n,a,o){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=o,null!=n&&(this.align=n)}function l(e,t){for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(r=n.vars;r;r=r.next)if(r.name==t)return!0}function s(){for(var e=arguments.length-1;e>=0;e--)Ke.cc.push(arguments[e])}function f(){return s.apply(null,arguments),!0}function d(e,t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}function m(e){var t=Ke.state;if(Ke.marked="def",t.context)if("var"==t.lexical.info&&t.context&&t.context.block){var n=p(e,t.context);if(null!=n)return void(t.context=n)}else if(!d(e,t.localVars))return void(t.localVars=new g(e,t.localVars));r.globalVars&&!d(e,t.globalVars)&&(t.globalVars=new g(e,t.globalVars))}function p(e,t){if(t){if(t.block){var r=p(e,t.prev);return r?r==t.prev?t:new k(r,t.vars,!0):null}return d(e,t.vars)?t:new k(t.prev,new g(e,t.vars),!1)}return null}function v(e){return"public"==e||"private"==e||"protected"==e||"abstract"==e||"readonly"==e}function k(e,t,r){this.prev=e,this.vars=t,this.block=r}function g(e,t){this.name=e,this.next=t}function y(){Ke.state.context=new k(Ke.state.context,Ke.state.localVars,!1),Ke.state.localVars=Qe}function b(){Ke.state.context=new k(Ke.state.context,Ke.state.localVars,!0),Ke.state.localVars=null}function h(){Ke.state.localVars=Ke.state.context.vars,Ke.state.context=Ke.state.context.prev}function x(e,t){var r=function(){var r=Ke.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var a=r.lexical;a&&")"==a.type&&a.align;a=a.prev)n=a.indented;r.lexical=new c(n,Ke.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function w(){var e=Ke.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function M(e){function t(r){return r==e?f():";"==e||"}"==r||")"==r||"]"==r?s():f(t)}return t}function T(e,t){return"var"==e?f(x("vardef",t),ie,M(";"),w):"keyword a"==e?f(x("form"),I,T,w):"keyword b"==e?f(x("form"),T,w):"keyword d"==e?Ke.stream.match(/^\s*$/,!1)?f():f(x("stat"),N,M(";"),w):"debugger"==e?f(M(";")):"{"==e?f(x("}"),b,B,w,h):";"==e?f():"if"==e?("else"==Ke.state.lexical.info&&Ke.state.cc[Ke.state.cc.length-1]==w&&Ke.state.cc.pop()(),f(x("form"),I,T,w,de)):"function"==e?f(ke):"for"==e?f(x("form"),me,T,w):"class"==e||Fe&&"interface"==t?(Ke.marked="keyword",f(x("form","class"==e?e:t),xe,w)):"variable"==e?Fe&&"declare"==t?(Ke.marked="keyword",f(T)):Fe&&("module"==t||"enum"==t||"type"==t)&&Ke.stream.match(/^\s*\w/,!1)?(Ke.marked="keyword","enum"==t?f(Ve):"type"==t?f(ye,M("operator"),R,M(";")):f(x("form"),ue,M("{"),x("}"),B,w,w)):Fe&&"namespace"==t?(Ke.marked="keyword",f(x("form"),z,T,w)):Fe&&"abstract"==t?(Ke.marked="keyword",f(T)):f(x("stat"),W):"switch"==e?f(x("form"),I,M("{"),x("}","switch"),b,B,w,w,h):"case"==e?f(z,M(":")):"default"==e?f(M(":")):"catch"==e?f(x("form"),y,j,T,w,h):"export"==e?f(x("stat"),je,w):"import"==e?f(x("stat"),Ce,w):"async"==e?f(T):"@"==t?f(z,T):s(x("stat"),z,M(";"),w)}function j(e){if("("==e)return f(be,M(")"))}function z(e,t){return A(e,t,!1)}function C(e,t){return A(e,t,!0)}function I(e){return"("!=e?s():f(x(")"),N,M(")"),w)}function A(e,t,r){if(Ke.state.fatArrowAt==Ke.stream.start){var n=r?P:q;if("("==e)return f(y,x(")"),D(be,")"),w,M("=>"),n,h);if("variable"==e)return s(y,ue,M("=>"),n,h)}var a=r?E:S;return Je.hasOwnProperty(e)?f(a):"function"==e?f(ke,a):"class"==e||Fe&&"interface"==t?(Ke.marked="keyword",f(x("form"),he,w)):"keyword c"==e||"async"==e?f(r?C:z):"("==e?f(x(")"),N,M(")"),w,a):"operator"==e||"spread"==e?f(r?C:z):"["==e?f(x("]"),Ee,w,a):"{"==e?H(U,"}",null,a):"quasi"==e?s(V,a):"new"==e?f(function(e){return function(t){return"."==t?f(e?_:$):"variable"==t&&Fe?f(ne,e?E:S):s(e?C:z)}}(r)):"import"==e?f(z):f()}function N(e){return e.match(/[;\}\)\],]/)?s():s(z)}function S(e,t){return","==e?f(N):E(e,t,!1)}function E(e,t,r){var n=0==r?S:E,a=0==r?z:C;return"=>"==e?f(y,r?P:q,h):"operator"==e?/\+\+|--/.test(t)||Fe&&"!"==t?f(n):Fe&&"<"==t&&Ke.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1)?f(x(">"),D(R,">"),w,n):"?"==t?f(z,M(":"),a):f(a):"quasi"==e?s(V,n):";"!=e?"("==e?H(C,")","call",n):"."==e?f(L,n):"["==e?f(x("]"),N,M("]"),w,n):Fe&&"as"==t?(Ke.marked="keyword",f(R,n)):"regexp"==e?(Ke.state.lastType=Ke.marked="operator",Ke.stream.backUp(Ke.stream.pos-Ke.stream.start-1),f(a)):void 0:void 0}function V(e,t){return"quasi"!=e?s():"${"!=t.slice(t.length-2)?f(V):f(z,O)}function O(e){if("}"==e)return Ke.marked="string-2",Ke.state.tokenize=i,f(V)}function q(e){return u(Ke.stream,Ke.state),s("{"==e?T:z)}function P(e){return u(Ke.stream,Ke.state),s("{"==e?T:C)}function $(e,t){if("target"==t)return Ke.marked="keyword",f(S)}function _(e,t){if("target"==t)return Ke.marked="keyword",f(E)}function W(e){return":"==e?f(w,T):s(S,M(";"),w)}function L(e){if("variable"==e)return Ke.marked="property",f()}function U(e,t){if("async"==e)return Ke.marked="property",f(U);if("variable"==e||"keyword"==Ke.style){if(Ke.marked="property","get"==t||"set"==t)return f(F);var r;return Fe&&Ke.state.fatArrowAt==Ke.stream.start&&(r=Ke.stream.match(/^\s*:\s*/,!1))&&(Ke.state.fatArrowAt=Ke.stream.pos+r[0].length),f(G)}return"number"==e||"string"==e?(Ke.marked=Le?"property":Ke.style+" property",f(G)):"jsonld-keyword"==e?f(G):Fe&&v(t)?(Ke.marked="keyword",f(U)):"["==e?f(z,Y,M("]"),G):"spread"==e?f(C,G):"*"==t?(Ke.marked="keyword",f(U)):":"==e?s(G):void 0}function F(e){return"variable"!=e?s(G):(Ke.marked="property",f(ke))}function G(e){return":"==e?f(C):"("==e?s(ke):void 0}function D(e,t,r){function n(a,o){if(r?r.indexOf(a)>-1:","==a){var i=Ke.state.lexical;return"call"==i.info&&(i.pos=(i.pos||0)+1),f(function(r,n){return r==t||n==t?s():s(e)},n)}return a==t||o==t?f():r&&r.indexOf(";")>-1?s(e):f(M(t))}return function(r,a){return r==t||a==t?f():s(e,n)}}function H(e,t,r){for(var n=3;n<arguments.length;n++)Ke.cc.push(arguments[n]);return f(x(t,r),D(e,t),w)}function B(e){return"}"==e?f():s(T,B)}function Y(e,t){if(Fe){if(":"==e)return f(R);if("?"==t)return f(Y)}}function J(e,t){if(Fe&&(":"==e||"in"==t))return f(R)}function K(e){if(Fe&&":"==e)return Ke.stream.match(/^\s*\w+\s+is\b/,!1)?f(z,Q,R):f(R)}function Q(e,t){if("is"==t)return Ke.marked="keyword",f()}function R(e,t){return"keyof"==t||"typeof"==t||"infer"==t?(Ke.marked="keyword",f("typeof"==t?C:R)):"variable"==e||"void"==t?(Ke.marked="type",f(re)):"|"==t||"&"==t?f(R):"string"==e||"number"==e||"atom"==e?f(re):"["==e?f(x("]"),D(R,"]",","),w,re):"{"==e?f(x("}"),Z,w,re):"("==e?f(D(te,")"),X,re):"<"==e?f(D(R,">"),R):void 0}function X(e){if("=>"==e)return f(R)}function Z(e){return e.match(/[\}\)\]]/)?f():","==e||";"==e?f(Z):s(ee,Z)}function ee(e,t){return"variable"==e||"keyword"==Ke.style?(Ke.marked="property",f(ee)):"?"==t||"number"==e||"string"==e?f(ee):":"==e?f(R):"["==e?f(M("variable"),J,M("]"),ee):"("==e?s(ge,ee):e.match(/[;\}\)\],]/)?void 0:f()}function te(e,t){return"variable"==e&&Ke.stream.match(/^\s*[?:]/,!1)||"?"==t?f(te):":"==e?f(R):"spread"==e?f(te):s(R)}function re(e,t){return"<"==t?f(x(">"),D(R,">"),w,re):"|"==t||"."==e||"&"==t?f(R):"["==e?f(R,M("]"),re):"extends"==t||"implements"==t?(Ke.marked="keyword",f(R)):"?"==t?f(R,M(":"),R):void 0}function ne(e,t){if("<"==t)return f(x(">"),D(R,">"),w,re)}function ae(){return s(R,oe)}function oe(e,t){if("="==t)return f(R)}function ie(e,t){return"enum"==t?(Ke.marked="keyword",f(Ve)):s(ue,Y,se,fe)}function ue(e,t){return Fe&&v(t)?(Ke.marked="keyword",f(ue)):"variable"==e?(m(t),f()):"spread"==e?f(ue):"["==e?H(le,"]"):"{"==e?H(ce,"}"):void 0}function ce(e,t){return"variable"!=e||Ke.stream.match(/^\s*:/,!1)?("variable"==e&&(Ke.marked="property"),"spread"==e?f(ue):"}"==e?s():"["==e?f(z,M("]"),M(":"),ce):f(M(":"),ue,se)):(m(t),f(se))}function le(){return s(ue,se)}function se(e,t){if("="==t)return f(C)}function fe(e){if(","==e)return f(ie)}function de(e,t){if("keyword b"==e&&"else"==t)return f(x("form","else"),T,w)}function me(e,t){return"await"==t?f(me):"("==e?f(x(")"),pe,w):void 0}function pe(e){return"var"==e?f(ie,ve):"variable"==e?f(ve):s(ve)}function ve(e,t){return")"==e?f():";"==e?f(ve):"in"==t||"of"==t?(Ke.marked="keyword",f(z,ve)):s(z,ve)}function ke(e,t){return"*"==t?(Ke.marked="keyword",f(ke)):"variable"==e?(m(t),f(ke)):"("==e?f(y,x(")"),D(be,")"),w,K,T,h):Fe&&"<"==t?f(x(">"),D(ae,">"),w,ke):void 0}function ge(e,t){return"*"==t?(Ke.marked="keyword",f(ge)):"variable"==e?(m(t),f(ge)):"("==e?f(y,x(")"),D(be,")"),w,K,h):Fe&&"<"==t?f(x(">"),D(ae,">"),w,ge):void 0}function ye(e,t){return"keyword"==e||"variable"==e?(Ke.marked="type",f(ye)):"<"==t?f(x(">"),D(ae,">"),w):void 0}function be(e,t){return"@"==t&&f(z,be),"spread"==e?f(be):Fe&&v(t)?(Ke.marked="keyword",f(be)):Fe&&"this"==e?f(Y,se):s(ue,Y,se)}function he(e,t){return"variable"==e?xe(e,t):we(e,t)}function xe(e,t){if("variable"==e)return m(t),f(we)}function we(e,t){return"<"==t?f(x(">"),D(ae,">"),w,we):"extends"==t||"implements"==t||Fe&&","==e?("implements"==t&&(Ke.marked="keyword"),f(Fe?R:z,we)):"{"==e?f(x("}"),Me,w):void 0}function Me(e,t){return"async"==e||"variable"==e&&("static"==t||"get"==t||"set"==t||Fe&&v(t))&&Ke.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(Ke.marked="keyword",f(Me)):"variable"==e||"keyword"==Ke.style?(Ke.marked="property",f(Te,Me)):"number"==e||"string"==e?f(Te,Me):"["==e?f(z,Y,M("]"),Te,Me):"*"==t?(Ke.marked="keyword",f(Me)):Fe&&"("==e?s(ge,Me):";"==e||","==e?f(Me):"}"==e?f():"@"==t?f(z,Me):void 0}function Te(e,t){if("?"==t)return f(Te);if(":"==e)return f(R,se);if("="==t)return f(C);var r=Ke.state.lexical.prev;return s(r&&"interface"==r.info?ge:ke)}function je(e,t){return"*"==t?(Ke.marked="keyword",f(Se,M(";"))):"default"==t?(Ke.marked="keyword",f(z,M(";"))):"{"==e?f(D(ze,"}"),Se,M(";")):s(T)}function ze(e,t){return"as"==t?(Ke.marked="keyword",f(M("variable"))):"variable"==e?s(C,ze):void 0}function Ce(e){return"string"==e?f():"("==e?s(z):s(Ie,Ae,Se)}function Ie(e,t){return"{"==e?H(Ie,"}"):("variable"==e&&m(t),"*"==t&&(Ke.marked="keyword"),f(Ne))}function Ae(e){if(","==e)return f(Ie,Ae)}function Ne(e,t){if("as"==t)return Ke.marked="keyword",f(Ie)}function Se(e,t){if("from"==t)return Ke.marked="keyword",f(z)}function Ee(e){return"]"==e?f():s(D(C,"]"))}function Ve(){return s(x("form"),ue,M("{"),x("}"),D(Oe,"}"),w,w)}function Oe(){return s(ue,se)}function qe(e,t,r){return t.tokenize==a&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}var Pe,$e,_e=t.indentUnit,We=r.statementIndent,Le=r.jsonld,Ue=r.json||Le,Fe=r.typescript,Ge=r.wordCharacters||/[\w$\xa1-\uffff]/,De=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),a=e("keyword d"),o=e("operator"),i={type:"atom",style:"atom"};return{if:e("if"),while:t,with:t,else:r,do:r,try:r,finally:r,return:a,break:a,continue:a,new:e("new"),delete:n,void:n,throw:n,debugger:e("debugger"),var:e("var"),const:e("var"),let:e("var"),function:e("function"),catch:e("catch"),for:e("for"),switch:e("switch"),case:e("case"),default:e("default"),in:o,typeof:o,instanceof:o,true:i,false:i,null:i,undefined:i,NaN:i,Infinity:i,this:e("this"),class:e("class"),super:e("atom"),yield:n,export:e("export"),import:e("import"),extends:n,await:n}}(),He=/[+\-*&%=<>!?|~^@]/,Be=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,Ye="([{}])",Je={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,"jsonld-keyword":!0},Ke={state:null,column:null,marked:null,cc:null},Qe=new g("this",new g("arguments",null));return h.lex=!0,w.lex=!0,{startState:function(e){var t={tokenize:a,lastType:"sof",cc:[],lexical:new c((e||0)-_e,0,"block",!1),localVars:r.localVars,context:r.localVars&&new k(null,null,!1),indented:e||0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),u(e,t)),t.tokenize!=o&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==Pe?r:(t.lastType="operator"!=Pe||"++"!=$e&&"--"!=$e?Pe:"incdec",function(e,t,r,n,a){var o=e.cc;for(Ke.state=e,Ke.stream=a,Ke.marked=null,Ke.cc=o,Ke.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;)if((o.length?o.pop():Ue?z:T)(r,n)){for(;o.length&&o[o.length-1].lex;)o.pop()();return Ke.marked?Ke.marked:"variable"==r&&l(e,n)?"variable-2":t}}(t,r,Pe,$e,e))},indent:function(t,n){if(t.tokenize==o||t.tokenize==i)return e.Pass;if(t.tokenize!=a)return 0;var u,c=n&&n.charAt(0),l=t.lexical;if(!/^\s*else\b/.test(n))for(var s=t.cc.length-1;s>=0;--s){var f=t.cc[s];if(f==w)l=l.prev;else if(f!=de)break}for(;("stat"==l.type||"form"==l.type)&&("}"==c||(u=t.cc[t.cc.length-1])&&(u==S||u==E)&&!/^[,\.=+\-*:?[\(]/.test(n));)l=l.prev;We&&")"==l.type&&"stat"==l.prev.type&&(l=l.prev);var d=l.type,m=c==d;return"vardef"==d?l.indented+("operator"==t.lastType||","==t.lastType?l.info.length+1:0):"form"==d&&"{"==c?l.indented:"form"==d?l.indented+_e:"stat"==d?l.indented+(function(e,t){return"operator"==e.lastType||","==e.lastType||He.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}(t,n)?We||_e:0):"switch"!=l.info||m||0==r.doubleIndentSwitch?l.align?l.column+(m?0:1):l.indented+(m?0:_e):l.indented+(/^(?:case|default)\b/.test(n)?_e:2*_e)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:Ue?null:"/*",blockCommentEnd:Ue?null:"*/",blockCommentContinue:Ue?null:" * ",lineComment:Ue?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:Ue?"json":"javascript",jsonldMode:Le,jsonMode:Ue,expressionAllowed:qe,skipExpression:function(e){var t=e.cc[e.cc.length-1];t!=z&&t!=C||e.cc.pop()}}}),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/manifest+json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.runMode=function(t,r,n,a){var o=e.getMode(e.defaults,r),i=a&&a.tabSize||e.defaults.tabSize;if(n.appendChild){var u=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||document.documentMode<9),c=n,l=0;c.innerHTML="",n=function(e,t){if("\n"==e)return c.appendChild(document.createTextNode(u?"\r":e)),void(l=0);for(var r="",n=0;;){var a=e.indexOf("\t",n);if(-1==a){r+=e.slice(n),l+=e.length-n;break}l+=a-n,r+=e.slice(n,a);var o=i-l%i;l+=o;for(var s=0;s<o;++s)r+=" ";n=a+1}if(t){var f=c.appendChild(document.createElement("span"));f.className="cm-"+t.replace(/ +/g," cm-"),f.appendChild(document.createTextNode(r))}else c.appendChild(document.createTextNode(r))}}for(var s=e.splitLines(t),f=a&&a.state||e.startState(o),d=0,m=s.length;d<m;++d){d&&n("\n");var p=new e.StringStream(s[d],null,{lookAhead:function(e){return s[d+e]},baseToken:function(){}});for(!p.string&&o.blankLine&&o.blankLine(f);!p.eol();){var v=o.token(p,f);n(p.current(),v,d,p.start,f),p.start=p.pos}}}}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("./runmode")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./runmode"],e):e(CodeMirror)}(function(e){"use strict";function t(e,n){if(3==e.nodeType)return n.push(e.nodeValue);for(var a=e.firstChild;a;a=a.nextSibling)t(a,n),r.test(e.nodeType)&&n.push("\n")}var r=/^(p|li|div|h\\d|pre|blockquote|td)$/;e.colorize=function(r,n){r||(r=document.body.getElementsByTagName("pre"));for(var a=0;a<r.length;++a){var o=r[a],i=o.getAttribute("data-lang")||n;if(i){var u=[];t(o,u),o.innerHTML="",e.runMode(u.join(""),i,o),o.className+=" cm-s-default"}}}});