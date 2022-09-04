import { storeImages, storeTokeUriMetadata } from '../utils/uploadToPinata'
const imagesLocation = './images/'

const metadataTemplate = {
	name: '',
	description: '',
	image: '',
	attributes: [
		{
			trait_type: 'Power',
			value: 100,
		},
	],
}

const description: any = {
	Chelsea: 'The blues',
	'Man-city': 'The citizens',
	'Man-utd': 'The red devils',
	Liverpool: 'The kop',
	Arsenal: 'The gunners',
}

async function main() {
	let tokenUris: any[] = []
	// // store the Image in IPFS
	const { responses: imageUploadResponse, files } = await storeImages(
		imagesLocation
	)
	for (let imageUploadResponseIndex in imageUploadResponse) {
		let tokenUriMetadata = { ...metadataTemplate }
		tokenUriMetadata.name = files[imageUploadResponseIndex].replace(
			'.jpg',
			''
		)
		tokenUriMetadata.description = description[tokenUriMetadata.name]
		tokenUriMetadata.image = `ipfs://${imageUploadResponse[imageUploadResponseIndex].IpfsHash}`
		console.log(`Uploading ${tokenUriMetadata.name}...`)
		const metadataUploadResponse = await storeTokeUriMetadata(
			tokenUriMetadata
		)
		tokenUris.push(`ipfs://${metadataUploadResponse!.IpfsHash}`)
	}
	console.log('token uris: ', tokenUris)

	/* 
	[
		'ipfs://QmS7CxrjXx3X6h4pP1GmFNEfDdBPi8VjB25MFDCeTCZQPh',
		'ipfs://QmQHnZqCGbL9iYXhGbYSqo16LBDobWpcFMxyz7aXkPpuut',
		'ipfs://QmXYisGEwYAV8X3jfwxeszsi4JDAiwQSUxzAESzspUfxfr',
		'ipfs://QmTEtFpLYgjtzP6eZxr1gYZYNohpRdm8fffVBSj3H77AXB',
		'ipfs://QmSeEm7VSteGtYbuuP6sFVGDNnVBZvdxsWfjwE6veak8cB'
	]
	*/
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
