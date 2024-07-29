import { useState, useRef } from 'react';
import { useGetProductsQuery, useGetMenuQuery } from '../../apis/slices/Product'; // Adjust the path as necessary
import CartModal from './CartModal'; // Ensure the correct path
import OrderHistoryModal from './OrderHistoryModal '; // Import the Order History Modal
import { useParams } from 'react-router-dom';

const Index = () => {
  const { data: products, error: productsError, isLoading: isLoadingProducts } = useGetProductsQuery();
  const { data: menu, error: menuError, isLoading: isLoadingMenu } = useGetMenuQuery();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false); // State for order history modal
  const { id } = useParams();
  const productRefs = useRef([]); // Create an array to hold refs for product categories

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

  const scrollToCategory = (categoryId) => {
    const index = menu.data.findIndex(item => item.id === categoryId);
    if (index !== -1 && productRefs.current[index]) {
      productRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if products and menu are available
  if (isLoadingProducts) return <div>Loading products...</div>;
  if (productsError) return <div>Error loading products</div>;
  if (!menu || !menu.data || menuError) return <div>Error loading menu</div>;
  if (isLoadingMenu) return <div>Loading menu...</div>;

  // Group products by category
  const groupedProducts = menu.data.map(category => ({
    ...category,
    products: products.data.filter(product => product.category_id === category.id),
  }));

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
          <a className="btn btn-ghost text-xl text-green-500 font-bold">MENU</a>
        </div>
        <div className="navbar-end">
        <button className="btn btn-ghost btn-square mr-2" onClick={() => setIsOrderHistoryOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 25 25"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l2 2m6.364-3.364A9 9 0 1112 3a9 9 0 016.364 1.636z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle" onClick={() => setIsCartOpen(true)}>
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
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
              <span className="badge badge-success badge-primary indicator-item">{cartQuantity}</span>
            </div>
          </button>
          
        </div>
      </div>
      <div className="container mx-auto mt-20 mb-10 flex-1">
        {groupedProducts.map((category, index) => (
          <div key={category.id} ref={el => (productRefs.current[index] = el)} className="my-1">
            <p className="text-xl text-red-600 font-bold text-center">{category.name}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.products.length > 0 ? (
                category.products.map((item) => (
                  <div key={item.id} className="relative flex border p-4 rounded-lg shadow">
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
                        {item.buttonLabel || "Order Now"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No products available in this category</div>
              )}
            </div>
          </div>
        ))}
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
              {menu.data.map(product => (
                <li key={product.id} onClick={() => scrollToCategory(product.id)}>{product.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isCartOpen && <CartModal idTable={id} cart={cart} setCart={setCart} closeModal={() => setIsCartOpen(false)} />}
      {isOrderHistoryOpen && <OrderHistoryModal idTable={id} closeModal={() => setIsOrderHistoryOpen(false)} />} {/* Place the OrderHistoryModal here */}
    </div>
  );
};

export default Index;
