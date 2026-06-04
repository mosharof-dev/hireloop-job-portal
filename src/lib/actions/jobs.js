 'use server'

 const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'

//  Fetch create jobs function
 export const createJob = async (newJodData) => {
    try {
        const res = await fetch(`${API_URL}/api/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJodData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};

 