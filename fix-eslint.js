const fs = require('fs');
const path = require('path');

// Files to fix with specific replacements
const fixes = [
  {
    file: 'src/app/careers/page.tsx',
    find: "don't",
    replace: "don&rsquo;t"
  },
  {
    file: 'src/app/contact/page.tsx',
    find: "we'll", 
    replace: "we&rsquo;ll"
  },
  {
    file: 'src/components/ContactForm.tsx',
    find: "we'll",
    replace: "we&rsquo;ll"
  },
  {
    file: 'src/components/TalentPoolForm.tsx',
    find: "we'll",
    replace: "we&rsquo;ll"
  },
  {
    file: 'src/components/TalentPoolForm.tsx', 
    find: "you'll",
    replace: "you&rsquo;ll"
  },
  {
    file: 'src/components/TestimonialsCarousel.tsx',
    find: "won't",
    replace: "won&rsquo;t"
  }
];

fixes.forEach(({ file, find, replace }) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(new RegExp(find, 'g'), replace);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
});