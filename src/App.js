import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import CartContext from "./components/Context/CartContext";
import { useState } from "react";
import AboutPage from './pages/About';
import Rootlayout from './components/Layout/RootLayout';
import StorePage from './pages/Store';
import HomePage from './pages/Home';

const router = createBrowserRouter(
  [
    {path:'/' , element:<Rootlayout/> , children:[
      {path:'/' , element:<StorePage/>},
      {path:'/about' , element:<AboutPage/>},
      {path:'/home' , element:<HomePage/>}
    ]}
  ]
)

const productsArr = [
  { id: 'p1' ,
    title: "Colors",
    price: 100,
    imageSrc: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  { id: 'p2' ,
    title: "Black and white Colors",
    price: 50,
    imageSrc: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  { id: 'p3' ,
    title: "Yellow and Black Colors",
    price: 70,
    imageSrc: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  { id: 'p4',
    title: "Blue Color",
    price: 100,
    imageSrc: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

// const productsList = productsArr.map((product) => {
//   return (
//     <Col key={product.id}>
//       <ProductCard item={product}></ProductCard>
//     </Col>
//   );
// });

function App() {
  const[cartVisibility , setCartVisibility] = useState(false)
  const[orderList , setOrderList] = useState([])

  const ctxObj = {
    productsList:productsArr,
    cartVisibility:cartVisibility,
    setCartVisibility:setCartVisibility,
    orderList:orderList ,
    setOrderList:setOrderList
  }


  return (
    <CartContext.Provider value = {ctxObj}>
      <RouterProvider router={router}/>
    </CartContext.Provider>
  );
}

export default App;