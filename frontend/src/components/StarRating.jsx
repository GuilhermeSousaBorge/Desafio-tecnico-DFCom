

export default function StarRating({ rating, maxRating = 5, size = 'md', interactive = false, onRatingChange }) {

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };
    const handleStarClick = (starValue) => {
        if (interactive && onRatingChange) {
            onRatingChange(starValue);
        }
    };

    return (
        <div className="flex gap-1">
            {[...Array(maxRating)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= rating;

                return (
                    <button
                        key={index}
                        onClick={() => handleStarClick(starValue)}
                        disabled={!interactive}
                        className={`${sizeClasses[size]} ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
                            } transition-transform duration-200`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill={isFilled ? '#fbbf24' : '#e5e7eb'}
                            stroke={isFilled ? '#f59e0b' : '#9ca3af'}
                            strokeWidth="1"
                            className="w-full h-full"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </button>
                );
            })}
        </div>
    );
}