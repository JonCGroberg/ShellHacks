import { useState } from 'react';

const useSubmitCards = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitCards = async (userId: string, cardArray: { word: string; proficiency: string | null }[], booleanArray: boolean[]) => {
        setIsLoading(true);
        setError(null);

        const requestBody = {
            user_id: userId,
            card_array: cardArray,
            boolean_array: booleanArray
        };

        try {
            const response = await fetch('http://3.147.36.237:3000/api/user/pcard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to submit cards');
            }

            const result = await response.json();
            console.log('Cards submitted successfully:', result);
        } catch (err) {
            setError('An error occurred while submitting cards');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { submitCards, isLoading, error };
};

export default useSubmitCards;
