"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[4598],{27676:function(e,t,s){function i(){var e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3QgbGFzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY1MjY4Nzk1MH0.FKsgtAw1W-tT6aKxCHV5Ubj8VzkzP5vuzH8ANyy_-pc";return{Authorization:"Bearer "+e}}s.d(t,{Z:function(){return i}})},60410:function(e,t,s){var i=s(30426),n=s(27676),r="/sliders",l={getAllSliders:function(){return i.Z.get(r,{headers:(0,n.Z)()})},getSliders:function(e){return i.Z.get("/sliders/"+e,{headers:(0,n.Z)()})},postSliders:function(e){return i.Z.post(r,e,{headers:(0,n.Z)()})},deleteSliders:function(e){return i.Z.delete("/sliders/"+e,{headers:(0,n.Z)()})},editSliders:function(e,t){return i.Z.put("/sliders/"+e,t,{headers:(0,n.Z)()})}};t.Z=l},64598:function(e,t,s){s.r(t);var i=s(70885),n=s(47313),r=s(27998),l=(s(24896),s(97890)),a=s(60410),c=s(46417);t.default=function(){var e=(0,n.useState)(""),t=(0,i.Z)(e,2),s=t[0],d=t[1],o=(0,n.useState)(""),u=(0,i.Z)(o,2),h=u[0],x=u[1],j=(0,n.useState)(""),m=(0,i.Z)(j,2),f=m[0],p=m[1],b=(0,n.useState)(""),g=(0,i.Z)(b,2),v=g[0],Z=g[1],C=(0,n.useState)(null),I=(0,i.Z)(C,2),S=I[0],_=I[1],N=(0,n.useState)("0"),y=(0,i.Z)(N,2),A=y[0],k=y[1],F=(0,l.s0)();return(0,c.jsxs)(r.rb,{children:[(0,c.jsx)(r.b7,{xs:12,children:(0,c.jsxs)(r.xH,{className:"mb-4",children:[(0,c.jsxs)(r.bn,{children:[(0,c.jsx)("strong",{children:"Add"})," ",(0,c.jsx)("small",{children:"Slider Details"})]}),(0,c.jsx)(r.sl,{children:(0,c.jsxs)(r.lx,{className:"row g-3",children:[(0,c.jsxs)(r.b7,{md:6,children:[(0,c.jsx)(r.L8,{htmlFor:"inputEmail4",children:"Title"}),(0,c.jsx)(r.jO,{type:"text",id:"title",onChange:function(e){return d(e.target.value)}})]}),(0,c.jsxs)(r.b7,{md:6,children:[(0,c.jsx)(r.L8,{htmlFor:"inputPassword4",children:"Short Description"}),(0,c.jsx)(r.jO,{type:"text",id:"shortDescription",onChange:function(e){return x(e.target.value)}})]}),(0,c.jsxs)("div",{className:"mb-3",children:[(0,c.jsx)(r.L8,{htmlFor:"exampleFormControlTextarea1",children:"Description"}),(0,c.jsx)(r.PB,{id:"descriptionTextArea",rows:"3",onChange:function(e){return Z(e.target.value)}})]}),(0,c.jsxs)("div",{className:"mb-3",children:[(0,c.jsx)(r.L8,{htmlFor:"formFile",children:"Banner Image"}),(0,c.jsx)(r.jO,{type:"file",id:"formFile",onChange:function(e){return _(e.target.files[0])}})]}),(0,c.jsxs)(r.b7,{md:6,children:[(0,c.jsx)(r.L8,{htmlFor:"inputPassword4",children:"Link"}),(0,c.jsx)(r.jO,{type:"text",id:"shortDescription",onChange:function(e){return p(e.target.value)}})]})]})})]})}),(0,c.jsx)(r.b7,{xs:12,children:(0,c.jsxs)(r.xH,{className:"mb-4",children:[(0,c.jsxs)(r.bn,{children:[(0,c.jsx)("strong",{children:"Status"})," ",(0,c.jsx)("small",{children:"Details"})]}),(0,c.jsx)(r.sl,{children:(0,c.jsxs)(r.lx,{children:[(0,c.jsxs)("fieldset",{className:"row mb-3",children:[(0,c.jsx)("h6",{}),(0,c.jsx)("legend",{className:"col-form-label col-sm-2 pt-0",children:"Is Active:"}),(0,c.jsxs)(r.b7,{sm:10,children:[(0,c.jsx)(r.EC,{type:"radio",name:"is active",id:"IsActive",value:"inactive",label:"In Active",onChange:function(){return k("0")},defaultChecked:!0}),(0,c.jsx)(r.EC,{type:"radio",name:"is active",id:"IsActive",value:"active",label:"Active",onChange:function(){return k("1")}})]})]}),(0,c.jsxs)(r.u5,{type:"submit",onClick:function(){var e={title:s,short_description:h,link:f,description:v,banner_image:S,language_id:1,isActive:A};a.Z.postSliders(e).then((function(e){e&&F("/slider/slider-list")}))},children:[" ","Submit"]})]})})]})})]})}}}]);