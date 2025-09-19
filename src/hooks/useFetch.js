import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setProducts, setError } from "../redux/productSlice";

const useFetch = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading());
      try {
        const res = await fetch(url);
        const data = await res.json();
        dispatch(setProducts(data.products));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [url, dispatch]);
};

export default useFetch;
