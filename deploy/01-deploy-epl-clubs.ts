import {
	developmentChains,
	VERIFICATION_BLOCK_CONFIRMATIONS,
} from '../helper-hardhat-config'
import verify from '../utils/verify'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const tokenUris = [
	'ipfs://bafyreidfkvzj77irx57xc4bmmhbbhak7totciyho2xl6cwiwupoqemv3yq/metadata.json',
	'ipfs://bafyreigki33shmiudb3mzattjd24vo566i4se7c6vdphpt5obdqnyfyz7i/metadata.json',
	'ipfs://bafyreiaj2cj7lftoessejydfhr7ll2ashaithd3ins4nry3qsnovv4tuhi/metadata.json',
	'ipfs://bafyreiew7lfxxbflxuhth3vhxaojld3qusy2ybghrswcqafjzkes7dxq2u/metadata.json',
	'ipfs://bafyreide5luntbdgzww744dailongyyhrytq44mwvnkiiiszdenpz7cpdu/metadata.json',
]

const deployEplClubs: DeployFunction = async function (
	hre: HardhatRuntimeEnvironment 
) {
	const { deployments, getNamedAccounts, network } = hre
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()
	const isDevelopment = developmentChains.includes(network.name)
	const waitBlockConfirmations = developmentChains.includes(network.name)
		? 1
		: VERIFICATION_BLOCK_CONFIRMATIONS
	const args: any[] = [tokenUris]
	const eplClubs = await deploy('EPLClubs', {
		from: deployer,
		log: true,
		args,
		waitConfirmations: waitBlockConfirmations,
	})

	if (!isDevelopment && process.env.ETHERSCAN_API_KEY) {
		log('Verifying...')
		await verify(eplClubs.address, args)
	}

	log(` EplClubs deployed at ${eplClubs.address} on ${network.name}`)
}

export default deployEplClubs
deployEplClubs.tags = ['all', 'eplClubs']
