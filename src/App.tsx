import React, { useEffect } from 'react';
import styles from './App.module.css';
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrder } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector, useAppDispatch } from './redux/hooks';
import { getShoppingCart } from './redux/shoppingCart/slice';



const PrivateRoute = ({ children }) => {
  const jwt = useSelector(s => s.user.token)
  return jwt ? children : <Navigate to="/signin" />  //真实项目中还需要发送给后端解析并判断token是否有效
}

function App() {

  const jwt = useSelector(s=>s.user.token)
  const dispatch = useAppDispatch()

  useEffect(() =>{
    if(jwt){
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/detail/:touristRouteId' element={<DetailPage />} />
          <Route path='/search/:keywords' element={<SearchPage />} />
          <Route path='/shoppingCart' element={
            <PrivateRoute>
              <ShoppingCartPage />
              <PlaceOrder />
            </PrivateRoute>
          } />
          {/*当页面url不存在时 输出以下页面 */}
          <Route path='*' element={<h1>404 not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

