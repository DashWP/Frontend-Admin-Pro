(()=>{"use strict";const e=window.wp.blocks,t=window.wp.i18n,n=window.wp.blockEditor,a=window.wp.components,l=function(e){var a=e.attributes,l=e.setAttributes,r=a.label,c=a.hide_label,o=a.required,u=a.instructions;return React.createElement("div",{className:"acf-field"},React.createElement("div",{className:"acf-label"},React.createElement("label",null,!c&&React.createElement(n.RichText,{tagName:"label",onChange:function(e){return l({label:e})},withoutInteractiveFormatting:!0,placeholder:(0,t.__)("Text Field","acf-frontend-form-element"),value:r}),o&&React.createElement("span",{className:"acf-required"},"*"))),React.createElement("div",{className:"acf-input"},u&&React.createElement(n.RichText,{tagName:"p",className:"description",onChange:function(e){return l({instructions:e})},withoutInteractiveFormatting:!0,value:u}),React.createElement("div",{className:"acf-input-wrap",style:{display:"flex",width:"100%"}},e.children)))};var r="acf-frontend-form-element";const c=function(e){var l,c=e.attributes,o=e.setAttributes,u=c.label,i=c.hide_label,s=c.required,m=c.instructions;return React.createElement(n.InspectorControls,{key:"fea-inspector-controls"},React.createElement(a.PanelBody,{title:(0,t.__)("General",r),initialOpen:!0},React.createElement(a.TextControl,{label:(0,t.__)("Label",r),value:u,onChange:function(e){return o({label:e})}}),React.createElement(a.ToggleControl,{label:(0,t.__)("Hide Label",r),checked:i,onChange:function(e){return o({hide_label:e})}}),"name"in c&&React.createElement(a.TextControl,{label:(0,t.__)("Name",r),value:c.name||(l=u,l.toLowerCase().replace(/[^a-z0-9 ]/g,"").replace(/\s+/g,"_")),onChange:function(e){return o({name:e})}}),React.createElement(a.TextareaControl,{label:(0,t.__)("Instructions",r),rows:"3",value:m,onChange:function(e){return o({instructions:e})}}),React.createElement(a.ToggleControl,{label:(0,t.__)("Required",r),checked:s,onChange:function(e){return o({required:e})}}),e.children))};var o="acf-frontend-form-element";const u=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"frontend-admin/number-field","title":"Number Field","description":"Displays a number field.","category":"frontend-admin","textdomain":"frontend-admin","supports":{"align":["wide"]},"attributes":{"name":{"type":"string","default":""},"label":{"type":"string","default":"Number Field"},"hide_label":{"type":"boolean","default":""},"required":{"type":"boolean","default":""},"default_value":{"type":"number","default":""},"placeholder":{"type":"string","default":""},"instructions":{"type":"string","default":""},"prepend":{"type":"string","default":""},"append":{"type":"string","default":""},"min":{"type":"number","default":"1"},"max":{"type":"number","default":"100"},"step":{"type":"number","default":""}},"editorScript":"file:../../number/index.js"}');(0,e.registerBlockType)(u,{edit:function(e){var r=e.attributes,u=e.setAttributes,i=r.default_value,s=r.placeholder,m=r.prepend,d=r.append,p=r.min,f=r.max,b=r.step,h=(0,n.useBlockProps)();return React.createElement("div",h,React.createElement(c,e,React.createElement(a.TextControl,{type:"number",label:(0,t.__)("Default Value",o),value:i,onChange:function(e){return u({default_value:e})}}),React.createElement(a.TextControl,{label:(0,t.__)("Placeholder",o),value:s,onChange:function(e){return u({placeholder:e})}}),React.createElement(a.TextControl,{label:(0,t.__)("Prepend",o),value:m,onChange:function(e){return u({prepend:e})}}),React.createElement(a.TextControl,{label:(0,t.__)("Append",o),value:d,onChange:function(e){return u({append:e})}}),React.createElement(a.TextControl,{type:"number",label:(0,t.__)("Minimum Value",o),value:p||1,onChange:function(e){return u({min:e})}}),React.createElement(a.TextControl,{type:"number",label:(0,t.__)("Maximum Value",o),value:f||100,onChange:function(e){return u({max:e})}}),React.createElement(a.TextControl,{type:"number",label:(0,t.__)("Step",o),value:b,onChange:function(e){return u({step:e})}})),React.createElement(l,e,m&&React.createElement("span",{className:"acf-input-prepend"},m),React.createElement("input",{type:"number",min:p,max:f,step:b,placeholder:s,value:i,onChange:function(e){u({default_value:e.target.value})},style:{width:"auto",flexGrow:1}}),d&&React.createElement("span",{className:"acf-input-append"},d)))},save:function(){return null}})})();