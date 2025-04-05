import useFavoriteDoctors from '@/hooks/useFavoriteDoctors';
import React from 'react';

const MyFavoriteDoctors = () => {
    const [favoriteDoctors, refetch, isLoading ] = useFavoriteDoctors()
    console.log(favoriteDoctors);
    return (
        <div className='my-20'>
            My Favorite doctors {favoriteDoctors.length}
        </div>
    );
};

export default MyFavoriteDoctors;