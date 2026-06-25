(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();let K=[],A;function Y(){const e=location.hash.replace(/^#/,"")||"/",[t,a=""]=e.split("?");return{path:t,query:new URLSearchParams(a)}}function D(e){for(const t of K){const a=t.path.split("/").filter(Boolean),s=e.split("/").filter(Boolean);if(a.length!==s.length)continue;const n={};let i=!0;for(let r=0;r<a.length;r++)if(a[r].startsWith(":"))n[a[r].slice(1)]=decodeURIComponent(s[r]);else if(a[r]!==s[r]){i=!1;break}if(i)return{route:t,params:n}}return null}function q(){var s,n;const{path:e,query:t}=Y(),a=D(e)??D("/404");if(!a){A.innerHTML="<p>Not found</p>";return}A.innerHTML=a.route.render(a.params,t),(n=(s=a.route).mounted)==null||n.call(s,a.params,t),window.scrollTo(0,0)}function z(e,t){A=e,K=t,window.addEventListener("hashchange",q),q()}const U="afritravel.state.v1",E={bookings:[],role:"customer",user:null},G=new Set;function _(){try{const e=localStorage.getItem(U);if(e)return{...E,...JSON.parse(e)}}catch{}return structuredClone(E)}let f=_();function $(){try{localStorage.setItem(U,JSON.stringify(f))}catch{}G.forEach(e=>e())}const p={get(){return f},subscribe(e){return G.add(e),()=>G.delete(e)},addBooking(e){f.bookings=[e,...f.bookings],$()},setBookingStatus(e,t){f.bookings=f.bookings.map(a=>a.id===e?{...a,status:t}:a),$()},setRole(e){f.role=e,$()},login(e,t){f.user={name:e,email:t},$()},logout(){f.user=null,$()},reset(){f=structuredClone(E),$()}};function J(e="id"){return`${e}-${Math.random().toString(36).slice(2,8)}${Date.now().toString(36).slice(-4)}`}function X(){const{user:e,role:t}=p.get(),s=[{href:"#/",label:"Stays"},{href:"#/visa",label:"Visa-free"},{href:"#/merchant",label:"Merchant"},{href:"#/admin",label:"Admin"}].map(i=>`<a class="nav-link" href="${i.href}">${i.label}</a>`).join(""),n=e?`<span class="nav-user">${e.name}</span>
       <button class="btn btn-ghost" data-action="logout">Sign out</button>`:'<a class="btn btn-ghost" href="#/login">Sign in</a>';return`
    <header class="nav">
      <a class="brand" href="#/">
        <span class="brand-mark">▲</span> Afri<strong>Travel</strong>
      </a>
      <nav class="nav-links">${s}</nav>
      <div class="nav-account">
        <span class="role-pill" title="Active portal">${t}</span>
        ${n}
      </div>
    </header>`}function Q(){return`
    <footer class="footer">
      <div class="footer-cols">
        <div>
          <div class="brand"><span class="brand-mark">▲</span> Afri<strong>Travel</strong></div>
          <p class="muted">Stay anywhere in Africa. Move freely across it.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="#/">All stays</a>
          <a href="#/visa">Visa-free travel</a>
        </div>
        <div>
          <h4>Partners</h4>
          <a href="#/merchant">List your property</a>
          <a href="#/admin">Admin console</a>
        </div>
        <div>
          <h4>Pay with</h4>
          <span class="muted">Paystack · Mobile Money</span>
        </div>
      </div>
      <div class="footer-base muted">
        © ${new Date().getFullYear()} AfriTravel — demo build. Not affiliated with Booking.com.
        Visa data is illustrative, not legal advice.
      </div>
    </footer>`}function h(e){return`${X()}<main class="page">${e}</main>${Q()}`}function y(){var e;(e=document.querySelector('[data-action="logout"]'))==null||e.addEventListener("click",()=>{p.logout(),location.hash="/"})}const ee={NGN:"₦",GHS:"GH₵",KES:"KSh",ZAR:"R",USD:"$",RWF:"FRw",EGP:"E£"};function u(e,t){return`${ee[t]??""}${e.toLocaleString("en-US")}`}function R(e,t){const a=new Date(e).getTime(),s=new Date(t).getTime();return Number.isNaN(a)||Number.isNaN(s)||s<=a?0:Math.round((s-a)/(1e3*60*60*24))}function j(e){const t=Math.round(e);return"★".repeat(t)+"☆".repeat(5-t)}function C(e){let t=0;for(let n=0;n<e.length;n++)t=t*31+e.charCodeAt(n)>>>0;const a=t%360,s=(a+40)%360;return`linear-gradient(135deg, hsl(${a} 55% 45%), hsl(${s} 60% 35%))`}function O(e){const t=new Date;return t.setDate(t.getDate()+e),t.toISOString().slice(0,10)}const k=[{code:"NG",name:"Nigeria",flag:"🇳🇬",region:"West",capital:"Abuja"},{code:"GH",name:"Ghana",flag:"🇬🇭",region:"West",capital:"Accra"},{code:"SN",name:"Senegal",flag:"🇸🇳",region:"West",capital:"Dakar"},{code:"CI",name:"Côte d'Ivoire",flag:"🇨🇮",region:"West",capital:"Yamoussoukro"},{code:"KE",name:"Kenya",flag:"🇰🇪",region:"East",capital:"Nairobi"},{code:"TZ",name:"Tanzania",flag:"🇹🇿",region:"East",capital:"Dodoma"},{code:"RW",name:"Rwanda",flag:"🇷🇼",region:"East",capital:"Kigali"},{code:"UG",name:"Uganda",flag:"🇺🇬",region:"East",capital:"Kampala"},{code:"ET",name:"Ethiopia",flag:"🇪🇹",region:"East",capital:"Addis Ababa"},{code:"ZA",name:"South Africa",flag:"🇿🇦",region:"Southern",capital:"Pretoria"},{code:"NA",name:"Namibia",flag:"🇳🇦",region:"Southern",capital:"Windhoek"},{code:"BW",name:"Botswana",flag:"🇧🇼",region:"Southern",capital:"Gaborone"},{code:"MA",name:"Morocco",flag:"🇲🇦",region:"North",capital:"Rabat"},{code:"EG",name:"Egypt",flag:"🇪🇬",region:"North",capital:"Cairo"},{code:"TN",name:"Tunisia",flag:"🇹🇳",region:"North",capital:"Tunis"}],P=e=>k.find(t=>t.code===e),I=e=>{var t;return((t=P(e))==null?void 0:t.name)??e};function H(e){const t=P(e.countryCode);return`
    <a class="card stay-card" href="#/stay/${e.id}">
      <div class="card-media" style="background:${C(e.id)}">
        <span class="card-emoji">${e.image}</span>
        ${e.featured?'<span class="badge">Featured</span>':""}
      </div>
      <div class="card-body">
        <div class="card-row">
          <h3>${e.name}</h3>
          <span class="rating" title="${e.rating} from ${e.reviews} reviews">
            ${e.rating.toFixed(1)} <span class="stars">${j(e.rating)}</span>
          </span>
        </div>
        <p class="muted">${(t==null?void 0:t.flag)??""} ${e.city}, ${(t==null?void 0:t.name)??e.countryCode} · ${e.type}</p>
        <p class="card-amenities muted">${e.amenities.slice(0,3).join(" · ")}</p>
        <div class="card-row card-foot">
          <span class="price">${u(e.pricePerNight,e.currency)}<span class="muted"> / night</span></span>
          <span class="muted">${e.bedrooms} bd · ${e.maxGuests} guests</span>
        </div>
      </div>
    </a>`}const v=[{id:"stay-lag-001",name:"Lekki Skyline Apartments",type:"Apartment",city:"Lagos",countryCode:"NG",description:"Sleek serviced apartment in the heart of Lekki Phase 1, minutes from the beach, rooftop pool and 24/7 power.",pricePerNight:85e3,currency:"NGN",rating:4.7,reviews:214,amenities:["Wifi","Pool","Backup power","Air conditioning","Kitchen"],maxGuests:4,bedrooms:2,image:"🌆",merchantId:"mer-001",featured:!0},{id:"stay-acc-002",name:"Osu Beachfront Boutique",type:"Boutique",city:"Accra",countryCode:"GH",description:"Boutique hotel steps from Oxford Street and Labadi Beach with a celebrated jollof brunch.",pricePerNight:1200,currency:"GHS",rating:4.6,reviews:158,amenities:["Wifi","Breakfast","Beach access","Bar","Air conditioning"],maxGuests:2,bedrooms:1,image:"🏖️",merchantId:"mer-002",featured:!0},{id:"stay-nbo-003",name:"Karen Garden Villa",type:"Villa",city:"Nairobi",countryCode:"KE",description:"Tranquil 4-bedroom villa in leafy Karen with a private garden, ideal for safari stopovers.",pricePerNight:28e3,currency:"KES",rating:4.9,reviews:96,amenities:["Wifi","Garden","Parking","Kitchen","Workspace"],maxGuests:8,bedrooms:4,image:"🌿",merchantId:"mer-003",featured:!0},{id:"stay-kgl-004",name:"Kigali Hills Lodge",type:"Lodge",city:"Kigali",countryCode:"RW",description:"Eco-lodge overlooking the city of a thousand hills, a short drive from the Convention Centre.",pricePerNight:140,currency:"USD",rating:4.8,reviews:132,amenities:["Wifi","Breakfast","Mountain view","Spa","Restaurant"],maxGuests:3,bedrooms:1,image:"⛰️",merchantId:"mer-004"},{id:"stay-cpt-005",name:"Camps Bay Sea Villa",type:"Villa",city:"Cape Town",countryCode:"ZA",description:"Modernist villa with floor-to-ceiling ocean views, infinity pool and Table Mountain at your back.",pricePerNight:6500,currency:"ZAR",rating:4.9,reviews:187,amenities:["Wifi","Pool","Sea view","Parking","Kitchen","Air conditioning"],maxGuests:6,bedrooms:3,image:"🌊",merchantId:"mer-005",featured:!0},{id:"stay-mar-006",name:"Marrakech Riad El Fenn",type:"Guesthouse",city:"Marrakech",countryCode:"MA",description:"Traditional riad with a courtyard plunge pool, rooftop terrace and easy access to the medina.",pricePerNight:95,currency:"USD",rating:4.7,reviews:241,amenities:["Wifi","Pool","Breakfast","Rooftop","Air conditioning"],maxGuests:4,bedrooms:2,image:"🕌",merchantId:"mer-006"},{id:"stay-zan-007",name:"Stone Town Ocean Suites",type:"Hotel",city:"Zanzibar",countryCode:"TZ",description:"Heritage hotel in Stone Town with carved Zanzibari doors and sunset dhow cruises.",pricePerNight:110,currency:"USD",rating:4.6,reviews:173,amenities:["Wifi","Breakfast","Beach access","Bar","Tours"],maxGuests:2,bedrooms:1,image:"⛵",merchantId:"mer-007"},{id:"stay-dak-008",name:"Almadies Surf Retreat",type:"Apartment",city:"Dakar",countryCode:"SN",description:"Bright apartment near the surf breaks of Almadies with a shared terrace and ocean breeze.",pricePerNight:65e3,currency:"NGN",rating:4.4,reviews:71,amenities:["Wifi","Terrace","Surf nearby","Kitchen"],maxGuests:3,bedrooms:1,image:"🏄",merchantId:"mer-002"},{id:"stay-cai-009",name:"Giza Pyramid View Hotel",type:"Hotel",city:"Cairo",countryCode:"EG",description:"Rooftop dining with an unbeatable view of the Pyramids of Giza, walking distance to the plateau.",pricePerNight:120,currency:"USD",rating:4.5,reviews:309,amenities:["Wifi","Breakfast","Pyramid view","Rooftop","Air conditioning"],maxGuests:4,bedrooms:2,image:"🐪",merchantId:"mer-008"},{id:"stay-kla-010",name:"Lake Victoria Boathouse",type:"Guesthouse",city:"Entebbe",countryCode:"UG",description:"Lakeside guesthouse near Entebbe airport — perfect first or last night in Uganda.",pricePerNight:90,currency:"USD",rating:4.5,reviews:58,amenities:["Wifi","Lake view","Breakfast","Garden","Airport shuttle"],maxGuests:4,bedrooms:2,image:"🚣",merchantId:"mer-009"},{id:"stay-wdh-011",name:"Windhoek Desert Loft",type:"Apartment",city:"Windhoek",countryCode:"NA",description:"Stylish loft with a desert palette, great base for Sossusvlei and Etosha road trips.",pricePerNight:1400,currency:"ZAR",rating:4.6,reviews:44,amenities:["Wifi","Parking","Kitchen","Workspace","Air conditioning"],maxGuests:2,bedrooms:1,image:"🏜️",merchantId:"mer-010"},{id:"stay-abj-012",name:"Cocody Lagoon Residence",type:"Apartment",city:"Abidjan",countryCode:"CI",description:"Upscale residence overlooking the Ébrié Lagoon in the diplomatic district of Cocody.",pricePerNight:80,currency:"USD",rating:4.5,reviews:63,amenities:["Wifi","Pool","Gym","Parking","Air conditioning"],maxGuests:4,bedrooms:2,image:"🏙️",merchantId:"mer-011"}],b=e=>v.find(t=>t.id===e),te=()=>v.filter(e=>e.featured),ae={path:"/",render(){const e=te().map(H).join(""),t=[...new Set(v.map(s=>s.city))],a=k.slice(0,10).map(s=>`<a class="chip" href="#/search?country=${s.code}">${s.flag} ${s.name}</a>`).join("");return h(`
      <section class="hero">
        <div class="hero-inner">
          <h1>Stay anywhere in Africa.<br/><span class="accent">Move freely across it.</span></h1>
          <p class="hero-sub">Thousands of pan-African stays, plus visa-free travel guidance for your passport — all in one place.</p>
          <form class="search-bar" id="hero-search">
            <label>Where
              <input list="cities" name="q" placeholder="City or country" autocomplete="off" />
              <datalist id="cities">
                ${t.map(s=>`<option value="${s}"></option>`).join("")}
              </datalist>
            </label>
            <label>Check-in <input type="date" name="checkIn" /></label>
            <label>Check-out <input type="date" name="checkOut" /></label>
            <label>Guests <input type="number" name="guests" min="1" value="2" /></label>
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
          <div class="chips">${a}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Featured stays</h2>
          <a class="link" href="#/search">View all ${v.length} stays →</a>
        </div>
        <div class="grid">${e}</div>
      </section>

      <section class="section banner">
        <div>
          <h2>Travelling visa-free?</h2>
          <p class="muted">Check which African countries you can enter with just your passport.</p>
        </div>
        <a class="btn btn-primary" href="#/visa">Open visa checker</a>
      </section>
    `)},mounted(){y();const e=document.getElementById("hero-search");e==null||e.addEventListener("submit",t=>{t.preventDefault();const a=new FormData(e),s=new URLSearchParams,n=String(a.get("q")??"").trim();n&&s.set("q",n);const i=String(a.get("guests")??"");i&&s.set("guests",i),location.hash=`/search?${s.toString()}`})}},se=["Hotel","Apartment","Villa","Guesthouse","Lodge","Boutique"];function ne(e){const t=(e.get("q")??"").toLowerCase(),a=e.get("country")??"",s=e.get("type")??"",n=e.get("sort")??"rating";let i=v.filter(r=>!(a&&r.countryCode!==a||s&&r.type!==s||t&&!`${r.name} ${r.city} ${I(r.countryCode)} ${r.type}`.toLowerCase().includes(t)));return n==="price-asc"?i=[...i].sort((r,l)=>r.pricePerNight-l.pricePerNight):n==="price-desc"?i=[...i].sort((r,l)=>l.pricePerNight-r.pricePerNight):i=[...i].sort((r,l)=>l.rating-r.rating),i}const ie={path:"/search",render(e,t){const a=ne(t),s=t.get("type")??"",n=t.get("q")??"",i=t.get("sort")??"rating",r=["",...se].map(l=>{const o=new URLSearchParams(t);return l?o.set("type",l):o.delete("type"),`<a class="${s===l?"chip chip-active":"chip"}" href="#/search?${o.toString()}">${l||"All types"}</a>`}).join("");return h(`
      <section class="section">
        <div class="search-head">
          <div>
            <h2>${a.length} stay${a.length===1?"":"s"}${n?` for “${n}”`:""}</h2>
            <p class="muted">${t.get("country")?I(t.get("country")):"Across Africa"}</p>
          </div>
          <form id="sort-form" class="sort">
            <label>Sort
              <select name="sort">
                <option value="rating" ${i==="rating"?"selected":""}>Top rated</option>
                <option value="price-asc" ${i==="price-asc"?"selected":""}>Price: low to high</option>
                <option value="price-desc" ${i==="price-desc"?"selected":""}>Price: high to low</option>
              </select>
            </label>
          </form>
        </div>
        <div class="chips">${r}</div>
        <div class="grid">
          ${a.length?a.map(H).join(""):'<p class="muted">No stays match your filters. Try clearing them.</p>'}
        </div>
      </section>
    `)},mounted(e,t){var s;y();const a=document.getElementById("sort-form");(s=a==null?void 0:a.querySelector("select"))==null||s.addEventListener("change",n=>{const i=new URLSearchParams(t);i.set("sort",n.target.value),location.hash=`/search?${i.toString()}`})}},re={path:"/stay/:id",render(e){const t=b(e.id);if(!t)return h('<section class="section"><h2>Stay not found</h2><a class="link" href="#/">Back to stays</a></section>');const a=P(t.countryCode),s=t.amenities.map(n=>`<li>✓ ${n}</li>`).join("");return h(`
      <section class="section">
        <a class="link" href="#/search">← Back to results</a>
        <div class="listing-media" style="background:${C(t.id)}">
          <span class="listing-emoji">${t.image}</span>
        </div>
        <div class="listing-grid">
          <div>
            <h1>${t.name}</h1>
            <p class="muted">${(a==null?void 0:a.flag)??""} ${t.city}, ${(a==null?void 0:a.name)??""} · ${t.type}</p>
            <p class="rating">${t.rating.toFixed(1)} <span class="stars">${j(t.rating)}</span>
              <span class="muted">(${t.reviews} reviews)</span></p>
            <p class="listing-desc">${t.description}</p>
            <h3>What this place offers</h3>
            <ul class="amenities">${s}</ul>
            <p class="muted">Sleeps ${t.maxGuests} · ${t.bedrooms} bedroom${t.bedrooms===1?"":"s"}</p>
          </div>

          <aside class="booking-box">
            <div class="price-lg">${u(t.pricePerNight,t.currency)} <span class="muted">/ night</span></div>
            <form id="book-form">
              <label>Check-in <input type="date" name="checkIn" value="${O(14)}" required /></label>
              <label>Check-out <input type="date" name="checkOut" value="${O(17)}" required /></label>
              <label>Guests
                <input type="number" name="guests" min="1" max="${t.maxGuests}" value="2" required />
              </label>
              <div class="quote" id="quote"></div>
              <button class="btn btn-primary btn-block" type="submit">Reserve</button>
              <p class="muted small">You won't be charged yet.</p>
            </form>
          </aside>
        </div>
      </section>
    `)},mounted(e){y();const t=b(e.id);if(!t)return;const a=document.getElementById("book-form"),s=document.getElementById("quote");if(!a||!s)return;const n=()=>{const i=new FormData(a),r=R(String(i.get("checkIn")),String(i.get("checkOut")));if(r<=0){s.innerHTML='<p class="muted small">Pick valid dates.</p>';return}const l=r*t.pricePerNight,o=Math.round(l*.08);s.innerHTML=`
        <div class="quote-row"><span>${u(t.pricePerNight,t.currency)} × ${r} night${r===1?"":"s"}</span><span>${u(l,t.currency)}</span></div>
        <div class="quote-row"><span>Service fee</span><span>${u(o,t.currency)}</span></div>
        <div class="quote-row quote-total"><span>Total</span><span>${u(l+o,t.currency)}</span></div>`};a.addEventListener("input",n),n(),a.addEventListener("submit",i=>{i.preventDefault();const r=new FormData(a),l=new URLSearchParams({checkIn:String(r.get("checkIn")),checkOut:String(r.get("checkOut")),guests:String(r.get("guests"))});location.hash=`/checkout/${t.id}?${l.toString()}`})}};function oe(e){return Math.round(e*100)}async function ce(e){return await new Promise(t=>setTimeout(t,900)),{reference:e.reference,status:"success",provider:"paystack",message:`Mock Paystack charge of ${oe(e.amount)} ${e.currency} (minor units) authorized.`}}const le={id:"paystack",label:"Paystack — Card / Bank / USSD",currencies:["NGN","GHS","ZAR","KES","USD"],async charge(e){return ce(e)}};async function de(e){return await new Promise(t=>setTimeout(t,1500)),{reference:e.reference,status:"success",provider:"momo",message:`Mock MoMo collection of ${e.amount} ${e.currency} approved on device.`}}const ue={id:"momo",label:"Mobile Money — MTN / Airtel / M-Pesa",currencies:["GHS","KES","RWF","NGN"],async charge(e){return de(e)}},F=[le,ue],pe=e=>F.find(t=>t.id===e),me={path:"/checkout/:id",render(e,t){const a=b(e.id);if(!a)return h('<section class="section"><h2>Stay not found</h2></section>');const s=t.get("checkIn")??"",n=t.get("checkOut")??"",i=t.get("guests")??"2",r=R(s,n),l=r*a.pricePerNight,o=Math.round(l*.08),m=l+o,g=p.get().user,c=F.filter(d=>d.currencies.includes(a.currency)).map((d,w)=>`
        <label class="pay-method">
          <input type="radio" name="method" value="${d.id}" ${w===0?"checked":""} />
          <span><strong>${d.label.split(" — ")[0]}</strong><br/><span class="muted small">${d.label.split(" — ")[1]??""}</span></span>
        </label>`).join("");return h(`
      <section class="section checkout">
        <a class="link" href="#/stay/${a.id}">← Back to stay</a>
        <h1>Confirm and pay</h1>
        <div class="checkout-grid">
          <form id="pay-form" class="card pad">
            <h3>Your trip</h3>
            <p class="muted">${a.name} · ${a.city}</p>
            <p class="muted small">${s} → ${n} · ${i} guest${i==="1"?"":"s"} · ${r} night${r===1?"":"s"}</p>

            <h3>Your details</h3>
            <label>Full name <input name="name" value="${(g==null?void 0:g.name)??""}" required /></label>
            <label>Email <input type="email" name="email" value="${(g==null?void 0:g.email)??""}" required /></label>

            <h3>Pay with</h3>
            <div class="pay-methods">${c||'<p class="muted">No provider supports '+a.currency+" in this demo.</p>"}</div>

            <button class="btn btn-primary btn-block" type="submit" ${c?"":"disabled"}>
              Pay ${u(m,a.currency)}
            </button>
            <p class="muted small">Demo mode — no real payment is processed.</p>
            <div id="pay-status"></div>
          </form>

          <aside class="card pad summary">
            <h3>Price details</h3>
            <div class="quote-row"><span>${u(a.pricePerNight,a.currency)} × ${r}</span><span>${u(l,a.currency)}</span></div>
            <div class="quote-row"><span>Service fee</span><span>${u(o,a.currency)}</span></div>
            <div class="quote-row quote-total"><span>Total (${a.currency})</span><span>${u(m,a.currency)}</span></div>
          </aside>
        </div>
      </section>
    `)},mounted(e,t){y();const a=b(e.id);if(!a)return;const s=document.getElementById("pay-form"),n=document.getElementById("pay-status");if(!s||!n)return;const i=t.get("checkIn")??"",r=t.get("checkOut")??"",l=Number(t.get("guests")??"2"),o=R(i,r),m=o*a.pricePerNight,g=m+Math.round(m*.08);s.addEventListener("submit",async c=>{c.preventDefault();const d=new FormData(s),w=String(d.get("method")??""),S=pe(w);if(!S)return;const N=s.querySelector("button");N&&(N.disabled=!0),n.innerHTML=`<p class="pay-pending">⏳ Contacting ${S.id==="momo"?"Mobile Money — check your phone…":"Paystack…"}</p>`;const B=J("AT"),L=await S.charge({email:String(d.get("email")),amount:g,currency:a.currency,reference:B,metadata:{stayId:a.id,guests:l}});if(L.status==="success"){const T={id:B,stayId:a.id,guestName:String(d.get("name")),email:String(d.get("email")),checkIn:i,checkOut:r,guests:l,nights:o,total:g,currency:a.currency,paymentMethod:S.id,status:"paid",createdAt:new Date().toISOString()};p.addBooking(T),location.hash=`/confirmation/${T.id}`}else n.innerHTML=`<p class="pay-fail">⚠️ ${L.message}</p>`,N&&(N.disabled=!1)})}},W={"NG->GH":"visa-free","GH->NG":"visa-free","NG->SN":"visa-free","SN->NG":"visa-free","CI->GH":"visa-free","KE->RW":"visa-free","RW->KE":"visa-free","KE->UG":"visa-free","UG->KE":"visa-free","TZ->KE":"visa-free","NG->RW":"visa-free","ZA->RW":"visa-free","EG->RW":"visa-free","ZA->KE":"eta","MA->KE":"eta","ZA->NA":"visa-free","NA->ZA":"visa-free","ZA->BW":"visa-free","BW->ZA":"visa-free","NG->EG":"visa-required","NG->MA":"visa-free","KE->EG":"visa-on-arrival","EG->NG":"visa-required"},x=new Map(k.map(e=>[e.code,e.region]));function V(e,t){if(e===t)return"visa-free";const a=`${e}->${t}`;if(W[a])return W[a];const s=x.get(e),n=x.get(t);return s&&n&&s===n?"visa-free":"visa-on-arrival"}const M={"visa-free":{label:"Visa-free",color:"#0f7b6c",blurb:"Travel with just your passport — no visa needed."},"visa-on-arrival":{label:"Visa on arrival",color:"#f4b740",blurb:"Get your visa at the border or airport on arrival."},eta:{label:"eTA required",color:"#3b82f6",blurb:"Apply online for an electronic travel authorisation before you go."},"visa-required":{label:"Visa required",color:"#ef4444",blurb:"Apply for a visa at an embassy or consulate before travel."}},he={path:"/confirmation/:id",render(e){const t=p.get().bookings.find(r=>r.id===e.id);if(!t)return h('<section class="section"><h2>Booking not found</h2><a class="link" href="#/">Home</a></section>');const a=b(t.stayId),s=P((a==null?void 0:a.countryCode)??""),n=a?V("NG",a.countryCode):"visa-free",i=M[n];return h(`
      <section class="section confirm">
        <div class="confirm-card card pad">
          <div class="confirm-tick">✓</div>
          <h1>You're booked!</h1>
          <p class="muted">Confirmation <strong>${t.id}</strong> sent to ${t.email}</p>
          <div class="confirm-detail">
            <h3>${(a==null?void 0:a.name)??"Stay"}</h3>
            <p class="muted">${(s==null?void 0:s.flag)??""} ${(a==null?void 0:a.city)??""}, ${(s==null?void 0:s.name)??""}</p>
            <div class="quote-row"><span>${t.checkIn} → ${t.checkOut}</span><span>${t.nights} nights</span></div>
            <div class="quote-row"><span>Guests</span><span>${t.guests}</span></div>
            <div class="quote-row"><span>Paid via ${t.paymentMethod==="momo"?"Mobile Money":"Paystack"}</span><span></span></div>
            <div class="quote-row quote-total"><span>Total paid</span><span>${u(t.total,t.currency)}</span></div>
          </div>
          <div class="visa-nudge" style="border-color:${i.color}">
            <strong style="color:${i.color}">${(s==null?void 0:s.flag)??""} ${i.label}</strong>
            <span class="muted small">${i.blurb} (Nigerian passport, demo.)
              <a class="link" href="#/visa?to=${(a==null?void 0:a.countryCode)??""}">Check your passport →</a></span>
          </div>
          <a class="btn btn-primary" href="#/">Back to stays</a>
        </div>
      </section>
    `)},mounted(){y()}};function ge(e){return k.map(t=>`<option value="${t.code}" ${t.code===e?"selected":""}>${t.flag} ${t.name}</option>`).join("")}function fe(e){const t=k.filter(n=>n.code!==e).map(n=>{const i=V(e,n.code),r=M[i];return{c:n,policy:i,meta:r}}).sort((n,i)=>{const r=["visa-free","visa-on-arrival","eta","visa-required"];return r.indexOf(n.policy)-r.indexOf(i.policy)}),a=t.filter(n=>n.policy==="visa-free").length,s=t.map(({c:n,meta:i})=>`
      <div class="visa-row">
        <span class="visa-country">${n.flag} ${n.name}</span>
        <span class="visa-tag" style="background:${i.color}1a;color:${i.color}">${i.label}</span>
      </div>`).join("");return`
    <p class="muted">Your passport unlocks <strong>${a}</strong> visa-free destination${a===1?"":"s"} of ${t.length} shown.</p>
    <div class="visa-list">${s}</div>`}const ve={path:"/visa",render(e,t){const a=t.get("from")??"NG",s=Object.values(M).map(n=>`<span class="legend-item"><span class="dot" style="background:${n.color}"></span>${n.label}</span>`).join("");return h(`
      <section class="section">
        <div class="visa-head">
          <h1>Visa-free travel checker</h1>
          <p class="muted">See where your African passport takes you — visa-free, on arrival, eTA, or visa required.</p>
        </div>
        <form id="visa-form" class="visa-form card pad">
          <label>I hold a passport from
            <select name="from">${ge(a)}</select>
          </label>
          <div class="legend">${s}</div>
        </form>
        <div id="visa-results" class="section">${fe(a)}</div>
        <p class="muted small">Illustrative demo data — always confirm with official sources before booking travel.</p>
      </section>
    `)},mounted(e,t){y();const a=document.getElementById("visa-form"),s=a==null?void 0:a.querySelector("select");s==null||s.addEventListener("change",n=>{const i=n.target.value,r=new URLSearchParams(t);r.set("from",i),location.hash=`/visa?${r.toString()}`})}},ye="mer-002",be={path:"/merchant",render(){var l;p.setRole("merchant");const e=v.filter(o=>o.merchantId===ye),t=new Set(e.map(o=>o.id)),a=p.get().bookings.filter(o=>t.has(o.stayId)),s=a.filter(o=>o.status==="paid").reduce((o,m)=>o+m.total,0),n=((l=e[0])==null?void 0:l.currency)??"USD",i=e.map(o=>`
        <tr>
          <td>
            <span class="thumb" style="background:${C(o.id)}">${o.image}</span>
            ${o.name}
          </td>
          <td>${o.city}, ${I(o.countryCode)}</td>
          <td>${u(o.pricePerNight,o.currency)}</td>
          <td>${o.rating.toFixed(1)} ★</td>
          <td><span class="status status-live">Live</span></td>
        </tr>`).join(""),r=a.length?a.map(o=>{var m;return`
            <tr>
              <td>${((m=b(o.stayId))==null?void 0:m.name)??o.stayId}</td>
              <td>${o.guestName}</td>
              <td>${o.checkIn} → ${o.checkOut}</td>
              <td>${u(o.total,o.currency)}</td>
              <td><span class="status status-${o.status}">${o.status}</span></td>
            </tr>`}).join(""):`<tr><td colspan="5" class="muted">No bookings yet — they'll appear here once guests reserve.</td></tr>`;return h(`
      <section class="section">
        <div class="portal-head">
          <div>
            <span class="eyebrow">Merchant portal</span>
            <h1>Osu Hospitality Group</h1>
            <p class="muted">Manage your listings, bookings and payouts.</p>
          </div>
          <button class="btn btn-primary" data-action="new-listing">+ New listing</button>
        </div>

        <div class="stats">
          <div class="stat"><span class="stat-num">${e.length}</span><span class="muted">Active listings</span></div>
          <div class="stat"><span class="stat-num">${a.length}</span><span class="muted">Bookings</span></div>
          <div class="stat"><span class="stat-num">${u(s,n)}</span><span class="muted">Revenue (paid)</span></div>
          <div class="stat"><span class="stat-num">Paystack</span><span class="muted">Payout method</span></div>
        </div>

        <h2>Your listings</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Property</th><th>Location</th><th>Price/night</th><th>Rating</th><th>Status</th></tr></thead>
            <tbody>${i}</tbody>
          </table>
        </div>

        <h2>Recent bookings</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Property</th><th>Guest</th><th>Dates</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>${r}</tbody>
          </table>
        </div>
      </section>
    `)},mounted(){var e;y(),(e=document.querySelector('[data-action="new-listing"]'))==null||e.addEventListener("click",()=>{alert("Demo: the new-listing wizard would open here (photos, pricing, calendar, payout setup).")})}},$e={path:"/admin",render(){var g;p.setRole("admin");const e=p.get().bookings,t=new Set(v.map(c=>c.merchantId)),a=new Set(v.map(c=>c.countryCode)),s=new Map;for(const c of e.filter(d=>d.status==="paid"))s.set(c.currency,(s.get(c.currency)??0)+c.total);const n=[...s.entries()].map(([c,d])=>u(d,c)).join(" · ")||"—",i=new Map;for(const c of v){const d=((g=k.find(w=>w.code===c.countryCode))==null?void 0:g.region)??"—";i.set(d,(i.get(d)??0)+1)}const r=Math.max(...i.values()),l=[...i.entries()].sort((c,d)=>d[1]-c[1]).map(([c,d])=>`
        <div class="bar-row">
          <span>${c} Africa</span>
          <div class="bar"><div class="bar-fill" style="width:${d/r*100}%"></div></div>
          <span class="muted">${d}</span>
        </div>`).join(""),o=e.slice(0,8),m=o.length?o.map(c=>{var d;return`
            <tr>
              <td class="mono">${c.id}</td>
              <td>${((d=b(c.stayId))==null?void 0:d.name)??c.stayId}</td>
              <td>${c.guestName}</td>
              <td>${u(c.total,c.currency)}</td>
              <td>${c.paymentMethod==="momo"?"MoMo":"Paystack"}</td>
              <td><span class="status status-${c.status}">${c.status}</span></td>
            </tr>`}).join(""):'<tr><td colspan="6" class="muted">No bookings yet. Make one from the customer portal to see it here.</td></tr>';return h(`
      <section class="section">
        <div class="portal-head">
          <div>
            <span class="eyebrow">Admin console</span>
            <h1>Platform overview</h1>
            <p class="muted">Marketplace health across stays, merchants and payments.</p>
          </div>
          <button class="btn btn-ghost" data-action="reset">Reset demo data</button>
        </div>

        <div class="stats">
          <div class="stat"><span class="stat-num">${v.length}</span><span class="muted">Listings</span></div>
          <div class="stat"><span class="stat-num">${t.size}</span><span class="muted">Merchants</span></div>
          <div class="stat"><span class="stat-num">${a.size}</span><span class="muted">Countries</span></div>
          <div class="stat"><span class="stat-num">${e.length}</span><span class="muted">Bookings</span></div>
        </div>

        <div class="admin-grid">
          <div class="card pad">
            <h3>Inventory by region</h3>
            <div class="bars">${l}</div>
          </div>
          <div class="card pad">
            <h3>Paid volume</h3>
            <p class="big-stat">${n}</p>
            <p class="muted small">Per-currency settlement totals. A real console would FX-normalise to a reporting currency.</p>
          </div>
        </div>

        <h2>Recent transactions</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Reference</th><th>Stay</th><th>Guest</th><th>Total</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>${m}</tbody>
          </table>
        </div>
      </section>
    `)},mounted(){var e;y(),(e=document.querySelector('[data-action="reset"]'))==null||e.addEventListener("click",()=>{confirm("Reset all demo bookings and session state?")&&(p.reset(),location.reload())})}},ke={path:"/login",render(){return h(`
      <section class="section narrow">
        <div class="card pad auth">
          <h1>Welcome back</h1>
          <p class="muted">Sign in to manage bookings. (Demo — any details work.)</p>
          <form id="login-form">
            <label>Full name <input name="name" value="Ama Mensah" required /></label>
            <label>Email <input type="email" name="email" value="ama@example.com" required /></label>
            <button class="btn btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
      </section>
    `)},mounted(){y();const e=document.getElementById("login-form");e==null||e.addEventListener("submit",t=>{t.preventDefault();const a=new FormData(e);p.setRole("customer"),p.login(String(a.get("name")),String(a.get("email"))),location.hash="/"})}},we={path:"/404",render(){return h(`
      <section class="section narrow center">
        <h1>404</h1>
        <p class="muted">That page wandered off the map.</p>
        <a class="btn btn-primary" href="#/">Back to stays</a>
      </section>
    `)},mounted(){y()}},Z=document.getElementById("app");if(!Z)throw new Error("#app container missing");const Se=[ae,ie,re,me,he,ke].map(e=>({...e,render:(t,a)=>(p.get().role!=="customer"&&p.get().role!=="visa"&&p.setRole("customer"),e.render(t,a))}));z(Z,[...Se,ve,be,$e,we]);
//# sourceMappingURL=index-C0F84d2A.js.map
