import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ===================== ДАННЫЕ =====================

const MENU_ITEMS = {
  coffee: [
    { name: "Эспрессо", price: 120, emoji: "☕" },
    { name: "Капучино", price: 190, emoji: "☕" },
    { name: "Латте", price: 210, emoji: "☕" },
    { name: "Американо", price: 150, emoji: "☕" },
    { name: "Раф", price: 230, emoji: "☕" },
    { name: "Флэт Уайт", price: 200, emoji: "☕" },
  ],
  pastry: [
    { name: "Круассан", price: 90, emoji: "🥐" },
    { name: "Булочка с корицей", price: 110, emoji: "🍞" },
    { name: "Чизкейк", price: 230, emoji: "🍰" },
    { name: "Брауни", price: 90, emoji: "🍫" },
    { name: "Эклер", price: 140, emoji: "🍮" },
    { name: "Штрудель", price: 240, emoji: "🥧" },
  ],
  tea: [
    { name: "Earl Grey", price: 100, emoji: "🍵" },
    { name: "Зелёный чай", price: 90, emoji: "🍵" },
    { name: "Ромашковый", price: 85, emoji: "🌼" },
    { name: "Ягодный морс", price: 130, emoji: "🫐" },
  ],
};

const CATEGORY_PHOTOS: Record<"coffee" | "pastry" | "tea", string[]> = {
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

const MASTERCLASSES = [
  { title: "Базовый латте-арт", price: 2500, img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/6b8d3310-b239-4068-b90d-0a8eed664a68.jpg", level: "Начинающий" },
  { title: "Продвинутый латте-арт", price: 3500, img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/8986274b-25e2-4952-bd6a-eae17d05349b.jpg", level: "Продвинутый" },
  { title: "От зерна до чашки", price: 4200, img: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/37ccf19b-07c3-4fa0-8922-b4c4d8edd2a1.jpg", level: "Все уровни" },
];

type CartItem = { name: string; price: number; emoji: string; qty: number };

// ===================== КОМПОНЕНТ =====================

export default function Index() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuFilter, setMenuFilter] = useState<"coffee" | "pastry" | "tea">("coffee");
  const [catPhotoIndex, setCatPhotoIndex] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [booking, setBooking] = useState({ name: "", phone: "", date: "", time: "", guests: "" });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // refs для скролла к секциям
  const heroRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const mcRef = useRef<HTMLElement>(null);
  const bookingRef = useRef<HTMLElement>(null);
  const contactsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setCatPhotoIndex(0); }, [menuFilter]);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    setMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Добавить в корзину
  const addToCart = (item: { name: string; price: number; emoji: string }) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) return prev.map((c) => c.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setJustAdded(item.name);
    setTimeout(() => setJustAdded(null), 1500);
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((c) => c.name !== name));
  };

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const placeOrder = () => {
    setCart([]);
    setCartOpen(false);
    setOrderDone(true);
    setTimeout(() => setOrderDone(false), 4000);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setBooking({ name: "", phone: "", date: "", time: "", guests: "" });
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  const navLinks = [
    { label: "Главная", ref: heroRef },
    { label: "Меню", ref: menuRef },
    { label: "Мастер-классы", ref: mcRef },
    { label: "Бронирование", ref: bookingRef },
    { label: "Контакты", ref: contactsRef },
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
          borderBottom: "1px solid #E8D8C0",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Логотип */}
          <button onClick={() => scrollTo(heroRef)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#C17F4A"/>
              <path d="M10 24 Q14 16 18 20 Q22 24 26 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <ellipse cx="18" cy="26" rx="7" ry="2" fill="white" opacity="0.25"/>
            </svg>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "#3E1F00" }}>Уют</span>
          </button>

          {/* Десктоп-ссылки */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.ref)}
                  className="px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-amber-100"
                  style={{ color: "#3E1F00" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Кнопка корзины */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
            style={{ background: "#C17F4A", color: "#FAF4EA" }}
          >
            <Icon name="ShoppingCart" size={18} />
            <span className="text-sm font-semibold hidden sm:inline">Корзина</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center animate-scale-in"
                style={{ background: "#3E1F00", color: "white" }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Мобильное меню */}
          <button className="md:hidden p-2 ml-2" style={{ color: "#3E1F00" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden animate-slide-down" style={{ background: "rgba(250,244,234,0.98)", borderTop: "1px solid #E8D8C0" }}>
            <ul className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.ref)}
                    className="w-full text-left px-4 py-3 rounded-xl font-medium text-sm"
                    style={{ background: "#F5ECD7", color: "#3E1F00" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-screen overflow-hidden" style={{ paddingTop: "64px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/16d47531-c9ca-40f2-b031-679ac9b948d2.jpg)`,
            filter: "brightness(0.52)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(62,31,0,0.25), rgba(62,31,0,0.65))" }} />
        <div className="relative z-10 text-center px-6 animate-fade-in-up">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#EDD9B8", letterSpacing: "0.25em" }}>добро пожаловать</p>
          <h1 className="text-5xl md:text-7xl font-black mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF4EA", lineHeight: 1.1, textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}>
            Кофейня<br /><span style={{ color: "#EDD9B8" }}>Уют</span>
          </h1>
          <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "#EDD9B8", fontWeight: 300 }}>
            Место, где каждая чашка — маленький праздник
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo(menuRef)}
              className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "#C17F4A", color: "#FAF4EA", boxShadow: "0 4px 20px rgba(193,127,74,0.5)" }}
            >
              ☕ Смотреть меню
            </button>
            <button
              onClick={() => scrollTo(bookingRef)}
              className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.15)", color: "#FAF4EA", border: "2px solid rgba(255,255,255,0.5)" }}
            >
              🪑 Забронировать столик
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "#EDD9B8", opacity: 0.7 }}>
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ==================== МЕНЮ ==================== */}
      <section ref={menuRef} className="py-16 px-6" style={{ background: "#FAF4EA" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Меню</h2>
          <p className="text-center text-sm mb-8" style={{ color: "#A07850" }}>Нажмите «+» чтобы добавить в корзину</p>

          {/* Фильтры */}
          <div className="flex justify-center gap-2 mb-7 flex-wrap">
            {([
              { key: "coffee", label: "☕ Кофе" },
              { key: "pastry", label: "🥐 Выпечка" },
              { key: "tea", label: "🍵 Чай" },
            ] as { key: "coffee"|"pastry"|"tea"; label: string }[]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMenuFilter(tab.key)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: menuFilter === tab.key ? "#C17F4A" : "transparent",
                  color: menuFilter === tab.key ? "#FAF4EA" : "#8B6040",
                  border: menuFilter === tab.key ? "2px solid #C17F4A" : "2px solid #E8D8C0",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Фото-слайдер */}
          <div className="relative rounded-2xl overflow-hidden mb-7" style={{ height: "180px" }}>
            {CATEGORY_PHOTOS[menuFilter].map((src, i) => (
              <img key={i} src={src} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: catPhotoIndex === i ? 1 : 0 }} />
            ))}
            <button
              onClick={() => setCatPhotoIndex((catPhotoIndex - 1 + CATEGORY_PHOTOS[menuFilter].length) % CATEGORY_PHOTOS[menuFilter].length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(250,244,234,0.88)", color: "#3E1F00" }}
            ><Icon name="ChevronLeft" size={16} /></button>
            <button
              onClick={() => setCatPhotoIndex((catPhotoIndex + 1) % CATEGORY_PHOTOS[menuFilter].length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(250,244,234,0.88)", color: "#3E1F00" }}
            ><Icon name="ChevronRight" size={16} /></button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {CATEGORY_PHOTOS[menuFilter].map((_, i) => (
                <button key={i} onClick={() => setCatPhotoIndex(i)} className="rounded-full transition-all duration-300"
                  style={{ width: catPhotoIndex === i ? "20px" : "7px", height: "7px", background: catPhotoIndex === i ? "#C17F4A" : "rgba(255,255,255,0.7)" }} />
              ))}
            </div>
          </div>

          {/* Строчное меню с кнопкой «+» */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E8D8C0" }}>
            {MENU_ITEMS[menuFilter].map((item, i) => {
              const inCart = cart.find((c) => c.name === item.name);
              const isJust = justAdded === item.name;
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-3 px-5 py-3.5 transition-colors"
                  style={{
                    background: isJust ? "#FFF3E8" : i % 2 === 0 ? "white" : "#FDFAF5",
                    borderBottom: i < MENU_ITEMS[menuFilter].length - 1 ? "1px solid #F0E4D0" : "none",
                  }}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span className="flex-1 text-sm font-medium" style={{ color: "#3E1F00", fontFamily: "'Georgia', serif" }}>{item.name}</span>
                  <span className="text-sm font-bold mr-2" style={{ color: "#C17F4A" }}>{item.price} ₽</span>
                  {inCart && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#F5ECD7", color: "#6B3A2A" }}>
                      ×{inCart.qty}
                    </span>
                  )}
                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
                    style={{ background: isJust ? "#3E1F00" : "#C17F4A", color: "white" }}
                  >
                    <Icon name={isJust ? "Check" : "Plus"} size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Мини-сообщение после добавления */}
          {justAdded && (
            <div className="mt-4 text-center animate-fade-in text-sm font-semibold" style={{ color: "#C17F4A" }}>
              ✓ {justAdded} добавлен в корзину
            </div>
          )}
        </div>
      </section>

      {/* ==================== МАСТЕР-КЛАССЫ ==================== */}
      <section ref={mcRef} className="py-16 px-6" style={{ background: "#F5ECD7" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Мастер-классы</h2>
          <p className="text-center text-sm mb-10" style={{ color: "#A07850" }}>Бариста с опытом 10+ лет научат вас мастерству</p>
          <div className="grid md:grid-cols-3 gap-6">
            {MASTERCLASSES.map((mc, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ background: "white" }}>
                <img src={mc.img} alt={mc.title} className="w-full h-40 object-cover" />
                <div className="p-5">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#F5ECD7", color: "#C17F4A" }}>{mc.level}</span>
                  <h3 className="font-bold mt-3 mb-3" style={{ color: "#3E1F00", fontFamily: "'Playfair Display', serif" }}>{mc.title}</h3>
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

      {/* ==================== БРОНИРОВАНИЕ ==================== */}
      <section ref={bookingRef} className="py-16 px-6" style={{ background: "#FAF4EA" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Забронировать столик</h2>
          <p className="text-sm mb-10" style={{ color: "#A07850" }}>При бронировании на будний день — комплимент от шеф-кондитера!</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-7" style={{ background: "white", border: "1px solid #E8D8C0" }}>
              {bookingSuccess ? (
                <div className="text-center py-8 animate-scale-in">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Столик забронирован!</h3>
                  <p style={{ color: "#8B6040", fontSize: "14px" }}>Ждём вас. Комплимент уже готовится!</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Ваше имя</label>
                    <input type="text" required value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }} placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Телефон</label>
                    <input type="tel" required value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }} placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Дата</label>
                      <input type="date" required value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Время</label>
                      <input type="time" required value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#8B6040" }}>Гости</label>
                    <select required value={booking.guests} onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#FAF4EA", border: "1px solid #E8D8C0", color: "#3E1F00" }}>
                      <option value="">Выберите...</option>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?"гость":n<5?"гостя":"гостей"}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]" style={{ background: "#C17F4A", color: "#FAF4EA" }}>
                    Забронировать
                  </button>
                </form>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: "Gift", title: "Комплимент в подарок", desc: "Выпечка от шеф-кондитера в будний день" },
                { icon: "Coffee", title: "Свежий кофе", desc: "Зерна обжариваются еженедельно" },
                { icon: "Sun", title: "Уютная атмосфера", desc: "Место, где хочется остаться подольше" },
                { icon: "Clock", title: "Работаем каждый день", desc: "Пн–Пт 8:00–22:00, Сб–Вс 9:00–23:00" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "white", border: "1px solid #E8D8C0" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F5ECD7" }}>
                    <Icon name={item.icon} size={18} style={{ color: "#C17F4A" }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "#3E1F00" }}>{item.title}</p>
                    <p className="text-xs" style={{ color: "#8B6040" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== КОНТАКТЫ ==================== */}
      <section ref={contactsRef} className="py-16 px-6" style={{ background: "#F5ECD7" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>Контакты</h2>
          <p className="text-center text-sm mb-10" style={{ color: "#A07850" }}>Приходите — всегда рады гостям!</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              {[
                { icon: "MapPin", title: "Адрес", val: "ул. Кофейная, 15, 2 этаж" },
                { icon: "Clock", title: "Режим работы", val: "Пн–Пт: 8:00–22:00\nСб–Вс: 9:00–23:00" },
                { icon: "Phone", title: "Телефон", val: "+7 (999) 999-99-99" },
                { icon: "Mail", title: "Email", val: "hello@coffee-uyt.ru" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "white" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F5ECD7" }}>
                    <Icon name={item.icon} size={18} style={{ color: "#C17F4A" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#8B6040" }}>{item.title}</p>
                    <p className="text-sm font-medium whitespace-pre-line" style={{ color: "#3E1F00" }}>{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F5ECD7, #EDD9B8)", minHeight: "280px" }}>
              <div className="text-center p-8">
                <div className="text-6xl mb-4">📍</div>
                <p className="font-bold text-lg mb-1" style={{ color: "#3E1F00", fontFamily: "'Playfair Display', serif" }}>Кофейня Уют</p>
                <p className="text-sm" style={{ color: "#6B3A2A" }}>ул. Кофейная, 15 · Центр города</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ФУТЕР ==================== */}
      <footer className="py-8 px-6 text-center" style={{ background: "#3E1F00" }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#C17F4A"/>
            <path d="M10 24 Q14 16 18 20 Q22 24 26 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </svg>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#FAF4EA", fontSize: "1rem" }}>Уют</span>
        </div>
        <p style={{ color: "#8B6040", fontSize: "12px" }}>© 2024 Кофейня Уют. Все права защищены.</p>
      </footer>

      {/* ==================== КОРЗИНА (боковая панель) ==================== */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Затемнение */}
          <div className="absolute inset-0" style={{ background: "rgba(62,31,0,0.35)" }} onClick={() => setCartOpen(false)} />
          {/* Панель */}
          <div className="relative w-full max-w-sm h-full flex flex-col animate-slide-in-right" style={{ background: "#FAF4EA" }}>
            {/* Шапка корзины */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #E8D8C0" }}>
              <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#3E1F00" }}>
                🛒 Корзина
              </h3>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F5ECD7", color: "#3E1F00" }}>
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Содержимое */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="font-medium" style={{ color: "#8B6040" }}>Корзина пуста</p>
                  <p className="text-sm mt-1" style={{ color: "#A07850" }}>Добавьте что-нибудь из меню</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "white", border: "1px solid #E8D8C0" }}>
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "#3E1F00" }}>{item.name}</p>
                        <p className="text-xs" style={{ color: "#C17F4A" }}>{item.price} ₽ × {item.qty}</p>
                      </div>
                      <span className="font-bold text-sm" style={{ color: "#3E1F00" }}>{item.price * item.qty} ₽</span>
                      <button onClick={() => removeFromCart(item.name)} className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#F5ECD7", color: "#8B6040" }}>
                        <Icon name="Trash2" size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Итог и кнопка заказа */}
            {cart.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: "1px solid #E8D8C0" }}>
                <div className="flex justify-between mb-4">
                  <span className="font-semibold" style={{ color: "#3E1F00" }}>Итого:</span>
                  <span className="font-black text-xl" style={{ color: "#C17F4A" }}>{cartTotal} ₽</span>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full py-4 rounded-xl font-bold transition-all hover:scale-[1.02] hover:shadow-lg"
                  style={{ background: "#C17F4A", color: "#FAF4EA" }}
                >
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== УВЕДОМЛЕНИЕ "ЗАКАЗ ПРИНЯТ" ==================== */}
      {orderDone && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3"
          style={{ background: "#3E1F00", color: "#FAF4EA", minWidth: "280px" }}>
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-bold text-sm">Заказ успешно оформлен!</p>
            <p className="text-xs opacity-75">Ждите — скоро будет готово ☕</p>
          </div>
        </div>
      )}

      {/* ==================== КНОПКА НАВЕРХ ==================== */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-40"
          style={{ background: "#C17F4A", color: "#FAF4EA" }}
        >
          <Icon name="ArrowUp" size={18} />
        </button>
      )}
    </div>
  );
}
