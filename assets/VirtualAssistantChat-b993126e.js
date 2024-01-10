import{c as M,o as s,d as l,e as t,t as C,z as v,n as L,A as U,u as G,a1 as H,R as _,q as O,L as z,x as D,J as h,v as B,f as E,F as S,y as F,g as p,B as A,a2 as N,C as I,a3 as K,w as J,G as W}from"./index-3c537107.js";import{_ as P}from"./ButtonBack-c84175dc.js";const Q={class:"flex gap-2"},X=["src"],Y={class:"flex flex-column gap-1 w-full"},Z={class:"font-bold text-800"},ee=["innerHTML"],V={__name:"UserChat",props:{image:{type:String,required:!1,default:""},name:{type:String,required:!1,default:""},message:{type:String,required:!1,default:""}},setup(r){return(x,y)=>{const o=M("Skeleton");return s(),l("div",Q,[t("img",{class:"w-2rem h-2rem border-circle object-fit-cover box-shadow-1",src:r.image||"https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg",alt:"Lỗi ảnh"},null,8,X),t("div",Y,[t("span",Z,C(r.name),1),r.message?(s(),l("div",{key:0,innerHTML:r.message,style:{"text-align":"justify","white-space":"pre-wrap"},class:"text-800 line-height-3"},null,8,ee)):(s(),v(o,{key:1,class:"w-full mt-2",height:"4rem"}))])])}}},te=t("br",null,null,-1),se=t("br",null,null,-1),ae={style:{"max-width":"40rem"},class:"flex flex-column gap-4 m-auto w-full h-full pb-6"},ne={key:1,class:"flex h-full justify-content-center align-items-center"},le={class:"flex flex-column gap-3 align-items-center"},oe=t("img",{class:"w-10rem h-10rem",src:"https://cdn-icons-png.flaticon.com/512/1698/1698535.png",alt:"Lỗi ảnh"},null,-1),ie={class:"text-center line-height-2"},re={class:"text-main-color"},ce={style:{bottom:"1.8rem"},class:"fixed z-5 left-0 right-0 px-3 bg-white"},ue={style:{"max-width":"50rem"},class:"p-3 border-round-3xl box-shadow-1 flex bg-white m-auto flex-1"},me=["onKeypress"],de={style:{"padding-left":"0.7rem"},class:"border-left-1 text-400"},he={key:0,class:"pi pi-spin pi-spinner text-900"},fe={__name:"VirtualAssistantChat",setup(r){const x=L(),y=U(),o=G(),{onGetterMessages:c,onActionChat:R,onActionCheckLinkChat:q,onActionGetVirtualAssistant:$}=H(),u=_(""),i=_(!1),g=_(!1),f=O(()=>y.query.id),m=()=>{setTimeout(()=>{window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})},1)},b=e=>{switch(e){case"user":return{image:"../../../../../public/images/avatar-you.png",name:"Bạn"};case"assistant":return{image:"../../../../../public/images/avatar-bot.jpg",name:"Bot"};default:return""}},j=()=>{if(!B.value){o.replace({name:"Home"});return}c.value=[],o.replace({name:"VirtualAssistant"})},w=async()=>{if(i.value)return;let e="";e=u.value,u.value="",c.value.push({role:"user",content:e}),m(),i.value=!0,R({userId:f.value,content:e}).then(n=>{c.value.push(n.data),m(),i.value=!1}).catch(()=>{i.value=!1})};return z(i,e=>{e?setTimeout(()=>{g.value=!0,m()},600):g.value=!1}),D(async()=>{var a,d,k,T;const e=await q(f.value);if(e.success)h.value.fullName=((a=e==null?void 0:e.data)==null?void 0:a.fullName)||"",h.value.userName=((d=e==null?void 0:e.data)==null?void 0:d.userName)||"";else{o.replace({name:"NotFound"});return}if(m(),!B.value)return;const n=await $(f.value,!0);if(!((k=n.data)!=null&&k.system)||!((T=n.data)!=null&&T.assistant)){x.info("Bot không thể hoạt động khi chưa được cấu hình!"),o.replace({name:"VirtualAssistant"});return}}),(e,n)=>(s(),l(S,null,[E(P,{onOnClick:j}),te,se,t("div",ae,[(s(!0),l(S,null,F(p(c),(a,d)=>(s(),v(V,{key:d,image:b(a.role).image,name:b(a.role).name,message:a.content},null,8,["image","name","message"]))),128)),g.value?(s(),v(V,{key:0,image:"../../../../../public/images/avatar-bot.jpg",name:"Bot"})):A("",!0),p(c).length?A("",!0):(s(),l("div",ne,[t("div",le,[oe,t("span",ie,[N(" Chào bạn, tôi là chat bot do "),t("span",re,C(p(h).fullName||p(h).userName),1),N(" tạo ra! ")])])]))]),t("div",ce,[t("div",ue,[I(t("input",{"onUpdate:modelValue":n[0]||(n[0]=a=>u.value=a),type:"text",class:"w-full border-none outline-none",placeholder:"Bạn muốn hỏi gì?",onKeypress:J(w,["enter"])},null,40,me),[[K,u.value]]),t("div",de,[i.value?(s(),l("i",he)):(s(),l("i",{key:1,class:W(["pi pi-angle-right text-900 on-click",{"p-disabled":!u.value}]),onClick:w},null,2))])])])],64))}};export{fe as default};
