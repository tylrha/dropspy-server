import fs from 'fs'
import path from 'path'

const SERVER_FOLDER_NAME = "server"
const BUILD_FOLDER_NAME = "build"
const SOURCE_FOLDER = "./src"

const rootFolder = path.join(__dirname, '..')

const finalServerFolder = path.join(rootFolder, SOURCE_FOLDER, SERVER_FOLDER_NAME, BUILD_FOLDER_NAME)
if (!fs.existsSync(finalServerFolder)) { fs.mkdirSync(finalServerFolder) }

getDirectories(SOURCE_FOLDER).filter((folder: string) => folder !== SERVER_FOLDER_NAME).forEach((folder: string) => {
  console.log(folder)
  const curBuildFolder = path.join(__dirname, '..', SOURCE_FOLDER, folder, BUILD_FOLDER_NAME)
  copyFolderRecursiveSync(curBuildFolder, finalServerFolder, folder)
})

console.log("POST-BUILD")

/* ========================================================================== */

function getDirectories(source: string) {
  if (!fs.existsSync(source)) {
    return []
  } else {
    return fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
  }
}

function copyFolderRecursiveSync(source: string, target: string, newName?: string) {
  var files = [] as any

  var targetFolder = newName ? path.join(target, newName) : path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) { fs.mkdirSync(targetFolder) }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function (file: any) {
      var curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }

}

function copyFileSync(source: string, target: string) {

  var targetFile = target

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}
