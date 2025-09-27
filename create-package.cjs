const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Create a file to stream archive data to
const output = fs.createWriteStream('kurbologic-website.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('Archive created successfully!');
  console.log(archive.pointer() + ' total bytes');
});

// Good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

// Good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and directories, excluding unnecessary ones
const excludePatterns = [
  'node_modules',
  '.git',
  'dist',
  '.bolt',
  '*.log',
  'kurbologic-website.zip',
  'create-package.js'
];

function shouldExclude(filePath) {
  return excludePatterns.some(pattern => {
    if (pattern.includes('*')) {
      return filePath.includes(pattern.replace('*', ''));
    }
    return filePath.includes(pattern);
  });
}

function addDirectory(dirPath, archivePath = '') {
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const archiveItemPath = archivePath ? path.join(archivePath, item) : item;
    
    if (shouldExclude(fullPath)) {
      return;
    }
    
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      addDirectory(fullPath, archiveItemPath);
    } else {
      archive.file(fullPath, { name: archiveItemPath });
    }
  });
}

// Add all files from current directory
addDirectory('.');

// Finalize the archive
archive.finalize();