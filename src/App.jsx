import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateProduct from "./components/CreateProduct";
import ProductList from "./components/ProductList";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import "./App.css";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const globeRef = useRef(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    // Reduced motion check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Three.js Globe
    const globeContainer = globeRef.current;
    if (!globeContainer) {
      console.warn("Globe container not found");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    globeContainer.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x16a34a,
      wireframe: true,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    camera.position.z = 10;

    const animateGlobe = () => {
      if (!globeContainer.isConnected) return; // Stop if container is removed
      requestAnimationFrame(animateGlobe);
      globe.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animateGlobe();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // GSAP Animations
    if (!prefersReducedMotion) {
      // Hero Section
      gsap.fromTo(
        ".hero-title span",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".hero", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".hero", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".hero-button",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: ".hero", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".leaf-svg",
        { scale: 0, rotation: 0 },
        {
          scale: 1,
          rotation: 360,
          duration: 2,
          repeat: -1,
          ease: "linear",
          scrollTrigger: { trigger: ".hero", start: "top 80%" },
        }
      );

      // Mission Section
      gsap.fromTo(
        ".mission-text p",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ".mission", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".mission-image",
        { opacity: 0, xPercent: 50 },
        {
          opacity: 1,
          xPercent: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".mission", start: "top 85%" },
        }
      );

      // Stats Section
      gsap.utils.toArray(".stat-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: card, start: "top 85%" },
            onStart: () => {
              const number = card.querySelector(".stat-number");
              gsap.fromTo(
                number,
                { innerText: 0 },
                {
                  innerText: number.dataset.target,
                  duration: 2,
                  ease: "power1.out",
                  snap: { innerText: 1 },
                }
              );
            },
          }
        );
      });

      // Features Section
      gsap.utils.toArray(".feature-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotationX: 10 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
        const svgPath = card.querySelector(".feature-svg path");
        gsap.fromTo(
          svgPath,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });

      // Testimonials Section
      gsap.utils.toArray(".testimonial-card p").forEach((text, index) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: { trigger: ".testimonials", start: "top 85%" },
          }
        );
      });

      // Team Section
      gsap.utils.toArray(".team-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });

      // CTA Section
      gsap.fromTo(
        ".cta-button",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: ".cta", start: "top 90%" },
        }
      );
      gsap.fromTo(
        ".cta-svg",
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta", start: "top 90%" },
        }
      );

      // Footer
      gsap.fromTo(
        ".footer-note",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".footer", start: "top 95%" },
        }
      );
    } else {
      // Reduced Motion Fallback
      gsap.set(
        [
          ".hero-title span",
          ".hero-subtitle",
          ".hero-button",
          ".leaf-svg",
          ".mission-text p",
          ".mission-image",
          ".stat-card",
          ".feature-card",
          ".testimonial-card p",
          ".team-card",
          ".cta-button",
          ".cta-svg",
          ".footer-note",
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          rotationX: 0,
        }
      );
      gsap.set(".leaf-svg", { rotation: 0 });
      gsap.utils.toArray(".stat-number").forEach((number) => {
        number.innerText = number.dataset.target;
      });
      gsap.utils.toArray(".feature-svg path").forEach((path) => {
        path.style.strokeDashoffset = 0;
      });
    }

    // UI Interactions (Hover)
    gsap.utils
      .toArray(".feature-card, .hero-button, .cta-button, .team-card")
      .forEach((element) => {
        element.addEventListener("mouseenter", () => {
          if (!prefersReducedMotion) {
            gsap.to(element, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(element, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (globeContainer && renderer.domElement && globeContainer.isConnected) {
        globeContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              <img
                src="/src/assets/greentrust5.png"
                alt="GreenTrust Logo"
                className="navbar-logo"
              />
            </Link>
            {localStorage.getItem("token") ? (
              <div className="navbar-links">
                <Link to="/profile" className="nav-button">
                  Profile
                </Link>
                <Link to="/create-product" className="nav-button">
                  Create Product
                </Link>
                <Link to="/cart" className="nav-button">
                  Cart
                </Link>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-links">
                <Link to="/login" className="nav-button">
                  Login
                </Link>
                <Link to="/register" className="nav-button">
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/"
              element={
                <div className="homepage">
                  {/* Hero Section */}
                  <section className="hero">
                    <div className="hero-globe" ref={globeRef}></div>
                    <div className="hero-content">
                      <h1 className="hero-title">
                        <span>Green</span>
                        <span style={{ color: "#16a34a" }}>Trust</span>
                        <span> Marketplace</span>
                      </h1>
                      <p className="hero-subtitle">
                        Empowering sustainable living through a trusted platform
                        to buy, sell, and trade.
                      </p>
                      <Link to="/products" className="hero-button">
                        Start Exploring
                      </Link>
                    </div>
                  </section>
                  {/* Mission Section */}
                  <section className="mission">
                    <div className="mission-content">
                      <div className="mission-text">
                        {/* <img src="/src/assets/leaf.svg" alt="Leaf" className="leaf-svg" /> */}
                        <h2>Our Mission</h2>
                        <p>
                          GreenTrust is your go-to marketplace for buying,
                          selling, and trading goods of all kinds, connecting
                          people worldwide.
                        </p>
                        <p>
                          We make trading seamless and secure with verified
                          users and transparent listings, building trust in
                          every transaction.
                        </p>
                        <p>
                          Our unique green points system rewards sustainable
                          choices, encouraging eco-friendly trading practices to
                          reduce waste.
                        </p>
                        <p>
                          Join our vibrant community to trade smarter and
                          contribute to a more sustainable future.
                        </p>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Marketplace trading"
                        className="mission-image"
                      />
                    </div>
                  </section>

                  {/* Stats Section */}
                  <section className="stats">
                    <h2 className="section-title">Our Impact</h2>
                    <div className="stats-content">
                      <div className="stat-card">
                        <h3 className="stat-number" data-target="5000">
                          0
                        </h3>
                        <p>Trades Completed</p>
                      </div>
                      <div className="stat-card">
                        <h3 className="stat-number" data-target="10000">
                          0
                        </h3>
                        <p>Users Engaged</p>
                      </div>
                      <div className="stat-card">
                        <h3 className="stat-number" data-target="2000">
                          0
                        </h3>
                        <p>Tons Saved</p>
                      </div>
                    </div>
                  </section>

                  {/* Features Section */}
                  <section className="features">
                    <h2 className="section-title">Why GreenTrust?</h2>
                    <div className="features-content">
                      <div className="feature-card">
                        <svg className="feature-svg" viewBox="0 0 200 200">
                          <path
                            d="M10,100 C10,44.77 44.77,10 100,10 C155.23,10 190,44.77 190,100 C190,155.23 155.23,190 100,190 C44.77,190 10,155.23 10,100"
                            stroke="#16a34a"
                            stroke-width="5"
                            fill="none"
                            stroke-dasharray="1000"
                          />
                        </svg>
                        <h3 className="feature-title">Versatile Trading</h3>
                        <p className="feature-text">
                        Buy, sell, or trade anything from electronics to collectibles in one trusted platform.
                        </p>
                      </div>
                      <div className="feature-card">
                        <svg className="feature-svg" viewBox="0 0 200 200">
                          <path
                            d="M10,100 C10,44.77 44.77,10 100,10 C155.23,10 190,44.77 190,100 C190,155.23 155.23,190 100,190 C44.77,190 10,155.23 10,100"
                            stroke="#16a34a"
                            stroke-width="5"
                            fill="none"
                            stroke-dasharray="1000"
                          />
                        </svg>
                        <h3 className="feature-title">Built on Trust</h3>
                        <p className="feature-text">
                          Verified users and clear listings ensure every trade
                          is secure and reliable.
                        </p>
                      </div>
                      <div className="feature-card">
                        <svg className="feature-svg" viewBox="0 0 200 200">
                          <path
                            d="M10,100 C10,44.77 44.77,10 100,10 C155.23,10 190,44.77 190,100 C190,155.23 155.23,190 100,190 C44.77,190 10,155.23 10,100"
                            stroke="#16a34a"
                            stroke-width="5"
                            fill="none"
                            stroke-dasharray="1000"
                          />
                        </svg>
                        <h3 className="feature-title">Green Rewards</h3>
                        <p className="feature-text">
                        Earn green points for sustainable trades, promoting a circular economy.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Testimonials Section */}
                  <section className="testimonials">
                    <h2 className="section-title">Our Community</h2>
                    <div className="testimonials-content">
                      <div className="testimonial-card">
                        <p>
                        “GreenTrust makes trading so easy, and I love earning green points for sustainable deals!”
                        </p>
                        <h4>— Emma, Entrepreneur</h4>
                      </div>
                      <div className="testimonial-card">
                        <p>
                        “The trust and community here make every transaction a breeze.”
                        </p>
                        <h4>— Liam, Sustainability Advocate</h4>
                      </div>
                    </div>
                  </section>

                  {/* Team Section */}
                  <section className="team">
                    <h2 className="section-title">Meet Our Visionaries</h2>
                    <div className="team-content">
                      <div className="team-card">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                          alt="Team member"
                        />
                        <h3>Suraj malhotra</h3>
                        <p>Founder</p>
                      </div>
                      <div className="team-card">
                        <img
                          src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                          alt="Team member"
                        />
                        <h3>Rohan chuhan</h3>
                        <p>Designer</p>
                      </div>
                      <div className="team-card">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                          alt="Team member"
                        />
                        <h3>Anitha Devraj</h3>
                        <p>Developer</p>
                      </div>
                    </div>
                  </section>

                  {/* CTA Section */}
                  <section className="cta">
                    <h2>Join the Trading Revolution</h2>
                    <Link to="/register" className="cta-button">
                      Get Started
                      {/* <img
                        src="/src/assets/leaf.svg"
                        alt="Leaf"
                        className="cta-svg"
                      /> */}
                    </Link>
                  </section>

                  {/* Footer */}
                  <footer className="footer">
                    <p className="footer-note">
                    GreenTrust: Connecting traders for a sustainable tomorrow.                    </p>
                  </footer>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
