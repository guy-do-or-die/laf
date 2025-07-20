// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


abstract contract Meta is ERC1155Supply, IERC2981 {

    uint256 constant REGISTERED = 1;
    uint256 constant LOST = 2;
    uint256 constant FOUND = 3;
    uint256 constant RETURNED = 4;
    uint256 constant UP = 5;
    uint256 constant DOWN = 6;

    uint256 constant PIC_SIZE = 256;

    constructor() ERC1155("LAF is...") {}

    mapping(address => int) public trust;

    event Up(address indexed from, address indexed to);
    event Down(address indexed from, address indexed to);

    function thumbUp(address account) public {
        require(balanceOf(msg.sender, UP) > 0, "Insufficient UP token");

        _burn(msg.sender, UP, 1);
        _mintWithTrust(account, UP, 1, "");

        emit Up(msg.sender, account);
    }

    function thumbDown(address account) public {
        require(balanceOf(msg.sender, UP) > 0, "Insufficient UP token");

        _burn(msg.sender, UP, 1);
        _mintWithTrust(account, DOWN, 1, "");

        if (balanceOf(account, UP) > 0) _burn(account, UP, 1);

        emit Down(msg.sender, account);
    }

    function _mintWithTrust(address account, uint id, uint amount, bytes memory data) internal {
        _mint(account, id, amount, data);

        if (id == UP) {
            uint balance = balanceOf(account, UP);

            if (balance > uint(trust[account])) {
                trust[account] = int(balance);
            }
        }

        if (id == DOWN) {
            trust[account] -= int(amount);
        }
    }

    function getMeta(uint256 tokenId) internal pure returns (string memory emoji, string memory title) {
        if (tokenId == 0) return (unicode"❤️‍🩹", "LAF is...");
        if (tokenId == REGISTERED) return (unicode"😉", "Registered");
        if (tokenId == LOST) return (unicode"😢", "Lost");
        if (tokenId == FOUND) return (unicode"😎", "Found");
        if (tokenId == RETURNED) return (unicode"😇", "Returned");
        if (tokenId == UP) return (unicode"👍", "Thumb Up");
        if (tokenId == DOWN) return (unicode"👎", "Thumb Down");
        return (unicode"🫥", "404");
    }

    function uri(uint256 tokenId) public pure override returns (string memory) {
        (string memory emoji, string memory title) = getMeta(tokenId);

        string memory svg = string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" width="', Strings.toString(PIC_SIZE), '" height="', Strings.toString(PIC_SIZE), '">',
                '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="64" font-family="sans-serif">', emoji, '</text></svg>'
            )
        );

        string memory json = string(
            abi.encodePacked(
                '{',
                    '"name": "', title, '",',
                    '"description": "http://laf.is",',
                    '"image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '",',
                    '"attributes": []',
                '}'
            )
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,", Base64.encode(bytes(json))
            )
        );
    }

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual override {
        if (id != 0) {
            require(from == address(0) || to == address(0), "Non-transferable token");
        }
        super.safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public virtual override {
        for (uint256 i = 0; i < ids.length; i++) {
            if (ids[i] != 0) {
                require(from == address(0) || to == address(0), "Non-transferable token");
            }
        }
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, IERC165) returns (bool) {
        return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
    }

}