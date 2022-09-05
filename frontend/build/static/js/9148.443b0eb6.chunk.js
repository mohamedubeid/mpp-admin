"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[9148],{27676:function(e,s,r){function t(){var e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3QgbGFzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY1MjY4Nzk1MH0.FKsgtAw1W-tT6aKxCHV5Ubj8VzkzP5vuzH8ANyy_-pc";return{Authorization:"Bearer "+e}}r.d(s,{Z:function(){return t}})},32279:function(e,s,r){var t=r(30426),n=r(27676),i={getAllNewsCategories:function(){return t.Z.get("/news/categories",{headers:(0,n.Z)()})},getAllNewsPosts:function(){return t.Z.get("/news/posts",{headers:(0,n.Z)()})},getNewsCategory:function(e){return t.Z.get("/news/categories/"+e,{headers:(0,n.Z)()})},getNewsPost:function(e){return t.Z.get("/news/posts/"+e,{headers:(0,n.Z)()})},postNewsCategory:function(e){return t.Z.post("/news/categories/",e,{headers:(0,n.Z)()})},postNewsPost:function(e){return t.Z.post("/news/posts/",e,{headers:(0,n.Z)()})},deleteNewsCategory:function(e){return t.Z.delete("/news/categories/"+e,{headers:(0,n.Z)()})},deleteNewsPost:function(e){return t.Z.delete("/news/posts/"+e,{headers:(0,n.Z)()})},editNewsCategory:function(e,s){return t.Z.put("/news/categories/"+e,s,{headers:(0,n.Z)()})},editNewsPost:function(e,s){return t.Z.put("/news/posts/"+e,s,{headers:(0,n.Z)()})},getNewsImagesList:function(e){return t.Z.get("/news/posts/"+e+"/images",{headers:(0,n.Z)()})},deleteImage:function(e){return t.Z.delete("/news/posts/images"+e,{headers:(0,n.Z)()})},postImage:function(e,s){return t.Z.post("/news/posts/"+e+"/images",s,{headers:(0,n.Z)(),"Content-Type":"multipart/form-data;"})}};s.Z=i},59148:function(e,s,r){r.r(s);var t=r(70885),n=r(47313),i=r(27998),c=(r(24896),r(22370)),o=r(33471),a=r(45498),l=r(97890),u=r(32279),d=r(46417);s.default=function(){var e=(0,n.useState)([]),s=(0,t.Z)(e,2),r=s[0],h=s[1],p=(0,l.UO)(),m=(0,l.s0)();function g(){u.Z.getNewsImagesList(p.id).then((function(e){console.log(e.data.images),h(e.data.images)}))}return(0,n.useEffect)((function(){g()}),[]),(0,d.jsx)(i.b7,{xs:12,children:(0,d.jsxs)(i.xH,{className:"mb-4",children:[(0,d.jsxs)(i.bn,{children:[(0,d.jsx)("strong",{children:"Image"})," ",(0,d.jsx)("small",{children:"Posts List"}),(0,d.jsx)("br",{}),(0,d.jsx)("br",{}),(0,d.jsxs)(i.u5,{onClick:function(){return m("/news/post-images-add/"+p.id)},color:"primary",children:[(0,d.jsx)(c.Z,{icon:o.q,className:"me-2"}),"Add Image"]})]}),(0,d.jsx)(i.sl,{children:(0,d.jsxs)(i.Sx,{children:[(0,d.jsx)(i.V,{children:(0,d.jsxs)(i.T6,{children:[(0,d.jsx)(i.is,{scope:"col",children:"No #"}),(0,d.jsx)(i.is,{scope:"col",children:"Image"}),(0,d.jsx)(i.is,{scope:"col",children:"Image Caption"}),(0,d.jsx)(i.is,{scope:"col",children:"Status"}),(0,d.jsx)(i.is,{scope:"col",children:"Action"})]})}),(0,d.jsx)(i.NR,{children:r.map((function(e,s){return(0,d.jsxs)(i.T6,{children:[(0,d.jsx)(i.is,{scope:"row",children:e.id}),(0,d.jsx)(i.NN,{children:e.classified_image}),(0,d.jsx)(i.NN,{children:e.caption}),(0,d.jsx)(i.NN,{children:e.is_active}),(0,d.jsx)(i.NN,{children:(0,d.jsxs)(i.u5,{onClick:function(){var s;s=e.id,console.log(s),u.Z.deleteImage(s).then((function(e){e&&g()}))},color:"danger",children:["Delete",(0,d.jsx)(c.Z,{icon:a.N,className:"me-2"})]})})]},s)}))})]})})]})})}},33471:function(e,s,r){r.d(s,{q:function(){return t}});var t=["512 512","<polygon fill='var(--ci-primary-color, currentColor)' points='440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240' class='ci-primary'/>"]},45498:function(e,s,r){r.d(s,{N:function(){return t}});var t=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z' class='ci-primary'/><rect width='32' height='200' x='168' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='240' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='312' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z' class='ci-primary'/>"]}}]);