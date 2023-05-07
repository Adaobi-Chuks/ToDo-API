const PORT = process.env.PORT || 9871;
const SECRET = process.env.SECRET!;
const MAXAGE = 3 * 24 * 60 * 60;
const SALTROUNDS = 10;

const MESSAGES = {
    DATABASE: {
        CONNECTED: "MongoDB is connected",
        ERROR: "There was an error while connecting to the database."
    },
    USER: {
        CREATED: "User created successfully.",
        DUPLICATE_EMAIL: "Email already exist.",
        DUPLICATE_PHONENUMBER: "Phonenumber already exist.",
        DUPLICATE_IMAGE: "Image already belongs to a registered user.",
        INVALID_USERNAME: "UserName does not exist.",
        INVALID_PASSWORD: "Incorrect password.",
        LOGGEDIN: "Successfully logged in",
        INVALID_ID: "User ID does not exist.",
        // NOT_ID: "User ID is not a valid ID.",
        // UPDATED: "User updated successfully.",
        // FETCHED: "User fetched successfully",
        // FETCHEDALL: "All available users fetched successfully",
        // DELETED: "User deleted successfully",
        // LOGGEDOUT: "Successfully logged out"
    },
    AUTH: {
        TOKENERROR: 'Access Denied: Token not provided',
        INVALIDTOKEN: 'Access Denied: Invalid token',
        DENIED: 'Access Denied: Unauthorized request'
    },
};

export {
    PORT,
    SECRET,
    MAXAGE,
    MESSAGES,
    SALTROUNDS,
    // DATABASE_URI,
    // ENUM,
    // DATABASES,
};