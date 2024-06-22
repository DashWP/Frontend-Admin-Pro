(()=>{"use strict";const e=window.wp.blocks,t=window.wp.i18n,n=window.wp.blockEditor,r=window.wp.components,o=window.React;function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,l,i=[],c=!0,u=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);c=!0);}catch(e){u=!0,o=e}finally{try{if(!c&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(u)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var i="acf-frontend-form-element";const c=function(e){var n=a((0,o.useState)(null),2),l=n[0],c=n[1],u=a((0,o.useState)(!0),2),f=u[0],s=u[1];(0,o.useEffect)((function(){m()}),[]);var m=function(){wp.apiFetch({path:"frontend-admin/v1/frontend-forms"}).then((function(e){var n=[{value:0,label:(0,t.__)("Select a form",i),disabled:!0}].concat(e);c(n),s(!1)}))};return f?React.createElement("p",null,(0,t.__)("Loading forms...",i)):l.length<1?React.createElement("p",null,(0,t.__)("No forms found...",i)):React.createElement(r.SelectControl,{options:l,label:(0,t.__)("Form",i),labelPosition:"side",value:e.value,onChange:e.onChange,onClick:e.onClick})},u=window.wp.editor,f=function(e){return e.form?React.createElement(r.Disabled,{key:"fea-disabled-render"},React.createElement(u.ServerSideRender,{block:e.block,attributes:{formID:e.form,editMode:1}})):null},s=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"acf-frontend/form","title":"Frontend Admin Form","description":"Display a frontend admin form so that your users can update content from the frontend.","category":"frontend-admin","textdomain":"frontend-admin","supports":{"align":["wide"]},"attributes":{"formID":{"type":"number","default":0},"editMode":{"type":"boolean","default":true}},"editorScript":"file:../../admin-form/index.js"}');(0,e.registerBlockType)(s,{edit:function(e){var o=e.attributes,a=e.setAttributes,l=(0,n.useBlockProps)();return React.createElement("div",l,React.createElement(n.InspectorControls,{key:"fea-inspector-controls"},React.createElement(r.PanelBody,{title:(0,t.__)("Form Settings","acf-frontend-form-element"),initialOpen:!0},React.createElement(r.PanelRow,null,React.createElement(c,{value:o.formID,onChange:function(e){return a({formID:parseInt(e)})}})))),React.createElement(c,{value:o.formID,onChange:function(e){return a({formID:parseInt(e)})}}),React.createElement(f,{form:o.formID,block:e.name}))},save:function(){return null}})})();