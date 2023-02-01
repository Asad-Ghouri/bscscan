import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Moralis from "moralis";
import Web3 from "web3";
import { contractABI, contractAddress } from "../../contract";

import Nav from "../../components/Nav";

const web3 = new Web3(Web3.givenProvider);

function Dashboard() {
  const { isAuthenticated, logout, user } = useMoralis();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const { authenticate } = useMoralis();

  // useEffect(() => {
  //   if (!isAuthenticated) router.push("/");
  // }, [isAuthenticated]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // save image to IPFS
      const file1 = new Moralis.File(file.name, file);
      await file1.saveIPFS();
      const file1url = file1.ipfs();

      // generate metadata and save to ipfs
      const metadata = {
        name,
        description,
        image: file1url,
      };
      const file2 = new Moralis.File(`${name}metadata.json`, {
        base64: Buffer.from(JSON.stringify(metadata)).toString("base64"),
      });
      // await file2.saveIPFS();
      // const metadataurl = file2.ipfs();
      // console.log(metadataurl);

      const uri = await storage.upload(file2.ipfs());
      // This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
      console.log(uri);

      // interact with smart contract
      // const contract = new web3.eth.Contract(contractABI, contractAddress);
      // const response = await contract.methods
      //   .mint(metadataurl)
      //   .send({ from: user.get("ethAddress") });
      // const tokenId = response.events.Transfer.returnValues.tokenId;
      const web3 = await Moralis.enableWeb3();

      const numb = "3";

      let depositoptions = {
        contractAddress: "0x37b9af6b0b2b9D3dA1A4335106bAC7637062E31E",

        functionName: "mintToken",

        abi: contractABI,
        msgValue: Moralis.Units.ETH(0.001),

        params: {
          // _mintAmount: numb,
          tokenURI: uri,
        },
      };
      Moralis.executeFunction(depositoptions);
      alert(`NFT successfully minted. Contract address - and Token ID `);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="home2">
      <div>
        <div className="dBIOSm container">
          <a href="/">
            <div className="soLxR logo" width={40}>
              <img src="https://nftify-platform.s3.ap-southeast-1.amazonaws.com/logo/62d170f22994a0bed7213b80-1658926016888.png" />
            </div>
          </a>
          <div className="container-right">
            <div className="search-bar">
              <span className="ant-input-group-wrapper ant-input-search">
                <span className="ant-input-group">
                  <input
                    placeholder="Search"
                    className="ant-input"
                    type="text"
                    defaultValue=""
                  />
                  <span className="ant-input-group-addon">
                    <button
                      type="button"
                      className="ant-btn ant-btn-primary ant-input-search-button"
                    >
                      <div className="ant-image">
                        <img
                          className="ant-image-img"
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjE2Njc1IDEuNjY2OTlDMTMuMzA4OSAxLjY2Njk5IDE2LjY2NjcgNS4wMjQ4NiAxNi42NjY3IDkuMTY2OTlDMTYuNjY2NyAxMC45Mzc2IDE2LjA1MzIgMTIuNTY1IDE1LjAyNyAxMy44NDhMMTguMDg5MyAxNi45MTExQzE4LjQxNDggMTcuMjM2NSAxOC40MTQ4IDE3Ljc2NDEgMTguMDg5MyAxOC4wODk2QzE3Ljc4ODkgMTguMzkgMTcuMzE2MiAxOC40MTMxIDE2Ljk4OTMgMTguMTU4OUwxNi45MTA4IDE4LjA4OTZMMTMuODQ3NyAxNS4wMjcyQzEyLjU2NDcgMTYuMDUzNCAxMC45Mzc0IDE2LjY2NyA5LjE2Njc1IDE2LjY2N0M1LjAyNDYxIDE2LjY2NyAxLjY2Njc1IDEzLjMwOTEgMS42NjY3NSA5LjE2Njk5QzEuNjY2NzUgNS4wMjQ4NiA1LjAyNDYxIDEuNjY2OTkgOS4xNjY3NSAxLjY2Njk5Wk05LjE2Njc1IDMuMzMzNjZDNS45NDUwOSAzLjMzMzY2IDMuMzMzNDEgNS45NDUzMyAzLjMzMzQxIDkuMTY2OTlDMy4zMzM0MSAxMi4zODg3IDUuOTQ1MDkgMTUuMDAwMyA5LjE2Njc1IDE1LjAwMDNDMTIuMzg4NCAxNS4wMDAzIDE1LjAwMDEgMTIuMzg4NyAxNS4wMDAxIDkuMTY2OTlDMTUuMDAwMSA1Ljk0NTMzIDEyLjM4ODQgMy4zMzM2NiA5LjE2Njc1IDMuMzMzNjZaIiBmaWxsPSIjNTY1MjZBIi8+Cjwvc3ZnPgo="
                        />
                      </div>
                    </button>
                  </span>
                </span>
              </span>
            </div>
            <div className="right">
              <ul
                className="ant-menu ant-menu-horizontal ant-menu-light"
                tabIndex={0}
              >
                <li className="ant-menu-item" tabIndex={-1}>
                  <span className="ant-menu-title-content">
                    <a className="active" href="https://shera-market-nft.com/">
                      <div>Home</div>
                    </a>
                  </span>
                </li>
                <li className="ant-menu-item" tabIndex={-1}>
                  <span className="ant-menu-title-content">
                    <a className href="https://shera-market-nft.com/discover">
                      <div>Discover</div>
                    </a>
                  </span>
                </li>
                <li className="ant-menu-item" tabIndex={-1}>
                  <span className="ant-menu-title-content">
                    <a className href="https://shera-market-nft.com/box-event">
                      <div>Mystery boxes</div>
                    </a>
                  </span>
                </li>
                <li className="ant-menu-item" tabIndex={-1}>
                  <span className="ant-menu-title-content">
                    <a className href="https://shera-market-nft.com/airdrop">
                      <div>Airdrops</div>
                    </a>
                  </span>
                </li>
                <li className="ant-menu-item" tabIndex={-1}>
                  <span className="ant-menu-title-content">
                    <a className href="https://shera-market-nft.com/activity">
                      <div>Activity</div>
                    </a>
                  </span>
                </li>
              </ul>
              <div style={{ display: "none" }}></div>
              <button
                color="var(--color_button_main_text)"
                background="var(--color_button_main_bg)"
                type="button"
                className="ant-btn dEQEDw theme-btn"
              >
                {isAuthenticated ? (
                  <span onClick={logout}>LogOut</span>
                ) : (
                  <span onClick={authenticate}>Connect Wallet</span>
                )}
              </button>
              <div className="ant-image" style={{ width: "40px" }}>
                <img
                  className="ant-image-img"
                  src="https://shera-market-nft.com/_next/static/images/binance_logo-06395e34944f26ef3017d573cb53bcf1.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-for-mobile">
        <Nav />
      </div>

      <center>
        <p className="mnft"> Mint New NFT </p>
      </center>

      <div className="flex w-screen h-screen items-center justify-center home2 mt-[-11rem] md:mt-[-4rem]">
        <form onSubmit={onSubmit}>
          <div>
            <center>
              <label htmlFor="" className="namelabel">
                NFT NAME
              </label>
            </center>

            <input
              type="text"
              className="border-[1px] p-2 text-lg  w-full nftname"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <center>
              <label htmlFor="" className="namelabel">
                NFT FILE
              </label>
            </center>

            <input
              type="file"
              className="border-[1px] p-2 text-lg  w-full nftname"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="mt-5">
            <center>
              <label htmlFor="" className="namelabel">
                NFT DESCRIPTION
              </label>
            </center>

            <input
              type="text"
              className="border-[1px] p-2 text-lg  w-full nftname"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {isAuthenticated ? (
            <button
              type="submit"
              className="mt-5 w-full p-5  text-white text-lg  animate-pulse mintbtn"
            >
              Mint now!
            </button>
          ) : (
            console.log("wallet not connected")
          )}
          {!isAuthenticated ? (
            <p
              onClick={authenticate}
              className="mt-5 w-full p-5 bg-red-700 text-white text-lg animate-pulse mintbtn cobtn"
            >
              Connect Wallet!
            </p>
          ) : (
            console.log("wallet connected")
          )}
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
