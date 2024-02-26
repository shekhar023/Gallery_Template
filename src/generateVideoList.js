const fs = require('fs').promises;
const path = require('path');

// Directory where your videos are stored
const videosDir = path.join(__dirname, 'videos');
// Output file path
const outputFile = path.join(__dirname, 'videos.js');

// Function to generate video paths
async function generateVideoList() {
    try {
        const files = await fs.readdir(videosDir);
        // Filter for video files and exclude hidden files (starting with .)
        const videoFiles = files.filter(file => /\.(mp4|m4v|mov)$/i.test(file) && !file.startsWith('.'));

        // Generate import statements for each video file
        const importStatements = videoFiles.map(file => {
            // Create a valid JS variable name for the import by replacing invalid characters
            const variableName = `video_${file.replace(/[^a-zA-Z0-9]/g, '_').replace(/^(\d)/, '_$1')}`;
            return `import ${variableName} from './videos/${file}';`;
        }).join('\n');

        // Generate a single export statement that exports all videos as an array
        const exportStatements = `export const videoList = [${videoFiles
            .map(file => `video_${file.replace(/[^a-zA-Z0-9]/g, '_').replace(/^(\d)/, '_$1')}`)
            .join(', ')}];`;

        // Combine import and export statements
        const content = `${importStatements}\n\n${exportStatements}`;

        // Write the combined content to the outputFile
        await fs.writeFile(outputFile, content);
        console.log(`Video list generated successfully! (${videoFiles.length} videos)`);
    } catch (err) {
        console.error('Error processing video directory:', err);
    }
}

generateVideoList();
