import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'iPhone 14 Pro Case', price: 29.99, stock: 15 },
  { id: 2, name: 'Samsung S23 Screen Protector', price: 19.99, stock: 20 },
  { id: 3, name: 'Wireless Charger', price: 39.99, stock: 10 },
  { id: 4, name: 'Phone Stand', price: 15.99, stock: 25 },
  { id: 5, name: 'USB-C Cable', price: 12.99, stock: 30 },
  { id: 6, name: 'PopSocket Grip', price: 9.99, stock: 40 },
  { id: 7, name: 'Bluetooth Earbuds', price: 49.99, stock: 12 },
  { id: 8, name: 'Car Phone Mount', price: 24.99, stock: 18 },
  { id: 9, name: 'Power Bank', price: 34.99, stock: 22 },
  { id: 10, name: 'Camera Lens Kit', price: 29.99, stock: 15 }
].map(p => ({ ...p, image: `/${p.name.toLowerCase().replace(/ /g, '')}.png` }));

export const OnlineShop = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [alerts, setAlerts] = useState([]);
  
  const alert = msg => {
    const id = Date.now();
    setAlerts(a => [...a, { id, msg }]);
    setTimeout(() => setAlerts(a => a.filter(alert => alert.id !== id)), 3000);
  };

  const login = e => {
    e.preventDefault();
    const form = e.target;
    setUser({ name: form.name?.value || 'User', email: form.email.value });
    alert('Welcome back!');
  };

  const addToCart = product => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      const updated = exists
        ? prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...prev, { ...product, qty: 1 }];
      alert(`${product.name} added to cart`);
      return updated;
    });
  };

  const updateQty = (id, qty) => qty > 0 && 
    setCart(items => items.map(item => item.id === id ? { ...item, qty } : item));

  const removeItem = id => {
    setCart(items => items.filter(item => item.id !== id));
    alert('Item removed');
  };

  const total = cart.reduce((sum, { price, qty }) => sum + price * qty, 0);

  return (
    <div className="shop">
      {alerts.map(({ id, msg }) => (
        <div key={id} className="alert">{msg}</div>
      ))}

      {!user ? (
        <div className="auth">
          <form onSubmit={login}>
            <h2>Login</h2>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>

          <form onSubmit={login}>
            <h2>Sign Up</h2>
            <input name="name" type="text" placeholder="Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      ) : (
        <>
          <header>
            <h1>Phone Accessories</h1>
            <div>
              <button onClick={() => setShowCart(true)}>
                Cart ({cart.reduce((sum, { qty }) => sum + qty, 0)})
              </button>
              <button onClick={() => setUser(null)}>Logout</button>
            </div>
          </header>

          <div className="products">
            {PRODUCTS.map(product => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <p>Stock: {product.stock}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>

          {showCart && (
            <div className="modal">
              <div className="modal-content">
                <header>
                  <h2>Cart</h2>
                  <button onClick={() => setShowCart(false)}>×</button>
                </header>
                
                {cart.length === 0 ? (
                  <p>Cart is empty</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <h3>{item.name}</h3>
                          <p>${item.price}</p>
                        </div>
                        <div className="qty">
                          <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                      </div>
                    ))}
                    <div className="cart-footer">
                      <h3>Total: ${total.toFixed(2)}</h3>
                      <button>Checkout</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .shop {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .alert {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4CAF50;
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          animation: fadeIn 0.3s;
        }

        .auth {
          max-width: 400px;
          margin: 40px auto;
        }

        form {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .product {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .product img {
          width: 100%;
          height: 200px;
          object-fit: contain;
          margin-bottom: 10px;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 80px 1fr auto auto;
          gap: 15px;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .cart-item img {
          width: 100%;
          height: 80px;
          object-fit: contain;
        }

        .qty {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        button {
          background: #4444ff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.9;
        }

        .cart-footer {
          margin-top: 20px;
          text-align: right;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default OnlineShop;