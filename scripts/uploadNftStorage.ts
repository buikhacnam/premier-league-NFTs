import { storeNFTs } from '../utils/uploadToNftStorage'

const imagesLocation = './images/'
async function main() {
	const responses = await storeNFTs(imagesLocation)
	console.log('responses: ', responses)
	/*
        [
            Token {
                ipnft: 'bafyreidfkvzj77irx57xc4bmmhbbhak7totciyho2xl6cwiwupoqemv3yq',
                url: 'ipfs://bafyreidfkvzj77irx57xc4bmmhbbhak7totciyho2xl6cwiwupoqemv3yq/metadata.json'
            },
            Token {
                ipnft: 'bafyreigki33shmiudb3mzattjd24vo566i4se7c6vdphpt5obdqnyfyz7i',
                url: 'ipfs://bafyreigki33shmiudb3mzattjd24vo566i4se7c6vdphpt5obdqnyfyz7i/metadata.json'
            },
            Token {
                ipnft: 'bafyreiaj2cj7lftoessejydfhr7ll2ashaithd3ins4nry3qsnovv4tuhi',
                url: 'ipfs://bafyreiaj2cj7lftoessejydfhr7ll2ashaithd3ins4nry3qsnovv4tuhi/metadata.json'
            },
            Token {
                ipnft: 'bafyreiew7lfxxbflxuhth3vhxaojld3qusy2ybghrswcqafjzkes7dxq2u',
                url: 'ipfs://bafyreiew7lfxxbflxuhth3vhxaojld3qusy2ybghrswcqafjzkes7dxq2u/metadata.json'
            },
            Token {
                ipnft: 'bafyreide5luntbdgzww744dailongyyhrytq44mwvnkiiiszdenpz7cpdu',
                url: 'ipfs://bafyreide5luntbdgzww744dailongyyhrytq44mwvnkiiiszdenpz7cpdu/metadata.json'
            },
        ]
    */
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
