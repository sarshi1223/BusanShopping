"use client";

import { useMemo, useState } from "react";

type Shop = {
  id: number;
  name: string;
  kr: string;
  area: string;
  category: string;
  station: string;
  time: string;
  price: string;
  description: string;
  picks: string[];
  query: string;
  featured?: boolean;
};

const shops: Shop[] = [
  { id: 1, name: "光復路時尚文化街", kr: "광복로 패션거리", area: "南浦洞", category: "潮流服飾", station: "南浦站 1、3 號出口", time: "約 10:00–21:00", price: "₩–₩₩", description: "釜山版明洞，運動品牌、韓系服飾與美妝一次逛齊；寬敞徒步區也很適合一路散步到 BIFF 廣場。", picks: ["Nike / Adidas 旗艦店", "ABC Mart Grand Stage", "巷弄設計小店"], query: "광복로 패션거리 부산", featured: true },
  { id: 2, name: "樂天百貨 光復店", kr: "롯데백화점 광복점", area: "南浦洞", category: "百貨商場", station: "南浦站 8 號出口直結", time: "10:30–20:00", price: "₩₩–₩₩₩", description: "百貨、超市與港景一次完成。建議傍晚上頂樓免費展望台，再到 B1 超市收尾採買。", picks: ["B1 樂天超市", "頂樓空中庭園", "週六影島大橋開橋"], query: "롯데백화점 광복점", featured: true },
  { id: 3, name: "國際市場", kr: "국제시장", area: "南浦洞", category: "傳統市場", station: "札嘎其站 7 號出口", time: "09:00–20:00・週日多休", price: "₩", description: "迷宮般的老市場，從棉被、生活雜貨到復古服飾都有，適合喜歡挖寶與在地感的人。", picks: ["韓國棉被", "編織菜瓜布", "復古軍裝與生活雜貨"], query: "국제시장 부산" },
  { id: 4, name: "富平罐頭市場", kr: "부평깡통시장", area: "南浦洞", category: "美食伴手禮", station: "札嘎其站 3、5 號出口", time: "市場至 20:00・夜市 19:30–23:30", price: "₩", description: "白天是傳統市場，晚上變身小吃夜市；動線窄，建議避開週末 20–21 點。", picks: ["釜山魚糕", "拌粉條", "巨人炸雞"], query: "부평깡통시장", featured: true },
  { id: 5, name: "KAKAO FRIENDS 釜山旗艦店", kr: "카카오프렌즈 부산플래그십스토어", area: "南浦洞", category: "生活雜貨", station: "南浦站步行約 5 分", time: "約 10:30–22:00", price: "₩–₩₩", description: "多層樓角色商品空間，餐具、文具與釜山限定周邊很適合送禮。", picks: ["釜山限定商品", "Ryan 周邊", "實用文具家品"], query: "카카오프렌즈 부산플래그십스토어" },
  { id: 6, name: "B&C 麵包店", kr: "비엔씨 제과", area: "南浦洞", category: "美食伴手禮", station: "南浦站步行約 5 分", time: "約 09:30–22:00", price: "₩", description: "釜山老字號麵包店，適合安排為逛街中途補給或離開前的甜點伴手禮。", picks: ["紅豆麵包", "鮮奶油麵包", "即買即吃"], query: "비엔씨 광복본점" },
  { id: 7, name: "西面地下街", kr: "서면지하도상가", area: "西面・田浦", category: "平價服飾", station: "西面站站內直結", time: "約 10:00–22:00", price: "₩", description: "不受天氣影響的平價掃貨主場，服飾、鞋包、美妝密集；出口多，記得以出口編號定位。", picks: ["萬元韓系服飾", "鞋包配件", "雨天備案"], query: "서면지하도상가", featured: true },
  { id: 8, name: "樂天百貨 釜山本店", kr: "롯데백화점 부산본점", area: "西面・田浦", category: "百貨商場", station: "西面站直結", time: "10:30–20:00", price: "₩₩–₩₩₩", description: "百貨、免稅店與餐飲集中，適合鎖定品牌與退稅採買，也可由地下街直接進入。", picks: ["韓系設計品牌", "樂天免稅店", "雨天友善"], query: "롯데백화점 부산본점" },
  { id: 9, name: "Object 田浦店", kr: "오브젝트 전포점", area: "西面・田浦", category: "選物", station: "田浦站 7 號出口", time: "約 12:00–21:00", price: "₩–₩₩", description: "文具與插畫選物迷的口袋名單，多位韓國創作者商品集中，適合慢慢挑小禮物。", picks: ["插畫文具", "韓國創作者小物", "質感送禮"], query: "오브젝트 전포점", featured: true },
  { id: 10, name: "MUSINSA STANDARD 西面", kr: "무신사 스탠다드 서면", area: "西面・田浦", category: "潮流服飾", station: "西面站步行約 4 分", time: "約 11:00–21:30", price: "₩–₩₩", description: "韓國年輕族群常穿的極簡基本款，版型與尺寸齊全，男女裝都好搭。", picks: ["西裝外套", "寬版長褲", "簡約基本款"], query: "무신사 스탠다드 서면" },
  { id: 11, name: "Olive Young 西面中央店", kr: "올리브영 서면중앙점", area: "西面・田浦", category: "藥妝美妝", station: "西面站 2 號出口", time: "約 10:00–22:30", price: "₩–₩₩", description: "商圈核心的大型門市，彩妝、保養、髮品和零食一次補齊；先比價組合包再結帳。", picks: ["面膜與 CICA 保養", "痘痘貼", "Delight Project 零食"], query: "올리브영 서면중앙점", featured: true },
  { id: 12, name: "田浦咖啡街", kr: "전포카페거리", area: "西面・田浦", category: "咖啡休息", station: "田浦站 7 號出口", time: "多為 11:00–22:00", price: "₩–₩₩", description: "五金老街轉型的咖啡與小店聚落，建議午後安排 2–3 小時，邊逛選物邊休息。", picks: ["獨立咖啡店", "巷弄選物", "拍照散策"], query: "전포카페거리 부산" },
  { id: 13, name: "新世界百貨 Centum City", kr: "신세계백화점 센텀시티점", area: "海雲台・Centum", category: "百貨商場", station: "Centum City 站直結", time: "10:30–20:00・週末至 20:30", price: "₩₩–₩₩₩", description: "從精品、韓國設計師品牌到 Spa Land 都在同一棟，雨天或想高效率購物的首選。", picks: ["韓國設計師品牌", "Spa Land", "大型書店與餐飲"], query: "신세계백화점 센텀시티점", featured: true },
  { id: 14, name: "海理團路", kr: "해리단길", area: "海雲台・Centum", category: "選物", station: "海雲台站 4 號出口", time: "多為 11:00–20:00", price: "₩–₩₩", description: "舊車站後方的低矮住宅改造街區，獨立品牌、底片相機與小型選物店密集。", picks: ["獨立設計品牌", "底片相機店", "老宅咖啡"], query: "해리단길", featured: true },
  { id: 15, name: "LUFT MANSION", kr: "루프트맨션", area: "海雲台・Centum", category: "選物", station: "海雲台站步行約 7 分", time: "約 11:00–20:00", price: "₩₩", description: "海理團路的人氣生活風格選物店，從香氛、家飾到小眾配件都很有完成度。", picks: ["香氛", "家居選品", "小眾飾品"], query: "루프트맨션 해리단길" },
  { id: 16, name: "BUSAN BADA SAND", kr: "부산바다샌드", area: "海雲台・Centum", category: "美食伴手禮", station: "海雲台站步行約 5 分", time: "約 10:00–19:00・售完為止", price: "₩", description: "白熊招牌的釜山限定夾心餅乾，以奶油與釜山蜂蜜製作，熱門時段可能排隊。", picks: ["焦糖奶油夾心", "海鷗白熊包裝", "建議先買再逛"], query: "부산바다샌드 해운대점", featured: true },
  { id: 17, name: "海雲台大街 Olive Young", kr: "올리브영 해운대타운점", area: "海雲台・Centum", category: "藥妝美妝", station: "海雲台站 5 號出口", time: "約 10:00–23:00", price: "₩–₩₩", description: "從地鐵站走往沙灘途中即可採買，營業較晚，適合把藥妝補貨留到晚餐後。", picks: ["熱門美妝", "旅行裝與組合包", "夜間補貨"], query: "올리브영 해운대타운점" },
  { id: 18, name: "樂天 Premium Outlet 東釜山", kr: "롯데프리미엄아울렛 동부산점", area: "機張・Osiria", category: "Outlet", station: "Osiria 站步行約 10 分", time: "10:30–20:30・週末至 21:00", price: "₩–₩₩₩", description: "適合安排半天以上的大型 Outlet，國際品牌、樂天超市與餐飲齊全，親子也好逛。", picks: ["折扣運動品牌", "國際精品", "順遊海東龍宮寺"], query: "롯데프리미엄아울렛 동부산점", featured: true },
  { id: 19, name: "m・millac", kr: "밀락더마켓", area: "廣安里", category: "選物", station: "廣安站轉公車或計程車", time: "約 10:00–24:00", price: "₩–₩₩", description: "面海的複合文化空間，餐飲、快閃選物與廣安大橋夜景一次完成，傍晚造訪最有氣氛。", picks: ["海景餐飲", "期間限定快閃", "廣安大橋夜景"], query: "밀락더마켓 부산" },
  { id: 20, name: "釜田市場", kr: "부전시장", area: "西面・田浦", category: "傳統市場", station: "釜田站 1 號出口", time: "約 05:00–19:00", price: "₩", description: "比觀光商圈更生活化的傳統市場，乾貨、蔘品與日常食材選擇多，適合早上逛。", picks: ["乾貨與海苔", "人蔘藥材", "在地市場感"], query: "부전시장 부산" },
];

const areas = ["全部區域", "南浦洞", "西面・田浦", "海雲台・Centum", "廣安里", "機張・Osiria"];
const categories = ["全部種類", "潮流服飾", "平價服飾", "藥妝美妝", "選物", "百貨商場", "傳統市場", "Outlet", "生活雜貨", "美食伴手禮", "咖啡休息"];

const areaNotes: Record<string, { label: string; note: string; route: string }> = {
  "南浦洞": { label: "港都經典", note: "市場、街牌與百貨最完整，新手首選。", route: "札嘎其站 → BIFF → 光復路 → 樂天百貨" },
  "西面・田浦": { label: "年輕潮流", note: "平價服飾、藥妝與選物密度最高。", route: "西面地下街 → MUSINSA → 田浦選物與咖啡" },
  "海雲台・Centum": { label: "海景質感", note: "百貨精品、老宅選物與伴手禮兼得。", route: "Centum City → 海理團路 → 海雲台大街" },
  "廣安里": { label: "夜景慢逛", note: "適合傍晚開始，購物後接海景晚餐。", route: "廣安里海灘 → m・millac → 廣安大橋夜景" },
  "機張・Osiria": { label: "折扣掃貨", note: "需留半天以上，適合集中買品牌折扣。", route: "Outlet → 樂天超市 → 海岸景點" },
};

const naverMap = (query: string) => `https://map.naver.com/p/search/${encodeURIComponent(query)}`;
const googleMap = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + " Busan")}`;

export default function Home() {
  const [mode, setMode] = useState<"area" | "category">("area");
  const [filter, setFilter] = useState("全部區域");
  const [keyword, setKeyword] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);

  const filters = mode === "area" ? areas : categories;
  const visible = useMemo(() => shops.filter((shop) => {
    const filterMatch = filter.startsWith("全部") || (mode === "area" ? shop.area === filter : shop.category === filter);
    const searchMatch = `${shop.name}${shop.kr}${shop.area}${shop.category}${shop.picks.join("")}`.toLowerCase().includes(keyword.toLowerCase());
    return filterMatch && searchMatch && (!savedOnly || saved.includes(shop.id));
  }), [mode, filter, keyword, savedOnly, saved]);

  const switchMode = (next: "area" | "category") => {
    setMode(next);
    setFilter(next === "area" ? "全部區域" : "全部種類");
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="回到頁首">
          <span className="brand-mark">B</span>
          <span>BUSAN<br /><b>SHOPPING NOTE</b></span>
        </a>
        <nav aria-label="主要導覽">
          <a href="#explore">探索店家</a>
          <a href="#route">路線靈感</a>
          <a href="#tips">購物提醒</a>
        </nav>
        <button className={`saved-button ${savedOnly ? "active" : ""}`} onClick={() => setSavedOnly(!savedOnly)}>
          ♡ 我的收藏 <span>{saved.length}</span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-stamp">BUSAN<br />35° N</div>
        <div className="hero-copy">
          <p className="eyebrow">2026 BUSAN SHOPPING FIELD GUIDE</p>
          <h1>釜山，<br />逛到海邊去。</h1>
          <p className="hero-lead">從南浦洞的老市場，到田浦的獨立選物。<br />把 <strong>20 個必逛據點</strong>，收進一份能直接帶著走的購物筆記。</p>
          <div className="hero-actions">
            <a className="primary" href="#explore">開始逛店 <span>↓</span></a>
            <span className="updated">LAST UPDATED<br /><b>JUL 2026</b></span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun"></div>
          <div className="city-label label-1">NAMPO</div>
          <div className="city-label label-2">SEOMYEON</div>
          <div className="city-label label-3">HAEUNDAE</div>
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="postcard">SHOP<br />EAT<br />WALK<br /><i>repeat</i></div>
        </div>
      </section>

      <section className="quick-strip">
        <p>第一次去？從這裡開始</p>
        <div><b>01</b><span>想一次逛齊</span><strong>南浦洞</strong></div>
        <div><b>02</b><span>想找年輕潮流</span><strong>西面・田浦</strong></div>
        <div><b>03</b><span>想舒服慢逛</span><strong>海雲台</strong></div>
      </section>

      <section className="explore" id="explore">
        <div className="section-heading">
          <div><p className="eyebrow">FIND YOUR STOP</p><h2>今天想怎麼逛？</h2></div>
          <p>依地區規劃動線，或直接鎖定想買的種類。<br />營業時間可能變動，出發前請再以地圖資訊確認。</p>
        </div>

        <div className="mode-switch" role="tablist" aria-label="瀏覽方式">
          <button className={mode === "area" ? "active" : ""} onClick={() => switchMode("area")} role="tab" aria-selected={mode === "area"}><span>01</span> 依區域逛</button>
          <button className={mode === "category" ? "active" : ""} onClick={() => switchMode("category")} role="tab" aria-selected={mode === "category"}><span>02</span> 依種類找</button>
        </div>

        <div className="filter-row">
          <div className="pills">
            {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
          <label className="search">
            <span>⌕</span>
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="搜尋店名、商品…" aria-label="搜尋店家" />
          </label>
        </div>

        <div className="result-meta">
          <p><b>{String(visible.length).padStart(2, "0")}</b> PLACES FOUND</p>
          {savedOnly && <button onClick={() => setSavedOnly(false)}>顯示全部 ×</button>}
        </div>

        <div className="shop-grid">
          {visible.map((shop, index) => (
            <article className={`shop-card ${shop.featured ? "featured" : ""}`} key={shop.id}>
              <div className="card-top">
                <span className="index">{String(index + 1).padStart(2, "0")}</span>
                <button className={`heart ${saved.includes(shop.id) ? "saved" : ""}`} onClick={() => setSaved(saved.includes(shop.id) ? saved.filter(id => id !== shop.id) : [...saved, shop.id])} aria-label={saved.includes(shop.id) ? `取消收藏 ${shop.name}` : `收藏 ${shop.name}`}>{saved.includes(shop.id) ? "♥" : "♡"}</button>
              </div>
              <div className="tags"><span>{shop.area}</span><span>{shop.category}</span></div>
              <h3>{shop.name}</h3>
              <p className="kr">{shop.kr}</p>
              <p className="description">{shop.description}</p>
              <dl>
                <div><dt>最近交通</dt><dd>{shop.station}</dd></div>
                <div><dt>建議時段</dt><dd>{shop.time}</dd></div>
                <div><dt>預算感</dt><dd>{shop.price}</dd></div>
              </dl>
              <div className="picks">
                <b>編輯選物</b>
                {shop.picks.map(pick => <span key={pick}>＋ {pick}</span>)}
              </div>
              <div className="map-actions">
                <a href={naverMap(shop.query)} target="_blank" rel="noreferrer">Naver Map <span>↗</span></a>
                <a href={googleMap(shop.query)} target="_blank" rel="noreferrer">Google Maps <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>
        {visible.length === 0 && <div className="empty"><b>找不到符合條件的店家</b><p>換個關鍵字，或取消收藏篩選再試一次。</p></div>}
      </section>

      <section className="routes" id="route">
        <div className="section-heading light">
          <div><p className="eyebrow">ONE DAY ROUTES</p><h2>不用走回頭路</h2></div>
          <p>以地鐵站為起終點的省力動線。<br />先逛小店、最後採買重物，雙手會感謝你。</p>
        </div>
        <div className="route-list">
          {Object.entries(areaNotes).slice(0, 3).map(([area, item], index) => (
            <article key={area}>
              <span className="route-num">0{index + 1}</span>
              <div><p>{item.label}</p><h3>{area}</h3><span>{item.note}</span></div>
              <div className="route-line"><i></i><p>{item.route}</p></div>
              <button onClick={() => { switchMode("area"); setFilter(area); document.querySelector("#explore")?.scrollIntoView({ behavior: "smooth" }); }}>看這區店家 ↗</button>
            </article>
          ))}
        </div>
      </section>

      <section className="tips" id="tips">
        <div>
          <p className="eyebrow">BEFORE YOU SHOP</p>
          <h2>出發前，<br />記住這 4 件事。</h2>
        </div>
        <ol>
          <li><b>01</b><div><strong>韓國找路，Naver Map 優先</strong><p>Google Maps 可查店名與評論，但步行導航在韓國可能不完整。</p></div></li>
          <li><b>02</b><div><strong>護照隨身，留意即時退稅</strong><p>大型店常可現場退稅；門檻與規則依店家最新公告為準。</p></div></li>
          <li><b>03</b><div><strong>先小店，最後超市</strong><p>把零食、飲料與大量藥妝排在回飯店前，少提幾公里重物。</p></div></li>
          <li><b>04</b><div><strong>週末熱門店提早到</strong><p>海理團路伴手禮與田浦人氣小店，可能排隊或提早售完。</p></div></li>
        </ol>
      </section>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">B</span><span>BUSAN<br /><b>SHOPPING NOTE</b></span></div>
        <p>資料綜整自使用者提供的旅遊文章，店家資訊僅供行程規劃參考。<br />請於出發前透過地圖確認最新營業資訊。</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
