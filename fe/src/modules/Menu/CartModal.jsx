import PropTypes from 'prop-types';

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

export default CartModal;