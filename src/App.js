import React, { useEffect, useRef } from "react";
import {
  useFetchExperience,
  defineComponents,
  ExperienceRoot,
} from "@contentful/experience-builder";

// we surfaced the client as the first step to give you more freedom over data fetching, which we are currently exploring
import { createClient } from "contentful";

const client = createClient({
  space: "nsz6oir036zi",
  environment: "master",
  // needs to be preview token if host = 'preview.contentful.com' and delivery token if 'cdn.contentful.com'
  accessToken: "w4_r6Zul4cl3SfoE48nDn5FEcByxhXtPZoM4310q62M",
  // optional. Set it to 'preview.contentful.com' in "preview" mode. Uses cdn.contentful.com by default
  host: "preview.contentful.com",
});

// components, which we are going to register
import { Image } from "./components/Image.tsx";
//import { Button } from "./components/Button";

// and their component definitions, which we have written in the previous step
import {
  imageComponentDefinition,
  //buttonComponentDefinition,
} from "./componentDefinitions/image.ts";

defineComponents([
  { component: Image, definition: imageComponentDefinition },
  // { component: Button, definition: buttonComponentDefinition },
]);

const ExperiencePage = () => {
  // replace with your router;
  const router = {};

  //Talk to Bilal on this
  // const locale = router.query.locale;
  // const slug = router.query.slug;

  const locale = "en-US";
  const slug = "first";
  const experienceTypeId = "dpFirst";

  const { fetchBySlug, fetchById, experience, isFetching } = useFetchExperience(
    {
      client,
      // id of the experience type (content type)
      //Talk to Bilal on this
      experienceTypeId: "dpFirst",
      // can be 'preview' or 'delivery'. By default - 'delivery'
      // use 'preview' mode to see the draft content rendered on the page you've built AND to automatically enable canvas functionality when open from the Contentful's web app
      // use 'delivery' mode to see the published content rendered on the page you've built. Delivery mode does not enable canvas functionality.
      mode: "preview", // we use "preview" mode in this example to enable canvas interactions in Contentful web app and be able to build our experience
    }
  );

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const experience = await fetchBySlug({
          slug,
          experienceTypeId,
          locale,
        });
        if (!experience) {
          // handle 404 case
        }
      } catch (e) {
        // handle the errors
      }
    };

    //Original - Talk to Bilal on this
    // if (!experience && isFirstAttempt.current) {
    //   asyncFetch();
    //   isFirstAttempt.current = true;
    // }
    if (!experience) {
      asyncFetch();
      //isFirstAttempt.current = true;
    }
  }, [experience, slug, experienceTypeId, locale, fetchBySlug]);

  if (!experience) {
    return null;
  }

  return (
    <ExperienceRoot
      experience={experience}
      // The locale that will appear on the website first
      // You could nicely tie it to the useParam() from router or intenral state or locale manager
      // this value - en-US here is provided as an example reference
      locale="en-US"
    />
  );
};

export default ExperiencePage;
