export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ css: "assets/css" });
}

export const config = {
    dir: {
        input: "content",
        output: "public"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passThroughFileCopy: true
}