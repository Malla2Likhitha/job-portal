import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                // Check if searchedQuery is an object and serialize it
                const keyword = typeof searchedQuery === 'object' 
                    ? JSON.stringify(searchedQuery) 
                    : searchedQuery;

                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(keyword)}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log('Error fetching jobs:', error);
            }
        };

        if (searchedQuery) { // Only fetch if there is a search query
            fetchAllJobs();
        }
    }, [searchedQuery, dispatch]); // Add searchedQuery and dispatch to the dependency array
};

export default useGetAllJobs;
