export default function calculateTimeToRead(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(" ").length;
    return Math.ceil(words / wordsPerMinute);
}