import React, { useEffect, useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const fitlerData = [
    {
        fitlerType: "Location", // Ensure this matches exactly
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry", // Match this key with your job filters in Jobs component
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary", // Match this key with the salary field in your job data
        array: ["1-5lakh", "6-10lakh", "10-30lakh"]
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();

    // Handle selection changes for checkboxes
    const changeHandler = (filterType, value) => {
        setSelectedFilters((prev) => {
            const currentSelection = prev[filterType] || [];
            const updatedSelection = currentSelection.includes(value)
                ? currentSelection.filter((item) => item !== value) // Deselect if already selected
                : [...currentSelection, value]; // Add to selection if not already selected

            console.log('Updated Filters:', {
                ...prev,
                [filterType]: updatedSelection,
            }); // Debugging line

            return {
                ...prev,
                [filterType]: updatedSelection,
            };
        });
    };

    // Clear all selections
    const clearSelectionHandler = () => {
        setSelectedFilters({});
        dispatch(setSearchedQuery({})); // Clear the search query in Redux
    };

    useEffect(() => {
        // Dispatch selected filters to Redux store
        console.log('Dispatching Selected Filters:', selectedFilters); // Debugging line
        dispatch(setSearchedQuery(selectedFilters));
    }, [selectedFilters]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />

            {
                fitlerData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                                        <Checkbox
                                            checked={selectedFilters[data.fitlerType]?.includes(item) || false}
                                            id={itemId}
                                            onCheckedChange={() => changeHandler(data.fitlerType, item)}
                                        />
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                );
                            })
                        }
                    </div>
                ))
            }

            {/* Add Clear Selection Button */}
            <button
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded"
                onClick={clearSelectionHandler}
            >
                Clear Selection
            </button>
        </div>
    );
};

export default FilterCard;
