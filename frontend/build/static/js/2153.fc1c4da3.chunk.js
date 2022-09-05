"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[2153],{27676:function(e,t,s){function n(){var e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3QgbGFzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY1MjY4Nzk1MH0.FKsgtAw1W-tT6aKxCHV5Ubj8VzkzP5vuzH8ANyy_-pc";return{Authorization:"Bearer "+e}}s.d(t,{Z:function(){return n}})},32279:function(e,t,s){var n=s(30426),r=s(27676),i={getAllNewsCategories:function(){return n.Z.get("/news/categories",{headers:(0,r.Z)()})},getAllNewsPosts:function(){return n.Z.get("/news/posts",{headers:(0,r.Z)()})},getNewsCategory:function(e){return n.Z.get("/news/categories/"+e,{headers:(0,r.Z)()})},getNewsPost:function(e){return n.Z.get("/news/posts/"+e,{headers:(0,r.Z)()})},postNewsCategory:function(e){return n.Z.post("/news/categories/",e,{headers:(0,r.Z)()})},postNewsPost:function(e){return n.Z.post("/news/posts/",e,{headers:(0,r.Z)()})},deleteNewsCategory:function(e){return n.Z.delete("/news/categories/"+e,{headers:(0,r.Z)()})},deleteNewsPost:function(e){return n.Z.delete("/news/posts/"+e,{headers:(0,r.Z)()})},editNewsCategory:function(e,t){return n.Z.put("/news/categories/"+e,t,{headers:(0,r.Z)()})},editNewsPost:function(e,t){return n.Z.put("/news/posts/"+e,t,{headers:(0,r.Z)()})},getNewsImagesList:function(e){return n.Z.get("/news/posts/"+e+"/images",{headers:(0,r.Z)()})},deleteImage:function(e){return n.Z.delete("/news/posts/images"+e,{headers:(0,r.Z)()})},postImage:function(e,t){return n.Z.post("/news/posts/"+e+"/images",t,{headers:(0,r.Z)(),"Content-Type":"multipart/form-data;"})}};t.Z=i},12153:function(e,t,s){s.r(t);var n=s(70885),r=s(47313),i=s(27998),a=(s(24896),s(97890)),o=s(32279),l=s(29085),c=(s(10310),s(46417));t.default=function(){var e=(0,r.useState)(""),t=(0,n.Z)(e,2),s=t[0],d=t[1],u=(0,r.useState)(""),h=(0,n.Z)(u,2),m=h[0],x=h[1],g=(0,r.useState)(""),p=(0,n.Z)(g,2),f=p[0],j=p[1],Z=(0,r.useState)(""),w=(0,n.Z)(Z,2),C=w[0],b=w[1],N=(0,r.useState)(""),v=(0,n.Z)(N,2),I=v[0],y=v[1],_=(0,r.useState)(""),F=(0,n.Z)(_,2),S=F[0],T=F[1],k=(0,r.useState)(!1),P=(0,n.Z)(k,2),A=P[0],z=P[1],L=(0,l.p)(),M=L.quill,R=L.quillRef,E=(0,a.s0)();return r.useEffect((function(){M&&M.on("text-change",(function(e,t,s){j(R.current.firstChild.innerHTML)}))}),[M]),(0,c.jsxs)(i.rb,{children:[(0,c.jsx)(i.b7,{xs:12,children:(0,c.jsxs)(i.xH,{className:"mb-4",children:[(0,c.jsxs)(i.bn,{children:[(0,c.jsx)("strong",{children:"Add"})," ",(0,c.jsx)("small",{children:"Category Details"})]}),(0,c.jsx)(i.sl,{children:(0,c.jsxs)(i.lx,{className:"row g-3",children:[(0,c.jsxs)(i.b7,{md:6,children:[(0,c.jsx)(i.L8,{htmlFor:"inputEmail4",children:"Title"}),(0,c.jsx)(i.jO,{type:"text",id:"inputTitle",onChange:function(e){return d(e.target.value)}})]}),(0,c.jsxs)(i.b7,{md:6,children:[(0,c.jsx)(i.L8,{htmlFor:"inputPassword4",children:"Slug"}),(0,c.jsx)(i.jO,{type:"text",id:"inputSlug",onChange:function(e){return x(e.target.value)}})]}),(0,c.jsx)("div",{className:"mb-3",children:(0,c.jsx)("div",{children:(0,c.jsx)("div",{ref:R})})})]})})]})}),(0,c.jsx)(i.b7,{xs:12,children:(0,c.jsxs)(i.xH,{className:"mb-4",children:[(0,c.jsxs)(i.bn,{children:[(0,c.jsx)("strong",{children:"SEO"})," ",(0,c.jsx)("small",{children:"Details"})]}),(0,c.jsx)(i.sl,{children:(0,c.jsxs)(i.lx,{children:[(0,c.jsxs)("div",{className:"mb-3",children:[(0,c.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Meta Title"}),(0,c.jsx)(i.PB,{id:"exampleFormControlTextarea1",rows:"3",onChange:function(e){return b(e.target.value)}})]}),(0,c.jsxs)("div",{className:"mb-3",children:[(0,c.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Meta Keywords"}),(0,c.jsx)(i.PB,{id:"exampleFormControlTextarea1",rows:"3",onChange:function(e){return y(e.target.value)}})]}),(0,c.jsxs)("div",{className:"mb-3",children:[(0,c.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Meta Description"}),(0,c.jsx)(i.PB,{id:"exampleFormControlTextarea1",rows:"3",onChange:function(e){return T(e.target.value)}})]}),(0,c.jsxs)("fieldset",{className:"row mb-3",children:[(0,c.jsx)("legend",{className:"col-form-label col-sm-2 pt-0",children:"Is Active:"}),(0,c.jsxs)(i.b7,{sm:10,children:[(0,c.jsx)(i.EC,{type:"radio",name:"gridRadios",id:"gridRadios1",value:"option1",label:"In Active",onChange:function(){return z("0")},defaultChecked:!0}),(0,c.jsx)(i.EC,{type:"radio",name:"gridRadios",id:"gridRadios2",value:"option2",label:"Active",onChange:function(){return z("1")}})]})]}),(0,c.jsx)(i.u5,{type:"submit",onClick:function(){var e={title:s,slug:m,description:f,meta_title:C,meta_keywords:I,meta_description:S,language_id:1,is_active:A};o.Z.postNewsCategory(e).then((function(e){e&&E("/news/categories")}))},children:"Submit"})]})})]})})]})}}}]);