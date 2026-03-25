const [major] = process.versions.node.split('.').map(Number);

if (major < 24 || major >= 25) {
  console.error(
    [
      '',
      `Unsupported Node.js version: ${process.version}`,
      'This project is configured for Node.js 24.x on Vercel.',
      'Recommended: use the latest Node.js 24 release locally and in deployment.',
      '',
    ].join('\n')
  );
  process.exit(1);
}
