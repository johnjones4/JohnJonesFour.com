const tasks = require('./tasks')

const main = async (workdir, outdir) => {
  for (const task of tasks) {
    await task(workdir, outdir)
  }
}

main('./data', './outdata').catch(e => console.error(e))
