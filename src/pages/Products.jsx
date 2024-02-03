import React, {useEffect} from 'react';
import Layout from './layout';
import ProductList from '../component/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../fitur/AuthSlice';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(getMe());

  }, [dispatch]);

 useEffect(() => {
  if (isError){
    navigate("/");
  }
 }, [isError, navigate]);

  return (
    <Layout>
        <ProductList />
    </Layout>
  )
}

export default Products