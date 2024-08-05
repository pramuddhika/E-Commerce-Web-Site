import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const SideBar = () => {

  const {
    searchQuery,setSearchQuery,
    selectedCategory,setSelectedCategory,
    minPrice,setMinPrice,
    maxPrice,setMaxPrice,
    keyword,setKeyword
  } = useFilter();

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

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value): undefined)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined)
  }

  const handleRadioChnageCategories = (category:string) => {
    setSelectedCategory(category);
  }

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  }

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword('');
  }

  return (
    <div className="w-64 p-1 h-screen">
      <h1 className="text-2xl front-bold mb-2 mt-0">React Store</h1>

      <section>

        <input 
         type="text" 
         className="border-2 rounded px-2 sm:mb-0" 
         placeholder="Search product"
         value={searchQuery}
         onChange={ e => setSearchQuery(e.target.value)} 
        />

        <div className="flex justify-center items-center">

          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}
          />

          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />

        </div>

        {/** category section */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
         
        <section> 
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChnageCategories(category)}
                className="mr-2 w-[16px] h-[16px]"
                checked = {selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/**keywords section */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>

          <div>
            {keywords.map((keyword, index) => (
            <button 
              key={index} 
              onClick={ () => handleKeywordClick(keyword)}
              className="block mb-2 px-4 py-1 w-full text-left border rounded hover:bg-gray-200">
              {keyword.toUpperCase()}
            </button>
            ))}
          </div>

        </div>

        <button onClick={handleResetFilter} className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-1">
          Reset Filters
        </button>
        
      </section>
      
    </div>
  )
}

export default SideBar;