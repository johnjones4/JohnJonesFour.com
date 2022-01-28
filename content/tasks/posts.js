const fs = require('fs/promises');
const path = require('path')
const matter = require('gray-matter');
const marked = require('marked')

module.exports = async (workdir, outdir) => {
  console.log('Parsing posts ...')
  const postsDir = path.join(workdir, 'posts')
  const postsOutDir = path.join(outdir, 'posts')
  await fs.mkdir(postsOutDir, { recursive: true})
  const files = (await fs.readdir(postsDir)).filter(f => f.endsWith('.md'))
  const metadata = []
  for (const file of files) {
    console.log(`  - Parsing ${file}`)
    const filePath = path.join(postsDir, file)
    const post = matter(await fs.readFile(filePath))
    const content = marked.parse(post.content)
    const filename = file.replace('.md', '.html')
    const contentFilePath = path.join(postsOutDir, filename)
    await fs.writeFile(contentFilePath, content)

    metadata.push({
      ... post.data,
      filename
    })
  }

  await fs.writeFile(path.join(postsOutDir, 'metadata.json'), JSON.stringify(metadata))
}
