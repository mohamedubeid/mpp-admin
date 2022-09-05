"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[6826],{27676:function(e,r,t){function i(){var e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3QgbGFzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY1MjY4Nzk1MH0.FKsgtAw1W-tT6aKxCHV5Ubj8VzkzP5vuzH8ANyy_-pc";return{Authorization:"Bearer "+e}}t.d(r,{Z:function(){return i}})},55008:function(e,r,t){var i=t(30426),s=t(27676),n="/celebrities",c={getAllCelebritiesCategories:function(){return i.Z.get(n+"/categories",{headers:(0,s.Z)()})},getAllCelebritiesPosts:function(){return i.Z.get(n+"/posts",{headers:(0,s.Z)()})},getCelebritiesCategory:function(e){return i.Z.get(n+"/categories/"+e,{headers:(0,s.Z)()})},getCelebritiesPost:function(e){return i.Z.get(n+"/posts/"+e,{headers:(0,s.Z)()})},postCelebritiesCategory:function(e){return i.Z.post(n,e,{headers:(0,s.Z)()})},postCelebritiesPost:function(e){return i.Z.post(n,e,{headers:(0,s.Z)()})},deleteCelebritiesCategory:function(e){return i.Z.delete(n+"/categories/"+e,{headers:(0,s.Z)()})},deleteCelebritiesPost:function(e){return i.Z.delete(n+"/posts/"+e,{headers:(0,s.Z)()})},editCelebritiesCategory:function(e,r){return i.Z.put(n+"/categories/"+e,r,{headers:(0,s.Z)()})},editCelebritiesPost:function(e,r){return i.Z.put(n+"/posts/"+e,r,{headers:(0,s.Z)()})},getCelebrityImagesList:function(e){return i.Z.get(n+"/posts/"+e+"/images",{headers:(0,s.Z)()})},deleteImage:function(e){return i.Z.delete(n+"/posts/images"+e,{headers:(0,s.Z)()})},postImage:function(e,r){return i.Z.post(n+"/posts/"+e+"/images",r,{headers:(0,s.Z)(),"Content-Type":"multipart/form-data;"})}};r.Z=c},96826:function(e,r,t){t.r(r);var i=t(70885),s=t(47313),n=t(27998),c=(t(24896),t(22370)),o=t(33471),l=t(45498),a=t(97890),u=t(55008),d=t(46417);r.default=function(){var e=(0,s.useState)([]),r=(0,i.Z)(e,2),t=r[0],h=r[1],p=(0,a.UO)(),m=(0,a.s0)();function g(){u.Z.getCelebrityImagesList(p.id).then((function(e){console.log(e.data.images),h(e.data.images)}))}return(0,s.useEffect)((function(){g()}),[]),(0,d.jsx)(n.b7,{xs:12,children:(0,d.jsxs)(n.xH,{className:"mb-4",children:[(0,d.jsxs)(n.bn,{children:[(0,d.jsx)("strong",{children:"Image"})," ",(0,d.jsx)("small",{children:"Posts List"}),(0,d.jsx)("br",{}),(0,d.jsx)("br",{}),(0,d.jsxs)(n.u5,{onClick:function(){return m("/celebrity/post-images-add/"+p.id)},color:"primary",children:[(0,d.jsx)(c.Z,{icon:o.q,className:"me-2"}),"Add Image"]})]}),(0,d.jsx)(n.sl,{children:(0,d.jsxs)(n.Sx,{children:[(0,d.jsx)(n.V,{children:(0,d.jsxs)(n.T6,{children:[(0,d.jsx)(n.is,{scope:"col",children:"No #"}),(0,d.jsx)(n.is,{scope:"col",children:"Image"}),(0,d.jsx)(n.is,{scope:"col",children:"Image Caption"}),(0,d.jsx)(n.is,{scope:"col",children:"Status"}),(0,d.jsx)(n.is,{scope:"col",children:"Action"})]})}),(0,d.jsx)(n.NR,{children:t.map((function(e,r){return(0,d.jsxs)(n.T6,{children:[(0,d.jsx)(n.is,{scope:"row",children:e.id}),(0,d.jsx)(n.NN,{children:e.classified_image}),(0,d.jsx)(n.NN,{children:e.caption}),(0,d.jsx)(n.NN,{children:e.is_active}),(0,d.jsx)(n.NN,{children:(0,d.jsxs)(n.u5,{onClick:function(){var r;r=e.id,console.log(r),u.Z.deleteImage(r).then((function(e){e&&g()}))},color:"danger",children:["Delete",(0,d.jsx)(c.Z,{icon:l.N,className:"me-2"})]})})]},r)}))})]})})]})})}},33471:function(e,r,t){t.d(r,{q:function(){return i}});var i=["512 512","<polygon fill='var(--ci-primary-color, currentColor)' points='440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240' class='ci-primary'/>"]},45498:function(e,r,t){t.d(r,{N:function(){return i}});var i=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z' class='ci-primary'/><rect width='32' height='200' x='168' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='240' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><rect width='32' height='200' x='312' y='216' fill='var(--ci-primary-color, currentColor)' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z' class='ci-primary'/>"]}}]);