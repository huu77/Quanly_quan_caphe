import { useState } from 'react';
import PropTypes from 'prop-types';
import 'tailwindcss/tailwind.css';
import { useParams } from 'react-router-dom';
const menuItems = [
  {
    name: 'Coffee',
    description: 'Freshly brewed coffee',
    price: 3.00,
    image: 'https://media.licdn.com/dms/image/C5112AQGPCn6G77ySNw/article-inline_image-shrink_1000_1488/0/1546419351410?e=1724889600&v=beta&t=k21t0kzGSCxm-CWxCeK0uqGzzN9_VF1V42cygZafVrE',
    buttonLabel: 'Order Now'
  },
  {
    name: 'Milk Tea',
    description: 'Delicious milk tea',
    price: 4.00,
    image: 'https://free.vector6.com/wp-content/uploads/2020/03/PNG-ly-tra-sua.jpg',
    buttonLabel: 'Order Now'
  },
  {
    name: 'Juice',
    description: 'Fresh fruit juice',
    price: 5.00,
    image: 'https://free.vector6.com/wp-content/uploads/2021/05/PNG-0000002406-png-nuoc-dep-do-uong.png',
    buttonLabel: 'Order Now'
  },
  {
    name: 'Juice 1',
    description: 'Fresh fruit juice',
    price: 5.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWzTbhNELzaA9STNgoG93Xk-nyT66cYDEPA&s',
    buttonLabel: 'Order Now'
  },
  // Add more items as needed
];

const CartModal = ({ idTable, cart, setCart, closeModal }) => {
  const increaseQuantity = (product) => {
    setCart(cart.map(item =>
      item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (product) => {
    if (product.quantity > 1) {
      setCart(cart.map(item =>
        item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart(cart.filter(item => item.name !== product.name));
    }
  };

  const handleOrder = () => {
    // Implement order functionality here
    alert('Order placed successfully!');
    setCart([]);
    console.log("ID Table: ", idTable);
    closeModal();
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-800">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="btn btn-xs btn-error" onClick={() => decreaseQuantity(item)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-xs btn-success" onClick={() => increaseQuantity(item)}>+</button>
                </div>
              </div>
            ))}
            <div className="text-right font-bold text-xl">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </>
        )}
        <div className="flex justify-end mt-4">
          <button className="btn btn-secondary mr-2" onClick={closeModal}>Close</button>
          <button className="btn btn-primary" onClick={handleOrder} disabled={cart.length === 0}>Order</button>
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  setCart: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  idTable: PropTypes.number.isRequired
};

const Index = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { id } = useParams();

  // Example usage of id
  console.log("Current ID from URL:", id);
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="navbar bg-white fixed top-0 left-0 w-full z-10">
        <div className="navbar-start">
          <div>
            <a className="btn btn-ghost btn-circle">
              <img
                src="https://res.cloudinary.com/dbv3dzllb/image/upload/v1721756827/img/logoCoffee_gm9sen.png"
                alt="Menu Icon"
                className="h-10 w-25"
              />
            </a>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl text-green-500">MENU</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle" onClick={() => setIsCartOpen(true)}>
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4h2l1 2h11l1-2h2M6 6h12l1 5H5L6 6zM2 2h2l3 6h13l3-6h3M6 16a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item">{cartQuantity}</span>
            </div>
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-20 mb-10 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <div key={index} className="relative flex border p-4 rounded-lg shadow">
              <div className="flex-1 pr-4">
                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-gray-900 font-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex-shrink-0 relative">
                <img src={item.image} alt={item.name} style={{ width: '140px', height: '150px' }} className="object-contain rounded-lg" />
                <button
                  className="btn btn-primary text-lg py-2 px-5 rounded-full bg-green-500 text-white text-justify"
                  onClick={() => addToCart(item)}
                >
                  {item.buttonLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg">
        <div className="flex justify-center">
          <div className="dropdown relative">
            <button
              tabIndex={0}
              className="btn btn-ghost text-xl text-white bg-red-600 w-full px-7 py-2 rounded-full ">
              MENU
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box mt-2 w-full p-2 shadow absolute bottom-full mb-3 left-0 text-black">
              <li><a>Coffee</a></li>
              <li><a>Milk Tea</a></li>
              <li><a>Juice</a></li>
            </ul>
          </div>
        </div>
      </div>
      {isCartOpen && <CartModal idTable = {id} cart={cart} setCart={setCart} closeModal={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default Index;
