const { createUploadthing } = require("uploadthing/express");
const { createUploadthingExpressHandler } = require("uploadthing/express");
const f = createUploadthing();

const auth = (req, res) => ({ id: "fakeId" });

const uploadRouter = {
  videoAndImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 6,
    },
    video: {
      maxFileSize: "9MB",
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),

  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, res }) => {
      // This code runs on your server before upload
      const user = await auth(req, res);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      console.log("Here");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata, metadata.userId);

      console.log("file url", file, file.url);
    }),
};

exports.uploadThingUploads = createUploadthingExpressHandler({
  router: uploadRouter,
});
