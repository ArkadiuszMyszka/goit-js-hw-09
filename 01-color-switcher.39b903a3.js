!function(){var t=document.body,e=document.querySelector("button[data-start]"),d=document.querySelector("button[data-stop]");function n(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}d.disabled=!0,e.addEventListener("click",(function(){n(),timerId=setInterval(n,1e3),d.disabled=!1,e.disabled=!0})),d.addEventListener("click",(function(){clearInterval(timerId),d.disabled=!0,e.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.39b903a3.js.map