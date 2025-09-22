const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function fixImagePaths() {
  console.log('🔧 Fixing favicon and icon paths only...');
  
  if (!fs.existsSync('out')) {
    console.log('❌ out/ directory not found.');
    return;
  }
  
  const htmlFiles = findHtmlFiles('out');
  let totalReplacements = 0;
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // ONLY fix href attributes that point to image files WITHOUT the base path
    // This targets: href="/favicon-32x32.png" but NOT href="/tier3topology_aws/..."
    // content = content.replace(
    //   /href="\/([^"\/][^"]*\.(png|jpg|jpeg|gif|svg|ico|webmanifest))"/gi,
    //   'href="./$1"'
    // );
    
    // // Also fix any src attributes for images that don't have the base path
    // content = content.replace(
    //   /src="\/([^"\/][^"]*\.(png|jpg|jpeg|gif|svg|ico))"/gi,
    //   'src="./$1"'
    // );
    // Fix href attributes (for <link> tags, CSS, JS, etc.)


    content = content.replace(
      /href="\/([^"\/]+\.[^"\/]+)"/gi,
      'href="./$1"'
    );

    // Fix src attributes (for <img>, <script>, etc.)
    content = content.replace(
      /src="\/([^"\/]+\.[^"\/]+)"/gi,
      'src="./$1"'
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed image paths in ${path.basename(file)}`);
      totalReplacements++;
    }
  });
  
  console.log(`🎉 Done! Modified ${totalReplacements} files`);
  
  // Show what we would change
  console.log('\n🎯 This script targets paths like:');
  console.log('  href="/favicon-32x32.png" → href="./favicon-32x32.png"');
  console.log('  href="/site.webmanifest" → href="./site.webmanifest"');
  console.log('\n✅ This script preserves paths like:');
  console.log('  href="/tier3topology_aws/./_next/static/css/..." (unchanged)');
  console.log('  src="/tier3topology_aws/./_next/static/chunks/..." (unchanged)');
}

fixImagePaths();