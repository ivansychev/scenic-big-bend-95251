!function(t){var i={};function e(o){if(i[o])return i[o].exports;var r=i[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=i,e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)e.d(o,r,function(i){return t[i]}.bind(null,r));return o},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="/dist/",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);const o=(t,i)=>{return{x:t.x*Math.cos(i)-t.y*Math.sin(i),y:t.x*Math.sin(i)+t.y*Math.cos(i)}},r=(t,i)=>{const e=t.velocity.x-i.velocity.x,r=t.velocity.y-i.velocity.y;if(e*(i.x-t.x)+r*(i.y-t.y)>=0){const e=-Math.atan2(i.y-t.y,i.x-t.x),r=t.mass,s=i.mass,n=o(t.velocity,e),h=o(i.velocity,e),a={x:n.x*(r-s)/(r+s)+2*h.x*s/(r+s),y:n.y},c={x:h.x*(r-s)/(r+s)+2*n.x*s/(r+s),y:h.y},y=o(a,-e),l=o(c,-e);t.velocity.x=y.x,t.velocity.y=y.y,i.velocity.x=l.x,i.velocity.y=l.y}},s=(t,i)=>Math.floor(Math.random()*(i-t+1)+t),n=(t,i,e,o)=>{const r=e-t,s=o-i;return Math.sqrt(Math.pow(r,2)+Math.pow(s,2))},h=["#2185C5","#7ECEFD","#f6d832","#FF7F66"];class a{constructor(t,i,e,o){this.x=t,this.y=i,this.velocity={x:Math.random()+1.5,y:Math.random()+1.5},this.radius=e,this.color=o,this.mass=1,this.opacity=0}update(t){this.draw();for(let i=0;i<t.length;i++)this!==t[i]&&n(this.x,this.y,t[i].x,t[i].y)-2*this.radius<0&&r(this,t[i]);(this.x-this.radius<=0||this.x+this.radius>=innerWidth)&&(this.velocity.x=-this.velocity.x),(this.y-this.radius<=0||this.y+this.radius>=innerHeight)&&(this.velocity.y=-this.velocity.y),n(u.x,u.y,this.x,this.y)<150&&this.opacity<.2?this.opacity+=.02:this.opacity>0&&(this.opacity-=.02,this.opacity=Math.max(0,this.opacity)),this.x+=this.velocity.x,this.y+=this.velocity.y}draw(){l.beginPath(),l.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),l.save(),l.globalAlpha=this.opacity,l.fillStyle=this.color,l.fill(),l.restore(),l.strokeStyle=this.color,l.stroke(),l.closePath()}}const c=[],y=document.querySelector("canvas"),l=y.getContext("2d");y.width=innerWidth,y.height=innerHeight;const u={x:innerWidth/2,y:innerHeight/2};addEventListener("mousemove",t=>{u.x=t.clientX,u.y=t.clientY});const d=()=>{requestAnimationFrame(d),l.clearRect(0,0,y.width,y.height),c.forEach(t=>{t.update(c)})};(()=>{for(let t=0;t<150;t++){const i=15,e=h[Math.floor(Math.random()*h.length)];let o=s(i,y.width-i),r=s(i,y.height-i);if(0!==t)for(let t=0;t<c.length;t++)n(o,r,c[t].x,c[t].y)-2*i<0&&(o=s(i,y.width-i),r=s(i,y.height-i),t=-1);c.push(new a(o,r,i,e))}})(),d()}]);