import { useEffect, useState } from "react";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const SideBar = () => {

  const [categories,setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trends",
    "shoes",
    "shirt"
  ]);

  useEffect( () => {
    const fetchCategories = async () => {
      try{
        const response = await fetch('https://dummyjson.com/products');
        const data: FetchResponse = await response.json();
        const uniqueCategory =  Array.from(
          new Set(data.products.map(product => product.category))
        );
        setCategories(uniqueCategory);
        
      }catch(error){
        console.error("Error fetching products", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl front-bold mb-10 mt-4">React Store</h1>

      <section>

        <input 
         type="text" 
         className="border-2 rounded px-2 sm:mb-0" 
         placeholder="Search product" 
        />

      </section>
      
    </div>
  )
}

export default SideBar;