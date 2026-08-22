const defaults=[
{id:1,name:"Ön Fren Balatası Seti",brand:"BOSCH",category:"Fren",price:1249.90,stock:15,fit:"Birçok model ile uyumlu",image:"🛑"},
{id:2,name:"Motor Yağ Filtresi",brand:"MANN-FILTER",category:"Filtre",price:389.90,stock:30,fit:"Kaliteli filtrasyon",image:"🔧"},
{id:3,name:"Komple Debriyaj Seti",brand:"VALEO",category:"Debriyaj",price:4799.90,stock:7,fit:"Uzun ömürlü performans",image:"⚙️"}
];
function products(){let x=localStorage.getItem("ea_products");if(!x){localStorage.setItem("ea_products",JSON.stringify(defaults));return defaults}try{return JSON.parse(x)}catch{return defaults}}
function saveAll(x){localStorage.setItem("ea_products",JSON.stringify(x))}
function esc(x){return String(x).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function render(){
 let q=document.getElementById("search").value.toLowerCase(), ps=products().filter(p=>(p.name+" "+p.brand).toLowerCase().includes(q));
 document.getElementById("rows").innerHTML=ps.map(p=>`<tr><td><b>${esc(p.name)}</b><br><small>${esc(p.fit||"")}</small></td><td>${esc(p.brand)}</td><td>${esc(p.category)}</td><td>${p.price.toLocaleString("tr-TR",{minimumFractionDigits:2})} ₺</td><td>${p.stock}</td><td><button class="edit" onclick="edit(${p.id})">Düzenle</button> <button class="del" onclick="removeProduct(${p.id})">Sil</button></td></tr>`).join("");
 let all=products();document.getElementById("count").textContent=all.length;document.getElementById("stock").textContent=all.reduce((a,p)=>a+Number(p.stock),0);let avg=all.length?all.reduce((a,p)=>a+Number(p.price),0)/all.length:0;document.getElementById("avg").textContent=avg.toLocaleString("tr-TR",{minimumFractionDigits:2})+" ₺";
}
function openForm(p=null){document.getElementById("modal").classList.add("show");document.getElementById("title").textContent=p?"Ürünü Düzenle":"Yeni Ürün Ekle";document.getElementById("id").value=p?.id||"";document.getElementById("name").value=p?.name||"";document.getElementById("brand").value=p?.brand||"";document.getElementById("category").value=p?.category||"Fren";document.getElementById("price").value=p?.price??"";document.getElementById("stockInput").value=p?.stock??"";document.getElementById("fit").value=p?.fit||"";document.getElementById("image").value=p?.image||"🔧"}
function closeForm(){document.getElementById("modal").classList.remove("show")}
function save(e){e.preventDefault();let ps=products(),id=document.getElementById("id").value,p={id:id?Number(id):Date.now(),name:name.value.trim(),brand:brand.value.trim(),category:category.value,price:Number(price.value),stock:Number(stockInput.value),fit:fit.value.trim(),image:image.value.trim()||"🔧"};if(id){let i=ps.findIndex(x=>x.id===Number(id));ps[i]=p}else ps.push(p);saveAll(ps);closeForm();render();notify("Ürün kaydedildi.")}
function edit(id){let p=products().find(x=>x.id===id);if(p)openForm(p)}
function removeProduct(id){let p=products().find(x=>x.id===id);if(p&&confirm(p.name+" silinsin mi?")){saveAll(products().filter(x=>x.id!==id));render();notify("Ürün silindi.")}}
function notify(t){let e=document.getElementById("toast");e.textContent=t;e.style.display="block";setTimeout(()=>e.style.display="none",1800)}
function soon(e){e.preventDefault();notify("Bu bölüm sonraki aşamada yapılacak.")}
document.addEventListener("DOMContentLoaded",render);
