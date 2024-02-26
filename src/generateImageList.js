const fs = require('fs').promises;
const path = require('path');

// Directory where your images are stored
const imagesDir = path.join(__dirname, 'img');
// Output file path
const outputFile = path.join(__dirname, 'images.js');

// Function to generate image paths
async function generateImageList() {
    try {
        const files = await fs.readdir(imagesDir);
        // Filter for image files and exclude hidden files (starting with .)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|svg)$/i.test(file) && !file.startsWith('.'));

        // Generate import statements for each image file
        const importStatements = imageFiles.map(file => {
            // Create a valid JS variable name for the import by replacing invalid characters
            const validJSName = file.replace(/[^a-zA-Z0-9]/g, '_').replace(/^(\d)/, '_$1');
            return `import ${validJSName} from './img/${file}';`;
        }).join('\n');

        // Generate a single export statement that exports all images as an array
        const exportStatements = `export const images = [${imageFiles
            .map(file => file.replace(/[^a-zA-Z0-9]/g, '_').replace(/^(\d)/, '_$1'))
            .join(', ')}];`;

        // Combine import and export statements
        const content = `${importStatements}\n\n${exportStatements}`;

        // Write the combined content to the outputFile
        await fs.writeFile(outputFile, content);
        console.log(`Image list generated successfully! (${imageFiles.length} images)`);
    } catch (err) {
        console.error('Error processing image directory:', err);
    }
}

generateImageList();
