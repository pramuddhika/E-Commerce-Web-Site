import { useState } from "react";
import { useFilter } from "./FilterContext"
import {Tally3} from "lucide-react"



const MainContent = () => {

    const { searchQuery,selectedCategory, minPrice, maxPrice, keyword} = useFilter();
    const [product, setProduct] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [currentPage,setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const itemsPerPage = 12;

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
        <div className="mb-4">

            <div className="flex flex-col sm:flex-row justify-between items-center">

                <div className="relative mb-3 mt-3">

                    <button className="border px-4 py-2 rounded-full flex items-center">
                        <Tally3 className="mr-2" />
                    </button>

                </div>

            </div>

        </div>
    </section>
  )
}

export default MainContent
