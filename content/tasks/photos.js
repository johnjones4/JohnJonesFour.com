const fs = require('fs/promises');
const path = require('path')
const sharp = require('sharp')

module.exports = async (workdir, outdir) => {
  console.log('Converting photos ...')
  const photosDir = path.join(workdir, 'photos')
  const photosOutDir = path.join(outdir, 'photos')
  await fs.mkdir(photosOutDir, { recursive: true})
  const files = (await fs.readdir(photosDir)).filter(f => f.endsWith('.jpg'))
  const metadata = JSON.parse(await fs.readFile(path.join(photosDir, 'metadata.json')))

  for (const file of files) {
    console.log(`  - Converting ${file}`)

    if (!metadata.find(m => m.filename == file)) {
      throw Error(`No metadata for ${file}`)
    }

    const outputFilePath = path.join(photosOutDir, file)

    await sharp(path.join(photosDir, file))
      .resize(1024)
      .toFile(outputFilePath)
  }

  await fs.writeFile(path.join(photosOutDir, 'metadata.json'), JSON.stringify(metadata))
}
