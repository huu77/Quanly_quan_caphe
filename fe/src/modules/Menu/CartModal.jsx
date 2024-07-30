import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCheckPhoneNumberMutation, useCreateCustomerMutation } from '../../apis/slices/Product';
import firebase from './firebase';
const CartModal = ({ idTable, cart, setCart, closeModal }) => {
  const [step, setStep] = useState('cart');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [checkPhoneNumber] = useCheckPhoneNumberMutation();
  const [createCustomer] = useCreateCustomerMutation();

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
    setStep('phone');
  };

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        'size': 'invisible',
        defaultCountry: 'VN',
      });
  }

  const handlePhoneSubmit = async () => {
    const response = await checkPhoneNumber(phoneNumber);
    if (response.data.length === 0) {
      setStep('name');
    } else {
      setupRecaptcha();
      const phoneNumberWithCountryCode = `+84${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;
      await firebase.auth().signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier)
        .then((confirmationResult) => {
          // SMS sent...
          window.confirmationResult = confirmationResult;
          setStep('otp');
        })
        .catch((error) => {
          console.error("Error during phone number submission:", error);
          alert(error.message);
        });
    }
  };
  const handleOtpSubmit = async () => {
    window.confirmationResult.confirm(otp).then((result) => {
      console.log('OTP verification successful:', result);
      placeOrder();
    }).catch((error) => {
      console.error("Error during OTP verification:", error);
      alert('Invalid OTP');
    });
  };

  const handleNameSubmit = async () => {
    try {
      const body = JSON.stringify({ name, phoneNumber });
      const response = await createCustomer(body);
      console.log("🚀 ~ handleNameSubmit ~ response:", response)
      if (response.data.message === 'Successfully created Customer.') {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          'recaptcha-container1',
          {
            'size': 'invisible',
            defaultCountry: 'VN',
          });
        
        const phoneNumberWithCountryCode = `+84${phoneNumber}`;
        const appVerifier = window.recaptchaVerifier;
        await firebase.auth().signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier)
          .then((confirmationResult) => {
            // SMS sent...
            window.confirmationResult = confirmationResult;
            setStep('otp');
          })
          .catch((error) => {
            console.error("Error during phone number submission:", error);
            alert(error.message);
          });
      } else {
        alert('Failed to create customer');
      }
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, order_details: cart, idTable }),
      });
      if (response.ok) {
        alert('Order placed successfully!');
        setCart([]);
        closeModal();
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        {step === 'cart' && (
          <>
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
          </>
        )}
        {step === 'phone' && (
          <>
            <h2 className="text-xl font-bold mb-4">Enter Phone Number</h2>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input input-bordered w-full mb-4"
              placeholder="Phone Number"
            />
            <div id="recaptcha-container"></div>
            <div className="flex justify-end mt-4">
              <button className="btn btn-secondary mr-2" onClick={() => setStep('cart')}>Back</button>
              <button className="btn btn-primary" onClick={handlePhoneSubmit}>Next</button>
            </div>
          </>
        )}
        {step === 'otp' && (
          <>
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input input-bordered w-full mb-4"
              placeholder="OTP"
            />
            <div className="flex justify-end mt-4">
              <button className="btn btn-secondary mr-2" onClick={() => setStep('phone')}>Back</button>
              <button className="btn btn-primary" onClick={handleOtpSubmit}>Verify OTP</button>
            </div>
          </>
        )}
        {step === 'name' && (
          <>
            <h2 className="text-xl font-bold mb-4">Enter Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mb-4"
              placeholder="Name"
            />
            <div id="recaptcha-container1"></div>
            <div className="flex justify-end mt-4">
              <button className="btn btn-secondary mr-2" onClick={() => setStep('phone')}>Back</button>
              <button className="btn btn-primary" onClick={handleNameSubmit}>Next</button>
            </div>
            
          </>
        )}
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
  idTable: PropTypes.string.isRequired,
};

export default CartModal;
