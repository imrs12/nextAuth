declare global{
    namespace NodeJS{
        interface ProcessEnv {
            MONGO_URI: string;
            JWT: string;
            DOMAIN: string;
            MAIL_USER: string;
            MAIL_PASS: string

        }
    }
}

export {}