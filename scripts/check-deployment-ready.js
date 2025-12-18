#!/usr/bin/env node

/**
 * Pre-deployment checker for Vercel
 * Verifies that the project is ready for deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking if project is Vercel-ready...\n');

let hasErrors = false;
let hasWarnings = false;

// Check 1: package.json exists and has required scripts
console.log('✓ Checking package.json...');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (!pkg.scripts.build) {
    console.error('  ❌ Missing "build" script in package.json');
    hasErrors = true;
  }
  
  if (!pkg.scripts.start) {
    console.error('  ❌ Missing "start" script in package.json');
    hasErrors = true;
  }
  
  if (!pkg.scripts.postinstall || !pkg.scripts.postinstall.includes('prisma generate')) {
    console.warn('  ⚠️  Missing "postinstall" script with "prisma generate"');
    hasWarnings = true;
  }
  
  if (!hasErrors) {
    console.log('  ✅ package.json is configured correctly\n');
  }
} catch (error) {
  console.error('  ❌ Cannot read package.json');
  hasErrors = true;
}

// Check 2: Prisma schema uses PostgreSQL
console.log('✓ Checking Prisma configuration...');
try {
  const schema = fs.readFileSync('prisma/schema.prisma', 'utf8');
  
  if (schema.includes('provider = "sqlite"')) {
    console.error('  ❌ Prisma schema uses SQLite - must use PostgreSQL for Vercel');
    console.error('     Change to: provider = "postgresql"');
    hasErrors = true;
  } else if (schema.includes('provider = "postgresql"')) {
    console.log('  ✅ Prisma schema uses PostgreSQL\n');
  } else {
    console.warn('  ⚠️  Cannot determine database provider in schema.prisma');
    hasWarnings = true;
  }
} catch (error) {
  console.error('  ❌ Cannot read prisma/schema.prisma');
  hasErrors = true;
}

// Check 3: .gitignore includes .env files
console.log('✓ Checking .gitignore...');
try {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  
  if (!gitignore.includes('.env')) {
    console.error('  ❌ .gitignore does not include .env files');
    hasErrors = true;
  } else {
    console.log('  ✅ .gitignore is configured correctly\n');
  }
} catch (error) {
  console.warn('  ⚠️  .gitignore not found');
  hasWarnings = true;
}

// Check 4: Environment variable templates exist
console.log('✓ Checking environment templates...');
const hasEnvExample = fs.existsSync('.env.example') || 
                      fs.existsSync('.env.production.example') ||
                      fs.existsSync('ENV_SETUP.md');

if (!hasEnvExample) {
  console.warn('  ⚠️  No environment variable template found');
  console.warn('     Consider creating .env.example');
  hasWarnings = true;
} else {
  console.log('  ✅ Environment templates found\n');
}

// Check 5: next.config exists
console.log('✓ Checking Next.js configuration...');
const hasNextConfig = fs.existsSync('next.config.js') || 
                      fs.existsSync('next.config.mjs');

if (!hasNextConfig) {
  console.error('  ❌ next.config file not found');
  hasErrors = true;
} else {
  console.log('  ✅ Next.js configuration found\n');
}

// Check 6: Deployment documentation
console.log('✓ Checking deployment documentation...');
const hasDeployDocs = fs.existsSync('DEPLOYMENT.md') || 
                      fs.existsSync('QUICK_DEPLOY.md');

if (!hasDeployDocs) {
  console.warn('  ⚠️  No deployment documentation found');
  hasWarnings = true;
} else {
  console.log('  ✅ Deployment documentation found\n');
}

// Check 7: Critical files exist
console.log('✓ Checking critical files...');
const criticalFiles = [
  'app/layout.tsx',
  'app/page.tsx',
  'lib/prisma.ts',
];

let allCriticalExist = true;
criticalFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`  ❌ Missing critical file: ${file}`);
    allCriticalExist = false;
    hasErrors = true;
  }
});

if (allCriticalExist) {
  console.log('  ✅ All critical files exist\n');
}

// Final summary
console.log('═══════════════════════════════════════════');
if (hasErrors) {
  console.log('❌ DEPLOYMENT BLOCKED - Please fix errors above');
  console.log('═══════════════════════════════════════════\n');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  DEPLOYMENT READY WITH WARNINGS');
  console.log('   Review warnings above for best practices');
  console.log('═══════════════════════════════════════════\n');
  process.exit(0);
} else {
  console.log('✅ PROJECT IS VERCEL-READY!');
  console.log('═══════════════════════════════════════════\n');
  console.log('Next steps:');
  console.log('1. Set up PostgreSQL database');
  console.log('2. Push code to GitHub');
  console.log('3. Import to Vercel');
  console.log('4. Add environment variables');
  console.log('5. Deploy!\n');
  console.log('See QUICK_DEPLOY.md or DEPLOYMENT.md for detailed instructions.\n');
  process.exit(0);
}

