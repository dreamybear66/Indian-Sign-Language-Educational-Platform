/**
 * Supported Sentence Matching Engine
 * 
 * Rules:
 * 1. Exact match only.
 * 2. Case-sensitive (Glosses are always UPPERCASE).
 * 3. No partial matching or fuzzy logic.
 */

/**
 * In-memory vocabulary of all 2000+ signs from the WLASL dataset.
 * This allows the interpreter to recognize any word found in the dataset.
 */
export const SUPPORTED_VOCABULARY = new Set([
    "BOOK", "DRINK", "COMPUTER", "BEFORE", "CHAIR", "GO", "CLOTHES", "WHO", "CANDY", "COUSIN",
    "DEAF", "FINE", "HELP", "NO", "THIN", "WALK", "YEAR", "YES", "ALL", "BLACK", "COOL",
    "FINISH", "HOT", "LIKE", "MANY", "MOTHER", "NOW", "ORANGE", "TABLE", "THANKSGIVING", "WHAT",
    "WOMAN", "BED", "BLUE", "BOWLING", "CAN", "DOG", "FAMILY", "FISH", "GRADUATE", "HAT",
    "HEARING", "KISS", "LANGUAGE", "LATER", "MAN", "SHIRT", "STUDY", "TALL", "WHITE", "WRONG",
    "ACCIDENT", "APPLE", "BIRD", "CHANGE", "COLOR", "CORN", "COW", "DANCE", "DARK", "DOCTOR",
    "EAT", "ENJOY", "FORGET", "GIVE", "LAST", "MEET", "PINK", "PIZZA", "PLAY", "SCHOOL",
    "SECRETARY", "SHORT", "TIME", "WANT", "WORK", "AFRICA", "BASKETBALL", "BIRTHDAY", "BROWN", "BUT",
    "CHEAT", "CITY", "COOK", "DECIDE", "FULL", "HOW", "JACKET", "LETTER", "MEDICINE", "NEED",
    "PAINT", "PAPER", "PULL", "PURPLE", "RIGHT", "SAME", "SON", "TELL", "THURSDAY", "VISIT",
    "WAIT", "WATER", "WIFE", "YELLOW", "BACKPACK", "BAR", "BROTHER", "CAT", "CHECK", "CLASS",
    "CRY", "DIFFERENT", "DOOR", "GREEN", "HAIR", "HAVE", "HEADACHE", "INFORM", "KNIFE", "LAUGH",
    "LEARN", "MOVIE", "RABBIT", "READ", "RED", "ROOM", "RUN", "SHOW", "SICK", "SNOW",
    "TAKE", "TEA", "TEACHER", "WEEK", "WHY", "WITH", "WRITE", "YESTERDAY", "AGAIN", "BAD",
    "BALL", "BATHROOM", "BLANKET", "BUY", "CALL", "COFFEE", "COLD", "COLLEGE", "COPY", "CUTE",
    "DAUGHTER", "EXAMPLE", "FAR", "FIRST", "FRIEND", "GOOD", "HAPPY", "HOME", "KNOW", "LATE",
    "LEAVE", "LIST", "LOSE", "NAME", "OLD", "PERSON", "POLICE", "PROBLEM", "REMEMBER", "SHARE",
    "SOON", "STAY", "SUNDAY", "TEST", "TIRED", "TRADE", "TRAVEL", "WINDOW", "YOU", "ABOUT",
    "APPROVE", "ARRIVE", "BALANCE", "BANANA", "BEARD", "BECAUSE", "BOY", "BUSINESS", "CAREFUL", "CENTER",
    "CHAT", "CHILDREN", "CHRISTMAS", "CLOCK", "CLOSE", "CONVINCE", "COUNTRY", "CRASH", "DAY", "DISCUSS",
    "DRESS", "DRIVE", "DROP", "FAT", "FEEL", "FOOTBALL", "FUTURE", "GAME", "GIRL", "GOVERNMENT",
    "HEAR", "HERE", "HOPE", "HOUSE", "HUSBAND", "INTEREST", "JOIN", "LIGHT", "LIVE", "MAKE",
    "MEAN", "MORE", "MOST", "MUSIC", "NEW", "NONE", "OFFICE", "ORDER", "PANTS", "PARTY",
    "PAST", "PENCIL", "PLAN", "PLEASE", "PRACTICE", "PRESIDENT", "RESTAURANT", "RIDE", "RUSSIA", "SALT",
    "SANDWICH", "SIGN", "SINCE", "SMALL", "SOME", "SOUTH", "STUDENT", "TEACH", "THEORY", "TOMATO",
    "TRAIN", "UGLY", "WAR", "WHERE", "YOUR", "ALWAYS", "ANIMAL", "ARGUE", "BABY", "BACK",
    "BAKE", "BATH", "BEHIND", "BRING", "CATCH", "CEREAL", "CHAMPION", "CHEESE", "COUGH", "CRAZY",
    "DELAY", "DELICIOUS", "DISAPPEAR", "DIVORCE", "DRAW", "EAST", "EASY", "EGG", "ENVIRONMENT", "FATHER",
    "FAULT", "FLOWER", "FRIENDLY", "GLASSES", "HALLOWEEN", "HARD", "HEART", "HOUR", "HUMBLE", "HURRY",
    "IMPROVE", "INTERNET", "JUMP", "KILL", "LAW", "MATCH", "MEAT", "MILK", "MONEY", "MONTH",
    "MOON", "MOVE", "NEAR", "NEPHEW", "NICE", "NIECE", "NOON", "NORTH", "NOT", "NURSE",
    "OFF", "OK", "PATIENT", "PAY", "PERSPECTIVE", "POTATO", "SAD", "SATURDAY", "SAVE", "SCISSORS",
    "SECRET", "SHOES", "SHOP", "SILLY", "SISTER", "SLEEP", "SORRY", "STRAIGHT", "SWEET", "TALK",
    "TEMPERATURE", "TENT", "THANK YOU", "THINK", "THROW", "TODAY", "TRAFFIC", "UNDERSTAND", "USE", "VOICE",
    "VOMIT", "VOTE", "WEDNESDAY", "WEST", "WET", "WHEN", "WHICH", "WIN", "WORD", "AFTERNOON",
    "AGE", "ALONE", "APPOINTMENT", "AUSTRALIA", "AVOID", "BALLOON", "BASEMENT", "BEAR", "BELIEVE", "BETTER",
    "BLIND", "BORED", "BOWL", "BOX", "BRACELET", "BREAD", "CAFETERIA", "CAR", "CHICKEN", "CHILD",
    "CHOOSE", "CHURCH", "COOKIE", "CUP", "CUT", "DECORATE", "DEEP", "DEER", "DENTIST", "DIRTY",
    "DIVE", "DOWN", "DRY", "EAR", "EARN", "EARRING", "ELEPHANT", "ENGLISH", "ESCAPE", "EXPENSIVE",
    "EXPLAIN", "FAST", "FIGHT", "FIND", "FISHING", "FLOOR", "FLY", "FOLLOW", "FROM", "GET",
    "HAPPEN", "HELLO", "HIT", "HOSPITAL", "IDEA", "IMPORTANT", "INVESTIGATE", "JAPAN", "JEALOUS", "KING",
    "KITCHEN", "LARGE", "LAST YEAR", "LEMON", "LETTUCE", "MARRY", "MEETING", "MINUTE", "MIRROR", "MISS",
    "MONKEY", "MORNING", "MOTORCYCLE", "NECKLACE", "NEVER", "NEWSPAPER", "NIGHT", "ONION", "PEOPLE", "PEPPER",
    "PHONE", "PICTURE", "PLUS", "POINT", "POOR", "POSSIBLE", "QUIET", "RAIN", "READY", "RESEARCH",
    "SCARED", "SCIENCE", "SCORE", "SENTENCE", "SHAPE", "SIT", "SLOW", "SNAKE", "SOAP", "SODA",
    "SPEECH", "STAR", "STINK", "STRUGGLE", "STUBBORN", "SUNSET", "SURGERY", "THERE", "TIGER", "TOAST",
    "TOILET", "TOMORROW", "TOWN", "TRANSFER", "TREE", "TRUCK", "UNCLE", "VACATION", "WEATHER", "WEEKEND",
    "ACCEPT", "ADULT", "AFTER", "AGO", "ALLOW", "AMERICA", "ANGEL", "ANSWER", "ANY", "AREA",
    "ART", "ASL", "AUNT", "AWFUL", "AWKWARD", "BACON", "BARK", "BEDROOM", "BEER", "BELT",
    "BIG", "BITTER", "BOTH", "CAKE", "CALIFORNIA", "CANADA", "CARROT", "CAUSE", "CHALLENGE", "CHEAP",
    "CHOCOLATE", "CLEAN", "CLOUD", "COMPARE", "COMPLEX", "CONTACT", "CONTINUE", "CORNER", "CORRECT", "CURSE",
    "DEAD", "DEMAND", "DEPEND", "DESERT", "DESK", "DEVELOP", "DICTIONARY", "DOLL", "DUTY", "EASTER",
    "EGYPT", "ELEVATOR", "EMAIL", "END", "ENTER", "EUROPE", "EVENT", "EXCHANGE", "EXPERIENCE", "FACE",
    "FAIL", "FEED", "FEW", "FLAG", "FOOD", "FOR", "FORM", "FREEZE", "FRIDAY", "FRONT",
    "GIRAFFE", "GOD", "GRAMMAR", "GRANDFATHER", "GREAT", "GREECE", "GUESS", "GUITAR", "HAMMER", "HELICOPTER",
    "HIGH", "HISTORY", "HUNGRY", "HURT", "INTRODUCE", "INVEST", "LAZY", "LIBRARY", "LIE", "LOBSTER",
    "LOVE", "LUCKY", "MAGAZINE", "MEASURE", "MICROWAVE", "MY", "NEIGHBOR", "NUMBER", "ONE", "OUTSIDE",
    "PEACH", "PIG", "POLITE", "POSTPONE", "POWER", "PRESENT", "PRICE", "PRISON", "PUSH", "RACCOON",
    "REALLY", "REASON", "RELIGION", "RESPECT", "RULE", "SALAD", "SCHEDULE", "SELL", "SERIOUS", "SHOWER",
    "SINGLE", "SMART", "SMILE", "SOFT", "SOUND", "SOUP", "SPAIN", "SPRAY", "SQUIRREL", "STOMACH",
    "STORY", "STRANGE", "STREET", "STRESS", "STRICT", "STRONG", "SUGAR", "SUMMER", "SUSPECT", "SWEETHEART",
    "TEASE", "THAT", "THEMSELVES", "THERAPY", "THIRSTY", "TICKET", "TOP", "TUESDAY", "TURKEY", "UNIVERSITY",
    "UNTIL", "WATCH", "WEAK", "WEDDING", "WILL", "WIND", "WORLD", "WORRY", "WOW", "YOUNG",
    "I"
]);

/**
 * Matches a gloss string against the vocabulary.
 * If all words in the gloss are found in the WLASL dataset, it returns them.
 * 
 * @param gloss - The generated ISL gloss string (uppercase).
 * @returns string[] - The array of signs to play if matched.
 * @returns null - If any word is not supported.
 */
export const matchSentence = (gloss: string): string[] | null => {
    if (!gloss) return null;

    const words = gloss.trim().split(/\s+/);

    // Check if every word in the gloss exists in our supported vocabulary
    const allWordsValid = words.every(word => SUPPORTED_VOCABULARY.has(word));

    if (allWordsValid && words.length > 0) {
        return words;
    }

    return null;
};

/**
 * Returns a list of example supported sentences for display
 */
export const getSupportedSentencesList = (): string[] => {
    return [
        "Hello",
        "Nice to meet you",
        "What is your name",
        "Good morning",
        "I like computer",
        "Where is the library"
    ];
};
