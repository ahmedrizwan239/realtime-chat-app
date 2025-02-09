export const getAllUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
