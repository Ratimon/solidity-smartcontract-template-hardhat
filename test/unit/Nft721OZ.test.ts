import {expect} from '../chai-setup';
import {ethers, deployments, getUnnamedAccounts} from 'hardhat';
import {Nft721OZ, SuperMarioWorldERC1155} from '../../typechain';
import {setupUsers} from '../setup';
import {BigNumber, constants} from 'ethers';
import {parseEther, solidityKeccak256} from 'ethers/lib/utils';
const {AddressZero} = constants;


const setup = deployments.createFixture(async () => {
    await deployments.fixture(['external', 'nft']);
    const contracts = {
        Nft721OZ: <Nft721OZ>await ethers.getContract('721Mario'),
        SuperMarioWorldERC1155: <SuperMarioWorldERC1155>await ethers.getContract('1155Mario')
    };

    //@ts-ignore
    const users = await setupUsers(await getUnnamedAccounts(), contracts);

    return {
      ...contracts,
      users,
    };
  });

describe('Nft721OZ', function () {
  it('supportsInterface', async function () {
    const {Nft721OZ} = await setup();
    /// 0x01ffc9a7 is ERC165.
    /// 0x80ac58cd is ERC721
    /// 0x5b5e139f is for ERC721 metadata
    expect(await Nft721OZ.supportsInterface('0x01ffc9a7')).to.be.true;
    expect(await Nft721OZ.supportsInterface('0x80ac58cd')).to.be.true;
    expect(await Nft721OZ.supportsInterface('0x5b5e139f')).to.be.true;
    // 0x2a55205a is ERC2981 (royalty standard)
    expect(await Nft721OZ.supportsInterface('0x2a55205a')).to.be.false;
    expect(await Nft721OZ.supportsInterface('0x00000000')).to.be.false;
    expect(await Nft721OZ.supportsInterface('0x11111111')).to.be.false;
  });
})