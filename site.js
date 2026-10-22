"use strict";
/* ===== SITE SETTINGS: edit these values ===== */
const CONFIG={
 email:"",            // public business email shown in the footer and used if the form service is not set
 phone:"",            // optional
 address:"",          // optional, only a real address
 endpoint:"",         // form service URL (e.g. Formspree) that accepts a JSON POST and emails you
 careerServicesUrl:"" // official link to Ascendant Career Services, if one exists
};
/* Photography: add a licensed photo file to /images, then fill in src, alt and credit. Leave src empty to keep the designed graphic. */
const IMAGES={
 hero:{src:"",alt:"",credit:""},
 serve:{src:"",alt:"",credit:""},
 about:{src:"",alt:"",credit:""}
};
/* ============================================ */
document.querySelectorAll("[data-slot]").forEach(w=>{const i=IMAGES[w.dataset.slot];if(!i||!i.src||!i.alt)return;const f=w.querySelector(".ph"),im=new Image();im.src=i.src;im.alt=i.alt;im.decoding="async";if(w.dataset.slot!=="hero")im.loading="lazy";f.appendChild(im);f.classList.add("has");f.removeAttribute("aria-hidden");if(i.credit){const c=w.querySelector(".cred");c.textContent="Photo: "+i.credit;c.hidden=false}});
document.querySelectorAll("[data-needs]").forEach(e=>{const k=e.dataset.needs,v=CONFIG[k];if(!v)return;e.hidden=false;const a=e.querySelector("a");if(!a)return;if(k==="email")a.href="mailto:"+v;else if(k==="careerServicesUrl")a.href=v;if(k!=="careerServicesUrl")a.textContent=v});
document.querySelectorAll("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());
const mb=document.getElementById("menu"),nav=document.getElementById("nav");
if(mb&&nav){const set=o=>{nav.classList.toggle("open",o);mb.setAttribute("aria-expanded",String(o));mb.textContent=o?"Close":"Menu";document.body.style.overflow=o?"hidden":""};mb.addEventListener("click",()=>set(!nav.classList.contains("open")));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){set(false);mb.focus()}});nav.addEventListener("click",e=>{if(e.target.closest("a"))set(false)});matchMedia("(min-width:961px)").addEventListener("change",e=>{if(e.matches)set(false)})}
const f=document.getElementById("enq");
if(f)f.addEventListener("submit",async e=>{e.preventDefault();const m=document.getElementById("fmsg"),d=Object.fromEntries(new FormData(f));if(d.website_url)return;
 f.querySelectorAll(".err").forEach(x=>x.remove());f.querySelectorAll("[aria-invalid]").forEach(x=>x.removeAttribute("aria-invalid"));let bad=null;
 const need=(n,msg,t)=>{const el=f.elements[n];if(t(el))return;el.setAttribute("aria-invalid","true");const p=document.createElement("p");p.className="err";p.id=n+"-e";p.textContent=msg;el.setAttribute("aria-describedby",p.id);(el.closest(".chk")||el).insertAdjacentElement("afterend",p);bad=bad||el};
 need("name","Please enter your name.",x=>x.value.trim().length>1);need("email","Please enter a valid email address.",x=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.value.trim()));need("topic","Please choose a topic.",x=>x.value);need("message","Please tell us a little about what you are working toward.",x=>x.value.trim().length>9);need("consent","Please confirm you have read the privacy policy.",x=>x.checked);
 if(bad){bad.focus();m.innerHTML="";return}
 const ref="AT-"+new Date().toISOString().slice(0,10).replace(/-/g,"")+"-"+Math.random().toString(36).slice(2,6).toUpperCase(),body={ref,name:d.name.trim(),email:d.email.trim(),topic:d.topic,message:d.message.trim(),consent:"Privacy policy confirmed "+new Date().toISOString()},btn=f.querySelector("button");
 if(CONFIG.endpoint){btn.disabled=true;btn.textContent="Sending…";try{const r=await fetch(CONFIG.endpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(body)});if(!r.ok)throw 0;f.reset();m.innerHTML='<p class="note" role="status">Thank you. Your enquiry has been sent. Your reference is <strong>'+ref+'</strong>. We will reply by email.</p>'}catch{m.innerHTML='<p class="note" role="alert">Sorry, your enquiry could not be sent. Please try again shortly'+(CONFIG.email?" or email "+CONFIG.email:"")+".</p>"}btn.disabled=false;btn.textContent="Send enquiry"}
 else m.innerHTML='<p class="note" role="alert">This site is not yet connected to an enquiry service, so your message has <strong>not</strong> been sent.'+(CONFIG.email?' <a href="mailto:'+CONFIG.email+"?subject="+encodeURIComponent("Enquiry "+ref)+"&body="+encodeURIComponent(d.message)+'">Send it by email instead</a>.':"")+"</p>"});
