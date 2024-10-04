import { useCart } from "../context/Cart";

const CartPage: React.FC = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-8 text-blue-800">Your Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="font-bold mr-4">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-8">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default CartPage;
  