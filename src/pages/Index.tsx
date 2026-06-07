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

// фотки для слайдера в меню
const PHOTOS = {
  coffee: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/8986274b-25e2-4952-bd6a-eae17d05349b.jpg",
  pastry: "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/37ccf19b-07c3-4fa0-8922-b4c4d8edd2a1.jpg",
  tea:    "https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/6b8d3310-b239-4068-b90d-0a8eed664a68.jpg",
};

type Cat = "coffee" | "pastry" | "tea";
type CartItem = { name: string; price: number; qty: number };

export default function Index() {
  // состояния
  const [cat, setCat] = useState<Cat>("coffee");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookOk, setBookOk] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");

  // рефы для скролла
  const refTop    = useRef<HTMLDivElement>(null);
  const refMenu   = useRef<HTMLDivElement>(null);
  const refBook   = useRef<HTMLDivElement>(null);
  const refContacts = useRef<HTMLDivElement>(null);

  function goTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  // добавить в корзину
  function addToCart(item: { name: string; price: number }) {
    setCart(prev => {
      const found = prev.find(c => c.name === item.name);
      if (found) {
        return prev.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  // удалить из корзины
  function removeItem(name: string) {
    setCart(prev => prev.filter(c => c.name !== name));
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);

  // оформить заказ
  function placeOrder() {
    setCart([]);
    setCartOpen(false);
    setOrderDone(true);
    setTimeout(() => setOrderDone(false), 3500);
  }

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
        {/* логотип */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => goTo(refTop)}>
          <span style={{ fontSize: 28 }}>☕</span>
          <span style={{ fontSize: 22, fontWeight: "bold", color: "#3e1f00" }}>Кофейня Уют</span>
        </div>

        {/* навигация */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => goTo(refTop)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b3a2a", fontSize: 14, padding: "6px 12px" }}>
            Главная
          </button>
          <button onClick={() => goTo(refMenu)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b3a2a", fontSize: 14, padding: "6px 12px" }}>
            Меню
          </button>
          <button onClick={() => goTo(refBook)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b3a2a", fontSize: 14, padding: "6px 12px" }}>
            Бронирование
          </button>
          <button onClick={() => goTo(refContacts)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6b3a2a", fontSize: 14, padding: "6px 12px" }}>
            Контакты
          </button>

          {/* кнопка корзины */}
          <button onClick={() => setCartOpen(true)}
            style={{
              background: "#c17f4a",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: "bold",
              position: "relative",
            }}>
            🛒 Корзина {count > 0 && <span style={{
              background: "#3e1f00",
              color: "white",
              borderRadius: "50%",
              fontSize: 11,
              padding: "2px 6px",
              marginLeft: 4,
            }}>{count}</span>}
          </button>
        </div>
      </div>

      {/* ===== БАННЕР ===== */}
      <div ref={refTop} style={{
        background: `linear-gradient(rgba(62,31,0,0.55), rgba(62,31,0,0.55)), url(https://cdn.poehali.dev/projects/cd58137d-b60f-4b9d-aa74-65a5f431f22a/files/16d47531-c9ca-40f2-b031-679ac9b948d2.jpg) center/cover`,
        minHeight: 480,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}>
        <h1 style={{ color: "#edd9b8", fontSize: 52, margin: 0, fontFamily: "Georgia, serif" }}>Кофейня Уют</h1>
        <p style={{ color: "#faf4ea", fontSize: 18, marginTop: 16, marginBottom: 32 }}>
          Место, где каждая чашка — маленький праздник ☕
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

      {/* ===== МЕНЮ ===== */}
      <div ref={refMenu} style={{ padding: "48px 24px", maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ color: "#3e1f00", fontSize: 32, marginBottom: 8, fontFamily: "Georgia, serif" }}>Наше меню</h2>
        <p style={{ color: "#8b6040", marginBottom: 24, fontSize: 14 }}>Нажмите + чтобы добавить в корзину</p>

        {/* кнопки фильтра */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {(["coffee", "pastry", "tea"] as Cat[]).map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{
                padding: "8px 20px",
                borderRadius: 20,
                border: "2px solid #c17f4a",
                background: cat === c ? "#c17f4a" : "white",
                color: cat === c ? "white" : "#c17f4a",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 14,
              }}>
              {c === "coffee" ? "☕ Кофе" : c === "pastry" ? "🥐 Выпечка" : "🍵 Чай"}
            </button>
          ))}
        </div>

        {/* фото категории */}
        <img
          src={PHOTOS[cat]}
          alt={cat}
          style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12, marginBottom: 24 }}
        />

        {/* список позиций */}
        <div style={{ border: "1px solid #e8d8c0", borderRadius: 12, overflow: "hidden", background: "white" }}>
          {MENU[cat].map((item, i) => (
            <div key={item.name} style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom: i < MENU[cat].length - 1 ? "1px solid #f0e4d0" : "none",
              background: i % 2 === 0 ? "white" : "#fdfaf5",
            }}>
              <span style={{ flex: 1, fontSize: 15, color: "#3e1f00" }}>{item.name}</span>
              <span style={{ color: "#c17f4a", fontWeight: "bold", marginRight: 16, fontSize: 15 }}>{item.price} ₽</span>
              <button onClick={() => addToCart(item)}
                style={{
                  background: "#c17f4a",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  width: 32,
                  height: 32,
                  fontSize: 20,
                  cursor: "pointer",
                  lineHeight: 1,
                }}>
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== БРОНИРОВАНИЕ ===== */}
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
                <label style={{ display: "block", color: "#6b3a2a", marginBottom: 6, fontSize: 13, fontWeight: "bold" }}>Ваше имя</label>
                <input required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #e8d8c0", borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#faf4ea" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "#6b3a2a", marginBottom: 6, fontSize: 13, fontWeight: "bold" }}>Телефон</label>
                <input required value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #e8d8c0", borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#faf4ea" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", color: "#6b3a2a", marginBottom: 6, fontSize: 13, fontWeight: "bold" }}>Дата</label>
                  <input required type="date" value={date} onChange={e => setDate(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #e8d8c0", borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#faf4ea" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#6b3a2a", marginBottom: 6, fontSize: 13, fontWeight: "bold" }}>Время</label>
                  <input required type="time" value={time} onChange={e => setTime(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #e8d8c0", borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#faf4ea" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: "#6b3a2a", marginBottom: 6, fontSize: 13, fontWeight: "bold" }}>Количество гостей</label>
                <select required value={guests} onChange={e => setGuests(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #e8d8c0", borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#faf4ea" }}>
                  <option value="">Выберите...</option>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}</option>)}
                </select>
              </div>
              <button type="submit"
                style={{ background: "#c17f4a", color: "white", border: "none", borderRadius: 8, padding: "14px", fontSize: 15, cursor: "pointer", fontWeight: "bold" }}>
                Забронировать
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ===== КОНТАКТЫ ===== */}
      <div ref={refContacts} style={{ padding: "48px 24px", maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ color: "#3e1f00", fontSize: 32, marginBottom: 24, fontFamily: "Georgia, serif" }}>Контакты</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "📍 Адрес", val: "ул. Кофейная, 15, 2 этаж" },
            { label: "🕐 Работаем", val: "Пн–Пт 8:00–22:00, Сб–Вс 9:00–23:00" },
            { label: "📞 Телефон", val: "+7 (999) 999-99-99" },
            { label: "✉️ Email", val: "hello@coffee-uyt.ru" },
          ].map(item => (
            <div key={item.label} style={{ background: "white", border: "1px solid #e8d8c0", borderRadius: 10, padding: "16px 20px" }}>
              <div style={{ color: "#8b6040", fontSize: 12, fontWeight: "bold", marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: "#3e1f00", fontSize: 15 }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ПОДВАЛ ===== */}
      <div style={{ background: "#3e1f00", color: "#c17f4a", textAlign: "center", padding: "24px", fontSize: 13 }}>
        © 2024 Кофейня Уют. Все права защищены.
      </div>

      {/* ===== КОРЗИНА (выезжает сбоку) ===== */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", justifyContent: "flex-end" }}>
          {/* тёмный фон */}
          <div onClick={() => setCartOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />

          {/* сама панель */}
          <div style={{
            position: "relative",
            width: 340,
            height: "100%",
            background: "#faf4ea",
            display: "flex",
            flexDirection: "column",
            borderLeft: "2px solid #c17f4a",
          }}>
            {/* заголовок */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e8d8c0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, color: "#3e1f00", fontSize: 20 }}>🛒 Корзина</h3>
              <button onClick={() => setCartOpen(false)}
                style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#8b6040" }}>✕</button>
            </div>

            {/* список товаров */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: 60, color: "#8b6040" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                  <p>Корзина пуста</p>
                  <p style={{ fontSize: 13 }}>Добавьте что-нибудь из меню</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.name} style={{
                    background: "white",
                    border: "1px solid #e8d8c0",
                    borderRadius: 10,
                    padding: "12px 16px",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#3e1f00", fontWeight: "bold", fontSize: 14 }}>{item.name}</div>
                      <div style={{ color: "#c17f4a", fontSize: 13 }}>{item.price} ₽ × {item.qty} = {item.price * item.qty} ₽</div>
                    </div>
                    <button onClick={() => removeItem(item.name)}
                      style={{ background: "#f5ecd7", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: "#8b6040", fontSize: 13 }}>
                      Удалить
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* итого и кнопка */}
            {cart.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid #e8d8c0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 16 }}>
                  <span style={{ color: "#3e1f00", fontWeight: "bold" }}>Итого:</span>
                  <span style={{ color: "#c17f4a", fontWeight: "bold", fontSize: 20 }}>{total} ₽</span>
                </div>
                <button onClick={placeOrder}
                  style={{ width: "100%", background: "#c17f4a", color: "white", border: "none", borderRadius: 8, padding: "14px", fontSize: 15, cursor: "pointer", fontWeight: "bold" }}>
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== УВЕДОМЛЕНИЕ О ЗАКАЗЕ ===== */}
      {orderDone && (
        <div style={{
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#3e1f00",
          color: "white",
          borderRadius: 12,
          padding: "16px 28px",
          zIndex: 300,
          fontSize: 15,
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}>
          🎉 Заказ успешно оформлен! Ждите — скоро будет готово ☕
        </div>
      )}

    </div>
  );
}
