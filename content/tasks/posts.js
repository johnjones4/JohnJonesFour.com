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
  files.reverse()
  const feed = []
  for (const file of files) {
    console.log(`  - Parsing ${file}`)
    const filePath = path.join(postsDir, file)
    const post = matter(await fs.readFile(filePath))
    const content = marked.parse(post.content)

    const slugParts = file.replace('.md', '').split('-')
    const [year, month, day, _] = slugParts.map(s => parseInt(s))
    const date = new Date(year, month - 1, day)
    const postPath = slugParts.slice(0, 3).join('/') + '/' + slugParts.slice(3, slugParts.length).join('-')

    const outfile = {
      ... post.data,
      date,
      content
    }
    const contentFilePath = path.join(postsOutDir, file.replace('.md', '.json'))
    await fs.writeFile(contentFilePath, JSON.stringify(outfile))

    feed.push({
      title: post.data.title,
      description: post.data.description,
      path: postPath,
      date
    })
  }

  await fs.writeFile(path.join(postsOutDir, 'feed.json'), JSON.stringify(feed))
}
