import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ===================== ДАННЫЕ =====================

const MENU_ITEMS = {
  coffee: [
    { name: "Эспрессо", desc: "Классический крепкий кофе", price: 120 },
    { name: "Капучино", desc: "Встреча с молочной нежной пенкой", price: 190 },
    { name: "Латте", desc: "Нежный кофе с молоком", price: 210 },
    { name: "Американо", desc: "Нежный разбавленный эспрессо", price: 150 },
    { name: "Раф", desc: "Сливочный кофе с ванилью", price: 230 },
    { name: "Флэт Уайт", desc: "Двойной эспрессо с бархатной пенкой", price: 200 },
  ],
  pastry: [
    { name: "Круассан", desc: "Нежный французский круассан", price: 90 },
    { name: "Булочка с корицей", desc: "Пропитанная сладкая булочка", price: 110 },
    { name: "Чизкейк", desc: "Нежный голландский десерт", price: 230 },
    { name: "Брауни", desc: "Шоколадный торт с грецкими орехами", price: 90 },
    { name: "Эклер", desc: "Бомбочка с кремом и глазурью", price: 140 },
    { name: "Штрудель", desc: "Тянутое тесто с яблочной начинкой", price: 240 },
  ],
  tea: [
    { name: "Чай Earl Grey", desc: "Классический английский чай с бергамотом", price: 100 },
    { name: "Зелёный чай", desc: "Мягкий японский сенча", price: 90 },
    { name: "Ромашковый", desc: "Успокаивающий травяной напиток", price: 85 },
    { name: "Ягодный морс", desc: "Свежий напиток из лесных ягод", price: 130 },
  ],
};

const MASTERCLASSES = [
  {
    title: "Базовый латте-арт",
    desc: "Научитесь рисовать простые узоры. Подходит для начинающих.",
    price: 2500,
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/6b8d3310-b239-4068-b90d-0a8eed664a68.jpg",
    level: "Начинающий",
  },
  {
    title: "Продвинутый латте-арт",
    desc: "Сложные узоры. Настоящий профессиональный опыт.",
    price: 3500,
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/8986274b-25e2-4952-bd6a-eae17d05349b.jpg",
    level: "Продвинутый",
  },
  {
    title: "Кофе от зерна до чашки",
    desc: "Обжарка, помол, заваривание. Полное погружение.",
    price: 4200,
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/37ccf19b-07c3-4fa0-8922-b4c4d8edd2a1.jpg",
    level: "Все уровни",
  },
];

const SLIDER_ITEMS = [
  {
    title: "Авторский Espresso Tonic",
    desc: "Наш фирменный напиток — эспрессо на тоническом лимонаде с тимьяном и апельсиновой цедрой.",
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/8986274b-25e2-4952-bd6a-eae17d05349b.jpg",
  },
  {
    title: "Завтрак в Уюте",
    desc: "Круассан с лососем, кофе на выбор и свежевыжатый сок — идеальное начало дня.",
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/37ccf19b-07c3-4fa0-8922-b4c4d8edd2a1.jpg",
  },
  {
    title: "Мастер-классы по латте-арт",
    desc: "Научитесь рисовать кофейные шедевры вместе с нашими опытными бариста.",
    img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/6b8d3310-b239-4068-b90d-0a8eed664a68.jpg",
  },
];

type Page = "home" | "menu" | "masterclass" | "order" | "contacts";

// ===================== ГЛАВНЫЙ КОМПОНЕНТ =====================

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [menuFilter, setMenuFilter] = useState<"coffee" | "pastry" | "tea">("coffee");
  const [booking, setBooking] = useState({ name: "", phone: "", date: "", time: "", guests: "" });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((i) => (i + 1) % SLIDER_ITEMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setBooking({ name: "", phone: "", date: "", time: "", guests: "" });
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { key: "menu" as Page, label: "Наше меню" },
    { key: "masterclass" as Page, label: "Мастер-классы" },
    { key: "order" as Page, label: "Оформить заказ" },
    { key: "contacts" as Page, label: "Контакты" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FAF4EA", fontFamily: "'Montserrat', sans-serif" }}>

      {/* ==================== НАВИГАЦИЯ ==================== */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navScrolled ? "rgba(250,244,234,0.97)" : "rgba(250,244,234,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: navScrolled ? "0 2px 20px rgba(62,31,0,0.12)" : "none",
          borderBottom: navScrolled ? "1px solid #E8D8C0" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* SVG Логотип */}
          <button onClick={() => setActivePage("home")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#C17F4A"/>
              <path d="M10 24 Q14 16 18 20 Q22 24 26 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <ellipse cx="18" cy="26" rx="7" ry="2" fill="white" opacity="0.25"/>
              <path d="M24 10 Q26 8 28 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem", color: "#3E1F00" }}>
              Уют
            </span>
          </button>

          {/* Десктоп меню */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <li key={link.key} style={{ animationDelay: `${i * 0.05}s` }}>
                <button
                  onClick={() => setActivePage(link.key)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    color: activePage === link.key ? "white" : "#3E1F00",
                    background: activePage === link.key ? "#C17F4A" : "transparent",
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Мобильная кнопка */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#3E1F00" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-slide-down" style={{ background: "rgba(250,244,234,0.98)", borderTop: "1px solid #E8D8C0" }}>
            <ul className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => { setActivePage(link.key); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200"
                    style={{
                      color: activePage === link.key ? "white" : "#3E1F00",
                      background: activePage === link.key ? "#C17F4A" : "#F5ECD7",
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ==================== ГЛАВНАЯ ==================== */}
      {activePage === "home" && (
        <main>

          {/* HERO */}
          <section className="relative flex items-center justify-center min-h-screen overflow-hidden" style={{ paddingTop: "64px" }}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/16d47531-c9ca-40f2-b031-679ac9b948d2.jpg)`,
                filter: "brightness(0.55)",
              }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(62,31,0,0.3), rgba(62,31,0,0.65))" }} />

            <div className="relative z-10 text-center px-6 animate-fade-in-up">
              <p className="text-xs font-semibold tracking-widest uppercase mb-4 delay-100 animate-fade-in-up" style={{ color: "#EDD9B8", letterSpacing: "0.25em" }}>
                добро пожаловать
              </p>
              <h1 className="text-5xl md:text-7xl font-black mb-6 delay-200 animate-fade-in-up" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF4EA", lineHeight: 1.1, textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}>
                Кофейня<br />
                <span style={{ color: "#EDD9B8" }}>Уют</span>
              </h1>
              <p className="text-lg md:text-xl mb-10 max-w-md mx-auto delay-300 animate-fade-in-up" style={{ color: "#EDD9B8", fontWeight: 300 }}>
                Место, где каждая чашка — маленький праздник
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center delay-400 animate-fade-in-up">
                <button
                  onClick={() => setActivePage("menu")}
                  className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse-soft"
                  style={{ background: "#C17F4A", color: "#FAF4EA", boxShadow: "0 4px 20px rgba(193,127,74,0.5)" }}
                >
                  ☕ Твой кофе ждёт!
                </button>
                <button
                  onClick={() => setActivePage("order")}
                  className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#FAF4EA", border: "2px solid rgba(255,255,255,0.5)", backdropFilter: "blur(4px)" }}
                >
                  🪑 Столик в один клик!
                </button>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "#EDD9B8", opacity: 0.7 }}>
              <Icon name="ChevronDown" size={28} />
            </div>
          </section>

          {/* СЛАЙДЕР */}
          <section className="py-16 px-6" style={{ background: "#F5ECD7" }}>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Акции и новинки</h2>
              <p className="text-center text-sm mb-10" style={{ color: "#8B6040" }}>Специальные предложения этого сезона</p>

              <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ height: "360px" }}>
                {SLIDER_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: sliderIndex === i ? 1 : 0, pointerEvents: sliderIndex === i ? "auto" : "none" }}
                  >
                    <div className="w-full h-full bg-cover bg-center flex items-end" style={{ backgroundImage: `url(${item.img})` }}>
                      <div className="p-8 w-full" style={{ background: "linear-gradient(to top, rgba(62,31,0,0.85) 0%, transparent 100%)" }}>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF4EA" }}>{item.title}</h3>
                        <p className="text-base max-w-xl" style={{ color: "#EDD9B8", fontWeight: 300 }}>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setSliderIndex((sliderIndex - 1 + SLIDER_ITEMS.length) % SLIDER_ITEMS.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(250,244,234,0.9)", color: "#3E1F00" }}
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={() => setSliderIndex((sliderIndex + 1) % SLIDER_ITEMS.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(250,244,234,0.9)", color: "#3E1F00" }}
                >
                  <Icon name="ChevronRight" size={20} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {SLIDER_ITEMS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSliderIndex(i)}
                      className="rounded-full transition-all duration-300"
                      style={{ width: sliderIndex === i ? "24px" : "8px", height: "8px", background: sliderIndex === i ? "#C17F4A" : "rgba(255,255,255,0.6)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* КАТАЛОГ */}
          <section className="py-16 px-6" style={{ background: "#FAF4EA" }}>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>КАТАЛОГ</h2>
              <p className="text-center text-sm mb-10" style={{ color: "#8B6040" }}>Отборные сорта кофе и свежая выпечка собственного производства</p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Кофе */}
                <div className="rounded-3xl overflow-hidden shadow-md">
                  <img src="https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/8986274b-25e2-4952-bd6a-eae17d05349b.jpg" alt="Кофе" className="w-full h-48 object-cover" />
                  <div className="p-6" style={{ background: "white" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">☕</span>
                      <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Кофе</h3>
                    </div>
                    <ul className="space-y-2">
                      {MENU_ITEMS.coffee.slice(0, 4).map((item) => (
                        <li key={item.name} className="flex justify-between items-center py-1.5" style={{ borderBottom: "1px dashed #E8D8C0" }}>
                          <div>
                            <p className="font-medium text-sm" style={{ color: "#3E1F00" }}>{item.name}</p>
                            <p className="text-xs" style={{ color: "#8B6040" }}>{item.desc}</p>
                          </div>
                          <span className="font-bold text-sm ml-4 flex-shrink-0" style={{ color: "#C17F4A" }}>{item.price} ₽</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setActivePage("menu")} className="mt-4 text-sm font-semibold transition-all hover:opacity-70" style={{ color: "#C17F4A" }}>
                      Смотреть всё меню →
                    </button>
                  </div>
                </div>

                {/* Выпечка */}
                <div className="rounded-3xl overflow-hidden shadow-md">
                  <img src="https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/37ccf19b-07c3-4fa0-8922-b4c4d8edd2a1.jpg" alt="Выпечка" className="w-full h-48 object-cover" />
                  <div className="p-6" style={{ background: "white" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">🥐</span>
                      <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Выпечка</h3>
                    </div>
                    <ul className="space-y-2">
                      {MENU_ITEMS.pastry.slice(0, 4).map((item) => (
                        <li key={item.name} className="flex justify-between items-center py-1.5" style={{ borderBottom: "1px dashed #E8D8C0" }}>
                          <div>
                            <p className="font-medium text-sm" style={{ color: "#3E1F00" }}>{item.name}</p>
                            <p className="text-xs" style={{ color: "#8B6040" }}>{item.desc}</p>
                          </div>
                          <span className="font-bold text-sm ml-4 flex-shrink-0" style={{ color: "#C17F4A" }}>{item.price} ₽</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setActivePage("menu")} className="mt-4 text-sm font-semibold transition-all hover:opacity-70" style={{ color: "#C17F4A" }}>
                      Смотреть всё меню →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* БРОНИРОВАНИЕ */}
          <section className="py-16 px-6" style={{ background: "#F5ECD7" }}>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Забронируйте столик</h2>
              <p className="mb-10 text-sm" style={{ color: "#8B6040" }}>При бронировании на будний день — комплимент от шеф-кондитера в подарок!</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-3xl p-8 shadow-md" style={{ background: "white" }}>
                  {bookingSuccess ? (
                    <div className="animate-scale-in text-center py-8">
                      <div className="text-5xl mb-4">🎉</div>
                      <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Столик забронирован!</h3>
                      <p style={{ color: "#8B6040" }}>Ждём вас. Комплимент уже готовится!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Ваше ФИО</label>
                        <input
                          type="text" required value={booking.name}
                          onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-amber-400"
                          style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }}
                          placeholder="Иванов Иван Иванович"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Телефон</label>
                        <input
                          type="tel" required value={booking.phone}
                          onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400"
                          style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }}
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Дата</label>
                          <input
                            type="date" required value={booking.date}
                            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Время</label>
                          <input
                            type="time" required value={booking.time}
                            onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Количество гостей</label>
                        <select
                          required value={booking.guests}
                          onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }}
                        >
                          <option value="">Выберите...</option>
                          {[1,2,3,4,5,6,7,8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                        style={{ background: "#C17F4A", color: "#FAF4EA" }}
                      >
                        Забронировать столик
                      </button>
                    </form>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { icon: "Gift", title: "Комплимент в подарок", desc: "При бронировании на будний день — выпечка от шеф-кондитера" },
                    { icon: "Coffee", title: "Свежий кофе", desc: "Зерна обжариваются еженедельно для максимального вкуса" },
                    { icon: "Home", title: "Домашняя выпечка", desc: "Готовим каждый день — никаких заморозок" },
                    { icon: "Sun", title: "Уютная атмосфера", desc: "Место, где хочется остаться подольше" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl shadow-sm transition-all hover:shadow-md hover:scale-[1.01]" style={{ background: "white" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F5ECD7" }}>
                        <Icon name={item.icon} size={20} style={{ color: "#C17F4A" }} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1" style={{ color: "#3E1F00" }}>{item.title}</h4>
                        <p className="text-xs" style={{ color: "#8B6040" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ЗАКАЗ (краткий) */}
          <section className="py-16 px-6" style={{ background: "#FAF4EA" }}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Оформить заказ</h2>
              <p className="text-sm mb-10" style={{ color: "#8B6040" }}>Выберите параметры, добавьте позиции из меню и оформите</p>

              <div className="rounded-3xl p-8 shadow-md" style={{ background: "white", border: "2px solid #E8D8C0" }}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { key: "pickup", label: "С собой", sub: "Заберите сами", icon: "ShoppingBag" },
                    { key: "delivery", label: "Доставка", sub: "Курьер привезёт", icon: "Truck" },
                  ].map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setOrderType(type.key as "pickup" | "delivery")}
                      className="p-5 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: orderType === type.key ? "#6B3A2A" : "#F5ECD7",
                        color: orderType === type.key ? "#FAF4EA" : "#3E1F00",
                        boxShadow: orderType === type.key ? "0 4px 20px rgba(107,58,42,0.3)" : "none",
                      }}
                    >
                      <Icon name={type.icon} size={28} />
                      <span className="font-bold">{type.label}</span>
                      <span className="text-xs opacity-75">{type.sub}</span>
                    </button>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text" value={orderName} onChange={(e) => setOrderName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }}
                    placeholder="Ваше имя"
                  />
                  <input
                    type="tel" value={orderPhone} onChange={(e) => setOrderPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }}
                    placeholder="+7(___) ___-__-__"
                  />
                </div>

                {orderType === "delivery" && (
                  <div className="mb-6 p-4 rounded-2xl animate-scale-in" style={{ background: "#F5ECD7", border: "1px solid #E8D8C0" }}>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "#3E1F00" }}>
                      <Icon name="Truck" size={14} style={{ color: "#C17F4A" }} />
                      Доставка и оплата
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs" style={{ color: "#6B3A2A" }}>
                      <div className="flex items-start gap-2"><Icon name="MapPin" size={12} style={{ color: "#C17F4A", marginTop: 2, flexShrink: 0 }} /><span>От 199 ₽, бесплатно при заказе от 1500 ₽</span></div>
                      <div className="flex items-start gap-2"><Icon name="Clock" size={12} style={{ color: "#C17F4A", marginTop: 2, flexShrink: 0 }} /><span>30–60 минут</span></div>
                      <div className="flex items-start gap-2"><Icon name="CreditCard" size={12} style={{ color: "#C17F4A", marginTop: 2, flexShrink: 0 }} /><span>Картой онлайн или наличными</span></div>
                      <div className="flex items-start gap-2"><Icon name="Smartphone" size={12} style={{ color: "#C17F4A", marginTop: 2, flexShrink: 0 }} /><span>СБП, Apple Pay, Google Pay</span></div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setActivePage("menu")}
                  className="w-full py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{ background: "#C17F4A", color: "#FAF4EA" }}
                >
                  Перейти к меню и выбрать позиции →
                </button>
              </div>
            </div>
          </section>

          {/* МАСТЕР-КЛАССЫ */}
          <section className="py-16 px-6" style={{ background: "#F5ECD7" }}>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#C17F4A", letterSpacing: "0.2em" }}>мастер-классы</p>
                  <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>
                    Научитесь<br />
                    <span style={{ color: "#C17F4A" }}>латте-арт</span>
                  </h2>
                  <p className="text-base mb-6" style={{ color: "#6B3A2A", fontWeight: 400 }}>
                    Наши бариста с опытом 10+ лет научат вас создавать настоящие кофейные шедевры. Весело, полезно и очень вкусно.
                  </p>
                  <button
                    onClick={() => setActivePage("masterclass")}
                    className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: "#C17F4A", color: "#FAF4EA" }}
                  >
                    Все мастер-классы
                  </button>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/6b8d3310-b239-4068-b90d-0a8eed664a68.jpg"
                    alt="Латте-арт"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {MASTERCLASSES.map((mc, i) => (
                  <div key={i} className="rounded-3xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ background: "white" }}>
                    <img src={mc.img} alt={mc.title} className="w-full h-40 object-cover" />
                    <div className="p-5">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#F5ECD7", color: "#C17F4A" }}>{mc.level}</span>
                      <h3 className="font-bold mt-3 mb-1" style={{ color: "#3E1F00", fontFamily: "'Playfair Display', serif" }}>{mc.title}</h3>
                      <p className="text-xs mb-4" style={{ color: "#8B6040" }}>{mc.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg" style={{ color: "#C17F4A" }}>{mc.price.toLocaleString()} ₽</span>
                        <button className="px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105" style={{ background: "#C17F4A", color: "#FAF4EA" }}>
                          Записаться
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==================== МЕНЮ ==================== */}
      {activePage === "menu" && (
        <main style={{ paddingTop: "64px" }}>
          <div className="py-16 px-6 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-center mb-2 animate-fade-in-up" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Наше меню</h1>
            <p className="text-center text-sm mb-10 animate-fade-in-up delay-100" style={{ color: "#8B6040" }}>Отборные сорта кофе и свежая выпечка собственного производства</p>

            {/* Фильтр меню */}
            <div className="flex justify-center gap-3 mb-10 flex-wrap animate-fade-in-up delay-200">
              {[
                { key: "coffee", label: "☕ Кофе" },
                { key: "pastry", label: "🥐 Выпечка" },
                { key: "tea",    label: "🍵 Чай и напитки" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setMenuFilter(tab.key as "coffee" | "pastry" | "tea")}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: menuFilter === tab.key ? "#C17F4A" : "#F5ECD7",
                    color: menuFilter === tab.key ? "#FAF4EA" : "#3E1F00",
                    boxShadow: menuFilter === tab.key ? "0 3px 14px rgba(193,127,74,0.35)" : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
              {MENU_ITEMS[menuFilter].map((item, i) => (
                <div
                  key={item.name}
                  className="p-5 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  style={{ background: "white", animationDelay: `${i * 0.07}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold" style={{ color: "#3E1F00", fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
                    <span className="font-bold text-sm ml-2 flex-shrink-0" style={{ color: "#C17F4A" }}>{item.price} ₽</span>
                  </div>
                  <p className="text-xs" style={{ color: "#8B6040" }}>{item.desc}</p>
                  <button
                    className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02]"
                    style={{ background: "#F5ECD7", color: "#6B3A2A" }}
                  >
                    + Добавить в заказ
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ==================== МАСТЕР-КЛАССЫ ==================== */}
      {activePage === "masterclass" && (
        <main style={{ paddingTop: "64px" }}>
          <div className="py-16 px-6 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-center mb-2 animate-fade-in-up" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Мастер-классы</h1>
            <p className="text-center text-sm mb-10 animate-fade-in-up delay-100" style={{ color: "#8B6040" }}>Наши бариста с опытом 10+ лет научат вас мастерству кофе</p>
            <div className="grid md:grid-cols-3 gap-6">
              {MASTERCLASSES.map((mc, i) => (
                <div key={i} className="rounded-3xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up" style={{ background: "white", animationDelay: `${i * 0.15}s` }}>
                  <img src={mc.img} alt={mc.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#F5ECD7", color: "#C17F4A" }}>{mc.level}</span>
                    <h3 className="text-lg font-bold mt-3 mb-2" style={{ color: "#3E1F00", fontFamily: "'Playfair Display', serif" }}>{mc.title}</h3>
                    <p className="text-sm mb-5" style={{ color: "#8B6040" }}>{mc.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-2xl" style={{ color: "#C17F4A" }}>{mc.price.toLocaleString()} ₽</span>
                      <button className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-md" style={{ background: "#C17F4A", color: "#FAF4EA" }}>
                        Записаться
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ==================== ЗАКАЗ ==================== */}
      {activePage === "order" && (
        <main style={{ paddingTop: "64px" }}>
          <div className="py-16 px-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-center mb-2 animate-fade-in-up" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Оформить заказ</h1>
            <p className="text-center text-sm mb-10 animate-fade-in-up delay-100" style={{ color: "#8B6040" }}>Выберите параметры, добавьте позиции из меню и оформите</p>

            <div className="rounded-3xl p-8 shadow-md animate-scale-in" style={{ background: "white", border: "2px solid #E8D8C0" }}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { key: "pickup", label: "С собой", sub: "Заберите сами", icon: "ShoppingBag" },
                  { key: "delivery", label: "Доставка", sub: "Курьер привезёт", icon: "Truck" },
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setOrderType(type.key as "pickup" | "delivery")}
                    className="p-5 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: orderType === type.key ? "#6B3A2A" : "#F5ECD7",
                      color: orderType === type.key ? "#FAF4EA" : "#3E1F00",
                      boxShadow: orderType === type.key ? "0 4px 20px rgba(107,58,42,0.3)" : "none",
                    }}
                  >
                    <Icon name={type.icon} size={28} />
                    <span className="font-bold">{type.label}</span>
                    <span className="text-xs opacity-75">{type.sub}</span>
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }} />
                <input type="tel" placeholder="+7(___) ___-__-__" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }} />
              </div>

              {/* Блок доставки и оплаты */}
              <div className="mb-6 p-5 rounded-2xl" style={{ background: "#FAF4EA", border: "1px solid #E8D8C0" }}>
                <h4 className="font-bold mb-4 flex items-center gap-2" style={{ color: "#3E1F00" }}>
                  <Icon name="Info" size={16} style={{ color: "#C17F4A" }} />
                  Доставка и способы оплаты
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: "Truck", title: "Доставка по городу", desc: "от 199 ₽, бесплатно при заказе от 1500 ₽" },
                    { icon: "Clock", title: "Время доставки", desc: "30–60 минут в зависимости от адреса" },
                    { icon: "CreditCard", title: "Банковская карта", desc: "Visa, Mastercard, МИР — онлайн или курьеру" },
                    { icon: "Smartphone", title: "СБП и Pay-сервисы", desc: "Apple Pay, Google Pay, SberPay" },
                    { icon: "Banknote", title: "Наличными", desc: "Курьеру при получении, сдача до 5000 ₽" },
                    { icon: "ShoppingBag", title: "С собой", desc: "Готовим к вашему приходу за 10–15 мин" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F5ECD7" }}>
                        <Icon name={item.icon} size={14} style={{ color: "#C17F4A" }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "#3E1F00" }}>{item.title}</p>
                        <p className="text-xs" style={{ color: "#8B6040" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActivePage("menu")}
                className="w-full py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{ background: "#C17F4A", color: "#FAF4EA" }}
              >
                Перейти к меню и выбрать позиции →
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ==================== КОНТАКТЫ ==================== */}
      {activePage === "contacts" && (
        <main style={{ paddingTop: "64px" }}>
          <div className="py-16 px-6 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-center mb-2 animate-fade-in-up" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Контакты</h1>
            <p className="text-center text-sm mb-10 animate-fade-in-up delay-100" style={{ color: "#8B6040" }}>Приходите — всегда рады гостям!</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 animate-fade-in-up delay-200">
                {[
                  { icon: "MapPin", title: "Адрес", val: "ул. Кофейная, 15, 2 этаж" },
                  { icon: "Clock", title: "Режим работы", val: "Пн–Пт: 8:00–22:00\nСб–Вс: 9:00–23:00" },
                  { icon: "Phone", title: "Телефон", val: "+7 (999) 999-99-99" },
                  { icon: "Mail", title: "Email", val: "hello@coffee-uyt.ru" },
                  { icon: "MessageCircle", title: "Instagram", val: "@coffee_uyt" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl shadow-sm transition-all hover:shadow-md" style={{ background: "white" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F5ECD7" }}>
                      <Icon name={item.icon} size={20} style={{ color: "#C17F4A" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#8B6040" }}>{item.title}</p>
                      <p className="font-medium whitespace-pre-line text-sm" style={{ color: "#3E1F00" }}>{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl overflow-hidden shadow-md animate-fade-in-up delay-300 flex items-center justify-center" style={{ minHeight: "400px", background: "linear-gradient(135deg, #F5ECD7 0%, #EDD9B8 100%)" }}>
                <div className="text-center p-8">
                  <div className="text-7xl mb-4">📍</div>
                  <p className="font-bold text-xl mb-2" style={{ color: "#3E1F00", fontFamily: "'Playfair Display', serif" }}>Кофейня Уют</p>
                  <p className="text-sm" style={{ color: "#6B3A2A" }}>ул. Кофейная, 15</p>
                  <p className="text-xs mt-2" style={{ color: "#8B6040" }}>Центр города · 2 этаж</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ==================== ФУТЕР ==================== */}
      <footer className="py-10 px-6" style={{ background: "#3E1F00" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="18" fill="#C17F4A"/>
                  <path d="M10 24 Q14 16 18 20 Q22 24 26 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                </svg>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#FAF4EA", fontSize: "1.1rem" }}>Уют</span>
              </div>
              <p className="text-xs" style={{ color: "#C17F4A" }}>Приходите к нам за чашечкой ароматного кофе</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3" style={{ color: "#EDD9B8" }}>Режим работы</h4>
              <p className="text-xs leading-relaxed" style={{ color: "#C17F4A" }}>Пн–Пт: 8:00–22:00<br />Сб–Вс: 9:00–23:00</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3" style={{ color: "#EDD9B8" }}>Телефон</h4>
              <p className="text-xs" style={{ color: "#C17F4A" }}>+7 (999) 999-99-99</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3" style={{ color: "#EDD9B8" }}>Контакты</h4>
              <p className="text-xs" style={{ color: "#C17F4A" }}>hello@coffee-uyt.ru</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(193,127,74,0.3)" }} className="pt-6 text-center">
            <p className="text-xs" style={{ color: "#8B6040" }}>© 2024 Кофейня Уют. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* ==================== КНОПКА НАВЕРХ ==================== */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 animate-scale-in z-50"
          style={{ background: "#C17F4A", color: "#FAF4EA" }}
          title="Наверх"
        >
          <Icon name="ArrowUp" size={20} />
        </button>
      )}
    </div>
  );
}