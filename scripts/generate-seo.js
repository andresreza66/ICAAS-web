import fs from 'fs';
import path from 'path';

const blogsContent = fs.readFileSync(path.resolve('src/data/blogs.ts'), 'utf-8');
const indexHtmlContent = fs.readFileSync(path.resolve('dist/index.html'), 'utf-8');

// Match everything inside ALL_BLOGS array
const allBlogsMatch = blogsContent.match(/const ALL_BLOGS:\s*BlogPost\[\]\s*=\s*\[([\s\S]*?)\];/);
if (!allBlogsMatch) {
  console.error("Could not find ALL_BLOGS array");
  process.exit(1);
}

const blogsString = allBlogsMatch[1];
const blogBlocks = blogsString.split(/{\s*id:/).slice(1);

for (const block of blogBlocks) {
  const slugMatch = block.match(/slug:\s*'([^']+)'/);
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const excerptMatch = block.match(/excerpt:\s*'([^']+)'/);
  const imageUrlMatch = block.match(/imageUrl:\s*([^,\n]+)/);

  if (slugMatch && titleMatch && excerptMatch && imageUrlMatch) {
    const slug = slugMatch[1];
    const title = titleMatch[1];
    const excerpt = excerptMatch[1];
    let imageUrl = imageUrlMatch[1].trim();

    // Clean up quotes and commas
    if (imageUrl.endsWith(',')) {
      imageUrl = imageUrl.slice(0, -1).trim();
    }
    if ((imageUrl.startsWith("'") && imageUrl.endsWith("'")) || (imageUrl.startsWith('"') && imageUrl.endsWith('"'))) {
      imageUrl = imageUrl.slice(1, -1);
    }

    // Resolve imported variables if needed
    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/') && !imageUrl.includes('.')) {
      const importRegex = new RegExp(`import\\s+${imageUrl}\\s+from\\s+['"]([^'"]+)['"]`);
      const importMatch = blogsContent.match(importRegex);
      if (importMatch) {
        const importPath = importMatch[1];
        const originalFilename = path.basename(importPath, path.extname(importPath));
        const extension = path.extname(importPath);
        const assetsDir = path.resolve('dist/assets');
        try {
          const files = fs.readdirSync(assetsDir);
          const matchingFile = files.find(f => f.startsWith(originalFilename) && f.endsWith(extension));
          if (matchingFile) {
            imageUrl = `/assets/${matchingFile}`;
          } else {
            console.warn(`Could not find compiled asset in dist/assets starting with ${originalFilename}`);
          }
        } catch (err) {
          console.error(`Error reading dist/assets directory:`, err);
        }
      }
    }

    if (!imageUrl.startsWith('http')) {
      imageUrl = `https://vuela-icaas.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    }

    const blogUrl = `https://vuela-icaas.com/blog/${slug}`;
    const seoTitle = `${title} | Blog ICAAS Aviación`;

    let blogHtml = indexHtmlContent
      .replace(/<title>.*?<\/title>/, `<title>${seoTitle}</title>`)
      .replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${seoTitle}" />`)
      .replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${excerpt}" />`)
      .replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${blogUrl}" />`)
      .replace(/<meta name="twitter:title" content=".*?"\s*\/>/, `<meta name="twitter:title" content="${seoTitle}" />`)
      .replace(/<meta name="twitter:description" content=".*?"\s*\/>/, `<meta name="twitter:description" content="${excerpt}" />`);
    
    // Add og:image before og:url
    if (!blogHtml.includes('property="og:image"')) {
      blogHtml = blogHtml.replace(
        /<meta property="og:url"/,
        `<meta property="og:image" content="${imageUrl}" />\n    <meta property="og:url"`
      );
      blogHtml = blogHtml.replace(
        /<meta name="twitter:description"(.*?)\/>/,
        `<meta name="twitter:description"$1/>\n    <meta name="twitter:image" content="${imageUrl}" />`
      );
    }

    const dir = path.resolve(`dist/blog/${slug}`);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.resolve(dir, 'index.html'), blogHtml);
    console.log(`Generated HTML for blog: ${slug}`);
  }
}
