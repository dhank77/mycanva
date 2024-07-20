import unsplash from "@/lib/unsplash";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { replicate } from "@/lib/replicate";

const DEFAULT_COUNT = 20;
const DEFAULT_COLLECTION_IDS = ["317099"];

const app = new Hono()
   .get("/", async (c) => {
      const images = await unsplash.photos.getRandom({
         count: DEFAULT_COUNT,
         collectionIds: DEFAULT_COLLECTION_IDS,
      });

      if (images.errors) {
         return c.json({ errors: "Something went wrong" }, 401);
      }

      let response = images.response;
      if (!Array.isArray(response)) {
         response = [response];
      }

      return c.json({ data: response });
   })
   .post(
      "generate-image",
      zValidator(
         "json",
         z.object({
            prompt: z.string(),
         })
      ),
      async (c) => {
         const { prompt } = c.req.valid("json");

         const output = await replicate.run(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            {
               input: {
                  aspect_ratio: "3:2",
                  output_format: "webp",
                  prompt: prompt,
                  num_outputs: 1,
                  guidance_scale: 7.5,
                  num_inference_steps: 50,
               },
            }
         );

         const result = output as Array<string>;

         return c.json({ data: result[0] });
      }
   );

export default app;
