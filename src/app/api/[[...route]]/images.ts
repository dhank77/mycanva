import unsplash from "@/lib/unsplash";
import { Hono } from "hono";
import Replicate from "replicate";
import { zValidator } from '@hono/zod-validator'
import { z } from "zod";

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
  .get("generate-image", zValidator(
    'json',
    z.object({
      prompt: z.string(),
    })
  ), async (c) => {
    const { prompt } = c.req.valid('json');

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          width: 768,
          height: 768,
          prompt: prompt,
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
        },
      }
    );

    return c.json({ data: output });
  });

export default app;
