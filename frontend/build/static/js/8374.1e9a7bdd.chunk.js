"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[8374],{27676:function(e,t,n){function s(){var e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InRlc3QgbGFzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY1MjY4Nzk1MH0.FKsgtAw1W-tT6aKxCHV5Ubj8VzkzP5vuzH8ANyy_-pc";return{Authorization:"Bearer "+e}}n.d(t,{Z:function(){return s}})},20830:function(e,t,n){var s=n(30426),r=n(27676),a="/events",i={getAllEvents:function(){return s.Z.get(a,{headers:(0,r.Z)()})},getEvents:function(e){return s.Z.get("/events/"+e,{headers:(0,r.Z)()})},postEvents:function(e){return s.Z.post(a,e,{headers:(0,r.Z)()})},deleteEvents:function(e){return s.Z.delete("/events/"+e,{headers:(0,r.Z)()})},editEvents:function(e,t){return s.Z.put("/events/"+e,t,{headers:(0,r.Z)()})},getEventsImagesList:function(e){return s.Z.get("/events/posts/"+e+"/images",{headers:(0,r.Z)()})},deleteImage:function(e){return s.Z.delete("/events/posts/images"+e,{headers:(0,r.Z)()})},postImage:function(e,t){return s.Z.post("/events/posts/"+e+"/images",t,{headers:(0,r.Z)(),"Content-Type":"multipart/form-data;"})}};t.Z=i},8374:function(e,t,n){n.r(t);var s=n(70885),r=n(47313),a=n(97890),i=n(27998),l=(n(24896),n(20830)),d=n(29085),u=(n(10310),n(46417));t.default=function(){var e=(0,r.useState)(""),t=(0,s.Z)(e,2),n=t[0],c=t[1],o=(0,r.useState)(""),h=(0,s.Z)(o,2),x=h[0],m=h[1],p=(0,r.useState)(""),j=(0,s.Z)(p,2),g=j[0],v=j[1],f=(0,r.useState)(""),b=(0,s.Z)(f,2),Z=b[0],C=b[1],F=(0,r.useState)(""),I=(0,s.Z)(F,2),_=I[0],w=I[1],y=(0,r.useState)(""),S=(0,s.Z)(y,2),E=S[0],L=S[1],N=(0,r.useState)(""),O=(0,s.Z)(N,2),T=O[0],P=O[1],z=(0,r.useState)(""),A=(0,s.Z)(z,2),k=A[0],D=A[1],M=(0,r.useState)(""),B=(0,s.Z)(M,2),H=B[0],V=B[1],J=(0,r.useState)(""),G=(0,s.Z)(J,2),K=G[0],R=G[1],W=(0,r.useState)(null),Y=(0,s.Z)(W,2),q=Y[0],U=Y[1],X=(0,r.useState)(""),Q=(0,s.Z)(X,2),$=Q[0],ee=Q[1],te=(0,r.useState)(""),ne=(0,s.Z)(te,2),se=ne[0],re=ne[1],ae=(0,r.useState)(""),ie=(0,s.Z)(ae,2),le=ie[0],de=ie[1],ue=(0,r.useState)("0"),ce=(0,s.Z)(ue,2),oe=ce[0],he=ce[1],xe=(0,d.p)(),me=xe.quill,pe=xe.quillRef,je=(0,a.s0)();return r.useEffect((function(){me&&me.on("text-change",(function(e,t,n){R(pe.current.firstChild.innerHTML)}))}),[me]),(0,u.jsxs)(i.rb,{children:[(0,u.jsx)(i.b7,{xs:12,children:(0,u.jsxs)(i.xH,{className:"mb-4",children:[(0,u.jsxs)(i.bn,{children:[(0,u.jsx)("strong",{children:"Add"})," ",(0,u.jsx)("small",{children:"Event Details"})]}),(0,u.jsx)(i.sl,{children:(0,u.jsxs)(i.lx,{className:"row g-3",children:[(0,u.jsxs)(i.b7,{md:6,children:[(0,u.jsx)(i.L8,{htmlFor:"inputEmail4",children:"Title"}),(0,u.jsx)(i.jO,{type:"text",id:"title",onChange:function(e){return c(e.target.value)}})]}),(0,u.jsxs)(i.b7,{md:6,children:[(0,u.jsx)(i.L8,{htmlFor:"inputPassword4",children:"Slug"}),(0,u.jsx)(i.jO,{type:"text",id:"slug",onChange:function(e){return m(e.target.value)}})]}),(0,u.jsxs)(i.b7,{md:6,children:[(0,u.jsx)(i.L8,{htmlFor:"inputPassword4",children:"Telephone Number"}),(0,u.jsx)(i.jO,{type:"text",id:"slug",onChange:function(e){return v(e.target.value)}})]}),(0,u.jsxs)(i.b7,{md:6,children:[(0,u.jsx)(i.L8,{htmlFor:"inputPassword4",children:"Event Date"}),(0,u.jsx)(i.jO,{type:"text",id:"slug",onChange:function(e){return C(e.target.value)}})]}),(0,u.jsxs)(i.b7,{md:6,children:[(0,u.jsx)(i.L8,{htmlFor:"inputPassword4",children:"Venue"}),(0,u.jsx)(i.jO,{type:"text",id:"slug",onChange:function(e){return w(e.target.value)}})]}),(0,u.jsxs)(i.b7,{md:6,children:[(0,u.jsx)(i.L8,{htmlFor:"inputPassword4",children:"Organizer"}),(0,u.jsx)(i.jO,{type:"text",id:"slug",onChange:function(e){return L(e.target.value)}})]}),(0,u.jsxs)(i.b7,{md:6,children:[(0,u.jsx)(i.L8,{htmlFor:"inputPassword4",children:"Event Fax"}),(0,u.jsx)(i.jO,{type:"text",id:"slug",onChange:function(e){return P(e.target.value)}})]}),(0,u.jsxs)(i.b7,{md:6,children:[(0,u.jsx)(i.L8,{htmlFor:"inputPassword4",children:"Event Email"}),(0,u.jsx)(i.jO,{type:"text",id:"slug",onChange:function(e){return D(e.target.value)}})]}),(0,u.jsxs)(i.b7,{md:6,children:[(0,u.jsx)(i.L8,{htmlFor:"inputPassword4",children:"Website"}),(0,u.jsx)(i.jO,{type:"text",id:"slug",onChange:function(e){return V(e.target.value)}})]}),(0,u.jsxs)("div",{className:"mb-3",children:[(0,u.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Description"}),(0,u.jsx)("div",{children:(0,u.jsx)("div",{ref:pe})})]}),(0,u.jsxs)("div",{className:"mb-3",children:[(0,u.jsx)(i.L8,{htmlFor:"formFile",children:"Banner Image"}),(0,u.jsx)(i.jO,{type:"file",id:"formFile",onChange:function(e){return U(e.target.files[0])}})]})]})})]})}),(0,u.jsx)(i.b7,{xs:12,children:(0,u.jsxs)(i.xH,{className:"mb-4",children:[(0,u.jsxs)(i.bn,{children:[(0,u.jsx)("strong",{children:"SEO"})," ",(0,u.jsx)("small",{children:"Details"})]}),(0,u.jsx)(i.sl,{children:(0,u.jsxs)(i.lx,{children:[(0,u.jsxs)("div",{className:"mb-3",children:[(0,u.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Meta Title"}),(0,u.jsx)(i.PB,{id:"metaTitle",rows:"3",onChange:function(e){return ee(e.target.value)}})]}),(0,u.jsxs)("div",{className:"mb-3",children:[(0,u.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Meta Tags"}),(0,u.jsx)(i.PB,{id:"metaKeywords",rows:"3",onChange:function(e){return re(e.target.value)}})]}),(0,u.jsxs)("div",{className:"mb-3",children:[(0,u.jsx)(i.L8,{htmlFor:"exampleFormControlTextarea1",children:"Meta Description"}),(0,u.jsx)(i.PB,{id:"metaDescription",rows:"3",onChange:function(e){return de(e.target.value)}})]}),(0,u.jsxs)("fieldset",{className:"row mb-3",children:[(0,u.jsx)("legend",{className:"col-form-label col-sm-2 pt-0",children:"Is Active:"}),(0,u.jsxs)(i.b7,{sm:10,children:[(0,u.jsx)(i.EC,{type:"radio",name:"is active",id:"IsActive",value:"inactive",label:"In Active",onChange:function(){return he("0")},defaultChecked:!0}),(0,u.jsx)(i.EC,{type:"radio",name:"is active",id:"IsActive",value:"active",label:"Active",onChange:function(){return he("1")}})]})]}),(0,u.jsx)(i.u5,{type:"submit",onClick:function(){var e=new FormData;e.append("banner_image",q),e.append("title",n),e.append("slug",x),e.append("telephone_number",g),e.append("event_date",Z),e.append("venue",_),e.append("organizer",E),e.append("event_fax",T),e.append("event_email",k),e.append("website",H),e.append("meta_title",$),e.append("meta_tags",se),e.append("meta_description",le),e.append("language_id",1),e.append("description",K),e.append("is_active",oe),l.Z.postEvents(e).then((function(e){e&&je("/events/events-list")}))},children:"Submit"})]})})]})})]})}}}]);