import { useState, useEffect } from "react";

const GymWebsite = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", plan: "", message: "" });
  const [formStatus, setFormStatus] = useState(null); // null | "success" | "error"
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = true;
    if (!formData.lastName.trim()) errors.lastName = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = true;
    if (!formData.phone.trim()) errors.phone = true;
    if (!formData.plan) errors.plan = true;
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setFormStatus("success");
    setFormData({ firstName: "", lastName: "", email: "", phone: "", plan: "", message: "" });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: false }));
  };

  const plans = [
    { name: "Iron", price: 29, features: ["Gym Access", "Locker Room", "2 Group Classes/mo", "Basic App Access"], highlight: false },
    { name: "Steel", price: 59, features: ["Everything in Iron", "Unlimited Classes", "1 PT Session/mo", "Nutrition Guide", "Priority Booking"], highlight: true },
    { name: "Titan", price: 99, features: ["Everything in Steel", "Unlimited PT Sessions", "Custom Meal Plans", "Recovery Suite", "24/7 Access"], highlight: false },
  ];

  const classes = [
    { name: "HIIT Blast", time: "6:00 AM", spots: 4, icon: "⚡" },
    { name: "Power Lift", time: "8:30 AM", spots: 8, icon: "🏋️" },
    { name: "Cycle Rush", time: "12:00 PM", spots: 2, icon: "🚴" },
    { name: "MMA Basics", time: "5:30 PM", spots: 6, icon: "🥊" },
    { name: "Yoga Restore", time: "7:00 PM", spots: 10, icon: "🧘" },
    { name: "CrossFit X", time: "9:00 AM", spots: 5, icon: "💪" },
  ];

  const trainers = [
    { name: "Marcus Cole", specialty: "Powerlifting & Strength", exp: "12 yrs", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
    { name: "Aisha Patel", specialty: "HIIT & Cardio", exp: "8 yrs", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&q=80" },
    { name: "Jake Rivera", specialty: "Functional Training", exp: "10 yrs", img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80" },
  ];

  return (
    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", background: "#0a0a0a", color: "#f0ece0", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #c8a84b; border-radius: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .hero-bg {
          background-image: linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 60%, #0a0a0a 100%),
            url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=85');
          background-size: cover;
          background-position: center 30%;
          background-attachment: fixed;
        }
        .nav-link { position: relative; cursor: pointer; letter-spacing: 0.15em; font-size: 13px; font-weight: 600; transition: color 0.2s; }
        .nav-link:hover { color: #c8a84b; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #c8a84b; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .btn-primary { background: #c8a84b; color: #0a0a0a; border: none; padding: 14px 36px; font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, transform 0.15s; }
        .btn-primary:hover { background: #e0c068; transform: translateY(-2px); }
        .btn-outline { background: transparent; color: #c8a84b; border: 1.5px solid #c8a84b; padding: 13px 34px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: #c8a84b; color: #0a0a0a; }
        .section-tag { color: #c8a84b; font-size: 12px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; display: block; margin-bottom: 12px; }
        .section-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; line-height: 0.95; letter-spacing: -0.01em; text-transform: uppercase; }
        .gold-accent { color: #c8a84b; }
        .card-hover { transition: transform 0.3s, box-shadow 0.3s; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(200,168,75,0.15); }
        .stat-num { font-size: clamp(3rem, 6vw, 5rem); font-weight: 900; color: #c8a84b; line-height: 1; }
        .divider { width: 60px; height: 3px; background: #c8a84b; margin: 20px 0; }
        input, textarea, select { background: #1a1a1a; border: 1px solid #2a2a2a; color: #f0ece0; padding: 14px 18px; font-family: 'Barlow', sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s; width: 100%; }
        input:focus, textarea:focus { border-color: #c8a84b; }
        input::placeholder, textarea::placeholder { color: #555; }
        @media (max-width: 768px) {
          .hero-bg { background-attachment: scroll; }
          .trainer-grid { grid-template-columns: 1fr !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
          .classes-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.3s", background: scrollY > 60 ? "rgba(10,10,10,0.97)" : "transparent", borderBottom: scrollY > 60 ? "1px solid #1f1f1f" : "1px solid transparent", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, background: "#c8a84b", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontWeight: 900, fontSize: 18, color: "#0a0a0a", fontFamily: "'Barlow Condensed', sans-serif" }}>F</span>
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.08em", color: "#f0ece0" }}>FORGE<span style={{ color: "#c8a84b" }}>GYM</span></span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {["home", "about", "classes", "trainers", "pricing", "contact"].map(s => (
            <span key={s} className="nav-link" style={{ color: activeSection === s ? "#c8a84b" : "#b0a898", textTransform: "uppercase" }} onClick={() => scrollTo(s)}>{s}</span>
          ))}
        </div>
        <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 12 }} onClick={() => scrollTo("contact")}>Join Now</button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-bg fade-up" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 5% 80px" }}>
        <div style={{ maxWidth: 800 }}>
          <span className="section-tag" style={{ animationDelay: "0.1s" }}>Est. 2015 · Premium Fitness</span>
          <h1 style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: 24 }}>
            FORGE<br /><span className="gold-accent">YOUR</span><br />LIMITS
          </h1>
          <div className="divider" />
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: "#9a9080", maxWidth: 480, lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
            World-class equipment, elite coaches, and a community that pushes you beyond what you thought possible.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("pricing")}>Start Training</button>
            <button className="btn-outline" onClick={() => scrollTo("classes")}>View Classes</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "#555", fontWeight: 600 }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #c8a84b, transparent)", animation: "pulse 2s infinite" }} />
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#111", padding: "60px 5%", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          {[["2500+", "Active Members"], ["48", "Weekly Classes"], ["15", "Expert Trainers"], ["9", "Years Strong"]].map(([num, label]) => (
            <div key={label}>
              <div className="stat-num">{num}</div>
              <div style={{ fontFamily: "'Barlow', sans-serif", color: "#6a6258", fontSize: 14, marginTop: 8, letterSpacing: "0.1em" }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, maxWidth: 1200, margin: "0 auto", alignItems: "center" }}>
        <div>
          <span className="section-tag">Our Story</span>
          <h2 className="section-title" style={{ marginBottom: 24 }}>NOT JUST<br />A <span className="gold-accent">GYM</span></h2>
          <div className="divider" />
          <p style={{ fontFamily: "'Barlow', sans-serif", color: "#8a8078", lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
            Forge Gym was built on the belief that transformation is earned, not given. Our industrial-designed space pairs raw functionality with premium amenities — because serious training deserves a serious environment.
          </p>
          <p style={{ fontFamily: "'Barlow', sans-serif", color: "#8a8078", lineHeight: 1.8, marginBottom: 36, fontWeight: 300 }}>
            Every corner of our facility is designed with intent: from the black rubber flooring to the ceiling-mounted cable systems. We invest in the best so you can perform at your best.
          </p>
          <button className="btn-primary" onClick={() => scrollTo("trainers")}>Meet the Team</button>
        </div>
        <div style={{ position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&q=80" alt="Gym interior" style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", bottom: -24, left: -24, background: "#c8a84b", padding: "20px 28px" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#0a0a0a", lineHeight: 1 }}>24/7</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a", letterSpacing: "0.1em" }}>OPEN ACCESS</div>
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" style={{ background: "#0d0d0d", padding: "100px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
            <div>
              <span className="section-tag">Schedule</span>
              <h2 className="section-title">TODAY'S <span className="gold-accent">CLASSES</span></h2>
            </div>
            <button className="btn-outline">Full Schedule</button>
          </div>
          <div className="classes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {classes.map((cls) => (
              <div key={cls.name} className="card-hover" style={{ background: "#141414", border: "1px solid #1f1f1f", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{cls.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.05em", marginBottom: 4 }}>{cls.name}</div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", color: "#c8a84b", fontSize: 14, fontWeight: 500 }}>{cls.time}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: cls.spots <= 3 ? "#e05a5a" : "#c8a84b" }}>{cls.spots}</div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", color: "#555", fontSize: 12, letterSpacing: "0.1em" }}>SPOTS LEFT</div>
                  <button className="btn-primary" style={{ padding: "8px 16px", fontSize: 11, marginTop: 12 }}>Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-tag">The Coaches</span>
            <h2 className="section-title">ELITE <span className="gold-accent">TRAINERS</span></h2>
          </div>
          <div className="trainer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {trainers.map((t) => (
              <div key={t.name} className="card-hover" style={{ cursor: "pointer" }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img src={t.img} alt={t.name} style={{ width: "100%", height: 380, objectFit: "cover", display: "block", filter: "grayscale(30%)", transition: "filter 0.3s, transform 0.5s", transform: "scale(1)" }}
                    onMouseEnter={e => { e.target.style.filter = "grayscale(0%)"; e.target.style.transform = "scale(1.04)"; }}
                    onMouseLeave={e => { e.target.style.filter = "grayscale(30%)"; e.target.style.transform = "scale(1)"; }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95), transparent)", padding: "30px 24px 20px" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.04em" }}>{t.name}</div>
                    <div style={{ fontFamily: "'Barlow', sans-serif", color: "#c8a84b", fontSize: 14 }}>{t.specialty}</div>
                  </div>
                </div>
                <div style={{ background: "#111", border: "1px solid #1f1f1f", borderTop: "none", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Barlow', sans-serif", color: "#6a6258", fontSize: 13 }}>{t.exp} experience</span>
                  <button className="btn-outline" style={{ padding: "7px 18px", fontSize: 11 }}>Book Session</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: "#0d0d0d", padding: "100px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-tag">Membership</span>
            <h2 className="section-title">CHOOSE YOUR <span className="gold-accent">PLAN</span></h2>
          </div>
          <div className="plans-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {plans.map((p) => (
              <div key={p.name} className="card-hover" style={{ background: p.highlight ? "#1a1508" : "#111", border: p.highlight ? "1.5px solid #c8a84b" : "1px solid #1f1f1f", padding: "40px 32px", position: "relative" }}>
                {p.highlight && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "#c8a84b", color: "#0a0a0a", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", padding: "5px 20px" }}>MOST POPULAR</div>}
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.25em", color: "#c8a84b", marginBottom: 16 }}>{p.name.toUpperCase()}</div>
                <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: "#6a6258", paddingTop: 10 }}>$</span>
                  <span style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{p.price}</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", color: "#6a6258", paddingTop: 42, paddingLeft: 4 }}>/mo</span>
                </div>
                <div style={{ width: 40, height: 2, background: "#c8a84b", marginBottom: 28 }} />
                <div style={{ marginBottom: 32 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ fontFamily: "'Barlow', sans-serif", color: "#9a9080", fontSize: 15, padding: "8px 0", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "#c8a84b", fontWeight: 900 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <button className={p.highlight ? "btn-primary" : "btn-outline"} style={{ width: "100%", textAlign: "center" }}>Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px 5%", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.15)" }} />
        <div style={{ position: "relative" }}>
          <span className="section-tag" style={{ textAlign: "center" }}>Limited Time</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>FIRST MONTH <span className="gold-accent">FREE</span></h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", color: "#8a8078", marginBottom: 40, maxWidth: 400, margin: "0 auto 40px" }}>No contracts. No excuses. Just results.</p>
          <button className="btn-primary" style={{ fontSize: 16, padding: "18px 52px" }} onClick={() => scrollTo("contact")}>Claim Your Free Month</button>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#0d0d0d", padding: "100px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title" style={{ marginBottom: 24 }}>START YOUR <span className="gold-accent">JOURNEY</span></h2>
            <div className="divider" />
            <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 28 }}>
              {[["📍", "Location", "84 Steel Ave, Downtown District"], ["🕐", "Hours", "Mon–Fri 5am–11pm · Weekends 7am–9pm"], ["📞", "Call Us", "+1 (555) 843-0192"], ["✉️", "Email", "hello@forgegym.com"]].map(([icon, label, val]) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "#c8a84b", marginBottom: 4 }}>{label.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Barlow', sans-serif", color: "#8a8078" }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {formStatus === "success" ? (
              <div style={{ background: "#0d1f0d", border: "1.5px solid #2a6a2a", padding: "40px 32px", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <div style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>YOU'RE IN!</div>
                <p style={{ fontFamily: "'Barlow', sans-serif", color: "#8a9a8a", marginBottom: 24 }}>Thanks! Our team will reach out within 24 hours to get you started.</p>
                <button className="btn-outline" style={{ borderColor: "#2a6a2a", color: "#4aaa4a" }} onClick={() => setFormStatus(null)}>Send Another Message</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <input placeholder="First Name" value={formData.firstName} onChange={e => handleChange("firstName", e.target.value)}
                      style={{ border: formErrors.firstName ? "1px solid #c84b4b" : undefined }} />
                    {formErrors.firstName && <div style={{ fontFamily: "'Barlow', sans-serif", color: "#c84b4b", fontSize: 12, marginTop: 4 }}>Required</div>}
                  </div>
                  <div>
                    <input placeholder="Last Name" value={formData.lastName} onChange={e => handleChange("lastName", e.target.value)}
                      style={{ border: formErrors.lastName ? "1px solid #c84b4b" : undefined }} />
                    {formErrors.lastName && <div style={{ fontFamily: "'Barlow', sans-serif", color: "#c84b4b", fontSize: 12, marginTop: 4 }}>Required</div>}
                  </div>
                </div>
                <div>
                  <input placeholder="Email Address" type="email" value={formData.email} onChange={e => handleChange("email", e.target.value)}
                    style={{ border: formErrors.email ? "1px solid #c84b4b" : undefined }} />
                  {formErrors.email && <div style={{ fontFamily: "'Barlow', sans-serif", color: "#c84b4b", fontSize: 12, marginTop: 4 }}>Enter a valid email</div>}
                </div>
                <div>
                  <input placeholder="Phone Number" type="tel" value={formData.phone} onChange={e => handleChange("phone", e.target.value)}
                    style={{ border: formErrors.phone ? "1px solid #c84b4b" : undefined }} />
                  {formErrors.phone && <div style={{ fontFamily: "'Barlow', sans-serif", color: "#c84b4b", fontSize: 12, marginTop: 4 }}>Required</div>}
                </div>
                <div>
                  <select value={formData.plan} onChange={e => handleChange("plan", e.target.value)}
                    style={{ background: "#1a1a1a", border: formErrors.plan ? "1px solid #c84b4b" : "1px solid #2a2a2a", color: formData.plan ? "#f0ece0" : "#555", padding: "14px 18px", fontFamily: "'Barlow', sans-serif", fontSize: 15, outline: "none", cursor: "pointer", width: "100%" }}>
                    <option value="">Select Membership Plan</option>
                    <option value="iron">Iron – $29/mo</option>
                    <option value="steel">Steel – $59/mo</option>
                    <option value="titan">Titan – $99/mo</option>
                  </select>
                  {formErrors.plan && <div style={{ fontFamily: "'Barlow', sans-serif", color: "#c84b4b", fontSize: 12, marginTop: 4 }}>Please select a plan</div>}
                </div>
                <textarea placeholder="Your Message (optional)" rows={4} style={{ resize: "vertical" }} value={formData.message} onChange={e => handleChange("message", e.target.value)} />
                <button className="btn-primary" style={{ fontSize: 14, padding: "16px", opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer" }} onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message & Get Started"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060606", borderTop: "1px solid #1a1a1a", padding: "40px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "#c8a84b", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontWeight: 900, fontSize: 16, color: "#0a0a0a", fontFamily: "'Barlow Condensed', sans-serif" }}>F</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: "0.08em" }}>FORGE<span style={{ color: "#c8a84b" }}>GYM</span></span>
        </div>
        <div style={{ fontFamily: "'Barlow', sans-serif", color: "#3a3028", fontSize: 13 }}>© 2026 ForgeGym. All rights reserved.</div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Instagram", "Twitter"].map(l => (
            <span key={l} style={{ fontFamily: "'Barlow', sans-serif", color: "#4a4038", fontSize: 13, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#c8a84b"}
              onMouseLeave={e => e.target.style.color = "#4a4038"}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default GymWebsite;
