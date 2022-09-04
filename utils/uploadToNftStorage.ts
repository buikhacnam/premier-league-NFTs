// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from "nft.storage"
import mime from "mime"
import fs from "fs"
import path from "path"
import "dotenv/config"

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY!

const description:any = {
    "Chelsea": "The blues",
    "Man-city": "The citizens",
    "Man-utd": "The red devils",
    "Liverpool": "The kop",
    "Arsenal": "The gunners"
}

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
export async function storeNFTs(imagesPath: string) {
    const fullImagesPath = path.resolve(imagesPath)
    const files = fs.readdirSync(fullImagesPath)
    let responses = []
    for (const fileIndex in files) {
        const image = await fileFromPath(`${fullImagesPath}/${files[fileIndex]}`)
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
        const name = files[fileIndex].replace(".jpg", "")
        const response = await nftstorage.store({
            image,
            name: name,
            description: description[name],
        })
        responses.push(response)
    }
    return responses
}

/**
 * A helper to read a file from a location on disk and return a File object.
 * Note that this reads the entire file into memory and should not be used for
 * very large files.
 * @param {string} filePath the path to a file to store
 * @returns {File} a File object containing the file content
 */
export async function fileFromPath(filePath:string) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)!
    return new File([content], path.basename(filePath), { type })
}

