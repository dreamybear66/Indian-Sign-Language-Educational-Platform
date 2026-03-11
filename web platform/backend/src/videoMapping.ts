// Simple mapping of common words to video IDs from the WLASL dataset
// Video files are named like 00335.mp4, 00336.mp4, etc.
// This is a basic mapping - expand as needed

export const wordToVideoId: Record<string, string> = {
    // Common greetings and phrases
    'hello': '27173',
    'hi': '27173',
    'goodbye': '00336',
    'bye': '00336',
    'thanks': '00338',
    'thank': '00338',
    'you': '00339',
    'please': '00341',
    'sorry': '00376',
    'yes': '00377',
    'no': '00381',
    'ok': '00382',
    'okay': '00382',

    // Common words
    'i': '00384',
    'me': '00384',
    'my': '00414',
    'name': '00415',
    'what': '00416',
    'how': '00421',
    'when': '00426',
    'where': '00430',
    'who': '00431',
    'why': '00433',
    'good': '00435',
    'bad': '00583',
    'happy': '00584',
    'sad': '00585',
    'like': '00586',
    'love': '00592',
    'want': '00593',
    'need': '00594',
    'help': '00597',
    'go': '00599',
    'come': '00600',
    'eat': '00603',
    'drink': '00623',
    'sleep': '00624',
    'work': '00625',
    'play': '00626',
    'study': '00627',
    'learn': '00628',
    'teach': '00629',
    'read': '00631',
    'write': '00632',
    'speak': '00633',
    'listen': '00634',
    'see': '00639',
    'hear': '00663',
    'feel': '00664',
    'think': '00666',
    'know': '00668',
    'understand': '00689',
    'remember': '00690',
    'forget': '00692',
    'computer': '00694',
};

// Helper function to get video ID for a word
export function getVideoId(word: string): string | null {
    const normalizedWord = word.toLowerCase().trim();
    return wordToVideoId[normalizedWord] || null;
}
