import{A as u,u as i,m,q as o,x as p,c as d,d as t,e as f,f as _,g as x,B as v,F as g,o as s}from"./index-3fb98db6.js";const h={class:"flex flex-column gap-3 h-full pb-6"},y={__name:"ToolDetail",setup(T){const a=u(),l=i(),{onGetterToolDetail:n,onActionGetToolDetail:b}=m(),r=o(()=>+a.fullPath.split("/").length==3);return o(()=>n.value),p(()=>{}),(k,e)=>{const c=d("router-view");return s(),t(g,null,[f("div",h,[_(c)]),r.value?(s(),t("div",{key:0,style:{right:"2rem",bottom:"2rem",color:"#fff"},class:"fixed z-5 py-2 px-4 border-round-3xl on-click box-shadow-1 bg-main-color",onClick:e[0]||(e[0]=R=>x(l).replace({name:"Tool"}))}," Thoát ")):v("",!0)],64)}}};export{y as default};