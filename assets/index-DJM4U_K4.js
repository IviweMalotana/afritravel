(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();let O=[],R;function Y(){const t=location.hash.replace(/^#/,"")||"/",[e,a=""]=t.split("?");return{path:e,query:new URLSearchParams(a)}}function D(t){for(const e of O){const a=e.path.split("/").filter(Boolean),s=t.split("/").filter(Boolean);if(a.length!==s.length)continue;const n={};let i=!0;for(let r=0;r<a.length;r++)if(a[r].startsWith(":"))n[a[r].slice(1)]=decodeURIComponent(s[r]);else if(a[r]!==s[r]){i=!1;break}if(i)return{route:e,params:n}}return null}function q(){var s,n;const{path:t,query:e}=Y(),a=D(t)??D("/404");if(!a){R.innerHTML="<p>Not found</p>";return}R.innerHTML=a.route.render(a.params,e),(n=(s=a.route).mounted)==null||n.call(s,a.params,e),window.scrollTo(0,0)}function Z(t,e){R=t,O=e,window.addEventListener("hashchange",q),q()}const U="afritravel.state.v1",I={bookings:[],passes:[],role:"customer",user:null},C=new Set;function z(){try{const t=localStorage.getItem(U);if(t)return{...I,...JSON.parse(t)}}catch{}return structuredClone(I)}let v=z();function $(){try{localStorage.setItem(U,JSON.stringify(v))}catch{}C.forEach(t=>t())}const p={get(){return v},subscribe(t){return C.add(t),()=>C.delete(t)},addBooking(t){v.bookings=[t,...v.bookings],$()},setBookingStatus(t,e){v.bookings=v.bookings.map(a=>a.id===t?{...a,status:e}:a),$()},addPass(t){v.passes=[t,...v.passes],$()},passById(t){return v.passes.find(e=>e.id===t)},setRole(t){v.role=t,$()},login(t,e){v.user={name:t,email:e},$()},logout(){v.user=null,$()},reset(){v=structuredClone(I),$()}};function W(t="id"){return`${t}-${Math.random().toString(36).slice(2,8)}${Date.now().toString(36).slice(-4)}`}function _(){const{user:t,role:e}=p.get(),s=[{href:"#/",label:"Stays"},{href:"#/visa",label:"Visa-Free Pass"},{href:"#/merchant",label:"Merchant"},{href:"#/admin",label:"Admin"}].map(i=>`<a class="nav-link" href="${i.href}">${i.label}</a>`).join(""),n=t?`<span class="nav-user">${t.name}</span>
       <button class="btn btn-ghost" data-action="logout">Sign out</button>`:'<a class="btn btn-ghost" href="#/login">Sign in</a>';return`
    <header class="nav">
      <a class="brand" href="#/">
        <span class="brand-mark">▲</span> Afri<strong>Travel</strong>
      </a>
      <nav class="nav-links">${s}</nav>
      <div class="nav-account">
        <span class="role-pill" title="Active portal">${e}</span>
        ${n}
      </div>
    </header>`}function J(){return`
    <footer class="footer">
      <div class="footer-cols">
        <div>
          <div class="brand"><span class="brand-mark">▲</span> Afri<strong>Travel</strong></div>
          <p class="muted">Stay anywhere in Africa. Move freely across it.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="#/">All stays</a>
          <a href="#/visa">Visa-Free Pass</a>
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
    </footer>`}function m(t){return`${_()}<main class="page">${t}</main>${J()}`}function f(){var t;(t=document.querySelector('[data-action="logout"]'))==null||t.addEventListener("click",()=>{p.logout(),location.hash="/"})}const Q={NGN:"₦",GHS:"GH₵",KES:"KSh",ZAR:"R",USD:"$",RWF:"FRw",EGP:"E£"};function u(t,e){return`${Q[e]??""}${t.toLocaleString("en-US")}`}function M(t,e){const a=new Date(t).getTime(),s=new Date(e).getTime();return Number.isNaN(a)||Number.isNaN(s)||s<=a?0:Math.round((s-a)/(1e3*60*60*24))}function H(t){const e=Math.round(t);return"★".repeat(e)+"☆".repeat(5-e)}function E(t){let e=0;for(let n=0;n<t.length;n++)e=e*31+t.charCodeAt(n)>>>0;const a=e%360,s=(a+40)%360;return`linear-gradient(135deg, hsl(${a} 55% 45%), hsl(${s} 60% 35%))`}function X(t){let e=2166136261;for(let a=0;a<t.length;a++)e^=t.charCodeAt(a),e=Math.imul(e,16777619);return e>>>0}function ee(t,e=17){let a=X(t)||1;const s=()=>{a|=0,a=a+1831565813|0;let c=Math.imul(a^a>>>15,1|a);return c=c+Math.imul(c^c>>>7,61|c)^c,((c^c>>>14)>>>0)/4294967296},n=6,i=e*n;let r="";for(let c=0;c<e;c++)for(let o=0;o<e;o++)(o<4&&c<4||o>=e-4&&c<4||o<4&&c>=e-4?o%3!==1||c%3!==1:s()>.5)&&(r+=`<rect x="${o*n}" y="${c*n}" width="${n}" height="${n}"/>`);return`<svg class="qr" viewBox="0 0 ${i} ${i}" width="${i}" height="${i}" fill="#0a5a4f" xmlns="http://www.w3.org/2000/svg"><rect width="${i}" height="${i}" fill="#fff"/>${r}</svg>`}function F(t){const e=new Date;return e.setDate(e.getDate()+t),e.toISOString().slice(0,10)}const N=[{code:"NG",name:"Nigeria",flag:"🇳🇬",region:"West",capital:"Abuja"},{code:"GH",name:"Ghana",flag:"🇬🇭",region:"West",capital:"Accra"},{code:"SN",name:"Senegal",flag:"🇸🇳",region:"West",capital:"Dakar"},{code:"CI",name:"Côte d'Ivoire",flag:"🇨🇮",region:"West",capital:"Yamoussoukro"},{code:"KE",name:"Kenya",flag:"🇰🇪",region:"East",capital:"Nairobi"},{code:"TZ",name:"Tanzania",flag:"🇹🇿",region:"East",capital:"Dodoma"},{code:"RW",name:"Rwanda",flag:"🇷🇼",region:"East",capital:"Kigali"},{code:"UG",name:"Uganda",flag:"🇺🇬",region:"East",capital:"Kampala"},{code:"ET",name:"Ethiopia",flag:"🇪🇹",region:"East",capital:"Addis Ababa"},{code:"ZA",name:"South Africa",flag:"🇿🇦",region:"Southern",capital:"Pretoria"},{code:"NA",name:"Namibia",flag:"🇳🇦",region:"Southern",capital:"Windhoek"},{code:"BW",name:"Botswana",flag:"🇧🇼",region:"Southern",capital:"Gaborone"},{code:"MA",name:"Morocco",flag:"🇲🇦",region:"North",capital:"Rabat"},{code:"EG",name:"Egypt",flag:"🇪🇬",region:"North",capital:"Cairo"},{code:"TN",name:"Tunisia",flag:"🇹🇳",region:"North",capital:"Tunis"}],b=t=>N.find(e=>e.code===t),B=t=>{var e;return((e=b(t))==null?void 0:e.name)??t};function j(t){const e=b(t.countryCode);return`
    <a class="card stay-card" href="#/stay/${t.id}">
      <div class="card-media" style="background:${E(t.id)}">
        <span class="card-emoji">${t.image}</span>
        ${t.featured?'<span class="badge">Featured</span>':""}
      </div>
      <div class="card-body">
        <div class="card-row">
          <h3>${t.name}</h3>
          <span class="rating" title="${t.rating} from ${t.reviews} reviews">
            ${t.rating.toFixed(1)} <span class="stars">${H(t.rating)}</span>
          </span>
        </div>
        <p class="muted">${(e==null?void 0:e.flag)??""} ${t.city}, ${(e==null?void 0:e.name)??t.countryCode} · ${t.type}</p>
        <p class="card-amenities muted">${t.amenities.slice(0,3).join(" · ")}</p>
        <div class="card-row card-foot">
          <span class="price">${u(t.pricePerNight,t.currency)}<span class="muted"> / night</span></span>
          <span class="muted">${t.bedrooms} bd · ${t.maxGuests} guests</span>
        </div>
      </div>
    </a>`}const y=[{id:"stay-lag-001",name:"Lekki Skyline Apartments",type:"Apartment",city:"Lagos",countryCode:"NG",description:"Sleek serviced apartment in the heart of Lekki Phase 1, minutes from the beach, rooftop pool and 24/7 power.",pricePerNight:85e3,currency:"NGN",rating:4.7,reviews:214,amenities:["Wifi","Pool","Backup power","Air conditioning","Kitchen"],maxGuests:4,bedrooms:2,image:"🌆",merchantId:"mer-001",featured:!0},{id:"stay-acc-002",name:"Osu Beachfront Boutique",type:"Boutique",city:"Accra",countryCode:"GH",description:"Boutique hotel steps from Oxford Street and Labadi Beach with a celebrated jollof brunch.",pricePerNight:1200,currency:"GHS",rating:4.6,reviews:158,amenities:["Wifi","Breakfast","Beach access","Bar","Air conditioning"],maxGuests:2,bedrooms:1,image:"🏖️",merchantId:"mer-002",featured:!0},{id:"stay-nbo-003",name:"Karen Garden Villa",type:"Villa",city:"Nairobi",countryCode:"KE",description:"Tranquil 4-bedroom villa in leafy Karen with a private garden, ideal for safari stopovers.",pricePerNight:28e3,currency:"KES",rating:4.9,reviews:96,amenities:["Wifi","Garden","Parking","Kitchen","Workspace"],maxGuests:8,bedrooms:4,image:"🌿",merchantId:"mer-003",featured:!0},{id:"stay-kgl-004",name:"Kigali Hills Lodge",type:"Lodge",city:"Kigali",countryCode:"RW",description:"Eco-lodge overlooking the city of a thousand hills, a short drive from the Convention Centre.",pricePerNight:140,currency:"USD",rating:4.8,reviews:132,amenities:["Wifi","Breakfast","Mountain view","Spa","Restaurant"],maxGuests:3,bedrooms:1,image:"⛰️",merchantId:"mer-004"},{id:"stay-cpt-005",name:"Camps Bay Sea Villa",type:"Villa",city:"Cape Town",countryCode:"ZA",description:"Modernist villa with floor-to-ceiling ocean views, infinity pool and Table Mountain at your back.",pricePerNight:6500,currency:"ZAR",rating:4.9,reviews:187,amenities:["Wifi","Pool","Sea view","Parking","Kitchen","Air conditioning"],maxGuests:6,bedrooms:3,image:"🌊",merchantId:"mer-005",featured:!0},{id:"stay-mar-006",name:"Marrakech Riad El Fenn",type:"Guesthouse",city:"Marrakech",countryCode:"MA",description:"Traditional riad with a courtyard plunge pool, rooftop terrace and easy access to the medina.",pricePerNight:95,currency:"USD",rating:4.7,reviews:241,amenities:["Wifi","Pool","Breakfast","Rooftop","Air conditioning"],maxGuests:4,bedrooms:2,image:"🕌",merchantId:"mer-006"},{id:"stay-zan-007",name:"Stone Town Ocean Suites",type:"Hotel",city:"Zanzibar",countryCode:"TZ",description:"Heritage hotel in Stone Town with carved Zanzibari doors and sunset dhow cruises.",pricePerNight:110,currency:"USD",rating:4.6,reviews:173,amenities:["Wifi","Breakfast","Beach access","Bar","Tours"],maxGuests:2,bedrooms:1,image:"⛵",merchantId:"mer-007"},{id:"stay-dak-008",name:"Almadies Surf Retreat",type:"Apartment",city:"Dakar",countryCode:"SN",description:"Bright apartment near the surf breaks of Almadies with a shared terrace and ocean breeze.",pricePerNight:65e3,currency:"NGN",rating:4.4,reviews:71,amenities:["Wifi","Terrace","Surf nearby","Kitchen"],maxGuests:3,bedrooms:1,image:"🏄",merchantId:"mer-002"},{id:"stay-cai-009",name:"Giza Pyramid View Hotel",type:"Hotel",city:"Cairo",countryCode:"EG",description:"Rooftop dining with an unbeatable view of the Pyramids of Giza, walking distance to the plateau.",pricePerNight:120,currency:"USD",rating:4.5,reviews:309,amenities:["Wifi","Breakfast","Pyramid view","Rooftop","Air conditioning"],maxGuests:4,bedrooms:2,image:"🐪",merchantId:"mer-008"},{id:"stay-kla-010",name:"Lake Victoria Boathouse",type:"Guesthouse",city:"Entebbe",countryCode:"UG",description:"Lakeside guesthouse near Entebbe airport — perfect first or last night in Uganda.",pricePerNight:90,currency:"USD",rating:4.5,reviews:58,amenities:["Wifi","Lake view","Breakfast","Garden","Airport shuttle"],maxGuests:4,bedrooms:2,image:"🚣",merchantId:"mer-009"},{id:"stay-wdh-011",name:"Windhoek Desert Loft",type:"Apartment",city:"Windhoek",countryCode:"NA",description:"Stylish loft with a desert palette, great base for Sossusvlei and Etosha road trips.",pricePerNight:1400,currency:"ZAR",rating:4.6,reviews:44,amenities:["Wifi","Parking","Kitchen","Workspace","Air conditioning"],maxGuests:2,bedrooms:1,image:"🏜️",merchantId:"mer-010"},{id:"stay-abj-012",name:"Cocody Lagoon Residence",type:"Apartment",city:"Abidjan",countryCode:"CI",description:"Upscale residence overlooking the Ébrié Lagoon in the diplomatic district of Cocody.",pricePerNight:80,currency:"USD",rating:4.5,reviews:63,amenities:["Wifi","Pool","Gym","Parking","Air conditioning"],maxGuests:4,bedrooms:2,image:"🏙️",merchantId:"mer-011"}],k=t=>y.find(e=>e.id===t),te=()=>y.filter(t=>t.featured),ae={path:"/",render(){const t=te().map(j).join(""),e=[...new Set(y.map(s=>s.city))],a=N.slice(0,10).map(s=>`<a class="chip" href="#/search?country=${s.code}">${s.flag} ${s.name}</a>`).join("");return m(`
      <section class="hero">
        <div class="hero-inner">
          <h1>Stay anywhere in Africa.<br/><span class="accent">Move freely across it.</span></h1>
          <p class="hero-sub">Thousands of pan-African stays, plus visa-free travel guidance for your passport — all in one place.</p>
          <form class="search-bar" id="hero-search">
            <label>Where
              <input list="cities" name="q" placeholder="City or country" autocomplete="off" />
              <datalist id="cities">
                ${e.map(s=>`<option value="${s}"></option>`).join("")}
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
          <a class="link" href="#/search">View all ${y.length} stays →</a>
        </div>
        <div class="grid">${t}</div>
      </section>

      <section class="section banner">
        <div>
          <h2>Get your Visa-Free Pass</h2>
          <p class="muted">Register once and travel visa-free across participating African nations — approved instantly.</p>
        </div>
        <a class="btn btn-primary" href="#/visa">Register for a pass</a>
      </section>
    `)},mounted(){f();const t=document.getElementById("hero-search");t==null||t.addEventListener("submit",e=>{e.preventDefault();const a=new FormData(t),s=new URLSearchParams,n=String(a.get("q")??"").trim();n&&s.set("q",n);const i=String(a.get("guests")??"");i&&s.set("guests",i),location.hash=`/search?${s.toString()}`})}},se=["Hotel","Apartment","Villa","Guesthouse","Lodge","Boutique"];function ne(t){const e=(t.get("q")??"").toLowerCase(),a=t.get("country")??"",s=t.get("type")??"",n=t.get("sort")??"rating";let i=y.filter(r=>!(a&&r.countryCode!==a||s&&r.type!==s||e&&!`${r.name} ${r.city} ${B(r.countryCode)} ${r.type}`.toLowerCase().includes(e)));return n==="price-asc"?i=[...i].sort((r,c)=>r.pricePerNight-c.pricePerNight):n==="price-desc"?i=[...i].sort((r,c)=>c.pricePerNight-r.pricePerNight):i=[...i].sort((r,c)=>c.rating-r.rating),i}const ie={path:"/search",render(t,e){const a=ne(e),s=e.get("type")??"",n=e.get("q")??"",i=e.get("sort")??"rating",r=["",...se].map(c=>{const o=new URLSearchParams(e);return c?o.set("type",c):o.delete("type"),`<a class="${s===c?"chip chip-active":"chip"}" href="#/search?${o.toString()}">${c||"All types"}</a>`}).join("");return m(`
      <section class="section">
        <div class="search-head">
          <div>
            <h2>${a.length} stay${a.length===1?"":"s"}${n?` for “${n}”`:""}</h2>
            <p class="muted">${e.get("country")?B(e.get("country")):"Across Africa"}</p>
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
          ${a.length?a.map(j).join(""):'<p class="muted">No stays match your filters. Try clearing them.</p>'}
        </div>
      </section>
    `)},mounted(t,e){var s;f();const a=document.getElementById("sort-form");(s=a==null?void 0:a.querySelector("select"))==null||s.addEventListener("change",n=>{const i=new URLSearchParams(e);i.set("sort",n.target.value),location.hash=`/search?${i.toString()}`})}},re={path:"/stay/:id",render(t){const e=k(t.id);if(!e)return m('<section class="section"><h2>Stay not found</h2><a class="link" href="#/">Back to stays</a></section>');const a=b(e.countryCode),s=e.amenities.map(n=>`<li>✓ ${n}</li>`).join("");return m(`
      <section class="section">
        <a class="link" href="#/search">← Back to results</a>
        <div class="listing-media" style="background:${E(e.id)}">
          <span class="listing-emoji">${e.image}</span>
        </div>
        <div class="listing-grid">
          <div>
            <h1>${e.name}</h1>
            <p class="muted">${(a==null?void 0:a.flag)??""} ${e.city}, ${(a==null?void 0:a.name)??""} · ${e.type}</p>
            <p class="rating">${e.rating.toFixed(1)} <span class="stars">${H(e.rating)}</span>
              <span class="muted">(${e.reviews} reviews)</span></p>
            <p class="listing-desc">${e.description}</p>
            <h3>What this place offers</h3>
            <ul class="amenities">${s}</ul>
            <p class="muted">Sleeps ${e.maxGuests} · ${e.bedrooms} bedroom${e.bedrooms===1?"":"s"}</p>
          </div>

          <aside class="booking-box">
            <div class="price-lg">${u(e.pricePerNight,e.currency)} <span class="muted">/ night</span></div>
            <form id="book-form">
              <label>Check-in <input type="date" name="checkIn" value="${F(14)}" required /></label>
              <label>Check-out <input type="date" name="checkOut" value="${F(17)}" required /></label>
              <label>Guests
                <input type="number" name="guests" min="1" max="${e.maxGuests}" value="2" required />
              </label>
              <div class="quote" id="quote"></div>
              <button class="btn btn-primary btn-block" type="submit">Reserve</button>
              <p class="muted small">You won't be charged yet.</p>
            </form>
          </aside>
        </div>
      </section>
    `)},mounted(t){f();const e=k(t.id);if(!e)return;const a=document.getElementById("book-form"),s=document.getElementById("quote");if(!a||!s)return;const n=()=>{const i=new FormData(a),r=M(String(i.get("checkIn")),String(i.get("checkOut")));if(r<=0){s.innerHTML='<p class="muted small">Pick valid dates.</p>';return}const c=r*e.pricePerNight,o=Math.round(c*.08);s.innerHTML=`
        <div class="quote-row"><span>${u(e.pricePerNight,e.currency)} × ${r} night${r===1?"":"s"}</span><span>${u(c,e.currency)}</span></div>
        <div class="quote-row"><span>Service fee</span><span>${u(o,e.currency)}</span></div>
        <div class="quote-row quote-total"><span>Total</span><span>${u(c+o,e.currency)}</span></div>`};a.addEventListener("input",n),n(),a.addEventListener("submit",i=>{i.preventDefault();const r=new FormData(a),c=new URLSearchParams({checkIn:String(r.get("checkIn")),checkOut:String(r.get("checkOut")),guests:String(r.get("guests"))});location.hash=`/checkout/${e.id}?${c.toString()}`})}};function oe(t){return Math.round(t*100)}async function ce(t){return await new Promise(e=>setTimeout(e,900)),{reference:t.reference,status:"success",provider:"paystack",message:`Mock Paystack charge of ${oe(t.amount)} ${t.currency} (minor units) authorized.`}}const le={id:"paystack",label:"Paystack — Card / Bank / USSD",currencies:["NGN","GHS","ZAR","KES","USD"],async charge(t){return ce(t)}};async function de(t){return await new Promise(e=>setTimeout(e,1500)),{reference:t.reference,status:"success",provider:"momo",message:`Mock MoMo collection of ${t.amount} ${t.currency} approved on device.`}}const pe={id:"momo",label:"Mobile Money — MTN / Airtel / M-Pesa",currencies:["GHS","KES","RWF","NGN"],async charge(t){return de(t)}},K=[le,pe],ue=t=>K.find(e=>e.id===t),me={path:"/checkout/:id",render(t,e){const a=k(t.id);if(!a)return m('<section class="section"><h2>Stay not found</h2></section>');const s=e.get("checkIn")??"",n=e.get("checkOut")??"",i=e.get("guests")??"2",r=M(s,n),c=r*a.pricePerNight,o=Math.round(c*.08),h=c+o,g=p.get().user,l=K.filter(d=>d.currencies.includes(a.currency)).map((d,w)=>`
        <label class="pay-method">
          <input type="radio" name="method" value="${d.id}" ${w===0?"checked":""} />
          <span><strong>${d.label.split(" — ")[0]}</strong><br/><span class="muted small">${d.label.split(" — ")[1]??""}</span></span>
        </label>`).join("");return m(`
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
            <div class="pay-methods">${l||'<p class="muted">No provider supports '+a.currency+" in this demo.</p>"}</div>

            <button class="btn btn-primary btn-block" type="submit" ${l?"":"disabled"}>
              Pay ${u(h,a.currency)}
            </button>
            <p class="muted small">Demo mode — no real payment is processed.</p>
            <div id="pay-status"></div>
          </form>

          <aside class="card pad summary">
            <h3>Price details</h3>
            <div class="quote-row"><span>${u(a.pricePerNight,a.currency)} × ${r}</span><span>${u(c,a.currency)}</span></div>
            <div class="quote-row"><span>Service fee</span><span>${u(o,a.currency)}</span></div>
            <div class="quote-row quote-total"><span>Total (${a.currency})</span><span>${u(h,a.currency)}</span></div>
          </aside>
        </div>
      </section>
    `)},mounted(t,e){f();const a=k(t.id);if(!a)return;const s=document.getElementById("pay-form"),n=document.getElementById("pay-status");if(!s||!n)return;const i=e.get("checkIn")??"",r=e.get("checkOut")??"",c=Number(e.get("guests")??"2"),o=M(i,r),h=o*a.pricePerNight,g=h+Math.round(h*.08);s.addEventListener("submit",async l=>{l.preventDefault();const d=new FormData(s),w=String(d.get("method")??""),S=ue(w);if(!S)return;const P=s.querySelector("button");P&&(P.disabled=!0),n.innerHTML=`<p class="pay-pending">⏳ Contacting ${S.id==="momo"?"Mobile Money — check your phone…":"Paystack…"}</p>`;const T=W("AT"),G=await S.charge({email:String(d.get("email")),amount:g,currency:a.currency,reference:T,metadata:{stayId:a.id,guests:c}});if(G.status==="success"){const L={id:T,stayId:a.id,guestName:String(d.get("name")),email:String(d.get("email")),checkIn:i,checkOut:r,guests:c,nights:o,total:g,currency:a.currency,paymentMethod:S.id,status:"paid",createdAt:new Date().toISOString()};p.addBooking(L),location.hash=`/confirmation/${L.id}`}else n.innerHTML=`<p class="pay-fail">⚠️ ${G.message}</p>`,P&&(P.disabled=!1)})}},he={path:"/confirmation/:id",render(t){const e=p.get().bookings.find(n=>n.id===t.id);if(!e)return m('<section class="section"><h2>Booking not found</h2><a class="link" href="#/">Home</a></section>');const a=k(e.stayId),s=b((a==null?void 0:a.countryCode)??"");return m(`
      <section class="section confirm">
        <div class="confirm-card card pad">
          <div class="confirm-tick">✓</div>
          <h1>You're booked!</h1>
          <p class="muted">Confirmation <strong>${e.id}</strong> sent to ${e.email}</p>
          <div class="confirm-detail">
            <h3>${(a==null?void 0:a.name)??"Stay"}</h3>
            <p class="muted">${(s==null?void 0:s.flag)??""} ${(a==null?void 0:a.city)??""}, ${(s==null?void 0:s.name)??""}</p>
            <div class="quote-row"><span>${e.checkIn} → ${e.checkOut}</span><span>${e.nights} nights</span></div>
            <div class="quote-row"><span>Guests</span><span>${e.guests}</span></div>
            <div class="quote-row"><span>Paid via ${e.paymentMethod==="momo"?"Mobile Money":"Paystack"}</span><span></span></div>
            <div class="quote-row quote-total"><span>Total paid</span><span>${u(e.total,e.currency)}</span></div>
          </div>
          <div class="visa-nudge" style="border-color:#0f7b6c">
            <strong style="color:#0f7b6c">${(s==null?void 0:s.flag)??""} Travelling to ${(s==null?void 0:s.name)??"your destination"}?</strong>
            <span class="muted small">Skip the visa queue — register for your free AfriTravel Visa-Free Pass and breeze through immigration.
              <a class="link" href="#/visa">Get your pass →</a></span>
          </div>
          <a class="btn btn-primary" href="#/">Back to stays</a>
        </div>
      </section>
    `)},mounted(){f()}},ge=["Tourism","Business","Family","Transit"];function x(t=""){return`<option value="" disabled ${t?"":"selected"}>Select a country…</option>`+N.map(e=>`<option value="${e.code}" ${e.code===t?"selected":""}>${e.flag} ${e.name}</option>`).join("")}function ve(t){const e=b(t.nationality),a=b(t.destination);return`
    <a class="visa-pass-row" href="#/pass/${t.id}">
      <span class="visa-pass-route">${(e==null?void 0:e.flag)??""} → ${(a==null?void 0:a.flag)??""} <strong>${(a==null?void 0:a.name)??t.destination}</strong></span>
      <span class="mono">${t.id}</span>
      <span class="visa-tag" style="background:#0f7b6c1a;color:#0f7b6c">Approved</span>
    </a>`}const fe={path:"/visa",render(){p.setRole("visa");const t=p.get().passes,e=p.get().user;return m(`
      <section class="hero hero-visa">
        <div class="hero-inner">
          <span class="eyebrow eyebrow-light">In partnership with African governments</span>
          <h1>The AfriTravel <span class="accent">Visa-Free Pass</span></h1>
          <p class="hero-sub">One registration. Travel visa-free across participating African nations.
            Register your trip, get an approved digital pass, and show it at the border.</p>
          <div class="visa-steps">
            <div class="visa-step"><span class="visa-step-n">1</span> Register your details</div>
            <div class="visa-step"><span class="visa-step-n">2</span> Get instant approval</div>
            <div class="visa-step"><span class="visa-step-n">3</span> Show your pass at the border</div>
          </div>
        </div>
      </section>

      <section class="section visa-register">
        <div class="checkout-grid">
          <form id="pass-form" class="card pad">
            <h2>Register for a Visa-Free Pass</h2>
            <p class="muted">Free for citizens of participating nations. Approval is instant in this demo.</p>

            <div class="form-2col">
              <label>Full name (as on passport)
                <input name="holder" value="${(e==null?void 0:e.name)??""}" placeholder="e.g. Ama Mensah" required />
              </label>
              <label>Passport number
                <input name="passportNo" placeholder="e.g. G1234567" required />
              </label>
            </div>

            <div class="form-2col">
              <label>Nationality
                <select name="nationality" required>${x()}</select>
              </label>
              <label>Destination
                <select name="destination" required>${x()}</select>
              </label>
            </div>

            <div class="form-2col">
              <label>Travel from <input type="date" name="validFrom" required /></label>
              <label>Travel until <input type="date" name="validUntil" required /></label>
            </div>

            <label>Purpose of travel
              <select name="purpose">${ge.map(a=>`<option value="${a}">${a}</option>`).join("")}</select>
            </label>

            <label class="checkbox">
              <input type="checkbox" name="consent" required />
              <span>I confirm the details are correct and consent to sharing them with partner immigration authorities.</span>
            </label>

            <div id="pass-error" class="pay-fail"></div>
            <button class="btn btn-primary btn-block" type="submit">Register & issue pass</button>
          </form>

          <aside class="card pad visa-side">
            <h3>Why register?</h3>
            <ul class="amenities">
              <li>✓ Skip visa queues at the border</li>
              <li>✓ One pass, multiple partner nations</li>
              <li>✓ Recognised by partner immigration</li>
              <li>✓ Instant, paperless approval</li>
            </ul>
            ${t.length?`<h3 style="margin-top:1.25rem">Your passes</h3><div class="visa-pass-list">${t.map(ve).join("")}</div>`:'<p class="muted small" style="margin-top:1.25rem">Your issued passes will appear here.</p>'}
          </aside>
        </div>
        <p class="muted small">Demo programme — illustrative only, not a real travel document or legal advice.</p>
      </section>
    `)},mounted(){f();const t=document.getElementById("pass-form"),e=document.getElementById("pass-error");!t||!e||t.addEventListener("submit",a=>{a.preventDefault();const s=new FormData(t),n=String(s.get("nationality")),i=String(s.get("destination"));if(n===i){e.textContent="Pick a destination different from your nationality.";return}e.textContent="";const r={id:W("AFP").toUpperCase(),holder:String(s.get("holder")),passportNo:String(s.get("passportNo")).toUpperCase(),nationality:n,destination:i,validFrom:String(s.get("validFrom")),validUntil:String(s.get("validUntil")),purpose:String(s.get("purpose")),status:"approved",issuedAt:new Date().toISOString()};p.addPass(r),location.hash=`/pass/${r.id}`})}};function A(t){const e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}const ye={path:"/pass/:id",render(t){p.setRole("visa");const e=p.passById(t.id);if(!e)return m(`
        <section class="section narrow center">
          <h2>Pass not found</h2>
          <p class="muted">This pass isn't on this device. Passes are stored locally in the demo.</p>
          <a class="btn btn-primary" href="#/visa">Register for a pass</a>
        </section>`);const a=b(e.nationality),s=b(e.destination);return m(`
      <section class="section narrow">
        <div class="issued-banner">
          <span class="confirm-tick small-tick">✓</span>
          <div>
            <h1>Pass approved</h1>
            <p class="muted">Your Visa-Free Pass has been issued. Show it at the border.</p>
          </div>
        </div>

        <div class="pass" id="pass-card">
          <div class="pass-top">
            <div class="brand pass-brand"><span class="brand-mark">▲</span> Afri<strong>Travel</strong></div>
            <span class="pass-kind">VISA-FREE PASS</span>
          </div>

          <div class="pass-body">
            <div class="pass-route">
              <div class="pass-node">
                <span class="pass-flag">${(a==null?void 0:a.flag)??""}</span>
                <span class="pass-cc">${(a==null?void 0:a.code)??e.nationality}</span>
                <span class="muted small">${(a==null?void 0:a.name)??""}</span>
              </div>
              <div class="pass-arrow">✈</div>
              <div class="pass-node">
                <span class="pass-flag">${(s==null?void 0:s.flag)??""}</span>
                <span class="pass-cc">${(s==null?void 0:s.code)??e.destination}</span>
                <span class="muted small">${(s==null?void 0:s.name)??""}</span>
              </div>
            </div>

            <div class="pass-grid">
              <div><span class="pass-label">Holder</span><span class="pass-val">${e.holder}</span></div>
              <div><span class="pass-label">Passport</span><span class="pass-val mono">${e.passportNo}</span></div>
              <div><span class="pass-label">Purpose</span><span class="pass-val">${e.purpose}</span></div>
              <div><span class="pass-label">Status</span><span class="pass-val pass-status">● Approved</span></div>
              <div><span class="pass-label">Valid from</span><span class="pass-val">${A(e.validFrom)}</span></div>
              <div><span class="pass-label">Valid until</span><span class="pass-val">${A(e.validUntil)}</span></div>
            </div>
          </div>

          <div class="pass-foot">
            <div class="pass-qr">${ee(e.id)}</div>
            <div class="pass-foot-meta">
              <span class="pass-label">Pass number</span>
              <span class="pass-val mono">${e.id}</span>
              <span class="muted small">Issued ${A(e.issuedAt)} · Scan at immigration</span>
            </div>
          </div>
        </div>

        <div class="pass-actions">
          <button class="btn btn-primary" data-action="print">Save / print pass</button>
          <a class="btn btn-ghost" href="#/visa">Register another</a>
          <a class="btn btn-ghost" href="#/">Find a stay</a>
        </div>
        <p class="muted small center">Demo programme — not a real travel document. The code is decorative.</p>
      </section>
    `)},mounted(){var t;f(),(t=document.querySelector('[data-action="print"]'))==null||t.addEventListener("click",()=>window.print())}},be="mer-002",$e={path:"/merchant",render(){var c;p.setRole("merchant");const t=y.filter(o=>o.merchantId===be),e=new Set(t.map(o=>o.id)),a=p.get().bookings.filter(o=>e.has(o.stayId)),s=a.filter(o=>o.status==="paid").reduce((o,h)=>o+h.total,0),n=((c=t[0])==null?void 0:c.currency)??"USD",i=t.map(o=>`
        <tr>
          <td>
            <span class="thumb" style="background:${E(o.id)}">${o.image}</span>
            ${o.name}
          </td>
          <td>${o.city}, ${B(o.countryCode)}</td>
          <td>${u(o.pricePerNight,o.currency)}</td>
          <td>${o.rating.toFixed(1)} ★</td>
          <td><span class="status status-live">Live</span></td>
        </tr>`).join(""),r=a.length?a.map(o=>{var h;return`
            <tr>
              <td>${((h=k(o.stayId))==null?void 0:h.name)??o.stayId}</td>
              <td>${o.guestName}</td>
              <td>${o.checkIn} → ${o.checkOut}</td>
              <td>${u(o.total,o.currency)}</td>
              <td><span class="status status-${o.status}">${o.status}</span></td>
            </tr>`}).join(""):`<tr><td colspan="5" class="muted">No bookings yet — they'll appear here once guests reserve.</td></tr>`;return m(`
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
          <div class="stat"><span class="stat-num">${t.length}</span><span class="muted">Active listings</span></div>
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
    `)},mounted(){var t;f(),(t=document.querySelector('[data-action="new-listing"]'))==null||t.addEventListener("click",()=>{alert("Demo: the new-listing wizard would open here (photos, pricing, calendar, payout setup).")})}},ke={path:"/admin",render(){var g;p.setRole("admin");const t=p.get().bookings,e=new Set(y.map(l=>l.merchantId)),a=new Set(y.map(l=>l.countryCode)),s=new Map;for(const l of t.filter(d=>d.status==="paid"))s.set(l.currency,(s.get(l.currency)??0)+l.total);const n=[...s.entries()].map(([l,d])=>u(d,l)).join(" · ")||"—",i=new Map;for(const l of y){const d=((g=N.find(w=>w.code===l.countryCode))==null?void 0:g.region)??"—";i.set(d,(i.get(d)??0)+1)}const r=Math.max(...i.values()),c=[...i.entries()].sort((l,d)=>d[1]-l[1]).map(([l,d])=>`
        <div class="bar-row">
          <span>${l} Africa</span>
          <div class="bar"><div class="bar-fill" style="width:${d/r*100}%"></div></div>
          <span class="muted">${d}</span>
        </div>`).join(""),o=t.slice(0,8),h=o.length?o.map(l=>{var d;return`
            <tr>
              <td class="mono">${l.id}</td>
              <td>${((d=k(l.stayId))==null?void 0:d.name)??l.stayId}</td>
              <td>${l.guestName}</td>
              <td>${u(l.total,l.currency)}</td>
              <td>${l.paymentMethod==="momo"?"MoMo":"Paystack"}</td>
              <td><span class="status status-${l.status}">${l.status}</span></td>
            </tr>`}).join(""):'<tr><td colspan="6" class="muted">No bookings yet. Make one from the customer portal to see it here.</td></tr>';return m(`
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
          <div class="stat"><span class="stat-num">${y.length}</span><span class="muted">Listings</span></div>
          <div class="stat"><span class="stat-num">${e.size}</span><span class="muted">Merchants</span></div>
          <div class="stat"><span class="stat-num">${a.size}</span><span class="muted">Countries</span></div>
          <div class="stat"><span class="stat-num">${t.length}</span><span class="muted">Bookings</span></div>
        </div>

        <div class="admin-grid">
          <div class="card pad">
            <h3>Inventory by region</h3>
            <div class="bars">${c}</div>
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
            <tbody>${h}</tbody>
          </table>
        </div>
      </section>
    `)},mounted(){var t;f(),(t=document.querySelector('[data-action="reset"]'))==null||t.addEventListener("click",()=>{confirm("Reset all demo bookings and session state?")&&(p.reset(),location.reload())})}},we={path:"/login",render(){return m(`
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
    `)},mounted(){f();const t=document.getElementById("login-form");t==null||t.addEventListener("submit",e=>{e.preventDefault();const a=new FormData(t);p.setRole("customer"),p.login(String(a.get("name")),String(a.get("email"))),location.hash="/"})}},Se={path:"/404",render(){return m(`
      <section class="section narrow center">
        <h1>404</h1>
        <p class="muted">That page wandered off the map.</p>
        <a class="btn btn-primary" href="#/">Back to stays</a>
      </section>
    `)},mounted(){f()}},V=document.getElementById("app");if(!V)throw new Error("#app container missing");const Pe=[ae,ie,re,me,he,we].map(t=>({...t,render:(e,a)=>(p.get().role!=="customer"&&p.get().role!=="visa"&&p.setRole("customer"),t.render(e,a))}));Z(V,[...Pe,fe,ye,$e,ke,Se]);
//# sourceMappingURL=index-DJM4U_K4.js.map
