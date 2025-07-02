declare global{
    namespace NodeJS{
        interface ProcessEnv {
            MONGO_URI: string,
            JWT: string
            DOMAIN: string
        }
    }
}

export {}