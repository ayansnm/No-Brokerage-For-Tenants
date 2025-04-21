import React, { useRef, useState } from 'react'
import Sidebar from '../../components/Fields/Sidebar'
import Navbar from '../../components/Fields/Navbar'
import PropertyCard from '../../components/Cards/PropertyCard'
import PriceRangeSlider from '../../components/Fields/PriceRangeSelector'
import { CiFilter, CiSearch } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { MdArrowOutward, MdOutlineSort } from "react-icons/md";
import notfound from "../../assets/notfound.png";
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import { IoClose } from "react-icons/io5";

const AllProperties = () => {
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const dropdownRef = useRef();
    const [filter, setFilter] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <>
            <div className="flex min-h-screen bg-[#FAFAFA] poppins-regular">
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1">
                    <Navbar />
                    {/* Mobile Filter Button - Only visible on mobile */}
                    <div className="md:hidden flex justify-center px-3">
                        <button onClick={() => setFilterModalOpen(true)} className="w-full bg-white border border-[#D4D4D4] rounded-lg py-2 flex items-center justify-center gap-2 shadow-sm">
                            <CiFilter size={20} />
                            <span className="poppins-medium">Filter Properties</span>
                        </button>
                    </div>
                    <div className="w-full flex justify-center p-3">
                        <div className="w-full md:w-[90vw] lg:w-[75vw] flex flex-col md:flex-row gap-4">

                            {/* Left Section */}
                            <div className="w-full md:w-2/3 flex flex-col gap-4">
                                {/* Search + Sort */}
                                <div className="flex flex-row justify-between">
                                    {/* Search input */}
                                    <div className="mt-3 w-[66%] sm:w-[47%] flex flex-row items-center px-2 bg-white border rounded-lg py-1 border-[#e7e4e7] focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all">
                                        <FiSearch size={21} color="#7f7f7f" />
                                        <input type="text" className="p-2 py-1 outline-none w-full" placeholder="Search..." />
                                    </div>

                                    {/* Sort dropdown */}
                                    <div className="mt-3 w-[32%] sm:w-[28%] bg-white border rounded-lg border-[#e7e4e7] text-[#7f7f7f] pr-2 flex flex-row items-center px-2 focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all">
                                        <MdOutlineSort size={25} className="mr-1 text-[#7f7f7f]" />
                                        <select className="w-full px-1 py-2 outline-none border-none bg-transparent rounded-lg transition-all">
                                            <option value="">Sort</option>
                                            <option value="asc">Ascending</option>
                                            <option value="desc">Descending</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Property Cards */}
                                <div className="flex flex-col gap-4 mt-2">
                                    <PropertyCard />
                                    <PropertyCard />
                                    <PropertyCard />
                                </div>
                            </div>
                            {/* Right Section - 1/3 width - Hidden on mobile */}
                            <div className="hidden md:block md:w-1/3 bg-white rounded-2xl border border-[#D4d4d4] shadow-sm">
                                <p className="text-lg flex gap-2 pt-4 px-4 flex-row items-center font-semibold text-gray-700">
                                    <CiFilter size={25} /> Filter
                                </p>
                                <hr className="mt-4 text-gray-300" />
                                <div className="p-4">
                                    <div>
                                        <AnimatedRadioButtons
                                            label="Floor"
                                            name="floor"
                                            options={[
                                                { label: "Ground", value: "Ground" },
                                                { label: "First", value: "First" },
                                                { label: "Second", value: "Second" },
                                                { label: "Third", value: "Third" },
                                                { label: "Fourth", value: "Fourth" },
                                            ]}
                                            selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                            value={filter.floor}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <PriceRangeSlider value={filter.priceRange} onChange={(range) => setFilter((prev) => ({ ...prev, priceRange: range }))} />
                                    </div>
                                    <div className="mt-3">
                                        <AnimatedRadioButtons
                                            label="Category"
                                            name="type"
                                            options={[
                                                { value: "House", label: "House" },
                                                { value: "Bunglow", label: "Bunglow" },
                                                { value: "Flat", label: "Flat" },
                                                { value: "Office", label: "Office" },
                                                { value: "Shop", label: "Shop" },
                                            ]}
                                            selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                            value={filter.type}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <AnimatedRadioButtons
                                            label="Format"
                                            name="format"
                                            options={[
                                                { label: "1BHK", value: "1BHK" },
                                                { label: "2BHK", value: "2BHK" },
                                                { label: "3BHK", value: "3BHK" },
                                                { label: "4BHK", value: "4BHK" },
                                            ]}
                                            selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                            value={filter.format}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <AnimatedRadioButtons
                                            label="Size Type"
                                            name="sizetype"
                                            options={[
                                                { label: "sqft", value: "sqft" },
                                                { label: "Vigha", value: "vigha" },
                                                { label: "SqYard", value: "sqyard" },
                                            ]}
                                            selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                            value={filter.sizetype}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <AnimatedRadioButtons
                                            label="Furnished"
                                            name="furnished"
                                            options={[
                                                { label: "Un Furnished", value: "any" },
                                                { label: "Fully", value: "fully-furnished" },
                                                { label: "Semi", value: "semi-furnished" },
                                            ]}
                                            selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                            value={filter.furnished}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mt-3 flex flex-row gap-2">
                                        <AnimatedButton text={"Filter"} />
                                        <AnimatedButton text={"Clear"} otherStyles={"bg-gray-200 text-black"} />
                                    </div>
                                </div>
                            </div>
                            {/* Filter Modal - Only for mobile */}
                            {filterModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end md:hidden">
                                    <div className="bg-white w-full max-w-md h-full overflow-y-auto px-4">
                                        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                                            <p className="text-lg font-semibold flex items-center gap-2">
                                                <CiFilter size={25} /> Filter Properties
                                            </p>
                                            <button onClick={() => setFilterModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                                                <IoClose size={24} />
                                            </button>
                                        </div>

                                        <div className="p-4">
                                            <div>
                                                <AnimatedRadioButtons
                                                    label="Floor"
                                                    name="floor"
                                                    options={[
                                                        { label: "Ground", value: "Ground" },
                                                        { label: "First", value: "First" },
                                                        { label: "Second", value: "Second" },
                                                        { label: "Third", value: "Third" },
                                                        { label: "Fourth", value: "Fourth" },
                                                    ]}
                                                    selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                                    value={filter.floor}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <PriceRangeSlider value={filter.priceRange} onChange={(range) => setFilter((prev) => ({ ...prev, priceRange: range }))} />
                                            </div>
                                            <div className="mt-3">
                                                <AnimatedRadioButtons
                                                    label="Category"
                                                    name="type"
                                                    options={[
                                                        { value: "House", label: "House" },
                                                        { value: "Bunglow", label: "Bunglow" },
                                                        { value: "Flat", label: "Flat" },
                                                        { value: "Office", label: "Office" },
                                                        { value: "Shop", label: "Shop" },
                                                    ]}
                                                    selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                                    value={filter.type}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <AnimatedRadioButtons
                                                    label="Format"
                                                    name="format"
                                                    options={[
                                                        { label: "1BHK", value: "1BHK" },
                                                        { label: "2BHK", value: "2BHK" },
                                                        { label: "3BHK", value: "3BHK" },
                                                        { label: "4BHK", value: "4BHK" },
                                                    ]}
                                                    selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                                    value={filter.format}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <AnimatedRadioButtons
                                                    label="Size Type"
                                                    name="sizetype"
                                                    options={[
                                                        { label: "sqft", value: "sqft" },
                                                        { label: "Vigha", value: "vigha" },
                                                        { label: "SqYard", value: "sqyard" },
                                                    ]}
                                                    selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                                    value={filter.sizetype}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <AnimatedRadioButtons
                                                    label="Furnished"
                                                    name="furnished"
                                                    options={[
                                                        { label: "Un Furnished", value: "any" },
                                                        { label: "Fully", value: "fully-furnished" },
                                                        { label: "Semi", value: "semi-furnished" },
                                                    ]}
                                                    selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                                                    value={filter.furnished}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mt-6 flex flex-row gap-2 sticky bottom-0 bg-white py-3 border-t">
                                                <AnimatedButton text={"Apply Filters"} onClick={() => setFilterModalOpen(false)} fullWidth />
                                                <AnimatedButton text={"Clear All"} otherStyles={"bg-red-200"} fullWidth />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllProperties
