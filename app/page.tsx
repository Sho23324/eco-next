import Link from "next/link";
import styles from "./page.module.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const categories = [
  {
    name: "Lipstick",
    products: [
      { id: 1, name: "Addict Lip Glow", brand: "Dior", price: "$40.00", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { id: 5, name: "Rouge Lipstick", brand: "Dior", price: "$45.00", image: "https://images.unsplash.com/photo-1586495209376-7ca656dc08e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
    ]
  },
  {
    name: "Foundation",
    products: [
      { id: 2, name: "Ambient Lighting Powder", brand: "Hourglass", price: "$54.00", image: "https://images.unsplash.com/photo-1512496015851-a1c8485e4da8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { id: 4, name: "Vanish Seamless Finish", brand: "Hourglass", price: "$49.00", image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
    ]
  },
  {
    name: "Other Cosmetics",
    products: [
      { id: 3, name: "Elegance Perfume", brand: "Roman", price: "$120.00", image: "https://images.unsplash.com/photo-1594034183955-4cc01004cd4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { id: 6, name: "Classic Velvet Matte", brand: "Roman", price: "$65.00", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
    ]
  }
];

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>Eco Luxe</Link>
        <div className={styles.authLinks}>
          {session ? (
            <div className={styles.loginBtn}>Welcome, {session.user.name}</div>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>Sign In</Link>
              <Link href="/register" className={styles.registerBtn}>Create Account</Link>
            </>
          )}
        </div>
      </header>

      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Curated Beauty Excellence</h1>
        <p className={styles.heroSubtitle}>
          Discover our exclusive collection of premium cosmetics from world-renowned brands including Dior, Hourglass, and Roman. Elevate your daily routine.
        </p>
      </div>

      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <section key={category.name} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              <div className={styles.categoryLine}></div>
            </div>
            
            <div className={styles.editorialList}>
              {category.products.map((product, index) => (
                <div key={product.id} className={`${styles.editorialRow} ${index % 2 !== 0 ? styles.reverse : ''}`}>
                  <div className={styles.editorialImageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className={styles.editorialImage}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.editorialContent}>
                    <div className={styles.editorialBrand}>{product.brand}</div>
                    <h3 className={styles.editorialName}>{product.name}</h3>
                    <div className={styles.editorialPrice}>{product.price}</div>
                    <button className={styles.shopButton}>Discover</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Eco Luxe Cosmetics. All rights reserved.
      </footer>
    </main>
  );
}
