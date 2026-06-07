import { useState, useRef } from "react";

// данные меню
const MENU = {
  coffee: [
    { name: "Эспрессо", price: 120 },
    { name: "Капучино", price: 190 },
    { name: "Латте", price: 210 },
    { name: "Американо", price: 150 },
    { name: "Раф", price: 230 },
    { name: "Флэт Уайт", price: 200 },
  ],
  pastry: [
    { name: "Круассан", price: 90 },
    { name: "Булочка с корицей", price: 110 },
    { name: "Чизкейк", price: 230 },
    { name: "Брауни", price: 90 },
    { name: "Эклер", price: 140 },
    { name: "Штрудель", price: 240 },
  ],
  tea: [
    { name: "Earl Grey", price: 100 },
    { name: "Зелёный чай", price: 90 },
    { name: "Ромашковый", price: 85 },
    { name: "Ягодный морс", price: 130 },
  ],
};

// слайдер баннер
const SLIDES = [
  {
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/16d47531-c9ca-40f2-b031-679ac9b948d2.jpg",
    title: "Кофейня Уют",
    text: "Место, где каждая чашка — маленький праздник ☕",
  },
  {
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/8986274b-25e2-4952-bd6a-eae17d05349b.jpg",
    title: "Авторский кофе",
    text: "Зерна обжариваются еженедельно для лучшего вкуса",
  },
  {
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/37ccf19b-07c3-4fa0-8922-b4c4d8edd2a1.jpg",
    title: "Свежая выпечка",
    text: "Готовим каждый день — никаких заморозок",
  },
];

// фото для слайдера в меню
const MENU_PHOTOS = {
  coffee: [
    "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/8986274b-25e2-4952-bd6a-eae17d05349b.jpg",
    "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/6b8d3310-b239-4068-b90d-0a8eed664a68.jpg",
  ],
  pastry: [
    "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/37ccf19b-07c3-4fa0-8922-b4c4d8edd2a1.jpg",
    "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/8986274b-25e2-4952-bd6a-eae17d05349b.jpg",
  ],
  tea: [
    "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/6b8d3310-b239-4068-b90d-0a8eed664a68.jpg",
    "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/37ccf19b-07c3-4fa0-8922-b4c4d8edd2a1.jpg",
  ],
};

// мастер-классы
const MC = [
  {
    title: "Базовый латте-арт",
    desc: "Научитесь рисовать простые узоры на кофе. Подходит для начинающих.",
    price: 2500,
    level: "Начинающий",
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/6b8d3310-b239-4068-b90d-0a8eed664a68.jpg",
  },
  {
    title: "Продвинутый латте-арт",
    desc: "Сложные узоры и техники. Для тех, кто уже пробовал.",
    price: 3500,
    level: "Продвинутый",
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/8986274b-25e2-4952-bd6a-eae17d05349b.jpg",
  },
  {
    title: "От зерна до чашки",
    desc: "Обжарка, помол, заваривание — полное погружение в мир кофе.",
    price: 4200,
    level: "Для всех",
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/37ccf19b-07c3-4fa0-8922-b4c4d8edd2a1.jpg",
  },
];

type Cat = "coffee" | "pastry" | "tea";

export default function Index() {
  // слайдер баннера
  const [slide, setSlide] = useState(0);

  // слайдер фото в меню
  const [menuPhoto, setMenuPhoto] = useState(0);

  // фильтр категории меню
  const [cat, setCat] = useState<Cat>("coffee");

  // бронирование
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [bookOk, setBookOk] = useState(false);

  // рефы для скролла
  const refTop      = useRef<HTMLDivElement>(null);
  const refMenu     = useRef<HTMLDivElement>(null);
  const refMc       = useRef<HTMLDivElement>(null);
  const refBook     = useRef<HTMLDivElement>(null);
  const refContacts = useRef<HTMLDivElement>(null);

  function goTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  // слайдер баннера
  function prevSlide() { setSlide(s => s === 0 ? SLIDES.length - 1 : s - 1); }
  function nextSlide() { setSlide(s => s === SLIDES.length - 1 ? 0 : s + 1); }

  // слайдер фото меню
  function prevPhoto() { setMenuPhoto(p => p === 0 ? MENU_PHOTOS[cat].length - 1 : p - 1); }
  function nextPhoto() { setMenuPhoto(p => p === MENU_PHOTOS[cat].length - 1 ? 0 : p + 1); }

  // смена категории сбрасывает фото
  function changeCat(c: Cat) { setCat(c); setMenuPhoto(0); }

  // бронирование
  function submitBook(e: React.FormEvent) {
    e.preventDefault();
    setBookOk(true);
    setName(""); setPhone(""); setDate(""); setTime(""); setGuests("");
    setTimeout(() => setBookOk(false), 3500);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#faf4ea", minHeight: "100vh" }}>

      {/* ===== ШАПКА ===== */}
      <div style={{
        background: "#faf4ea",
        borderBottom: "2px solid #c17f4a",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => goTo(refTop)}>
          <span style={{ fontSize: 28 }}>☕</span>
          <span style={{ fontSize: 22, fontWeight: "bold", color: "#3e1f00" }}>Кофейня Уют</span>
        </div>

        <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => goTo(refTop)}      style={navBtn}>Главная</button>
          <button onClick={() => goTo(refMenu)}     style={navBtn}>Меню</button>
          <button onClick={() => goTo(refBook)}     style={navBtn}>Бронирование</button>
          <button onClick={() => goTo(refMc)}       style={navBtn}>Мастер-классы</button>
          <button onClick={() => goTo(refContacts)} style={navBtn}>Контакты</button>
        </div>
      </div>

      {/* ===== БАННЕР-СЛАЙДЕР ===== */}
      <div ref={refTop} style={{ position: "relative", height: 480, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(rgba(62,31,0,0.6), rgba(62,31,0,0.6)), url(${SLIDES[slide].img}) center/cover`,
          transition: "background 0.5s",
        }} />

        <div style={{
          position: "relative", zIndex: 1, height: "100%",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 20px",
        }}>
          <h1 style={{ color: "#edd9b8", fontSize: 52, margin: 0, fontFamily: "Georgia, serif" }}>
            {SLIDES[slide].title}
          </h1>
          <p style={{ color: "#faf4ea", fontSize: 18, marginTop: 14, marginBottom: 32 }}>
            {SLIDES[slide].text}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => goTo(refMenu)}
              style={{ background: "#c17f4a", color: "white", border: "none", borderRadius: 8, padding: "14px 32px", fontSize: 16, cursor: "pointer", fontWeight: "bold" }}>
              Смотреть меню
            </button>
            <button onClick={() => goTo(refBook)}
              style={{ background: "transparent", color: "white", border: "2px solid white", borderRadius: 8, padding: "14px 32px", fontSize: 16, cursor: "pointer" }}>
              Забронировать столик
            </button>
          </div>
        </div>

        <button onClick={prevSlide} style={sliderArrow("left")}>‹</button>
        <button onClick={nextSlide} style={sliderArrow("right")}>›</button>

        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{
              width: i === slide ? 24 : 10, height: 10,
              borderRadius: 5, border: "none", cursor: "pointer",
              background: i === slide ? "#c17f4a" : "rgba(255,255,255,0.6)",
              transition: "width 0.2s",
            }} />
          ))}
        </div>
      </div>

      {/* ===== МЕНЮ ===== */}
      <div ref={refMenu} style={{ padding: "48px 24px", maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ color: "#3e1f00", fontSize: 32, marginBottom: 8, fontFamily: "Georgia, serif" }}>Наше меню</h2>
        <p style={{ color: "#8b6040", marginBottom: 24, fontSize: 14 }}>Выберите категорию</p>

        {/* фильтр-кнопки */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          {(["coffee", "pastry", "tea"] as Cat[]).map(c => (
            <button key={c} onClick={() => changeCat(c)} style={{
              padding: "8px 20px", borderRadius: 20,
              border: "2px solid #c17f4a",
              background: cat === c ? "#c17f4a" : "white",
              color: cat === c ? "white" : "#c17f4a",
              cursor: "pointer", fontWeight: "bold", fontSize: 14,
            }}>
              {c === "coffee" ? "☕ Кофе" : c === "pastry" ? "🥐 Выпечка" : "🍵 Чай"}
            </button>
          ))}
        </div>

        {/* слайдер фото */}
        <div style={{ position: "relative", marginBottom: 24, borderRadius: 12, overflow: "hidden" }}>
          <img
            src={MENU_PHOTOS[cat][menuPhoto]}
            alt="фото"
            style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
          />
          <button onClick={prevPhoto} style={smallArrow("left")}>‹</button>
          <button onClick={nextPhoto} style={smallArrow("right")}>›</button>
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
            {MENU_PHOTOS[cat].map((_, i) => (
              <button key={i} onClick={() => setMenuPhoto(i)} style={{
                width: i === menuPhoto ? 18 : 8, height: 8,
                borderRadius: 4, border: "none", cursor: "pointer",
                background: i === menuPhoto ? "#c17f4a" : "rgba(255,255,255,0.7)",
              }} />
            ))}
          </div>
        </div>

        {/* список позиций — просто строки */}
        <div style={{ border: "1px solid #e8d8c0", borderRadius: 12, overflow: "hidden", background: "white" }}>
          {MENU[cat].map((item, i) => (
            <div key={item.name} style={{
              display: "flex", alignItems: "center", padding: "14px 20px",
              borderBottom: i < MENU[cat].length - 1 ? "1px solid #f0e4d0" : "none",
              background: i % 2 === 0 ? "white" : "#fdfaf5",
            }}>
              <span style={{ flex: 1, fontSize: 15, color: "#3e1f00" }}>{item.name}</span>
              <span style={{ color: "#c17f4a", fontWeight: "bold", fontSize: 15 }}>{item.price} ₽</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== БРОНИРОВАНИЕ (теперь ДО мастер-классов) ===== */}
      <div ref={refBook} style={{ background: "#f5ecd7", padding: "48px 24px" }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <h2 style={{ color: "#3e1f00", fontSize: 32, marginBottom: 8, fontFamily: "Georgia, serif" }}>Забронировать столик</h2>
          <p style={{ color: "#8b6040", marginBottom: 24, fontSize: 14 }}>Заполните форму и мы вас ждём!</p>

          {bookOk ? (
            <div style={{ background: "white", borderRadius: 12, padding: 32, textAlign: "center", border: "2px solid #c17f4a" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
              <h3 style={{ color: "#3e1f00", margin: 0 }}>Столик забронирован!</h3>
              <p style={{ color: "#8b6040", marginTop: 8 }}>Ждём вас!</p>
            </div>
          ) : (
            <form onSubmit={submitBook} style={{ background: "white", borderRadius: 12, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Ваше имя</label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="Иван Иванов" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Телефон</label>
                <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Дата</label>
                  <input required type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Время</label>
                  <input required type="time" value={time} onChange={e => setTime(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Гостей</label>
                <select required value={guests} onChange={e => setGuests(e.target.value)} style={inputStyle}>
                  <option value="">Выберите...</option>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1?"гость":n<5?"гостя":"гостей"}</option>)}
                </select>
              </div>
              <button type="submit" style={{ background: "#c17f4a", color: "white", border: "none", borderRadius: 8, padding: 14, fontSize: 15, cursor: "pointer", fontWeight: "bold" }}>
                Забронировать
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ===== МАСТЕР-КЛАССЫ (теперь ПОСЛЕ бронирования) ===== */}
      <div ref={refMc} style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ color: "#3e1f00", fontSize: 32, marginBottom: 8, fontFamily: "Georgia, serif" }}>Мастер-классы</h2>
          <p style={{ color: "#8b6040", marginBottom: 32, fontSize: 14 }}>Учимся делать кофе вместе с нашими бариста!</p>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {MC.map((mc, i) => (
              <div key={i} style={{
                background: "white",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #e8d8c0",
                flex: "1 1 220px",
              }}>
                <img src={mc.img} alt={mc.title} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
                <div style={{ padding: 18 }}>
                  <span style={{
                    background: "#f5ecd7", color: "#c17f4a",
                    fontSize: 11, fontWeight: "bold", padding: "3px 10px",
                    borderRadius: 20, display: "inline-block", marginBottom: 10,
                  }}>
                    {mc.level}
                  </span>
                  <h3 style={{ margin: "0 0 8px", color: "#3e1f00", fontSize: 16 }}>{mc.title}</h3>
                  <p style={{ color: "#8b6040", fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>{mc.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#c17f4a", fontWeight: "bold", fontSize: 18 }}>{mc.price.toLocaleString()} ₽</span>
                    <button style={{
                      background: "#c17f4a", color: "white", border: "none",
                      borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: "bold",
                    }}>Записаться</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== КОНТАКТЫ ===== */}
      <div ref={refContacts} style={{ background: "#f5ecd7", padding: "48px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ color: "#3e1f00", fontSize: 32, marginBottom: 24, fontFamily: "Georgia, serif" }}>Контакты</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "📍 Адрес",    val: "ул. Кофейная, 15, 2 этаж" },
              { label: "🕐 Работаем", val: "Пн–Пт 8:00–22:00, Сб–Вс 9:00–23:00" },
              { label: "📞 Телефон",  val: "+7 (999) 999-99-99" },
              { label: "✉️ Email",    val: "hello@coffee-uyt.ru" },
            ].map(item => (
              <div key={item.label} style={{ background: "white", border: "1px solid #e8d8c0", borderRadius: 10, padding: "14px 20px" }}>
                <div style={{ color: "#8b6040", fontSize: 12, fontWeight: "bold", marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: "#3e1f00", fontSize: 15 }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ПОДВАЛ ===== */}
      <div style={{ background: "#3e1f00", color: "#c17f4a", textAlign: "center", padding: 24, fontSize: 13 }}>
        © 2024 Кофейня Уют. Все права защищены.
      </div>

    </div>
  );
}

// стили вынесены отдельно
const navBtn: React.CSSProperties = {
  background: "none", border: "none", cursor: "pointer",
  color: "#6b3a2a", fontSize: 14, padding: "6px 10px",
};

const labelStyle: React.CSSProperties = {
  display: "block", color: "#6b3a2a", marginBottom: 6, fontSize: 13, fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", border: "1px solid #e8d8c0",
  borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#faf4ea",
};

function sliderArrow(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    [side]: 16, background: "rgba(250,244,234,0.85)", border: "none",
    borderRadius: "50%", width: 44, height: 44, fontSize: 26,
    cursor: "pointer", zIndex: 2, color: "#3e1f00", lineHeight: 1,
  };
}

function smallArrow(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    [side]: 10, background: "rgba(250,244,234,0.85)", border: "none",
    borderRadius: "50%", width: 34, height: 34, fontSize: 20,
    cursor: "pointer", zIndex: 2, color: "#3e1f00", lineHeight: 1,
  };
}
