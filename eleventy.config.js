const pluginRss = require("@11ty/eleventy-plugin-rss");

const pluginImages = require("./eleventy.config.images.js");
const pluginDrafts = require("./eleventy.config.drafts.js");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/css/emffilms.css");
	eleventyConfig.addPassthroughCopy("./emffilms-logo-256.png");
	eleventyConfig.addPassthroughCopy("./emffilms-logo-512.png");

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
