import { generateReactHelpers } from "@uploadthing/react/hooks";

// import type { OurFileRouter } from "~/app/api/uploadthing/core";

// Here is another major problem, how to get the OurFileRouter since am using express
//    I just put any to remove the error
//       How do i add the keys in .env or will it get it automaticaly

export const { useUploadThing, uploadFiles } = generateReactHelpers<any>();
