import PropTypes from 'prop-types'; // Import PropTypes
import { useGetProductByTableQuery } from '../../apis/slices/Product';
import { useEffect, useMemo } from 'react';

const OrderHistoryModal = ({ idTable, closeModal }) => {
  const { data, error: productsError, isLoading: isLoadingProducts } = useGetProductByTableQuery(idTable);

  useEffect(() => {
    console.log("API data:", data);
    console.log("API error:", productsError);
  }, [data, productsError]);

  // Ensure data is an array
  const orderHistory = Array.isArray(data?.data) ? data.data : [];

  // Group products by product_id and calculate total quantity and amount
  const groupedProducts = useMemo(() => {
    const productMap = {};
    let grandTotal = 0;

    orderHistory.forEach(item => {
      const { product_id, item_name, price, quantity, description, image } = item;

      if (!productMap[product_id]) {
        productMap[product_id] = {
          id: product_id,
          name: item_name,
          quantity: 0,
          totalAmount: 0,
          price: price,
          description: description,
          image: image
        };
      }

      const totalAmount = price * quantity;
      productMap[product_id].quantity += quantity;
      productMap[product_id].totalAmount += totalAmount;

      grandTotal += totalAmount;
    });

    return { products: Object.values(productMap), grandTotal };
  }, [orderHistory]);

  if (isLoadingProducts) return <div>Loading products...</div>;
  if (productsError) return <div>Error loading products</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Order History</h2>

        <ul>
          {groupedProducts.products.length > 0 ? (
            groupedProducts.products.map((product) => (
              <div key={product.id} className="relative flex border p-4 rounded-lg shadow">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-gray-900 font-bold">${product.price.toFixed(2)}</p>
                  <p className="text-gray-900">Quantity: {product.quantity}</p>
                </div>
                {/* Uncomment if image is needed */}
                <div className="flex-shrink-0 relative">
                  <img src={product.image} alt={product.name} style={{ width: '140px', height: '150px' }} className="object-contain rounded-lg" />
                </div>
              </div>
            ))
          ) : (
            <p>No order history available.</p>
          )}
        </ul>

        <div className="mt-4">
          <p className="text-gray-900 font-bold">Grand Total: ${groupedProducts.grandTotal.toFixed(2)}</p>
        </div>

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
  idTable: PropTypes.string.isRequired, // Validate idTable as a required string
};

export default OrderHistoryModal;
