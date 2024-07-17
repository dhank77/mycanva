import unsplash from "@/lib/unsplash";
import { Hono } from "hono";

const DEFAULT_COUNT = 20;
const DEFAULT_COLLECTION_IDS = ["317099"];

const app = new Hono()
    .get("/", async (c) => {

        const images = await unsplash.photos.getRandom({
            count: DEFAULT_COUNT,
            collectionIds: DEFAULT_COLLECTION_IDS,
        })

        if(images.errors){
            return c.json({ errors: "Something went wrong" }, 401);
        }

        let response = images.response;
        if(!Array.isArray(response)){
            response = [response];
        }

        return c.json({ data: response });
    });

export default app;
