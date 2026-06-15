const pluginRss = require("@11ty/eleventy-plugin-rss");

const pluginImages = require("./eleventy.config.images.js");
const pluginDrafts = require("./eleventy.config.drafts.js");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/css/");
	eleventyConfig.addPassthroughCopy("./favicon.png");
	eleventyConfig.addPassthroughCopy("src/logo.png");
	eleventyConfig.addPassthroughCopy("src/certs/");
	eleventyConfig.addPassthroughCopy({
		"src/data/schedule.json": "schedule.json",
	});

	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);

	eleventyConfig.addCollection("tagList", (collections) => {
		const tags = collections
			.getAll()
			.reduce((tags, item) => tags.concat(item.data.tags), [])
			.filter((tag) => !!tag)
			.filter((tag) => tag !== "post")
			.sort();
		return Array.from(new Set(tags));
	});

	return {
		dir: {
			input: "src/pages",
			includes: "../includes",
			layouts: "../layouts",
			data: "../data",
			output: "docs",
		},
		templateFormats: ["html", "liquid", "md", "njk"],
	};
};
