function formatString(str: string) {
    if (str.length <= 8) {
        return str;
    }
    const start = str.slice(0, 4); 
    const end = str.slice(-4); 
    return `${start}...${end}`;
}

function formatDateDifference(isoDateString: string): string {
    const date: Date = new Date(isoDateString);
    const now: Date = new Date();
    const differenceInSeconds: number = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (differenceInSeconds < 60) {
        const secondsAgo: number = differenceInSeconds;
        return `${secondsAgo} sec${secondsAgo !== 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 3600) {
        const minutesAgo: number = Math.floor(differenceInSeconds / 60);
        return `${minutesAgo} min${minutesAgo !== 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 86400) {
        const hoursAgo: number = Math.floor(differenceInSeconds / 3600);
        return `${hoursAgo} hr${hoursAgo !== 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 604800) { // Less than 1 week
        const daysAgo: number = Math.floor(differenceInSeconds / 86400);
        return daysAgo === 1 ? 'Yesterday' : `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
    } else {
        // More than 7 days, return MM/DD/YYYY format
        const formattedDate: string = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
        return formattedDate;
    }
}

export { formatString, formatDateDifference }
