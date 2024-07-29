import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const OrderHistoryModal = ({ closeModal }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch('/api/order-history'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch order history');
        }
        const data = await response.json();
        setOrderHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Order History</h2>
        {loading && <p>Loading order history...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {orderHistory.length > 0 ? (
            orderHistory.map((order, index) => (
              <li key={index} className="py-2 border-b">
                <p>{order.name} - Quantity: {order.quantity}</p>
                <p>Price: ${order.price.toFixed(2)}</p>
              </li>
            ))
          ) : (
            !loading && <p>No order history available.</p>
          )}
        </ul>
        <button className="btn btn-primary mt-4" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

// Define prop types for the component
OrderHistoryModal.propTypes = {
  closeModal: PropTypes.func.isRequired, // Validate closeModal as a required function
};

export default OrderHistoryModal;
