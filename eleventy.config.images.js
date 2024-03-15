const path = require("path");
const fs = require("fs/promises");

const eleventyImage = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes, page) {
	const absPath = relativeToInputPath(page.inputPath, src);

	const stats = await fs.stat(absPath);
	const mtime = new Date(stats.mtime);

	const timePath = `${mtime.getFullYear()}-${(mtime.getMonth() + 1)
		.toString()
		.padStart(2, "0")}`;

	const metadata = await eleventyImage(absPath, {
		widths: [640, 768, 1024],
		formats: ["jpeg"],
		outputDir: `docs/img/${timePath}`,
		urlPath: `/img/${timePath}`,
		filenameFormat: function (id, src, width, format, options) {
			const extension = path.extname(src);
			const name = path.basename(src, extension);
			return `${name}-${width}w.${format}`;
		},
	});

	const imageAttributes = {
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};
	return eleventyImage.generateHTML(metadata, imageAttributes);
}

function relativeToInputPath(inputPath, relativeFilePath) {
	let split = inputPath.split("/");
	split.pop();

	return path.resolve(split.join(path.sep), relativeFilePath);
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addLiquidShortcode("image", imageShortcode);
};
