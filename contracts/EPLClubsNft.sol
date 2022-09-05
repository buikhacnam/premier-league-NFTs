// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error RunoutOfMedia();

contract EPLClubs is ERC721URIStorage, Ownable {
    string[] private s_tokenUris;
    uint256 private s_tokenCounter;

    constructor(string[5] memory tokenUris) ERC721("premier league clubs NFT", "EPLCLUBS") {
        s_tokenCounter = 0;
        s_tokenUris = tokenUris; 
    }

    function mintNft() public onlyOwner returns(uint256) {
        if ( s_tokenUris.length == 0) revert RunoutOfMedia();
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, s_tokenUris[s_tokenUris.length - 1]);
        s_tokenCounter++;
        s_tokenUris.pop();
        return s_tokenCounter;
    }

    function addMedia(string memory file) public onlyOwner returns(string memory) {
        s_tokenUris.push(file);
        return file;
    }
}