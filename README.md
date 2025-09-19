# Mejuri Shopping App Component

## Live Demo
Experience the app live at: [https://mejuri.netlify.app/](https://mejuri.netlify.app/)

## Features

This React-based navbar component powers a shopping app with the following capabilities:

- **Dynamic Cart Count**: Displays the total number of items (e.g., "Checkout(10)") on the shopping bag icon and in the cart preview header, based on the sum of item quantities.
- **Cart Preview Modal**: A toggleable modal featuring a fixed "Checkout" header with item count, a scrollable list of cart items (thumbnails, titles, and prices), and a fixed footer with the estimated total price and checkout button.
- **Item Management**: Allows users to add items to the cart and remove them with real-time updates using Redux.
- **Responsive Design**: Adjusts the cart preview width and product grid layout for desktop, tablet, and mobile screens.
- **Error Handling**: Logs errors if the shopping bag image fails to load.

## Technologies Used
- **React**: Builds the component and manages state with hooks (`useState`, `useEffect`).
- **Redux**: Handles cart state management for adding and removing items.
- **CSS**: Custom styles with flexbox for layout and responsive design.
- **JavaScript**: Manages logic and user interactions.

## Installation

To run this shopping app locally on your machine as of September 18, 2025, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/oosunkeye/mejuri.git
   cd mejuri
   ```

2. **Install Dependencies**
   Ensure Node.js is installed, then run:
   ```bash
   npm install
   ```

3. **Set Up Redux**
   - Install Redux and React-Redux if not already included:
     ```bash
     npm install redux react-redux
     ```
   - Configure a Redux store with an initial `cart.items` state. Example:
     ```javascript
     // store.js
     import { createStore } from 'redux';
     const initialState = { cart: { items: [] } };
     const reducer = (state = initialState, action) => {
       switch (action.type) {
         case 'cart/addToCart':
           return { ...state, cart: { items: [...state.cart.items, action.payload] } };
         case 'cart/removeFromCart':
           return { ...state, cart: { items: state.cart.items.filter(item => item.id !== action.payload) } };
         default:
           return state;
       }
     };
     export default createStore(reducer);
     ```
   - Connect the store to your app (e.g., in `index.js`):
     ```javascript
     import { Provider } from 'react-redux';
     import store from './store';
     import Navbar from './Navbar';
     ReactDOM.render(
       <Provider store={store}>
         <Navbar />
       </Provider>,
       document.getElementById('root')
     );
     ```

4. **Run the Project**
   - Start the development server:
     ```bash
     npm start
     ```
   - Open `http://localhost:3000` in your browser to use the app.

## Notes
- Ensure the `assets/shopping-bag.png` file is in the `assets` folder, or update the path in `Navbar.js` if different.
- JavaScript must be enabled in your browser to run the app.