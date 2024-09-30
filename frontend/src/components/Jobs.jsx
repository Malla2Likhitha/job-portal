import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    // Function to convert salary range string to numeric values
    const parseSalaryRange = (salaryRange) => {
        // Example: "1-5lakh" => [1, 5]
        const range = salaryRange.replace('lakh', '').split('-').map(num => parseInt(num.trim(), 10));
        // console.log(range);
        
        return range.length === 1 ? [range[0], Infinity] : range;
    };

    

    useEffect(() => {
        // console.log('Searched Query:', searchedQuery); // Log searchedQuery

        // Handle the filtering based on the new structure of searchedQuery
        if (searchedQuery && Object.keys(searchedQuery).length > 0) {
            const filteredJobs = allJobs.filter((job) => {
                let isMatch = true;

                // Check for location filter match
                if (searchedQuery.Industry?.length) {
                    isMatch = job.title.includes(searchedQuery.Industry);
                }

                // Check for industry filter match
                if (isMatch && searchedQuery.Location?.length) {
                    isMatch = searchedQuery.Location.includes(job.location);
                }

                // Handle salary filter
                if (isMatch && searchedQuery.Salary?.length > 0) {
                    isMatch = searchedQuery.Salary.some(salaryRange => {
                        const [min, max] = parseSalaryRange(salaryRange);
                        const jobSalary = parseInt(job.salary, 10); // Assuming job.salary is a number or string
                        return jobSalary >= min && jobSalary <= max;
                    });
                }

                // You can also add search by job title or description as before if needed
                if (isMatch && searchedQuery.query) {
                    isMatch = job.title.toLowerCase().includes(searchedQuery.query.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchedQuery.query.toLowerCase());
                }

                return isMatch;
            });

            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Jobs;
