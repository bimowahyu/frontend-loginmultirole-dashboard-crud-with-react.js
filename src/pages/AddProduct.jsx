import React, { useEffect } from 'react';
import Layout from './layout';
import FormAddProduct from '../component/FormAddProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../fitur/AuthSlice';

const AddProduct = () => {
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
    <FormAddProduct />
  </Layout>
  )
}

export default AddProduct