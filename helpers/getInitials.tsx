// Converts a given team name to their initials
export default function getInitials (str) {
    const words = str.split(' ');
    let initials = words[0][0];
    for (let i = 1; i < words.length; i++) {
        if (!isNaN(words[i][0])) {
            initials += words[i][0];
        } else {
            initials += words[i][0];
        }
    }
    return initials;
}